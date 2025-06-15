// --- Aphex Twin Website Main JS ---
// SPA Navigation, section reveals, basic smooth scroll, and header effects

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.length > 1 && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Optionally update URL hash
      history.pushState(null, '', href);
    }
  });
});

// SPA-like: Hide all sections except the active one (if you want true SPA, enhance here)
function showSectionFromHash() {
  const hash = window.location.hash || "#home";
  document.querySelectorAll('main section').forEach(sec => {
    sec.hidden = true;
  });
  const active = document.querySelector(hash);
  if (active) active.hidden = false;
  // Special: always show hero if on #home
  if (hash === "#home") document.querySelector('.hero-block').hidden = false;
}
window.addEventListener('hashchange', showSectionFromHash);
window.addEventListener('DOMContentLoaded', () => {
  showSectionFromHash();
  // Reveal hero by default
  document.querySelector('.hero-block').hidden = false;
});

// Easter egg: Press "A", "P", "H" in sequence to reveal secret
let secretSeq = [];
const secretCode = ['a', 'p', 'h'];
window.addEventListener('keydown', e => {
  secretSeq.push(e.key.toLowerCase());
  if (secretSeq.slice(-3).join('') === secretCode.join('')) {
    window.location.hash = "#secret";
    setTimeout(() => {
      secretSeq = [];
    }, 500);
  }
  // Reset if too long
  if (secretSeq.length > 6) secretSeq = [];
});

// Optional: add floating header shadow on scroll
window.addEventListener('scroll', () => {
  const header = document.getElementById('site-header');
  if (window.scrollY > 32) {
    header.style.boxShadow = "0 8px 32px 0 var(--accent)";
  } else {
    header.style.boxShadow = "var(--big-shadow)";
  }
});

// Accessible: allow tabbing to secret link (hidden visually)
document.querySelectorAll('.secret-link').forEach(link => {
  link.addEventListener('focus', () => {
    window.location.hash = "#secret";
  });
});

// Animate scroll-hint arrow
document.querySelectorAll('.scroll-hint svg').forEach(svg => {
  svg.addEventListener('mouseenter', () => {
    svg.style.transform = "scale(1.3)";
  });
  svg.addEventListener('mouseleave', () => {
    svg.style.transform = "";
  });
});