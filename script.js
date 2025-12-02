// Highlight active nav link based on scroll position
const navLinks = Array.from(document.querySelectorAll("nav a"));
const sectionIds = navLinks.map(link => link.getAttribute("href")?.replace("#", "")).filter(Boolean);
const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

if (sections.length && typeof IntersectionObserver !== "undefined") {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const idx = sections.indexOf(entry.target);
      if (idx === -1) return;
      const link = navLinks[idx];
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => observer.observe(section));
}

// Toggle writing bodies open/closed
const writingToggles = document.querySelectorAll(".writing-toggle");
writingToggles.forEach(btn => {
  const piece = btn.closest(".writing-piece");
  const body = piece ? piece.querySelector(".writing-body") : null;
  if (!body) return;

  btn.addEventListener("click", () => {
    const isOpen = !body.hasAttribute("hidden");
    const nextOpen = !isOpen;

    if (nextOpen) {
      body.removeAttribute("hidden");
      piece.classList.add("open");
    } else {
      body.setAttribute("hidden", "");
      piece.classList.remove("open");
    }

    btn.setAttribute("aria-expanded", String(nextOpen));
    btn.textContent = nextOpen ? "Show less" : "Show more";
  });
});
