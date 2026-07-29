// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Nav scroll state + scroll progress
const nav = document.getElementById("nav");
const progressBar = document.getElementById("progressBar");

function onScroll() {
  nav.classList.toggle("scrolled", window.scrollY > 12);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
  progressBar.style.width = progress + "%";
}
document.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Active section highlight
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll("[data-nav]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);
sections.forEach((s) => sectionObserver.observe(s));

// Reveal on scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = Math.min(i % 6, 5) * 60 + "ms";
  revealObserver.observe(el);
});
