import test from 'node:test';
import assert from 'node:assert/strict';
import { AudioController } from '../../src/media/audio-controller.js';

class FakeAudio {
  constructor() { this.pauseCalls = 0; this.playCalls = 0; this.currentTime = 8; this.src = ''; }
  pause() { this.pauseCalls += 1; }
  load() {}
  async play() { this.playCalls += 1; }
  removeAttribute(name) { if (name === 'src') this.src = ''; }
}

test('áudio exige gesto explícito e reutiliza um único elemento', async () => {
  const audio = new FakeAudio();
  const controller = new AudioController(() => audio);
  const ref = { url: './audio/aprovado.mp3', approvalState: 'approved' };
  assert.deepEqual(await controller.play(ref), { status: 'blocked', reason: 'explicit-gesture-required' });
  assert.equal(audio.playCalls, 0);
  assert.deepEqual(await controller.play(ref, { explicitGesture: true }), { status: 'playing' });
  assert.equal(controller.element, audio);
  assert.equal(audio.playCalls, 1);
  assert.equal(audio.currentTime, 0);
});

test('asset não aprovado falha fechado sem tocar mídia', async () => {
  const audio = new FakeAudio();
  const controller = new AudioController(() => audio);
  const result = await controller.play({ url: './x.mp3', approvalState: 'draft' }, { explicitGesture: true });
  assert.deepEqual(result, { status: 'error', reason: 'asset-unavailable' });
  assert.equal(audio.playCalls, 0);
});
