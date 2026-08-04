(function exposeReleaseIntegrity(scope) {
  const HEX_SHA256 = /^[a-f0-9]{64}$/;

  function normalizedAssets(assets) {
    if (!Array.isArray(assets) || assets.length === 0) throw new TypeError('Manifesto sem assets normativos');
    const normalized = assets.map((asset) => {
      if (!asset || typeof asset.path !== 'string' || !asset.path.startsWith('./')) {
        throw new TypeError('Caminho normativo inválido');
      }
      if (!HEX_SHA256.test(asset.sha256)) throw new TypeError(`SHA-256 inválido para ${asset.path}`);
      return { path: asset.path, sha256: asset.sha256 };
    });
    const sorted = [...normalized].sort((left, right) => left.path.localeCompare(right.path));
    if (new Set(sorted.map((asset) => asset.path)).size !== sorted.length) throw new TypeError('Asset normativo duplicado');
    if (JSON.stringify(normalized) !== JSON.stringify(sorted)) throw new TypeError('Assets normativos fora de ordem');
    return sorted;
  }

  function canonicalReleasePayload(assets) {
    return normalizedAssets(assets).map((asset) => `${asset.path}\u0000${asset.sha256}\n`).join('');
  }

  async function sha256Hex(value, cryptoApi = scope.crypto) {
    if (!cryptoApi?.subtle) throw new Error('SHA-256 indisponível');
    const bytes = typeof value === 'string' ? new TextEncoder().encode(value) : value;
    const digest = await cryptoApi.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  async function validateReleaseManifest(manifest, expectedReleaseId, cryptoApi = scope.crypto) {
    if (!manifest || manifest.schemaVersion !== 1 || !HEX_SHA256.test(manifest.releaseId)) {
      throw new TypeError('Manifesto de release inválido');
    }
    const derivedReleaseId = await sha256Hex(canonicalReleasePayload(manifest.assets), cryptoApi);
    if (manifest.releaseId !== derivedReleaseId || manifest.releaseId !== expectedReleaseId) {
      throw new Error('Identidade do release não corresponde aos bytes normativos');
    }
    return normalizedAssets(manifest.assets);
  }

  async function fetchVerifiedRelease({
    manifestUrl,
    expectedReleaseId,
    fetchImpl = scope.fetch,
    cryptoApi = scope.crypto,
  }) {
    const manifestResponse = await fetchImpl(manifestUrl, { cache: 'no-store' });
    if (!manifestResponse.ok) throw new Error(`Manifesto de release indisponível: ${manifestResponse.status}`);
    const manifest = await manifestResponse.clone().json();
    const assets = await validateReleaseManifest(manifest, expectedReleaseId, cryptoApi);
    const responses = new Map();
    for (const asset of assets) {
      const assetUrl = new URL(asset.path, manifestUrl).toString();
      const response = await fetchImpl(assetUrl, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Asset normativo indisponível: ${asset.path}`);
      const actualSha256 = await sha256Hex(await response.clone().arrayBuffer(), cryptoApi);
      if (actualSha256 !== asset.sha256) throw new Error(`Shell híbrido detectado: ${asset.path}`);
      responses.set(assetUrl, response);
    }
    return { manifest, manifestResponse, responses };
  }

  scope.LumonReleaseIntegrity = Object.freeze({
    canonicalReleasePayload,
    fetchVerifiedRelease,
    sha256Hex,
    validateReleaseManifest,
  });
}(globalThis));
