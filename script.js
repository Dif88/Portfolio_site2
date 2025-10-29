// === Animated Gradient + Particle Network ===
(() => {
  const c = document.getElementById('bgCanvas');
  const ctx = c.getContext('2d');
  let W, H, particles;
  const maxDist = 140;
  const count = 80;

  function resize() {
    W = c.width = window.innerWidth;
    H = c.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function gradientBackground() {
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, '#0f0f0f');
    g.addColorStop(1, '#1a0f0b'); // subtle warm tone
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  function init() {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: 2 + Math.random() * 2
      });
    }
  }
  init();

  function draw() {
    gradientBackground();

    // move + draw nodes
    ctx.globalCompositeOperation = 'lighter';
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(213,137,54,0.8)'; // gold
      ctx.fill();
    }

    // connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < maxDist) {
          const alpha = 1 - d / maxDist;
          ctx.strokeStyle = `rgba(164,66,0,${alpha * 0.45})`; // burnt orange
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(draw);
  }
  draw();
})();

// === Theme toggle & persistence ===
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
      html.classList.remove('dark'); themeToggle.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark'); themeToggle.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    }
  });
  window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') { html.classList.add('dark'); themeToggle.textContent = '☀️'; }
    else { html.classList.remove('dark'); themeToggle.textContent = '🌙'; }
    if (window.AOS) AOS.init({ duration: 900, once: true });
  });
}

// === Mobile menu ===
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// === Contact form spinner ===
const form = document.querySelector("form#contactForm");
const spinner = document.getElementById("loadingSpinner");
if (form && spinner) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    spinner.classList.remove("hidden");

    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.innerHTML = `
        <div class="bg-green-100 text-green-800 p-6 rounded-lg text-center">
          <h3 class="text-xl font-bold mb-2">Thanks for reaching out!</h3>
          <p>I’ll get back to you soon — stay tuned!</p>
        </div>
      `;
    } else {
      form.innerHTML = `
        <div class="bg-red-100 text-red-800 p-6 rounded-lg text-center">
          <h3 class="text-xl font-bold mb-2">Oops, something went wrong.</h3>
          <p>Please try again later or email me directly.</p>
        </div>
      `;
    }
  });
}

// === Skills filtering ===
const filterButtons = document.querySelectorAll(".filter-btn");
const skillTags = document.querySelectorAll(".skill-tag");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    skillTags.forEach(tag => {
      if (category === "all" || tag.classList.contains(category)) tag.classList.remove("hidden");
      else tag.classList.add("hidden");
    });
  });
});
