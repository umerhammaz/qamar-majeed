export function play(name) {
  try {
    const audio = new Audio(new URL(`assets/audio/${name}.mp3`, document.baseURI).href);
    audio.volume = 0.5;
    audio.play().catch(() => {});
  } catch {}
}