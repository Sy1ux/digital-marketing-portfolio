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

function initPortfolioLightbox() {
  const lightbox = document.getElementById('portfolio-lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxVideo = lightbox.querySelector('.lightbox-video');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-arrow.prev');
  const nextBtn = lightbox.querySelector('.lightbox-arrow.next');
  const captionEl = lightbox.querySelector('.lightbox-caption');

  // Each tile has its own independent gallery — arrows never cross between tiles.
  const galleries = {
    tiktok: [
      { src: 'assets/screenshots/tiktok-gmv-max-overview.jpeg', alt: 'TikTok Ads GMV Max campaign overview', title: 'TikTok Ads' },
      { src: 'assets/screenshots/tiktok-shop-overview.jpeg', alt: 'TikTok Shop seller dashboard overview', title: 'TikTok Ads' },
      { src: 'assets/screenshots/tiktok-shop-storefront.jpeg', alt: 'TikTok Shop storefront listing', title: 'TikTok Ads' },
      { src: 'assets/screenshots/tiktok-campaign-analytics.jpeg', alt: 'TikTok Ads campaign analytics', title: 'TikTok Ads' },
      { src: 'assets/screenshots/tiktok-cost-sku-orders.jpeg', alt: 'TikTok Ads cost and SKU orders performance', title: 'TikTok Ads' },
      { type: 'video', src: 'assets/videos/tiktok-ad-creative.mp4', title: 'TikTok Ads' }
    ],
    meta: [
      { src: 'assets/screenshots/ad-campaign-performance.jpeg', alt: 'Meta Ads performance dashboard', title: 'Meta Ads' }
    ],
    website: [
      { src: 'assets/screenshots/zalvori-render.png', alt: 'Website homepage design', title: 'Website Branding/UI-UX' },
      { src: 'assets/screenshots/thericy-product-page.jpg', alt: 'Product page design', title: 'Website Branding/UI-UX' }
    ]
  };

  let currentTile = null;
  let currentIndex = 0;

  function show(i) {
    const items = galleries[currentTile];
    currentIndex = (i + items.length) % items.length;
    const item = items[currentIndex];
    if (item.type === 'video') {
      lightboxVideo.src = item.src;
      lightboxVideo.style.display = 'block';
      lightboxImg.style.display = 'none';
      lightboxImg.src = '';
    } else {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt;
      lightboxImg.style.display = 'block';
      lightboxVideo.style.display = 'none';
      lightboxVideo.pause();
      lightboxVideo.src = '';
    }
    captionEl.textContent = item.title;
  }

  function open(tile, i) {
    currentTile = tile;
    show(i);
    lightbox.classList.add('open');
  }

  function close() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
    lightboxVideo.pause();
    lightboxVideo.src = '';
  }

  document.querySelectorAll('.portfolio-tile-frame img[data-gallery-index]').forEach((img) => {
    img.addEventListener('click', () => open(img.dataset.tile, parseInt(img.dataset.galleryIndex, 10)));
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
}

function initSite() {
  const evidenceCarousel = document.getElementById('evidence-carousel');
  if (evidenceCarousel) initCarousel(evidenceCarousel, { enableZoom: true });
  initPortfolioLightbox();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSite);
} else {
  initSite();
}
