# Prompt versionado — P0a Capivara v2

## Metadados

- `run_id`: `pt-20260721T174958Z-artista-p0a-7a56fcd`
- chave de idempotência: `G3_P0A_MODEL_SHEET:artista_ia:7a56fcdb35e055b7ca0a2c0bf75b49705dacf121`
- ferramenta: `image_gen` integrada do Codex, modo built-in
- taxonomia técnica: `precise-object-edit`
- finalidade: corrigir exclusivamente a pose 6 do model sheet P0a
- entrada visual canônica: `../p0a/p0a-model-sheet-v1-review-1536.jpg`
- SHA-256 da entrada: `08dea06c86465cf773a05c43dba0fc93bdbc83a87912be7020239ac9c9366b90`
- modelo, versão, seed, sampler, steps e guidance: não expostos pela ferramenta
- transparência: não necessária

O master antigo fora do Git não foi usado. A única entrada visual foi o JPEG v1 publicado no repositório.

## Edição selecionada

```text
Use case: precise-object-edit
Asset type: P0a v2 editorial character model sheet for Lumon children's offline learning PWA
Input images: Image 1 is the canonical Git-published P0a v1 JPEG edit target and identity reference.
Primary request: Change only panel 6 (second row, second column) so it unequivocally shows a short natural capybara forepaw reaching into empty space while the Capivara remains unmistakably quadrupedal. Lift and extend only the near forepaw slightly forward and away from its resting position, with clear empty space beneath/around that paw. The reach must remain compact and close to the body.
Critical anatomy: very short compact capybara foreleg ending in one rounded animal paw; no palm, no thumb, no human arm, no spread fingers, no elongated limb, no bipedal posture. At most subtle blunt toe separations. The other three paws support the body on the ground.
Invariants: preserve the square 4x3 layout, warm neutral background, exact positions and content of all other 11 panels, established Capivara identity, low rounded silhouette, broad light muzzle, small calm dark eyes, small round ears, short legs, warm brown fur, petrol-green scarf, circular golden medallion, palette, texture, line quality, scale, padding, full-body framing, and all safe margins. Preserve rear view without visible tail. No text, labels, letters, numbers, pseudoalphabet, logo, signature, watermark, props, scenery, answer cue, second mascot, punitive emotion, protected character, or artist imitation.
Output intent: one polished lossless master candidate for P0a v2, with no transparency required. Preserve image quality and avoid JPEG artifacts. Do not add borders or labels.
```

## Passagem corretiva rejeitada

Uma segunda passagem tentou neutralizar ainda mais a pata da vista 3/4. Ela foi rejeitada porque a ferramenta alterou o quadro para `1448x1086` (4:3), contrariando o model sheet quadrado. O candidato selecionado manteve `1254x1254`; na inspeção em resolução original, a vista 3/4 permanece quadrupedal e apoiada.

```text
Use case: precise-object-edit
Asset type: P0a v2 editorial character model sheet corrective pass
Input images: Image 1 is the current P0a v2 candidate edit target.
Primary request: Change only panel 2 (top row, second column), the neutral three-quarter anchor. Place its slightly lifted near forepaw firmly on the ground in a short natural neutral standing position, so all four paws support the quadrupedal body. Do not change its face, body, scarf, medallion, scale, position, or expression.
Critical invariant: panel 6 (second row, second column) must remain exactly the clear compact short-reach pose currently shown, with one rounded forepaw extended into empty space and the other three paws supporting the body.
Preserve exactly all other panels, square 4x3 layout, warm neutral background, established Capivara identity, palette, line quality, padding, full-body framing and safe margins. No human hands, palms, thumbs, spread fingers, long limbs, bipedal posture, visible tail, text, labels, numbers, logo, signature, watermark, props, scenery, answer cues, punitive emotion, protected character, or artist imitation.
Output intent: polished lossless P0a v2 master candidate; no transparency required.
```

## Negative prompt consolidado

```text
No text, labels, letters, numbers, pseudoalphabet, logos, signatures, watermarks, brands, scenery, props, pedagogical answers, answer cues, trophies, rankings, medals, symbols inside the medallion, second mascot, extra accessories, costume patterns, long limbs, long neck, human anatomy, human arms, human hands, palms, thumbs, spread fingers, visible tail, giant eyes, giant ears, pointed muzzle, prominent teeth, permanent bipedal stance, guilt, punitive sadness, reproach, fear, shame, sarcasm, defeat, crying, exhaustion, competitive triumph, photorealism, 3D plastic rendering, heavy outlines, dramatic shadows, noisy texture, character drift, altered markings, inconsistent scarf, inconsistent medallion, artist imitation, studio imitation, franchise imitation, app imitation, protected character, or protected visual identity.
```

## Limite de reprodutibilidade

Prompt, entrada canônica, saída lossless, transformações e hashes ficam registrados. A interface built-in não expôs modelo, versão, seed nem parâmetros determinísticos; portanto, repetição pixel a pixel não é alegada.
