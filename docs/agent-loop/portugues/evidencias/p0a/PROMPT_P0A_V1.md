# Prompt versionado — P0a Capivara v1

## Metadados

- `run_id`: `pt-20260718T172438Z-artista-p0a-dfaa87d`
- ferramenta: `image_gen` integrada
- classificação: `illustration-flat`
- finalidade: folha de modelo editorial P0a e âncoras frontal/3/4
- modelo, versão e seed: não expostos pela ferramenta

## Prompt inicial

```text
Use case: illustration-flat
Asset type: P0a editorial character model sheet and visual anchor evidence for a children's offline learning PWA
Primary request: Create one original, coherent character model sheet of a single Brazilian capybara mascot called only Capivara. This is a visual identity reference, not a scene and not a pedagogical answer image.

Scene/backdrop: one square 4-column by 3-row editorial model-sheet layout on a warm flat neutral #FFF9F1 background. Separate all 12 panels clearly using generous clean whitespace only; no written labels, captions, rulers, borders with symbols, or text of any kind. Keep at least 10% outer margin. No scenery and no props.

Subject: the exact same Capivara in every panel. Stable low rounded capybara silhouette; broad light muzzle; small calm dark eyes; small round ears; short legs; warm brown fur. Keep proportions, muzzle, eye spacing, ear placement, scarf, medallion, and coat markings identical across all panels. The capybara is not humanoid and never stands permanently bipedal.

Panel order, left to right and top to bottom:
1. neutral front view, full body;
2. neutral three-quarter view facing toward viewer's right, full body — primary anchor;
3. neutral side view facing toward viewer's right, full body;
4. neutral rear view, full body;
5. seated neutral view, full body;
6. short natural forepaw reach while remaining unmistakably quadrupedal, full body;
7. welcoming, calm open gesture;
8. listening attentively, slight head tilt;
9. speaking demonstration, simple gently open mouth;
10. brief happy success expression, restrained and noncompetitive;
11. encouraging try-again expression with a small natural circular forepaw gesture, never sad;
12. calm completion expression, proud of effort, open posture.

Style/medium: original flat 2D contemporary Brazilian children's-book illustration; rounded readable shapes; refined professional character-sheet consistency; minimal gouache/paper texture; clean soft edges; no photorealism, no 3D plastic look, no imitation of any artist, studio, app, mascot, franchise, or existing character.

Color palette: main fur #9A6545, fur shadow #70452F, fur highlight #BC8057, broad muzzle #D9AB79, eyes and essential outline #2B211D, constant plain petrol-green scarf #1F6F64, constant small circular golden light medallion #F6C453. Keep these colors visually stable in every panel. The scarf knot stays on the same side in all views where visible. The medallion is always circular, subordinate to the face, attached to the scarf, and contains no symbol.

Composition/framing: full body visible in every anatomy view; no cropped ears, muzzle, paws, scarf, or medallion. Each pose centered in its own whitespace cell. Neutral orthographic-like character-sheet views for panels 1–6, expressive smaller poses for panels 7–12. Consistent scale within each group. No panel may overlap another.

Function/accessibility: editorial identity reference. Expressions must be warm, calm, curious, encouraging, and safe for children ages 4–8. No pose, gaze, glow, or object may point to or reveal an answer.

Constraints: exactly one mascot identity repeated in 12 panels; no second mascot; no name; no text, letters, numbers, pseudoalphabet, logo, signature, watermark, trophy, ranking, medal, educational object, answer cue, brand, costume pattern, or background scene. No guilt, punitive sadness, reproach, fear, shame, sarcasm, defeat, crying, exhausted posture, or competitive triumph.

Avoid: owl, beaver, hamster, bear, hippopotamus, human anatomy, long neck, long limbs, human hands, five fingers, giant eyes, giant ears, pointed muzzle, prominent teeth, heavy outlines, dramatic shadows, gradients, noisy texture, cumulative character drift, inconsistent scarf, inconsistent medallion, altered markings, extra accessories, text-like shapes, hidden letters, symbols inside the medallion, and any protected visual identity.

Output intent: one polished square model sheet suitable for deterministic local downscaling to a 1536x1536 WebP review export and 512x512 crops of the front and three-quarter anchors. No transparency is required.
```

## Correção dirigida sobre a primeira geração

```text
Use case: illustration-flat
Asset type: corrective edit of the P0a Capivara model sheet
Primary request: Preserve the existing square 4-column by 3-row model sheet, neutral background, layout, palette, rendering style, character identity, proportions, face, scarf, medallion, and every already-correct panel. Change only the anatomy problems described below.

Input image: the immediately previous generated model sheet is the edit target.

Required targeted corrections:
1. Rear-view panel, top row column 4: remove the dark tail-like mark entirely. Capybaras have no visible tail. Keep a clean rounded rear silhouette, short natural hind legs, and the scarf seen from behind.
2. Short-reach panel, middle row column 2: replace the elongated arm and human-like hand with one very short compact capybara foreleg ending in a rounded paw close to the body. No palm, no thumb, no spread fingers, no human gesture. At most three subtle blunt toe separations; keep the animal unmistakably quadrupedal.
3. Welcoming panel, middle row column 3: remove both human-like outstretched arms and hands. Convey welcome with calm eye contact, a gentle head tilt, open chest, and one compact capybara forepaw only slightly lifted close to the body. No palms, fingers, thumbs, or bipedal human pose.
4. Try-again panel, bottom row column 3: remove the OK-sign hand and every finger circle. Convey encouraging try-again through a warm confident expression, slight head tilt, and one compact rounded forepaw resting/lifted close to the chest. No symbol, no circular fingers, no human hand.
5. Across all panels: paws must be short, compact animal paws, never human hands. No visible tail.

Critical invariants: change only these anatomy defects; preserve the exact same Capivara identity in all 12 panels; stable low rounded silhouette; broad light muzzle; small calm dark eyes; small round ears; short legs; the same fur colors; the same plain petrol-green scarf and small circular golden medallion; same 10% margin; full body; no overlap; no text, letters, numbers, pseudoalphabet, logo, signature, watermark, prop, answer cue, scenery, second mascot, punitive emotion, protected character, artist imitation, or new accessory.

Output intent: corrected single P0a model sheet suitable for visual inspection and deterministic downscaling. No transparency required.
```

## Negative prompt consolidado

```text
No text, labels, letters, numbers, pseudoalphabet, logos, signatures, watermarks, brands, scenery, props, pedagogical answers, answer cues, trophies, rankings, medals, symbols inside the medallion, second mascot, extra accessories, costume patterns, long limbs, long neck, human anatomy, human arms, human hands, palms, thumbs, spread fingers, visible tail, giant eyes, giant ears, pointed muzzle, prominent teeth, permanent bipedal stance, guilt, punitive sadness, reproach, fear, shame, sarcasm, defeat, crying, exhaustion, competitive triumph, photorealism, 3D plastic rendering, heavy outlines, dramatic shadows, noisy texture, character drift, altered markings, inconsistent scarf, inconsistent medallion, artist imitation, studio imitation, franchise imitation, app imitation, protected character, or protected visual identity.
```

## Observação de reprodutibilidade

O prompt, a cadeia de correção e os hashes estão registrados. A ferramenta não expôs modelo, versão, seed nem parâmetros determinísticos; portanto, repetição pixel a pixel não é alegada.
