# Prompts P0c v1 — ícone e marcador

## Identificação

- `run_id`: `pt-20260726T035942Z-artista-p0c-c5eef27`
- gate: `G3_P0C_ICONE_MARCADOR`
- ferramenta: `image_gen` integrada do Codex, modo built-in
- taxonomia: `stylized-concept` para P0C-01; `background-extraction` para P0C-04
- referências diretas exclusivas, em ambas as chamadas:
  - `p0a-model-sheet-v2-master-1254.png`, SHA-256 `43a42dc4dcb413ea27c1df6a798e2de59039c1646b87d3ffd4ed154f6cd7c2e4`;
  - `p0a-anchor-front-v2-512.webp`, SHA-256 `7b210ece4e69cce646cd3a64830ccf5f32d8d27d15257a9e1cc77c597a7e99fc`;
  - `p0a-anchor-3q-v2-512.webp`, SHA-256 `ada5e022a7185c075d41b59c954007d0abd8e333b311ea5c15a3c42c8f96a1ff`.

Nenhum P0b, ícone ou saída P0c foi usado como referência de geração.

## P0C-01 — ícone PWA

```text
Use case: stylized-concept
Asset type: PWA app icon master for Lumon, global identity, P0C-01
Primary request: Create one polished square app-icon composition derived directly from the approved Capivara three-quarter anchor. Preserve the exact same Capivara identity from all three references: broad light muzzle, small calm dark eyes, small rounded ears, low rounded capybara proportions, warm brown fur, petroleum-green scarf, and plain circular golden medallion with absolutely no symbol. Use a close 3/4 head-and-upper-body iconic crop, calm welcoming neutral expression. Keep muzzle, both eyes, both ears, scarf, and medallion entirely inside the central safe 60% of the square, with at least 20% conservative margin to every edge. Strong simple silhouette and clear readability when reduced to 16 px.
Input images: Image 1: approved capivara-model-v1 master identity reference; Image 2: approved frontal identity anchor; Image 3: approved 3/4 anchor and primary composition reference. Derive directly from these references; do not derive from any other pose or icon.
Scene/backdrop: perfectly clean flat warm cream background compatible with light, dark, circular, squircle, rounded-square, and Android maskable crops; no scene, no texture outside minimal subtle paper feel, no shadows reaching safe margins.
Style/medium: original contemporary 2D children's-book illustration, rounded forms, minimal gouache/paper texture, crisp icon-ready edges; not photorealistic, not plastic 3D.
Composition/framing: square, centered, balanced, conservative maskable safe area. The face is dominant; scarf and plain medallion remain visible but subordinate. No body part or essential feature near edges.
Color palette: preserve approved warm brown fur, lighter tan muzzle, petroleum-green scarf, gold medallion, dark eyes; warm cream background.
Constraints: exactly one Capivara; preserve anatomy and identity; no redesign; no cumulative drift; no state meaning; no reward meaning; no pedagogical answer cue; no text, letters, numbers, pseudoalphabet, app name, logo, signature, watermark, badge, emblem, or symbol inside the medallion.
Avoid: P0b-derived pose, another mascot, owl, beaver, hamster, bear, hippo, tail, human hands, fingers, bipedal posture, long neck, giant eyes, large ears, pointed muzzle, teeth, trophy, ranking, star, medal, completion/check/lock/review state, punitive or sad emotion, complex background, border, halo, heavy shadow, gradients, clipped ears/muzzle/scarf/medallion.
```

- artefato built-in: `call_P2XxQCnAmdBlEJPM6ds7Vc2I.png`
- SHA-256 da saída: `e3e23871dfd0f618ea648d96be1abb9aee572ef9619d721f7a0b180e2eaa0976`
- seleção: única chamada P0C-01; identidade, neutralidade e composição conformes após ajuste técnico de escala/padding no mesmo master.

## P0C-04 — marcador de trilha

```text
Use case: background-extraction
Asset type: transparent trail marker master for Lumon, global identity, P0C-04
Primary request: Create exactly one full-body neutral Capivara trail-marker illustration derived directly from the approved capivara-model-v1 references. Preserve the exact same identity: low rounded quadruped capybara body, broad light muzzle, small calm dark eyes, small rounded ears, short animal legs, warm brown fur, petroleum-green scarf, and plain circular golden medallion with absolutely no symbol. Neutral calm welcoming expression and neutral standing 3/4 pose. This image must communicate no progress state: not completed, blocked, current, review, success, retry, reward, celebration, sadness, or punishment.
Input images: Image 1: approved capivara-model-v1 master identity reference; Image 2: approved frontal identity anchor; Image 3: approved 3/4 anchor and primary pose reference. Derive directly from these references; do not derive from P0b or any icon.
Scene/backdrop: perfectly flat solid #FF00FF chroma-key background for local background removal. Background must be one uniform exact color with no shadows, gradients, texture, reflections, floor plane, or lighting variation. Do not use #FF00FF anywhere in the subject.
Style/medium: original contemporary 2D children's-book illustration, rounded forms, minimal gouache/paper texture, crisp edges suitable for transparent cutout; not photorealistic, not plastic 3D.
Composition/framing: square, centered full body, all ears, muzzle, scarf, medallion, legs and silhouette fully visible. At least 12% empty margin on every edge. Clear silhouette and readable face/medallion when reduced to 48 and 64 px.
Constraints: exactly one Capivara; preserve anatomy and identity; neutral pose and light; no cast shadow, contact shadow, reflection, halo, text, letters, numbers, pseudoalphabet, logo, signature, watermark, badge, emblem, symbol inside medallion, progress-state cue, pedagogical answer cue, or other object.
Avoid: P0b-derived pose, another mascot, owl, beaver, hamster, bear, hippo, tail, human hands, fingers, bipedal posture, raised victory paws, pointing, waving, long neck, giant eyes, large ears, pointed muzzle, teeth, trophy, ranking, star, checkmark, lock, review arrow, confetti, prize, punitive emotion, sad emotion, complex background, clipped body parts.
```

- artefato built-in: `call_enhWsnnv7Dis2qpOY1hDPdE1.png`
- SHA-256 da saída: `ee75524401f3f4b8c4fddf855c6f69b94824fb1a80ac301c1971273b2f8fe930`
- seleção: única chamada P0C-04; pose quadrúpede neutra e margem conformes.

## Limites de reprodutibilidade

Modelo, versão, seed, sampler, steps, guidance e parâmetros determinísticos não são expostos pela interface built-in. Repetição pixel a pixel não é alegada. Masters versionados e hashes são a fonte reprodutível do pós-processamento.
