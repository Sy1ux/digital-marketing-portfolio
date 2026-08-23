(function () {
  const carousel = document.getElementById('evidence-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  const dotsWrap = carousel.querySelector('.carousel-dots');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  let index = 0;
  let autoplayTimer = null;
  const AUTOPLAY_MS = 4500;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
    dots.forEach((d, di) => d.classList.toggle('active', di === index));
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(next, AUTOPLAY_MS);
  }
  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  nextBtn.addEventListener('click', () => { next(); startAutoplay(); });
  prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    if (!img) return;
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      stopAutoplay();
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
    startAutoplay();
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });

  goTo(0);
  startAutoplay();
})();
