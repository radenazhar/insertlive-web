/* ============================================
   InsertLive V.20 — Main JavaScript
   Minimal interaction logic (carousel, nav)
   ============================================ */

/**
 * Hero Spotlight Carousel
 * Handles pagination dot clicks
 */
function initHeroCarousel() {
  const dots = document.querySelectorAll('.pagination-dots__dot');
  const badgeEl = document.querySelector('.hero__badge');
  const titleEl = document.querySelector('.hero__title');
  const excerptEl = document.querySelector('.hero__excerpt');
  const imageEl = document.querySelector('.hero__image');
  const linkEl = document.querySelector('.hero__cta');

  if (!dots.length || !titleEl) return;

  const slides = [
    {
      badge: '• !SELEB',
      title: 'Lesti Baru Saja <br> Merayakan Ulang Tahun Anaknya yang ke-9',
      excerpt: "The looks, the reunions, and the after-party moments you definitely missed from fashion's biggest evening in New",
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop',
      link: '/detail.html'
    },
    {
      badge: '• !POP',
      title: 'Konser BLACKPINK <br> Pecahkan Rekor Penonton Tahun Ini',
      excerpt: 'Ribuan penggemar memadati stadion untuk menyaksikan penampilan spektakuler dari girl group fenomenal asal Korea.',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop',
      link: '/pop.html'
    },
    {
      badge: '• !PEDIA',
      title: 'Fakta Menarik <br> Tentang Fenomena Aurora Borealis',
      excerpt: 'Penjelasan ilmiah di balik keindahan cahaya warna-warni yang menghiasi langit malam di daerah kutub utara.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
      link: '/pedia.html'
    },
    {
      badge: '• !VIRAL',
      title: 'Tingkah Lucu Kucing <br> Kembali Merajai Trending Hari Ini',
      excerpt: 'Tingkah menggemaskan seekor kucing oranye berhasil membuat jutaan netizen tertawa dan membagikan videonya.',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop',
      link: '/detail.html'
    }
  ];

  let currentSlide = 0;
  let autoPlayInterval;

  function renderSlide(index) {
    const slide = slides[index];
    
    titleEl.style.opacity = '0';
    excerptEl.style.opacity = '0';
    imageEl.style.opacity = '0';
    
    setTimeout(() => {
      badgeEl.innerHTML = slide.badge;
      titleEl.innerHTML = slide.title;
      excerptEl.innerHTML = slide.excerpt;
      imageEl.src = slide.image;
      if(linkEl) linkEl.href = slide.link;

      titleEl.style.opacity = '1';
      excerptEl.style.opacity = '1';
      imageEl.style.opacity = '1';
    }, 300);

    dots.forEach((d) => d.classList.remove('pagination-dots__dot--active'));
    dots[index].classList.add('pagination-dots__dot--active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    renderSlide(currentSlide);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  }

  titleEl.style.transition = 'opacity 0.3s ease';
  excerptEl.style.transition = 'opacity 0.3s ease';
  imageEl.style.transition = 'opacity 0.3s ease';

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      renderSlide(currentSlide);
      startAutoPlay();
    });
  });

  const heroCard = document.querySelector('.hero__card');
  if (heroCard) {
    heroCard.addEventListener('mouseenter', stopAutoPlay);
    heroCard.addEventListener('mouseleave', startAutoPlay);
  }

  startAutoPlay();
}

/**
 * Navigation Tab Active State
 * Highlights the current active tab
 */
function initNavTabs() {
  const tabs = document.querySelectorAll('.nav-bar__tab');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      const href = tab.getAttribute('href');
      if (!href || href === '#') {
        e.preventDefault();
      }
      tabs.forEach((t) => t.classList.remove('nav-bar__tab--active'));
      tab.classList.add('nav-bar__tab--active');
    });
  });
}

/**
 * Sticky Navigation
 */
function initStickyNav() {
  const nav = document.getElementById('main-nav');
  const header = document.querySelector('.site-header');
  const overlay = document.getElementById('nav-overlay');
  if (!nav || !header) return;

  const headerHeight = header.offsetHeight;

  window.addEventListener('scroll', () => {
    if (window.scrollY > headerHeight) {
      nav.classList.add('is-sticky');
    } else {
      nav.classList.remove('is-sticky');
    }
  });

  if (overlay) {
    const navItems = document.querySelectorAll('.nav-bar__item');
    navItems.forEach(item => {
      if (item.querySelector('.nav-bar__dropdown')) {
        item.addEventListener('mouseenter', () => overlay.classList.add('is-active'));
        item.addEventListener('mouseleave', () => overlay.classList.remove('is-active'));
      }
    });
  }
}

