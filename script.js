/* =============================================
   BLUELINE — Main Script
   ============================================= */

// ── Scroll Reveal Observer ─────────────────────
const revealEls = document.querySelectorAll(
  '.reveal-up, .reveal-left, .reveal-right, .reveal-scale'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // animate once
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));


// ── Animated Stat Counters ────────────────────
function animateCount(el, target, suffix = '') {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const h3 = entry.target.querySelector('h3');
      const p  = entry.target.querySelector('p');
      if (!h3) return;
      const text = h3.textContent.trim();
      const num  = parseInt(text);
      const suffix = text.replace(/[0-9]/g, '');
      // Animate the number part only; keep the orange span
      const span = h3.querySelector('span');
      const spanHTML = span ? span.outerHTML : '';
      h3.innerHTML = '0' + spanHTML;
      const numNode = h3.firstChild;
      let count = 0;
      const duration = 1800;
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        numNode.textContent = Math.floor(ease * num);
        if (progress < 1) requestAnimationFrame(step);
        else numNode.textContent = num;
      };
      requestAnimationFrame(step);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.h-stat-item').forEach(el => statObserver.observe(el));


// ── Sticky Navbar Scroll Effect ───────────────
const navbar = document.querySelector('.h-navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.background = 'rgba(18,20,29,0.95)';
      navbar.style.backdropFilter = 'blur(16px)';
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
      navbar.style.padding = '18px 10%';
    } else {
      navbar.style.background = 'transparent';
      navbar.style.backdropFilter = 'none';
      navbar.style.boxShadow = 'none';
      navbar.style.padding = '30px 10%';
    }
  });
}


// ── Smooth Scroll for anchor links ────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ── Cursor Glow Effect (subtle) ───────────────
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed; pointer-events: none; z-index: 9999;
  width: 300px; height: 300px; border-radius: 50%;
  background: radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: left 0.12s ease, top 0.12s ease;
  top: -300px; left: -300px;
`;
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});


// ── Page Transition on links ──────────────────
document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && !href.startsWith('http') && href.endsWith('.html')) {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.35s ease';
      setTimeout(() => { window.location.href = href; }, 350);
    }
  });
});

// Fade in on page load
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
