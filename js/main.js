/* ============================================================
   SOLANO AI — MAIN JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAV SCROLL BEHAVIOR ----
  const nav = document.querySelector('nav');
  const handleNavScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ---- MOBILE MENU ----
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ---- ACTIVE NAV LINK ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ---- SCROLL REVEAL (Intersection Observer) ----
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewport) {
      // Already visible on load — reveal immediately, no stagger delay
      el.style.transitionDelay = '0ms';
      requestAnimationFrame(() => el.classList.add('revealed'));
    } else {
      revealObserver.observe(el);
    }
  });

  // ---- COUNTER ANIMATION ----
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  function animateCounter(el) {
    const target  = parseFloat(el.dataset.count);
    const suffix  = el.dataset.suffix || '';
    const prefix  = el.dataset.prefix || '';
    const decimals= el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration= 1800;
    const start   = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = eased * target;
      el.textContent = prefix + current.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = prefix + target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(update);
  }

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  // ---- TYPING / WORD CYCLE EFFECT ----
  const cycleEl = document.querySelector('.word-cycle');
  if (cycleEl) {
    const words  = JSON.parse(cycleEl.dataset.words || '[]');
    let   idx    = 0;
    let   charIdx= 0;
    let   deleting = false;

    function type() {
      const word = words[idx];
      if (!deleting) {
        cycleEl.textContent = word.slice(0, ++charIdx);
        if (charIdx === word.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
        setTimeout(type, 70);
      } else {
        cycleEl.textContent = word.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting = false;
          idx = (idx + 1) % words.length;
          setTimeout(type, 300);
          return;
        }
        setTimeout(type, 35);
      }
    }
    if (words.length) setTimeout(type, 800);
  }

  // ---- CARD 3D TILT ----
  document.querySelectorAll('.tilt-card').forEach(card => {
    const INTENSITY = 8;
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(800px) rotateY(${dx * INTENSITY}deg) rotateX(${-dy * INTENSITY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ---- ACCORDION / FAQ ----
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ---- TABS ----
  document.querySelectorAll('.tab-nav').forEach(nav => {
    const btns   = nav.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.tab;
        panels.forEach(p => {
          p.classList.toggle('active', p.dataset.panel === target);
        });
      });
    });
  });

  // ---- MULTI-STEP FORM ----
  const form = document.querySelector('.multi-step-form');
  if (form) {
    let step = 1;
    const totalSteps = form.querySelectorAll('.form-step').length;

    function updateUI() {
      // Update steps visibility
      form.querySelectorAll('.form-step').forEach((s, i) => {
        s.classList.toggle('active', i + 1 === step);
      });
      // Update progress bar
      form.querySelectorAll('.progress-step').forEach((ps, i) => {
        ps.classList.remove('active', 'done');
        if (i + 1 === step) ps.classList.add('active');
        if (i + 1 < step)  ps.classList.add('done');
      });
      // Lines
      form.querySelectorAll('.ps-line').forEach((line, i) => {
        line.style.background = i + 1 < step ? 'var(--blue)' : 'var(--border-md)';
      });
      // Buttons
      const prevBtn = form.querySelector('.btn-prev');
      const nextBtn = form.querySelector('.btn-next');
      const submitBtn = form.querySelector('.btn-submit');
      if (prevBtn) prevBtn.style.visibility = step === 1 ? 'hidden' : 'visible';
      if (nextBtn) nextBtn.style.display    = step < totalSteps ? 'inline-flex' : 'none';
      if (submitBtn) submitBtn.style.display= step === totalSteps ? 'inline-flex' : 'none';
    }

    form.querySelector('.btn-next')?.addEventListener('click', () => {
      if (step < totalSteps) { step++; updateUI(); window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' }); }
    });
    form.querySelector('.btn-prev')?.addEventListener('click', () => {
      if (step > 1) { step--; updateUI(); }
    });
    form.querySelector('.btn-submit')?.addEventListener('click', (e) => {
      e.preventDefault();
      const btn = e.currentTarget;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        form.innerHTML = `
          <div style="text-align:center;padding:3rem 1rem">
            <div style="width:64px;height:64px;border-radius:50%;background:var(--blue-lt);border:2px solid var(--blue);display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M5 14l7 7L23 7" stroke="#5b8def" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <h3 style="color:var(--text);margin-bottom:.5rem">You're on the list.</h3>
            <p style="max-width:340px;margin:0 auto">We'll reach out within 4 business hours to confirm your consultation. Talk soon.</p>
          </div>`;
      }, 1200);
    });

    updateUI();
  }

  // ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- PARALLAX HERO BLOBS ----
  const blobs = document.querySelectorAll('.hero-blob');
  if (blobs.length) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      blobs.forEach((blob, i) => {
        const speed = i % 2 === 0 ? 0.12 : 0.08;
        blob.style.transform = `translateY(${y * speed}px)`;
      });
    }, { passive: true });
  }

});