/**
 * Search Bar Toggle
 */
function initSearchBar() {
  const searchBtn = document.getElementById('search-btn');
  const searchCancel = document.getElementById('search-cancel');
  const navMenu = document.getElementById('nav-menu');
  const searchBar = document.getElementById('search-bar');
  const navLogo = document.getElementById('nav-logo');
  const searchInput = document.getElementById('search-input');

  if (!searchBtn || !searchCancel || !navMenu || !searchBar) return;

  searchBtn.addEventListener('click', () => {
    searchBtn.style.opacity = '0';
    searchBtn.style.visibility = 'hidden';
    searchBar.classList.add('is-active');
    setTimeout(() => searchInput.focus(), 100);
  });

  searchCancel.addEventListener('click', () => {
    searchBar.classList.remove('is-active');
    searchBtn.style.opacity = '1';
    searchBtn.style.visibility = 'visible';
  });
}

/**
 * Mobile Navigation Menu
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.nav-mobile-toggle');
  if (!toggleBtn) return;

  // Create menu HTML
  const menuHtml = `
  <div class="mobile-nav-sidebar" id="mobile-nav-sidebar">
    <div class="mobile-nav-sidebar__header">
      <img src="./Component icon/Insertlive Logo 1.png" alt="InsertLive Logo" class="mobile-nav-sidebar__logo">
      <button class="mobile-nav-sidebar__close" id="mobile-nav-sidebar-close" aria-label="Close menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <div class="mobile-nav-sidebar__content">
      <h3 class="mobile-nav-sidebar__title">Kanal</h3>
      <div class="mobile-nav-sidebar__grid">
        <a href="/" class="mobile-nav-sidebar__item">
          <div class="mobile-nav-sidebar__icon">
            <svg viewBox="0 0 24 24" fill="var(--color-primary)" width="28" height="28"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          </div>
          <span>Beranda</span>
        </a>
        <a href="/seleb.html" class="mobile-nav-sidebar__item">
          <div class="mobile-nav-sidebar__icon">
            <svg viewBox="0 0 24 24" fill="var(--color-primary)" width="28" height="28"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          </div>
          <span>!SELEB</span>
        </a>
        <a href="/seleb-news.html" class="mobile-nav-sidebar__item">
          <div class="mobile-nav-sidebar__icon">
            <svg viewBox="0 0 24 24" fill="var(--color-primary)" width="28" height="28"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/></svg>
          </div>
          <span>SELEB NEWS</span>
        </a>
        <a href="/film.html" class="mobile-nav-sidebar__item">
          <div class="mobile-nav-sidebar__icon">
            <svg viewBox="0 0 24 24" fill="var(--color-primary)" width="28" height="28"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>
          </div>
          <span>FILM</span>
        </a>
        <a href="/musik.html" class="mobile-nav-sidebar__item">
          <div class="mobile-nav-sidebar__icon">
            <svg viewBox="0 0 24 24" fill="var(--color-primary)" width="28" height="28"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
          </div>
          <span>MUSIK</span>
        </a>
        <a href="/pop.html" class="mobile-nav-sidebar__item">
          <div class="mobile-nav-sidebar__icon">
            <svg viewBox="0 0 24 24" fill="var(--color-primary)" width="28" height="28"><path d="M12 3c-4.97 0-9 4.03-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9z"/></svg>
          </div>
          <span>!POP</span>
        </a>
        <a href="/kpop.html" class="mobile-nav-sidebar__item">
          <div class="mobile-nav-sidebar__icon">
            <svg viewBox="0 0 24 24" fill="var(--color-primary)" width="28" height="28"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>
          </div>
          <span>KPOP</span>
        </a>
        <a href="/jpop.html" class="mobile-nav-sidebar__item">
          <div class="mobile-nav-sidebar__icon">
            <svg viewBox="0 0 24 24" fill="var(--color-primary)" width="28" height="28"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>
          </div>
          <span>JPOP</span>
        </a>
        <a href="/tpop.html" class="mobile-nav-sidebar__item">
          <div class="mobile-nav-sidebar__icon">
            <svg viewBox="0 0 24 24" fill="var(--color-primary)" width="28" height="28"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>
          </div>
          <span>TPOP</span>
        </a>
        <a href="/cpop.html" class="mobile-nav-sidebar__item">
          <div class="mobile-nav-sidebar__icon">
            <svg viewBox="0 0 24 24" fill="var(--color-primary)" width="28" height="28"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>
          </div>
          <span>CPOP</span>
        </a>
        <a href="/pedia.html" class="mobile-nav-sidebar__item">
          <div class="mobile-nav-sidebar__icon">
            <svg viewBox="0 0 24 24" fill="var(--color-primary)" width="28" height="28"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>
          </div>
          <span>!PEDIA</span>
        </a>
        <a href="/viral.html" class="mobile-nav-sidebar__item">
          <div class="mobile-nav-sidebar__icon">
            <svg viewBox="0 0 24 24" fill="var(--color-primary)" width="28" height="28"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
          </div>
          <span>VIRAL</span>
        </a>
        <a href="/travel.html" class="mobile-nav-sidebar__item">
          <div class="mobile-nav-sidebar__icon">
            <svg viewBox="0 0 24 24" fill="var(--color-primary)" width="28" height="28"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
          </div>
          <span>TRAVEL</span>
        </a>
        <a href="/food.html" class="mobile-nav-sidebar__item">
          <div class="mobile-nav-sidebar__icon">
            <svg viewBox="0 0 24 24" fill="var(--color-primary)" width="28" height="28"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>
          </div>
          <span>FOOD</span>
        </a>
        <a href="/fashion.html" class="mobile-nav-sidebar__item">
          <div class="mobile-nav-sidebar__icon">
            <svg viewBox="0 0 24 24" fill="var(--color-primary)" width="28" height="28"><path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2l-.01-12c0-1.1-.89-2-1.99-2zM12 3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z"/></svg>
          </div>
          <span>FASHION</span>
        </a>
        <a href="/beauty.html" class="mobile-nav-sidebar__item">
          <div class="mobile-nav-sidebar__icon">
            <svg viewBox="0 0 24 24" fill="var(--color-primary)" width="28" height="28"><path d="M15.54 5.54L13.77 1.2 12 5.54 7.66 7.31 12 9.08l1.77 4.34 1.77-4.34 4.34-1.77-4.34-1.77zM22 13.5l-1.38-3.38L17.24 8.74l1.38 3.38L22 13.5zm-8.46 4.96L12 14.12l-1.54 4.34-4.34 1.54 4.34 1.54L12 25.88l1.54-4.34 4.34-1.54-4.34-1.54z"/></svg>
          </div>
          <span>BEAUTY</span>
        </a>
        <a href="/watch.html" class="mobile-nav-sidebar__item">
          <div class="mobile-nav-sidebar__icon">
            <svg viewBox="0 0 24 24" fill="var(--color-primary)" width="28" height="28"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
          </div>
          <span>!WATCH</span>
        </a>
        <a href="/snap.html" class="mobile-nav-sidebar__item">
          <div class="mobile-nav-sidebar__icon">
            <svg viewBox="0 0 24 24" fill="var(--color-primary)" width="28" height="28"><path d="M14.12 4l1.83 2H20v12H4V6h4.05l1.83-2h4.24M15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2zm-3 7c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/></svg>
          </div>
          <span>SNAP!</span>
        </a>
      </div>
    </div>
  </div>
  <div class="mobile-nav-overlay" id="mobile-nav-overlay"></div>
  `;

  document.body.insertAdjacentHTML('beforeend', menuHtml);

  const sidebar = document.getElementById('mobile-nav-sidebar');
  const overlay = document.getElementById('mobile-nav-overlay');
  const closeBtn = document.getElementById('mobile-nav-sidebar-close');

  function openMenu() {
    sidebar.classList.add('is-active');
    overlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    sidebar.classList.remove('is-active');
    overlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  // We might have multiple toggle buttons if there are multiple mobile headers
  const toggleBtns = document.querySelectorAll('.nav-mobile-toggle');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openMenu();
    });
  });
  
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
}

function initSnapModal() {
  const cards = document.querySelectorAll('.snap-card');
  const modal = document.getElementById('snap-modal');
  const closeBtn = document.getElementById('snap-modal-back');
  const overlayBg = document.getElementById('snap-modal-close-bg');
  const slider = document.getElementById('snap-modal-slider');
  const btnPrev = document.getElementById('snap-nav-prev');
  const btnNext = document.getElementById('snap-nav-next');

  if (!modal || cards.length === 0) return;

  function openModal(e) {
    e.preventDefault();
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  cards.forEach(card => {
    card.addEventListener('click', openModal);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlayBg) overlayBg.addEventListener('click', closeModal);
  
  if (btnPrev && slider) {
    btnPrev.addEventListener('click', () => {
      slider.scrollBy({ top: -slider.clientHeight, behavior: 'smooth' });
    });
  }
  
  if (btnNext && slider) {
    btnNext.addEventListener('click', () => {
      slider.scrollBy({ top: slider.clientHeight, behavior: 'smooth' });
    });
  }
}

/**
 * Landing Page Empty State Controller & Dev Switcher
 * Handles switching between Normal Landing Page & Animated Empty State
 */
