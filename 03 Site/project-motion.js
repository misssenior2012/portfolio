document.documentElement.classList.add('motion-enabled');
const stackGallery = document.querySelector(".stack-gallery");
const stackedCards = stackGallery ? Array.from(stackGallery.querySelectorAll(".visual")) : [];
const revealItems = document.querySelectorAll("[data-reveal]:not(.stack-gallery [data-reveal])");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
revealItems.forEach((item) => revealObserver.observe(item));


const updateStackedGallery = () => {
  if (!stackGallery || window.innerWidth <= 1024) return;
  const copy = document.querySelector(".case-copy");
  if (!copy) return;
  const start = copy.offsetTop - window.innerHeight * 0.35;
  const end = copy.offsetTop + copy.offsetHeight - window.innerHeight * 0.45;
  const progress = Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, end - start)));
  const activeCard = Math.min(stackedCards.length - 1, Math.floor(progress * stackedCards.length));
  stackedCards.forEach((card, index) => card.classList.toggle("is-visible", index <= activeCard));
};
window.addEventListener("scroll", updateStackedGallery, { passive: true });
window.addEventListener("resize", updateStackedGallery);
updateStackedGallery();
