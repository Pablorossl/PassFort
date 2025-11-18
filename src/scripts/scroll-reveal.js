// Scroll Reveal Script
// Adds 'visible' class to .reveal elements when they enter viewport

const revealOptions = {
  root: null,
  rootMargin: '0px 0px -5% 0px',
  threshold: 0.15
};

function handleIntersect(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(handleIntersect, revealOptions);
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
