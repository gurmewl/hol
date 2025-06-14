// --- Aphex Twin Website: Secret/Easter Egg Logic ---
// More room for creative secrets, puzzles, or interactive art

window.addEventListener('DOMContentLoaded', () => {
  const secretSection = document.getElementById('secret');
  if (!secretSection) return;

  // Example: Show a glitch animation on secret discovery
  if (!secretSection.hidden) {
    // Animate secret sigil
    const sigil = secretSection.querySelector('.secret-sigil');
    if (sigil) {
      let glitchInt = setInterval(() => {
        sigil.style.filter = `hue-rotate(${Math.random()*360}deg) brightness(${1.5 + Math.random()}) drop-shadow(0 0 32px #${Math.random()>0.5?'ff35ae':'39ff14'})`;
      }, 120);
      secretSection.addEventListener('mouseleave', () => clearInterval(glitchInt));
    }

    // Play a hidden clue after audio ends
    const audio = secretSection.querySelector('audio');
    if (audio) {
      audio.addEventListener('ended', () => {
        secretSection.innerHTML += `<div class="clue">You heard it. Now check the console...</div>`;
        console.log("%cAphex Twin Secret: Try pressing Shift+T on the home screen.", "color: #39ff14; font-size: 2em; background: #111;");
      });
    }
  }
});

// Bonus: Reveal another hidden message if Shift+T is pressed on home
window.addEventListener('keydown', (e) => {
  if ((e.key === 'T' || e.key === 't') && e.shiftKey && window.location.hash === "#home") {
    alert("👁️ You discovered another layer. 'Windowlicker' plays backwards in your mind.");
  }
});