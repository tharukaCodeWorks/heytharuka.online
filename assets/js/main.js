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

// Hex cursor — a hexagonal "lock-on" reticle that trails the real cursor
// inside the hero section and snaps to hover targets (links/buttons) like
// a targeting reticle. Decorative only: never hides the OS cursor, and is
// skipped entirely on touch devices or when reduced motion is preferred.
(function () {
  const hero = document.getElementById("top");
  const cursor = document.getElementById("hexCursor");
  if (!hero || !cursor) return;

  const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!supportsFinePointer || prefersReducedMotion) return;

  const HALF = 23; // half of .hex-cursor's 46px box, to center it on a point
  const EASE = 0.18;
  const HOVER_SCALE = 1.35;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let currentScale = 1;
  let hovering = false;
  let lockedTarget = null;
  let rafId = null;

  function updateTarget(clientX, clientY) {
    if (hovering && lockedTarget) {
      const rect = lockedTarget.getBoundingClientRect();
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 2;
    } else {
      targetX = clientX;
      targetY = clientY;
    }
  }

  function tick() {
    currentX += (targetX - currentX) * EASE;
    currentY += (targetY - currentY) * EASE;
    currentScale += ((hovering ? HOVER_SCALE : 1) - currentScale) * 0.15;
    cursor.style.transform =
      "translate3d(" + (currentX - HALF).toFixed(1) + "px, " + (currentY - HALF).toFixed(1) + "px, 0) " +
      "scale(" + currentScale.toFixed(3) + ")";
    rafId = requestAnimationFrame(tick);
  }

  hero.addEventListener("mouseenter", (e) => {
    currentX = targetX = e.clientX;
    currentY = targetY = e.clientY;
    cursor.classList.add("active");
    if (!rafId) rafId = requestAnimationFrame(tick);
  });

  hero.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
    hovering = false;
    lockedTarget = null;
    cursor.classList.remove("hovering");
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  });

  hero.addEventListener("mousemove", (e) => updateTarget(e.clientX, e.clientY));

  hero.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      hovering = true;
      lockedTarget = el;
      cursor.classList.add("hovering");
    });
    el.addEventListener("mouseleave", () => {
      hovering = false;
      lockedTarget = null;
      cursor.classList.remove("hovering");
    });
  });
})();