function initLandingEmptyState() {
  const normalContent = document.getElementById('landing-main-content');
  const emptyState = document.getElementById('landing-empty-state');
  const devBtnNormal = document.getElementById('dev-btn-normal');
  const devBtnEmpty = document.getElementById('dev-btn-empty');
  const btnRefresh = document.getElementById('btn-empty-refresh');
  const btnReset = document.getElementById('btn-empty-reset');
  const headingEl = document.getElementById('empty-state-heading');
  const descEl = document.getElementById('empty-state-description');
  const searchInput = document.getElementById('search-input');
  const searchBar = document.getElementById('search-bar');
  const searchSubmit = document.querySelector('.search-bar__submit');
  const suggestionChips = document.querySelectorAll('.empty-state__chip');

  if (!normalContent || !emptyState) return;

  const defaultHeading = '<em>Under development</em>';

  function setMode(mode, keyword = null) {
    if (mode === 'empty') {
      normalContent.style.display = 'none';
      emptyState.style.display = 'block';

      if (keyword && keyword.trim().length > 0) {
        if (headingEl) {
          headingEl.innerHTML = `<em>Under development</em> <span class="empty-state__keyword" style="display:block; font-size:16px; margin-top:6px; font-style:normal; font-weight:600;">("${escapeHtml(keyword)}")</span>`;
        }
      } else {
        if (headingEl) headingEl.innerHTML = defaultHeading;
      }

      if (devBtnNormal) devBtnNormal.classList.remove('dev-state-btn--active');
      if (devBtnEmpty) devBtnEmpty.classList.add('dev-state-btn--active');

      emptyState.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      emptyState.style.display = 'none';
      normalContent.style.display = 'block';

      if (headingEl) headingEl.innerHTML = defaultHeading;

      if (devBtnEmpty) devBtnEmpty.classList.remove('dev-state-btn--active');
      if (devBtnNormal) devBtnNormal.classList.add('dev-state-btn--active');
    }
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // Dev Switcher Clicks
  if (devBtnNormal) {
    devBtnNormal.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      setMode('normal');
    });
  }

  if (devBtnEmpty) {
    devBtnEmpty.addEventListener('click', () => {
      setMode('empty');
    });
  }

  // Action Buttons
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (searchBar) searchBar.classList.remove('is-active');
      const searchBtn = document.getElementById('search-btn');
      if (searchBtn) {
        searchBtn.style.opacity = '1';
        searchBtn.style.visibility = 'visible';
      }
      setMode('normal');
    });
  }

  if (btnRefresh) {
    btnRefresh.addEventListener('click', () => {
      btnRefresh.classList.add('is-spinning');
      const refreshText = btnRefresh.querySelector('span');
      const originalText = refreshText ? refreshText.textContent : '';
      if (refreshText) refreshText.textContent = 'Menyegarkan...';

      setTimeout(() => {
        btnRefresh.classList.remove('is-spinning');
        if (refreshText) refreshText.textContent = originalText;

        emptyState.style.animation = 'none';
        void emptyState.offsetWidth;
        emptyState.style.animation = 'emptyFadeIn 0.4s ease-out forwards';
      }, 700);
    });
  }

  // Suggestion Chips
  suggestionChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const topic = chip.getAttribute('data-topic') || chip.textContent.trim();
      if (searchInput) {
        searchInput.value = topic;
        if (searchBar) searchBar.classList.add('is-active');
        const searchBtn = document.getElementById('search-btn');
        if (searchBtn) {
          searchBtn.style.opacity = '0';
          searchBtn.style.visibility = 'hidden';
        }
      }
      setMode('empty', topic);
    });
  });

  // Search input triggering empty state simulation
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const val = searchInput.value.trim();
        if (val) {
          setMode('empty', val);
        } else {
          setMode('normal');
        }
      }
    });
  }

  if (searchSubmit) {
    searchSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      const val = searchInput ? searchInput.value.trim() : '';
      if (val) {
        setMode('empty', val);
      }
    });
  }

  const searchCancel = document.getElementById('search-cancel');
  if (searchCancel) {
    searchCancel.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (devBtnEmpty && devBtnEmpty.classList.contains('dev-state-btn--active')) {
        setMode('normal');
      }
    });
  }
}

/* ── Initialize ──────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHeroCarousel();
  initNavTabs();
  initStickyNav();
  initSearchBar();
  initMobileMenu();
  initSnapModal();
  initLandingEmptyState();
});

