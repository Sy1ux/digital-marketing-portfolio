function initCarousel(carousel, options) {
  options = options || {};
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  const dotsWrap = carousel.querySelector('.carousel-dots');
  const lightbox = options.enableZoom ? document.getElementById('lightbox') : null;
  const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-img') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  let index = 0;
  let autoplayTimer = null;
  const AUTOPLAY_MS = options.autoplayMs || 4500;

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

  if (options.enableZoom && lightbox) {
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
  }

  goTo(0);
  startAutoplay();
}

(function () {
  const evidenceCarousel = document.getElementById('evidence-carousel');
  if (evidenceCarousel) initCarousel(evidenceCarousel, { enableZoom: true });
})();

(function () {
  const lightbox = document.getElementById('portfolio-lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-arrow.prev');
  const nextBtn = lightbox.querySelector('.lightbox-arrow.next');
  const captionEl = lightbox.querySelector('.lightbox-caption');

  const images = [
    { src: 'assets/screenshots/ad-campaign-performance.jpeg', alt: 'Meta Ads performance dashboard', title: 'Meta Ads' },
    { src: 'assets/screenshots/zalvori-render.png', alt: 'Website homepage design', title: 'Website Branding/UI-UX' },
    { src: 'assets/screenshots/thericy-product-page.jpg', alt: 'Product page design', title: 'Website Branding/UI-UX' }
  ];

  let currentIndex = 0;

  function show(i) {
    currentIndex = (i + images.length) % images.length;
    const item = images[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    captionEl.textContent = item.title;
  }

  function open(i) {
    show(i);
    lightbox.classList.add('open');
  }

  function close() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
  }

  document.querySelectorAll('.portfolio-tile-frame img[data-gallery-index]').forEach((img) => {
    img.addEventListener('click', () => open(parseInt(img.dataset.galleryIndex, 10)));
  });

  prevBtn.addEventListener('click', () => show(currentIndex - 1));
  nextBtn.addEventListener('click', () => show(currentIndex + 1));
  lightboxClose.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(currentIndex - 1);
    if (e.key === 'ArrowRight') show(currentIndex + 1);
  });
})();
