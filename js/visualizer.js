// --- Aphex Twin Website Audio Visualizer ---
// For each .music-visualizer canvas, visualize associated <audio> (Web Audio API)

function setupVisualizer(canvas, audioElem) {
  const ctx = canvas.getContext('2d');
  const WIDTH = canvas.width = canvas.offsetWidth;
  const HEIGHT = canvas.height = canvas.offsetHeight;

  let audioCtx, analyser, src;
  function initAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    src = audioCtx.createMediaElementSource(audioElem);
    src.connect(analyser);
    analyser.connect(audioCtx.destination);
  }

  function draw() {
    if (!analyser) return;
    requestAnimationFrame(draw);
    let data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    const barWidth = WIDTH / data.length;
    for (let i = 0; i < data.length; i++) {
      const val = data[i];
      ctx.fillStyle = `hsl(${180 + i * 4}, 100%, ${30 + val/3}%)`;
      ctx.fillRect(i * barWidth, HEIGHT - val * 0.7, barWidth - 2, val * 0.7);
    }
    // Cybersigil: overlay a flicker/glitch effect
    if (Math.random() > 0.8) {
      ctx.globalAlpha = 0.14;
      ctx.fillStyle = "#39ff14";
      ctx.fillRect(Math.random() * WIDTH, Math.random() * HEIGHT, 40, 6);
      ctx.globalAlpha = 1;
    }
  }

  audioElem.addEventListener('play', () => {
    initAudio();
    draw();
  });
}

// Attach visualizers on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.music-visualizer').forEach(canvas => {
    const audioSrc = canvas.dataset.audio;
    let audioElem = canvas.previousElementSibling;
    if (audioElem && audioElem.tagName.toLowerCase() !== 'audio') {
      audioElem = document.querySelector(`audio[src="${audioSrc}"]`);
    }
    if (audioElem) setupVisualizer(canvas, audioElem);
  });
});