export class AudioController {
  #audio;
  #operation = 0;
  #state = 'idle';

  constructor(createAudio = () => new Audio()) {
    this.#audio = createAudio();
    this.#audio.preload = 'none';
  }

  get state() { return this.#state; }
  get element() { return this.#audio; }

  async play(ref, { explicitGesture = false } = {}) {
    if (!explicitGesture) return { status: 'blocked', reason: 'explicit-gesture-required' };
    if (!ref || ref.approvalState !== 'approved' || typeof ref.url !== 'string') {
      this.#state = 'error';
      return { status: 'error', reason: 'asset-unavailable' };
    }
    const operation = ++this.#operation;
    this.#audio.pause();
    this.#audio.currentTime = 0;
    this.#audio.src = ref.url;
    this.#audio.load();
    this.#state = 'loading';
    try {
      await this.#audio.play();
      if (operation !== this.#operation) return { status: 'cancelled' };
      this.#state = 'playing';
      return { status: 'playing' };
    } catch {
      if (operation !== this.#operation) return { status: 'cancelled' };
      this.#state = 'error';
      return { status: 'error', reason: 'play-rejected' };
    }
  }

  stop() {
    this.#operation += 1;
    this.#audio.pause();
    this.#audio.currentTime = 0;
    this.#audio.removeAttribute?.('src');
    this.#state = 'idle';
  }
}
