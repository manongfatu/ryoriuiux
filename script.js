(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const list = document.getElementById("nav-list");

  // Mobile nav toggle
  if (toggle && list) {
    toggle.addEventListener("click", () => {
      const isOpen = list.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Sticky header elevation
  let lastY = 0;
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY || window.pageYOffset;
      const shouldStick = y > 10 && y >= lastY;
      header.classList.toggle("is-stuck", shouldStick);
      lastY = y;
    },
    { passive: true }
  );

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();







