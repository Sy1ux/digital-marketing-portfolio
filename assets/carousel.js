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
    campaigns: [
      { src: 'assets/screenshots/tiktok-gmv-max-overview.jpeg', alt: 'TikTok Ads GMV Max campaign overview', title: 'Ad Campaigns — TikTok (Asian market)' },
      { src: 'assets/screenshots/tiktok-campaign-analytics.jpeg', alt: 'TikTok Ads campaign analytics', title: 'Ad Campaigns — TikTok (Asian market)' },
      { src: 'assets/screenshots/tiktok-cost-sku-orders.jpeg', alt: 'TikTok Ads cost and SKU orders performance', title: 'Ad Campaigns — TikTok (Asian market)' },
      { src: 'assets/screenshots/ad-campaign-performance.jpeg', alt: 'Meta Ads performance dashboard', title: 'Ad Campaigns — Meta' },
      { src: 'assets/screenshots/meta-campaign-ctr-1.jpeg', alt: 'Meta Ads campaign report with CTR and retention metrics', title: 'Ad Campaigns — Meta (CTR & retention)' },
      { src: 'assets/screenshots/meta-campaign-ctr-2.jpeg', alt: 'Meta Ads campaign report with CTR and retention metrics', title: 'Ad Campaigns — Meta (CTR & retention)' }
    ],
    content: [
      { src: 'assets/screenshots/tiktok-shop-storefront.jpeg', alt: 'TikTok Shop storefront listing', title: 'Content Generation — TikTok Shop (Asian market)' },
      { src: 'assets/screenshots/thericy-product-page.jpg', alt: 'Product page design', title: 'Content Generation — Product page design' },
      { src: 'assets/screenshots/zalvori-render.png', alt: 'Website homepage design', title: 'Content Generation — Website homepage design' },
      { type: 'video', src: 'assets/videos/tiktok-ad-creative.mp4', title: 'Content Generation — TikTok ad creative (Asian market)' }
    ],
    revenue: [
      { src: 'assets/screenshots/shopify-monthly-overview.jpeg', alt: 'Shopify monthly sales overview: 179.33K euro sales, 4.33K orders', title: 'Revenue — Monthly overview (179.33K € / 4.33K orders)' },
      { src: 'assets/screenshots/shopify-daily-bars-month.jpeg', alt: 'Shopify sales by day of month: 208.14K euro, 5.09K orders', title: 'Revenue — Daily sales pattern, full month (208.14K €)' },
      { src: 'assets/screenshots/shopify-daily-bars-today-1.jpeg', alt: 'Shopify hourly sales bar chart: 5.17K euro today', title: 'Revenue — Daily sales pattern, today (5.17K €)' },
      { src: 'assets/screenshots/shopify-daily-bars-today-2.jpeg', alt: 'Shopify hourly sales bar chart: 8.28K euro today', title: 'Revenue — Daily sales pattern, today (8.28K €)' },
      { src: 'assets/screenshots/shopify-daily-bars-yesterday.jpeg', alt: 'Shopify hourly sales bar chart: 6.52K euro yesterday', title: 'Revenue — Daily sales pattern, yesterday (6.52K €)' },
      { src: 'assets/screenshots/shopify-multi-store-revenue.jpeg', alt: 'Shopify multi-store revenue widgets', title: 'Revenue — Multi-store snapshot' },
      { src: 'assets/screenshots/tiktok-shop-overview.jpeg', alt: 'TikTok Shop seller dashboard GMV overview', title: 'Revenue — TikTok Shop GMV overview (Asian market)' }
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
  initPortfolioLightbox();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSite);
} else {
  initSite();
}
