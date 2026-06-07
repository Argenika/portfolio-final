
document.addEventListener('DOMContentLoaded', () => {

  // ── LOADER BAR ──
  const loaderFill = document.getElementById('loader-fill');
  if (loaderFill) requestAnimationFrame(() => { loaderFill.style.width = '100%'; });

  // ── NAVBAR ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // ── CURSOR suave ──
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let fx = mx, fy = my;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  (function animFollower() {
    fx += (mx - fx) * 0.13;
    fy += (my - fy) * 0.13;
    if (follower) {
      follower.style.left = fx + 'px';
      follower.style.top = fy + 'px';
    }
    requestAnimationFrame(animFollower);
  })();

  // ── HAMBURGER ──
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  hamburger?.addEventListener('click', () => navMenu.classList.toggle('open'));
  navMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navMenu.classList.remove('open'));
  });

  // ── IDIOMA ──
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('[data-es][data-en]').forEach(el => {
        el.textContent = el.dataset[lang] || el.textContent;
      });
      document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
        if (lang === 'en') {
          if (el.name === 'nombre') el.placeholder = 'Your name';
          if (el.name === 'email') el.placeholder = 'you@email.com';
          if (el.name === 'mensaje') el.placeholder = 'Tell me how I can help you...';
        } else {
          if (el.name === 'nombre') el.placeholder = 'Tu nombre';
          if (el.name === 'email') el.placeholder = 'tu@email.com';
          if (el.name === 'mensaje') el.placeholder = 'Cuéntame en qué puedo ayudarte...';
        }
      });
      document.documentElement.setAttribute('data-lang', lang);
    });
  });

  // ── SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    });
  });

  // ── REVEALS: marcar como .animate y luego activar con .visible ──
  // IMPORTANTE: primero añadir .animate (oculto), luego observer pone .visible (visible)
  const revealEls = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-proj'
  );

  revealEls.forEach(el => el.classList.add('animate'));

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => el.classList.add('visible'), delay);
      revealObs.unobserve(el);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  revealEls.forEach(el => revealObs.observe(el));

  // ── CONTADOR STATS ──
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const item = entry.target;
      const target = parseInt(item.dataset.count || 0);
      const numEl = item.querySelector('.count-num');
      if (!numEl) return;
      countObs.unobserve(item);

      const duration = 1600;
      const t0 = performance.now();
      (function tick(now) {
        const p = Math.min((now - t0) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        numEl.textContent = Math.round(ease * target);
        if (p < 1) requestAnimationFrame(tick);
        else numEl.textContent = target;
      })(performance.now());
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-item[data-count]').forEach(el => countObs.observe(el));

  // ── BARRAS SOFT SKILLS ──
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.soft-fill').forEach((fill, i) => {
        setTimeout(() => fill.classList.add('animated'), i * 130);
      });
      barObs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.soft-skills-card').forEach(el => barObs.observe(el));

  // ── FORMULARIO ──
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.f-btn, .f-submit');
    const lang = document.documentElement.getAttribute('data-lang') || 'es';
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/mojzeobn', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        btn.textContent = lang === 'en' ? '✓ Message sent!' : '✓ ¡Mensaje enviado!';
        btn.style.background = '#16A34A';
        btn.style.borderColor = '#16A34A';
        btn.style.color = '#fff';
        form.reset();
        setTimeout(() => {
          btn.textContent = lang === 'en' ? 'Send message →' : 'Enviar mensaje →';
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 3200);
      }
    } catch (err) {
      console.error(err);
    }
  });

  // ── LOADER HIDE ──
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) setTimeout(() => loader.classList.add('hidden'), 1300);
  });

  // ── PROYECTO HOVER PANEL ──
  const panel = document.createElement('div');
  panel.className = 'proj-hover-panel';
  panel.innerHTML = `
  <div class="proj-hover-panel-inner">
    <div class="proj-hover-bg"></div>
    <div class="proj-hover-num"></div>
    <div class="proj-hover-emoji"></div>
    <div class="proj-hover-name"></div>
    <div class="proj-hover-type"></div>
  </div>`;
  document.body.appendChild(panel);

  const projects = [
    { num: '01', name: 'OrbitSpace', type: 'React · FastAPI · MySQL', bg: 'url("img/orbit.png") center/cover no-repeat' },
    { num: '02', name: 'Adelia Backend', type: 'PHP · MySQL · WordPress', bg: 'rgba(60,30,20,.95)' },
    { num: '03', name: 'Scraper de Ferias', type: 'Python · Selenium', bg: 'rgba(20,50,30,.95)' },
    { num: '04', name: 'Earth Risk Dashboard', type: 'FastAPI · SQLite · Leaflet', bg: 'url("img/risk.png") center/cover no-repeat' },
    { num: '05', name: 'Pulse Monitoring', type: 'FastAPI · SQLite · Chart.js', bg: 'rgba(20,10,50,.95)' },
  ];

  let panelX = 0, panelY = 0, targetX = 0, targetY = 0;
  let rafPanel;

  document.querySelectorAll('.proj-item').forEach((item, i) => {
    const p = projects[i];
    if (!p) return;

    item.addEventListener('mouseenter', () => {
      panel.querySelector('.proj-hover-bg').style.background = p.bg;
      panel.querySelector('.proj-hover-num').textContent = p.num;
      panel.querySelector('.proj-hover-emoji').textContent = p.emoji;
      panel.querySelector('.proj-hover-name').textContent = p.name;
      panel.querySelector('.proj-hover-type').textContent = p.type;
      panel.classList.add('visible');
    });

    item.addEventListener('mouseleave', () => {
      panel.classList.remove('visible');
    });
  });

  document.addEventListener('mousemove', e => {
    targetX = e.clientX + 24;
    targetY = e.clientY + 24;
    if (!rafPanel) {
      (function move() {
        panelX += (targetX - panelX) * 0.12;
        panelY += (targetY - panelY) * 0.12;
        panel.style.left = panelX + 'px';
        panel.style.top = panelY + 'px';
        rafPanel = requestAnimationFrame(move);
      })();
    }
  });

  // ── GITHUB BUTTONS ──
  document.querySelectorAll('.proj-item-gh').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      window.open(btn.dataset.gh, '_blank');
    });
  });


});


