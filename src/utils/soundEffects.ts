// Web Audio API + Web Speech API sound & voice narrator for the Bwise Beehive experience

class SoundController {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (this.isMuted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    return this.isMuted;
  }

  /** Subtle warm marimba/honey chime on button hover or click */
  public playClickChime(freq = 587.33) {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.14);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.19);
  }

  /** Gentle bee flight buzz + swoosh when flying across the hive */
  public playBeeFlightSwoosh(durationSec = 1.4) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const mod = ctx.createOscillator();
    const modGain = ctx.createGain();
    const mainGain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(145, now);
    osc.frequency.exponentialRampToValueAtTime(230, now + durationSec * 0.5);
    osc.frequency.exponentialRampToValueAtTime(165, now + durationSec);

    mod.type = 'sine';
    mod.frequency.setValueAtTime(38, now);
    modGain.gain.setValueAtTime(25, now);

    mainGain.gain.setValueAtTime(0.001, now);
    mainGain.gain.linearRampToValueAtTime(0.045, now + 0.15);
    mainGain.gain.linearRampToValueAtTime(0.035, now + durationSec - 0.2);
    mainGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    mod.connect(modGain);
    modGain.connect(osc.frequency);
    osc.connect(mainGain);
    mainGain.connect(ctx.destination);

    osc.start(now);
    mod.start(now);
    osc.stop(now + durationSec);
    mod.stop(now + durationSec);
  }

  /** Cinematic warp whoosh when zooming through the 3D Honeycomb Tunnel */
  public playTunnelWarp(durationSec = 1.6) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Harmonic chord sweep
    [220, 329.63, 440, 659.25].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq * 0.7, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.4, now + durationSec * 0.75);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.03, now + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + durationSec);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + durationSec);
    });
  }

  /** Friendly voice narration matching the reference video */
  public speak(text: string) {
    if (this.isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.04;
      utterance.pitch = 1.12;
      utterance.volume = 0.85;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech synthesis errors on restricted browsers
    }
  }
}

export const soundFX = new SoundController();
