// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  mobileMenu.classList.toggle('fade-in');
});

// Theme toggle with persistence
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    themeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
});

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    html.classList.add('dark');
    themeToggle.textContent = '☀️';
  } else {
    html.classList.remove('dark');
    themeToggle.textContent = '🌙';
  }
  typeWriterEffect();
  AOS.init({ duration: 900, once: true });
});

// Glowing cursor effect
const dot = document.createElement('div');
dot.classList.add('cursor-dot');
document.body.appendChild(dot);
document.addEventListener('mousemove', (e) => {
  dot.style.left = `${e.clientX}px`;
  dot.style.top = `${e.clientY}px`;
});

// Typing animation for home header
function typeWriterEffect() {
  const nameElement = document.querySelector('#home h1');
  const text = "Hi, I'm Idrissa Fofana";
  let i = 0;
  nameElement.textContent = '';
  const type = () => {
    if (i < text.length) {
      nameElement.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  };
  type();
}

// Formspree submit with spinner and feedback
const form = document.querySelector("form");
const spinner = document.getElementById("loadingSpinner");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  spinner.classList.remove("hidden");

  const formData = new FormData(form);
  const response = await fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
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

// Skills filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const skillTags = document.querySelectorAll(".skill-tag");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    skillTags.forEach(tag => {
      if (category === "all" || tag.classList.contains(category)) {
        tag.classList.remove("hidden");
      } else {
        tag.classList.add("hidden");
      }
    });
  });
});
