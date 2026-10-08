// Page-flip sound. Browsers only allow audio after a user gesture, so the
// AudioContext is created in unlockAudio(), which runs on the first click/key.
//
// Drop a short recorded paper-flip sound at public/sounds/page-flip.mp3
// (Pixabay / Freesound). Until that file exists, a synthesized rustle is used.

const SOUND_URL = '/sounds/page-flip.mp3'

let ctx: AudioContext | null = null
let recorded: AudioBuffer | null = null
let loading = false

export function unlockAudio() {
  if (!ctx) {
    try {
      ctx = new AudioContext()
    } catch {
      return
    }
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  if (!recorded && !loading) {
    loading = true
    const ac = ctx
    fetch(SOUND_URL)
      .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error('no sound file'))))
      .then((data) => ac.decodeAudioData(data))
      .then((buffer) => {
        recorded = buffer
      })
      .catch(() => {
        // No recorded file yet (the dev server answers with index.html): keep the synth.
      })
  }
}

export function playFlip() {
  if (!ctx || ctx.state !== 'running') return
  try {
    const gain = ctx.createGain()
    gain.connect(ctx.destination)
    const src = ctx.createBufferSource()
    if (recorded) {
      src.buffer = recorded
      gain.gain.value = 0.7
      src.connect(gain)
    } else {
      src.buffer = rustle(ctx)
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(2500, ctx.currentTime)
      filter.frequency.linearRampToValueAtTime(5500, ctx.currentTime + 0.45)
      filter.Q.value = 0.7
      gain.gain.value = 0.3
      src.connect(filter).connect(gain)
    }
    src.start()
  } catch {
    // Audio is decoration; never break the page over it.
  }
}

function rustle(ac: AudioContext) {
  const duration = 0.45
  const n = Math.floor(ac.sampleRate * duration)
  const buffer = ac.createBuffer(1, n, ac.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < n; i++) {
    const t = i / n
    data[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * t) ** 2 * (0.6 + 0.4 * Math.random())
  }
  return buffer
}
