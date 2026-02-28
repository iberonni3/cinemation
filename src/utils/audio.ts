'use client';

class AudioManager {
    private ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private shutterBuffer: AudioBuffer | null = null;

    constructor() { }

    private async loadBuffer(url: string): Promise<AudioBuffer | null> {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            return await this.ctx!.decodeAudioData(arrayBuffer);
        } catch (e) {
            console.error('Failed to load audio buffer:', url, e);
            return null;
        }
    }

    private init() {
        if (this.ctx) return;
        if (typeof window === 'undefined') return;

        try {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(0.4, this.ctx.currentTime); // Global volume ceiling
            this.masterGain.connect(this.ctx.destination);

            // Pre-load external assets
            this.loadBuffer('/audio/shutter.mp3').then(buf => this.shutterBuffer = buf);
        } catch (e) {
            console.warn('AudioContext not supported', e);
        }
    }

    private resume() {
        if (this.ctx?.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // A subtle mechanical click/pop
    playClick() {
        this.init();
        this.resume();
        if (!this.ctx || !this.masterGain) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.04);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, this.ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.04);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.04);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
    }

    // A low-frequency hover pulse
    playHover() {
        this.init();
        this.resume();
        if (!this.ctx || !this.masterGain) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);

        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.03);
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.12);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.12);
    }

    // Cinematic sub-bass whoosh with airy noise
    playTransitionWhoosh() {
        this.init();
        this.resume();
        if (!this.ctx || !this.masterGain) return;

        const osc = this.ctx.createOscillator();
        const noise = this.ctx.createBufferSource();
        const noiseGain = this.ctx.createGain();
        const oscGain = this.ctx.createGain();
        const mainGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        // Sub sweep
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(80, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 1.0);

        // Noise for "air"
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        noise.buffer = buffer;

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, this.ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 1.0);

        oscGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
        noiseGain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.0);

        mainGain.gain.setValueAtTime(0, this.ctx.currentTime);
        mainGain.gain.linearRampToValueAtTime(1.0, this.ctx.currentTime + 0.3);
        mainGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.0);

        osc.connect(oscGain);
        noise.connect(noiseGain);
        oscGain.connect(filter);
        noiseGain.connect(filter);
        filter.connect(mainGain);
        mainGain.connect(this.masterGain);

        osc.start();
        noise.start();
        osc.stop(this.ctx.currentTime + 1.0);
        noise.stop(this.ctx.currentTime + 1.0);
    }

    // Play the high-fidelity recorded shutter sample
    playShutterClick() {
        this.init();
        this.resume();
        if (!this.ctx || !this.masterGain) return;

        // Fallback to synthesis if buffer hasn't loaded yet
        if (!this.shutterBuffer) {
            this.playShutterSynthesis();
            return;
        }

        const source = this.ctx.createBufferSource();
        source.buffer = this.shutterBuffer;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.6, this.ctx.currentTime);

        source.connect(gain);
        gain.connect(this.masterGain);

        source.start(this.ctx.currentTime);
    }

    // Fallback mechanical synthesis
    private playShutterSynthesis() {
        if (!this.ctx || !this.masterGain) return;
        const bufferSize = this.ctx.sampleRate * 0.1;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

        const playBurst = (delay: number, duration: number, freq: number, volume: number) => {
            const source = this.ctx!.createBufferSource();
            source.buffer = buffer;
            const filter = this.ctx!.createBiquadFilter();
            const gain = this.ctx!.createGain();
            filter.type = 'highpass';
            filter.frequency.setValueAtTime(freq, this.ctx!.currentTime + delay);
            gain.gain.setValueAtTime(0, this.ctx!.currentTime + delay);
            gain.gain.linearRampToValueAtTime(volume, this.ctx!.currentTime + delay + 0.005);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + delay + duration);
            source.connect(filter); filter.connect(gain); gain.connect(this.masterGain!);
            source.start(this.ctx!.currentTime + delay);
        };
        playBurst(0, 0.04, 3000, 0.15);
        playBurst(0.05, 0.06, 1500, 0.12);
    }
}

export const audioManager = new AudioManager();
