/* ===========================================================
   LEONES F.C. — Motor del sitio (multipágina + base de datos)
   Toda la información vive en data/db.json
   =========================================================== */
(function () {
  "use strict";

  /* ---------- ICONOS ---------- */
  const I = {
    shield:'<path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z"/>',
    heart:'<path d="M19 14c1.5-1.6 2-3 2-4.5C21 6.5 19 5 17 5c-1.5 0-2.7.8-3.5 2-.8-1.2-2-2-3.5-2C8 5 6 6.5 6 9.5 6 11 6.5 12.4 8 14l4 4z"/>',
    users:'<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5"/><path d="M16 6a3 3 0 0 1 0 6"/><path d="M21 20c0-2.2-1.3-3.9-3.5-4.6"/>',
    target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
    star:'<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.8 1-5.8L3.5 9.2l5.9-.9z"/>',
    smile:'<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9" y2="9"/><line x1="15" y1="9" x2="15" y2="9"/>',
    handshake:'<path d="M8 12l3 3 2-2 3 3"/><path d="M3 10l4-3 5 4 5-4 4 3"/><path d="M3 10v5l5 4 4-3"/>',
    trophy:'<path d="M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M7 6H4v1a3 3 0 0 0 3 3"/><path d="M17 6h3v1a3 3 0 0 1-3 3"/><path d="M9 14h6l-1 4h-4z"/><path d="M8 21h8"/>',
    arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    pin:'<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    wallet:'<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><circle cx="17" cy="14" r="1.3" fill="currentColor"/>',
    cart:'<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M3 4h2l2.2 11h10l2-7H6"/>',
    jersey:'<path d="M8 3l4 2 4-2 5 3-2.5 4L17 11v9H7v-9l-1.5.9L3 6z"/>',
    hoodie:'<path d="M7 5l5 3 5-3 4 4-3 3v9H6v-9L3 9z"/><path d="M10 8a2 2 0 0 0 4 0"/>',
    ball:'<circle cx="12" cy="12" r="9"/><path d="M12 7l3.2 2.3-1.2 3.7h-4l-1.2-3.7z"/><path d="M9 13l-2.5 2M15 13l2.5 2M12 16v3"/>',
    cap:'<path d="M4 15a8 8 0 0 1 16 0z"/><path d="M12 7a8 8 0 0 1 8 8h2"/>',
    bottle:'<path d="M10 2h4v3l1 2v13a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V7l1-2z"/><path d="M9 11h6"/>',
    key:'<circle cx="8" cy="8" r="4"/><path d="M11 11l9 9M17 17l2-2M15 19l2-2"/>',
    bell:'<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>',
    news:'<path d="M4 4h16v16H4zM4 9h16M9 9v11"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v0"/>',
    wa:'<path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.512 5.26l-.999 3.648 3.736-.979zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>',
    ig:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>',
    fb:'<path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.43c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.23h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'
  };
  const icoStroke = (n) => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (I[n] || I.shield) + '</svg>';
  const icoFill = (n) => '<svg viewBox="0 0 24 24" fill="currentColor">' + (I[n] || '') + '</svg>';

  /* ---------- ILUSTRACIONES DE PRODUCTO (tienda) ---------- */
  function crestTag(x, y, w) { return '<image href="assets/logo.png" x="' + x + '" y="' + y + '" width="' + w + '" height="' + w + '"/>'; }
  function productArt(ic, uid) {
    uid = uid || 0;
    const AD = '#10307f', R = '#e42b30', id = 'p' + uid;
    const defs = '<defs>' +
      '<radialGradient id="bg' + id + '" cx="50%" cy="34%" r="75%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dee8fb"/></radialGradient>' +
      '<linearGradient id="bl' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f7bea"/><stop offset="1" stop-color="#163aa0"/></linearGradient>' +
      '<linearGradient id="rd' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a5f"/><stop offset="1" stop-color="#c01f24"/></linearGradient>' +
      '<linearGradient id="wh' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e7edf8"/></linearGradient>' +
      '</defs>';
    const open = '<svg viewBox="0 0 200 180" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + defs +
      '<rect width="200" height="180" fill="url(#bg' + id + ')"/>';
    const close = '</svg>';
    const BL = 'url(#bl' + id + ')', RG = 'url(#rd' + id + ')', WH = 'url(#wh' + id + ')';
    const shadow = (cx, cy, rx) => '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="9" fill="rgba(10,22,51,.15)"/>';
    const jersey = (crest, cs) =>
      '<path d="M58 54 L80 34 Q100 47 120 34 L142 54 L166 72 L150 92 L134 80 V142 Q100 153 66 142 V80 L50 92 L34 72 Z" fill="' + WH + '" stroke="' + AD + '" stroke-width="2"/>' +
      '<path d="M58 54 L80 34 Q90 43 95 60 L70 72 Z" fill="' + BL + '"/>' +
      '<path d="M142 54 L120 34 Q110 43 105 60 L130 72 Z" fill="' + BL + '"/>' +
      '<path d="M80 34 Q100 47 120 34 L113 42 Q100 52 87 42 Z" fill="' + RG + '"/>' +
      '<rect x="66" y="132" width="68" height="8" fill="' + BL + '"/>' +
      (crest ? crestTag(82, 74, cs || 38) : '');
    switch (ic) {
      case 'jersey': return open + shadow(100, 150, 52) + jersey(true) + close;
      case 'kit': return open + shadow(100, 158, 60) +
        '<g transform="translate(20 -2) scale(0.66)">' + jersey(true, 40) + '</g>' +
        '<path d="M70 120 h60 l-8 46 h-19 l-3 -26 -3 26 h-19 z" fill="' + BL + '" stroke="' + AD + '" stroke-width="2"/>' +
        '<rect x="70" y="120" width="60" height="7" fill="' + RG + '"/>' + close;
      case 'hoodie': return open + shadow(100, 152, 54) +
        '<path d="M52 60 Q100 28 148 60 L172 78 L154 100 L138 86 V146 Q100 156 62 146 V86 L46 100 L28 78 Z" fill="' + BL + '" stroke="' + AD + '" stroke-width="2"/>' +
        '<path d="M76 50 Q100 72 124 50 Q124 32 100 32 Q76 32 76 50 Z" fill="' + AD + '"/>' +
        '<rect x="86" y="120" width="28" height="20" rx="3" fill="' + AD + '" opacity=".55"/>' +
        '<line x1="92" y1="64" x2="92" y2="86" stroke="#fff" stroke-width="3"/>' +
        '<line x1="108" y1="64" x2="108" y2="86" stroke="#fff" stroke-width="3"/>' +
        crestTag(82, 92, 36) + close;
      case 'ball': return open + shadow(100, 156, 46) +
        '<circle cx="100" cy="84" r="60" fill="' + WH + '" stroke="' + AD + '" stroke-width="2"/>' +
        '<path d="M100 50 l23 17 -9 28 h-28 l-9 -28 z" fill="' + BL + '"/>' +
        '<path d="M100 50 l-23 17 M77 67 l-11 22 M123 67 l11 22 M86 95 l-14 19 M114 95 l14 19" stroke="' + AD + '" stroke-width="3" fill="none"/>' +
        '<path d="M70 124 a60 60 0 0 0 18 14 M130 124 a60 60 0 0 1 -18 14" stroke="' + RG + '" stroke-width="3" fill="none"/>' +
        crestTag(133, 50, 26) + close;
      case 'cap': return open + shadow(100, 150, 56) +
        '<path d="M44 116 Q100 30 156 116 Q100 98 44 116 Z" fill="' + BL + '" stroke="' + AD + '" stroke-width="2"/>' +
        '<path d="M100 32 Q100 70 100 100" stroke="' + AD + '" stroke-width="2" opacity=".3"/>' +
        '<path d="M40 116 Q100 98 160 116 L186 132 Q100 120 40 132 Z" fill="' + RG + '"/>' +
        '<circle cx="100" cy="36" r="5" fill="' + AD + '"/>' +
        crestTag(80, 58, 40) + close;
      case 'bottle': return open + shadow(100, 156, 30) +
        '<rect x="86" y="22" width="28" height="16" rx="4" fill="' + AD + '"/>' +
        '<rect x="80" y="38" width="40" height="118" rx="18" fill="' + BL + '" stroke="' + AD + '" stroke-width="2"/>' +
        '<rect x="80" y="84" width="40" height="34" fill="' + WH + '"/>' +
        '<rect x="88" y="46" width="6" height="100" rx="3" fill="#fff" opacity=".25"/>' +
        crestTag(83, 86, 34) + close;
      case 'key': return open + shadow(100, 158, 44) +
        '<circle cx="70" cy="60" r="22" fill="none" stroke="' + AD + '" stroke-width="8"/>' +
        '<path d="M86 76 l20 20" stroke="' + AD + '" stroke-width="8" stroke-linecap="round"/>' +
        '<path d="M104 92 q-6 -8 2 -14 l40 -26 q10 -6 16 4 l8 14 q6 10 -4 16 l-40 26 q-10 6 -16 -4 z" fill="' + BL + '" stroke="' + AD + '" stroke-width="2"/>' +
        crestTag(118, 70, 44) + close;
      default: return open + shadow(100, 150, 52) + jersey(true) + close;
    }
  }

  /* ---------- NAVEGACIÓN ---------- */
  const NAV = [
    { t: 'Inicio', h: 'index.html', k: 'inicio' },
    { t: 'Club', h: 'club.html', k: 'club' },
    { t: 'Equipo', h: 'equipo.html', k: 'equipo' },
    { t: 'Calendario', h: 'calendario.html', k: 'calendario' },
    { t: 'Resultados', h: 'resultados.html', k: 'resultados' },
    { t: 'Galería', h: 'galeria.html', k: 'galeria' },
    { t: 'Tienda', h: 'tienda.html', k: 'tienda' },
    { t: 'Papás', h: 'papas.html', k: 'papas' },
    { t: 'Contacto', h: 'contacto.html', k: 'contacto' }
  ];

  const esc = (s) => (s == null ? '' : String(s));
  const stripTags = (s) => esc(s).replace(/<[^>]+>/g, '');
  const waLink = (n) => 'https://wa.me/' + esc(n).replace(/[^0-9]/g, '');

  /* ---------- HEADER / FOOTER ---------- */
  function buildHeader(active, club) {
    const links = NAV.map(n => `<li><a href="${n.h}" class="${n.k === active ? 'active' : ''}">${n.t}</a></li>`).join('');
    return `
    <nav class="nav">
      <a href="index.html" class="brand">
        <img class="crest" src="assets/logo.png" alt="Escudo ${esc(club.nombre)}" width="46" height="46">
        <div><div class="bname">${esc(club.nombre)}</div><div class="btag">${esc(club.subtitulo)}</div></div>
      </a>
      <ul class="menu" id="menu">${links}</ul>
      <a href="contacto.html" class="btn btn-primary nav-cta">Inscripciones</a>
      <button class="burger" id="burger" aria-label="Menú" aria-expanded="false"><span></span><span></span><span></span></button>
    </nav>`;
  }

  function buildFooter(club) {
    const r = club.redes || {};
    const cols = [
      { h: 'Club', items: [['index.html', 'Inicio'], ['club.html', 'El club'], ['equipo.html', 'Equipo'], ['papas.html', 'Para papás']] },
      { h: 'Partidos', items: [['calendario.html', 'Calendario'], ['resultados.html', 'Resultados'], ['galeria.html', 'Galería']] },
      { h: 'Más', items: [['tienda.html', 'Tienda'], ['contacto.html', 'Contacto'], ['admin.html', 'Administrar']] }
    ];
    const colHtml = cols.map(c => `<div class="foot-col"><h4>${c.h}</h4>${c.items.map(i => `<a href="${i[0]}">${i[1]}</a>`).join('')}</div>`).join('');
    return `
    <div class="wrap">
      <div class="foot-grid">
        <div class="foot-brand">
          <a href="index.html" class="brand"><img class="crest" src="assets/logo.png" alt="Escudo ${esc(club.nombre)}" width="46" height="46"><div><div class="bname">${esc(club.nombre)}</div><div class="btag">${esc(club.subtitulo)}</div></div></a>
          <p>${esc(club.descripcion && club.descripcion[0] ? club.descripcion[0] : '')}</p>
          <div class="tag">${esc(club.tagline)} <span class="r">🦁</span></div>
          <div class="foot-social">
            ${r.whatsapp ? `<a href="${waLink(r.whatsapp)}" target="_blank" rel="noopener" aria-label="WhatsApp">${icoFill('wa')}</a>` : ''}
            ${r.instagram ? `<a href="${esc(r.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${icoFill('ig')}</a>` : ''}
            ${r.facebook ? `<a href="${esc(r.facebook)}" target="_blank" rel="noopener" aria-label="Facebook">${icoFill('fb')}</a>` : ''}
          </div>
        </div>
        ${colHtml}
      </div>
      <div class="foot-bottom">
        <span>© ${new Date().getFullYear()} ${esc(club.nombre)} · ${esc(club.ciudad)}</span>
        <span>Hecho con garra en Tabasco 🇲🇽</span>
      </div>
    </div>`;
  }

  /* ---------- COMPORTAMIENTOS ---------- */
  function initBehaviors(opts) {
    const header = document.getElementById('site-header');
    const solid = !!(opts && opts.solidHeader);
    if (solid) header.classList.add('solid');
    const onScroll = () => { if (!solid) header.classList.toggle('scrolled', window.scrollY > 40); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

    const burger = document.getElementById('burger'), menu = document.getElementById('menu');
    if (burger) burger.addEventListener('click', () => {
      const open = menu.classList.toggle('mobile'); burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open); document.body.style.overflow = open ? 'hidden' : '';
    });
    if (menu) menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('mobile'); burger && burger.classList.remove('open'); document.body.style.overflow = '';
    }));

    const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    const counters = document.querySelectorAll('[data-count]');
    if (counters.length) {
      const co = new IntersectionObserver((es) => es.forEach(e => {
        if (!e.isIntersecting) return; co.unobserve(e.target);
        const t = +e.target.dataset.count, suf = e.target.dataset.suf || ''; let n = 0; const step = Math.max(1, Math.ceil(t / 40));
        const tick = () => { n += step; if (n >= t) { e.target.textContent = t + suf; } else { e.target.textContent = n + suf; requestAnimationFrame(tick); } };
        t > 0 ? tick() : e.target.textContent = '0' + suf;
      }), { threshold: .4 });
      counters.forEach(c => co.observe(c));
    }
  }

  /* ---------- BLOQUES REUTILIZABLES ---------- */
  function pageHero(title, sub, crumbTitle) {
    return `<section class="page-hero">
      <svg class="pitch-lines" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g fill="none" stroke="rgba(120,160,255,.18)" stroke-width="2"><circle cx="720" cy="200" r="110"/><line x1="720" y1="0" x2="720" y2="400"/></g></svg>
      <div class="glow"></div>
      <div class="wrap">
        <div class="crumb"><a href="index.html">Inicio</a><span class="sep">/</span><span>${esc(crumbTitle || title)}</span></div>
        <h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}
      </div>
    </section>`;
  }
  function emptyState(dark, title, text, icon) {
    return `<div class="empty-state${dark ? ' dark' : ''}">${icoStroke(icon || 'shield')}<b>${esc(title)}</b><span>${esc(text)}</span></div>`;
  }

  /* ---------- RENDERERS POR PÁGINA ---------- */
  const R = {};

  R.inicio = (db) => {
    const c = db.club, gal = db.galeria || [];
    const heroImg = (gal.find(g => /hero/.test(g.img)) || {}).img || 'assets/hero.jpg';
    const stats = (db.stats || []).map(s => `<div class="stat"><div class="num"><span data-count="${+s.num || 0}" data-suf="${esc(s.sufijo)}">0</span></div><div class="lbl">${esc(s.label)}</div></div>`).join('');
    const valores = (db.valores || []).slice(0, 4).map((v, i) => `<div class="valor${i % 2 ? ' red' : ''} reveal"><div class="ico">${icoStroke(v.ic)}</div><h3>${esc(v.n)}</h3><p>${esc(v.d)}</p></div>`).join('');
    return `
    <section class="hero" id="inicio">
      <svg class="pitch-lines" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g fill="none" stroke="rgba(120,160,255,.18)" stroke-width="2"><circle cx="720" cy="400" r="130"/><line x1="720" y1="0" x2="720" y2="800"/><rect x="0" y="250" width="170" height="300"/><rect x="1270" y="250" width="170" height="300"/></g></svg>
      <div class="glow"></div><div class="glow red"></div>
      <div class="speed" style="top:30%;left:0;width:40%"></div><div class="speed" style="top:62%;right:0;width:30%"></div>
      <div class="wrap"><div class="hero-grid">
        <div class="hero-copy">
          <span class="eyebrow light">${esc(c.subtitulo)} · ${esc(c.ciudad)}</span>
          <h1>${esc(c.nombre).replace(' F.C.', '')} <span style="-webkit-text-fill-color:initial">F.C.</span></h1>
          <div class="lead-line">Garra, corazón y <span class="r">fútbol.</span></div>
          <p class="sub">Un club infantil donde cada niño aprende a jugar, competir, convivir y rugir como campeón. Aquí empieza la historia de los más grandes.</p>
          <div class="hero-cta">
            <a href="equipo.html" class="btn btn-primary">Conoce al equipo ${icoStroke('arrow')}</a>
            <a href="calendario.html" class="btn btn-ghost">Ver calendario</a>
            <a href="contacto.html" class="btn btn-ghost">Inscripciones</a>
          </div>
        </div>
        <div class="hero-art">
          <div class="hero-photo">
            <img src="${esc(heroImg)}?v=2" alt="Jugador de ${esc(c.nombre)} en el estadio" width="400" height="533">
            <img class="hp-logo" src="assets/logo.png" alt="Escudo ${esc(c.nombre)}" width="62" height="62">
            <span class="hp-tag">Orgullo Leones</span>
          </div>
          <div class="hero-badge b1"><span class="n">⚽</span>Tabasco</div>
          <div class="hero-badge b2"><span class="n">#1</span>Garra</div>
        </div>
      </div></div>
    </section>
    <section class="stats"><div class="wrap"><div class="stats-inner reveal">${stats}</div></div></section>
    <section class="identity"><div class="wrap"><div class="identity-grid">
      <div class="identity-copy reveal">
        <span class="eyebrow">Quiénes somos</span>
        <h2>Más que un equipo,<br>una <span class="hl">manada.</span></h2>
        <p><strong>${esc(c.nombre)} no es solo un equipo de fútbol.</strong> ${esc((c.descripcion || [''])[0]).replace(c.nombre + ' no es solo un equipo de fútbol. ', '')}</p>
        <p>${esc((c.descripcion || ['', ''])[1] || '')}</p>
        <a href="club.html" class="btn btn-outline" style="margin-top:8px">Conoce el club ${icoStroke('arrow')}</a>
      </div>
      <div class="identity-art reveal">
        <img class="art-photo" src="assets/logo.png" alt="Escudo de ${esc(c.nombre)}" style="object-fit:contain;padding:54px">
        <div class="ribbon">"${esc(c.lema)}"</div>
      </div>
    </div></div></section>
    <section class="valores"><div class="wrap">
      <div class="section-head reveal"><span class="eyebrow">El ADN del club</span><h2 class="section-title">Lo que nos hace <span class="hl">Leones</span></h2><p>Vivimos nuestros valores en cada entrenamiento, en cada jugada y en cada celebración.</p></div>
      <div class="valores-grid">${valores}</div>
      <div style="text-align:center;margin-top:30px"><a href="club.html" class="btn btn-primary">Ver todos los valores ${icoStroke('arrow')}</a></div>
    </div></section>
    ${ctaBand()}`;
  };

  function ctaBand() {
    return `<section class="cta-band"><div class="wrap"><div class="cta-inner reveal">
      <h2>¿Listo para <span style="color:#ffd34d">rugir</span> con nosotros?</h2>
      <p>Inscripciones abiertas. Forma parte de la manada Leones F.C. y vive el fútbol con garra y corazón.</p>
      <div class="hero-cta"><a href="contacto.html" class="btn btn-red">Quiero inscribirme ${icoStroke('arrow')}</a><a href="equipo.html" class="btn btn-ghost" style="border-color:rgba(255,255,255,.6)">Ver al equipo</a></div>
    </div></div></section>`;
  }

  R.club = (db) => {
    const c = db.club;
    const desc = (c.descripcion || []).map(p => `<p>${esc(p)}</p>`).join('');
    const valores = (db.valores || []).map((v, i) => `<div class="valor${i % 2 ? ' red' : ''} reveal"><div class="ico">${icoStroke(v.ic)}</div><h3>${esc(v.n)}</h3><p>${esc(v.d)}</p></div>`).join('');
    const tl = (db.historia || []).map(t => `<div class="tl-item reveal"><span class="dot"></span><div class="tl-card"><div class="yr">${esc(t.yr)}</div><h4>${esc(t.t)}</h4><p>${esc(t.d)}</p></div></div>`).join('');
    const himno = (db.himno && db.himno.lineas || []).map((l, i) => i === 0 ? `<b>${l}</b><br>` : (l + (i < db.himno.lineas.length - 1 ? '<br>' : ''))).join('');
    return `
    ${pageHero('El <span class="hl">Club</span>', 'Más que un equipo: una manada con garra, corazón y valores que forman campeones de vida.', 'El club')}
    <section class="identity flush"><div class="wrap"><div class="identity-grid">
      <div class="identity-copy reveal"><span class="eyebrow">Quiénes somos</span><h2>Una <span class="hl">familia</span> con escudo.</h2>${desc}</div>
      <div class="identity-art reveal"><img class="art-photo" src="assets/logo.png" alt="Escudo de ${esc(c.nombre)}" style="object-fit:contain;padding:54px"><div class="ribbon">"${esc(c.lema)}"</div></div>
    </div></div></section>
    <section class="valores"><div class="wrap"><div class="section-head reveal"><span class="eyebrow">El ADN del club</span><h2 class="section-title">Nuestros <span class="hl">valores</span></h2><p>Ocho principios que nos hacen Leones dentro y fuera de la cancha.</p></div><div class="valores-grid">${valores}</div></div></section>
    <section class="history"><div class="wrap"><div class="section-head reveal" style="margin:0 auto 46px;text-align:center"><span class="eyebrow" style="justify-content:center">Nuestra historia</span><h2 class="section-title">El camino de la <span class="hl">manada</span></h2></div><div class="timeline">${tl}</div></div></section>
    <section class="anthem"><div class="wrap"><img class="crest-sm" src="assets/logo.png" alt="Escudo ${esc(c.nombre)}" width="74" height="74"><span class="eyebrow light" style="justify-content:center">El himno</span><h2>Canta con <span class="hl">orgullo</span></h2><div class="lyrics">${himno}</div></div></section>
    ${ctaBand()}`;
  };

  R.equipo = (db) => {
    const cats = db.categorias || [];
    const players = db.jugadores || [];
    const tabs = cats.map((ct, i) => `<button class="cat-tab${i === 0 ? ' active' : ''}" data-cat="${ct.id}">${esc(ct.nombre)}<small>${players.filter(p => p.cat == ct.id).length} jugadores</small></button>`).join('');
    return `
    ${pageHero('Nuestra <span class="hl">plantilla</span>', 'La manada está organizada en 3 categorías. Conoce a los leones que rugen en la cancha.', 'Equipo')}
    <section class="squad dark flush"><svg class="pitch-pat" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g fill="none" stroke="rgba(120,160,255,.12)" stroke-width="2"><circle cx="720" cy="300" r="110"/><line x1="720" y1="0" x2="720" y2="600"/></g></svg>
      <div class="wrap">
        <div class="cat-tabs" id="catTabs">${tabs || ''}</div>
        <div class="squad-grid" id="squadGrid"></div>
      </div>
    </section>
    ${ctaBand()}`;
  };

  R.calendario = (db) => {
    const fx = (db.partidos || []).slice().sort((a, b) => (a.fecha || '').localeCompare(b.fecha || ''));
    let list;
    if (!fx.length) list = emptyState(false, 'Próximos partidos', 'Aquí aparecerá el calendario del equipo. Agrégalo desde el panel de administración.', 'clock');
    else list = fx.map(m => {
      const d = parseDate(m.fecha);
      return `<div class="fx reveal"><div class="date"><div class="d">${d.day}</div><div class="m">${d.mon}</div></div>
        <div class="match"><div class="vs">${esc(db.club.nombre)} <span style="color:var(--gris)">vs</span> ${esc(m.rival || 'Por definir')}</div><div class="place">${icoStroke('pin')} ${esc(m.lugar || 'Por confirmar')}${m.cat ? ' · Cat. ' + esc(m.cat) : ''}</div></div>
        <div class="hour">${esc(m.hora || '—')}</div>
        <div class="status ${esc(m.estado || 'proximo')}">${labelEstado(m.estado)}</div></div>`;
    }).join('');
    return `${pageHero('<span class="hl">Calendario</span>', 'Próximos partidos y compromisos de la manada Leones F.C.', 'Calendario')}
    <section class="fixtures"><div class="wrap"><div class="fx-list">${list}</div></div></section>${ctaBand()}`;
  };

  R.resultados = (db) => {
    const rs = (db.resultados || []).slice().sort((a, b) => (b.fecha || '').localeCompare(a.fecha || ''));
    let body;
    if (!rs.length) {
      body = emptyState(true, 'Aún no hay resultados', 'Cuando jueguen sus primeros partidos, los marcadores aparecerán aquí.', 'trophy');
    } else {
      const rows = rs.map(r => {
        const cl = r.golesL > r.golesV ? 'win' : (r.golesL < r.golesV ? 'loss' : 'draw');
        return `<tr><td>${esc(fmtDate(r.fecha))}</td><td>${esc(db.club.nombre)} vs ${esc(r.rival || '—')}</td><td class="score ${cl}">${esc(r.golesL)} - ${esc(r.golesV)}</td><td>${r.cat ? 'Cat. ' + esc(r.cat) : '—'}</td><td>${r.mvp ? `<span class="mvp-cell">${icoStroke('trophy')} ${esc(r.mvp)}</span>` : '—'}</td></tr>`;
      }).join('');
      const cards = rs.map(r => {
        const cl = r.golesL > r.golesV ? 'win' : (r.golesL < r.golesV ? 'loss' : 'draw');
        return `<div class="res-card"><div class="top"><span class="vs">vs ${esc(r.rival || '—')}</span><span class="sc ${cl}">${esc(r.golesL)}-${esc(r.golesV)}</span></div><div class="ln">${esc(fmtDate(r.fecha))}${r.cat ? ' · Cat. ' + esc(r.cat) : ''}${r.mvp ? ' · MVP: ' + esc(r.mvp) : ''}</div></div>`;
      }).join('');
      body = `<table class="res-table"><thead><tr><th>Fecha</th><th>Partido</th><th>Marcador</th><th>Categoría</th><th>Jugador del partido</th></tr></thead><tbody>${rows}</tbody></table><div class="res-cards">${cards}</div>`;
    }
    return `${pageHero('<span class="hl">Resultados</span>', 'El historial de la manada: cada partido, cada marcador, cada rugido.', 'Resultados')}
    <section class="results"><svg class="pitch-pat" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g fill="none" stroke="rgba(120,160,255,.12)" stroke-width="2"><circle cx="720" cy="300" r="110"/></g></svg><div class="wrap">${body}</div></section>`;
  };

  R.galeria = (db) => {
    const gal = db.galeria || [];
    let grid;
    if (!gal.length) grid = emptyState(false, 'Galería en camino', 'Pronto subiremos las mejores fotos del equipo.', 'image');
    else grid = '<div class="masonry">' + gal.map(g => g.img
      ? `<div class="tile reveal"><img src="${esc(g.img)}" alt="${stripTags(g.c)}" loading="lazy"><div class="cap"><span>${esc(g.c)}</span></div></div>`
      : `<div class="tile reveal" style="background:${esc(g.col)}"><div class="ph" style="height:${esc(g.h) || 220}px">${icoStroke('image')}</div><div class="cap"><span>${esc(g.c)}</span></div></div>`
    ).join('') + '</div>';
    return `${pageHero('Galería de <span class="hl">campeones</span>', 'Los momentos que llenan de orgullo a la manada.', 'Galería')}
    <section class="gallery"><div class="wrap">${grid}</div></section>${ctaBand()}`;
  };

  R.tienda = (db) => {
    const t = db.tienda || { productos: [] };
    const prods = t.productos || [];
    const cats = ['Todos', ...Array.from(new Set(prods.map(p => p.cat)))];
    const tabs = cats.map((c, i) => `<button class="store-tab${i === 0 ? ' active' : ''}" data-c="${esc(c)}">${esc(c)}</button>`).join('');
    return `${pageHero('<span class="hl">Tienda</span> Leones', 'Lleva los colores del club. Uniformes y souvenirs oficiales.', 'Tienda')}
    <section class="store"><div class="wrap">
      <div class="store-tabs" id="storeTabs">${tabs}</div>
      <div class="store-grid" id="storeGrid"></div>
      <div class="store-note">${icoStroke('info')} ${esc(t.aviso || 'Pagos seguros')} · Precios en ${esc(t.moneda || 'MXN')}</div>
    </div></section>`;
  };

  R.papas = (db) => {
    const info = (db.infoPapas || []).map(r => `<div class="info-row"><div class="ic">${icoStroke(r.ic)}</div><div class="t"><b>${esc(r.t)}</b><span>${esc(r.s)}</span></div></div>`).join('');
    const avisos = (db.avisos || []);
    const avisoHtml = avisos.length ? avisos.map(a => `<div class="item"><span class="badge ${esc(a.badge)}">${esc(a.badge)}</span><p>${esc(a.texto)}</p></div>`).join('') : `<div class="item"><span class="badge info">info</span><p>Pronto publicaremos avisos y convocatorias del club.</p></div>`;
    const coach = (db.cuerpoTecnico || [])[0] || { nombre: 'Cuerpo técnico', rol: 'Entrenador' };
    const ini = esc(coach.nombre).split(' ').map(w => w[0]).slice(0, 2).join('');
    return `${pageHero('Para <span class="hl">papás</span>', 'Toda la información que necesitas sobre el club, entrenamientos y cómo inscribir a tu hijo.', 'Papás')}
    <section class="parents"><div class="wrap"><div class="parents-grid">
      <div class="info-card reveal"><h3>${icoStroke('info')} Información del club</h3>${info}</div>
      <div class="notice reveal"><h3>${icoStroke('bell')} Avisos</h3>${avisoHtml}
        <div class="coach-box"><div class="ca">${ini}</div><div class="ct"><b>${esc(coach.nombre)}</b><span>${esc(coach.rol)}</span></div></div>
      </div>
    </div></div></section>${ctaBand()}`;
  };

  R.contacto = (db) => {
    const c = db.club, r = c.redes || {};
    const btn = (cls, ico, t, sub, href) => href ? `<a class="sbtn ${cls}" href="${href}" target="_blank" rel="noopener"><div class="si">${cls === 'wa' ? icoFill('wa') : icoStroke(ico)}</div><div class="st"><b>${t}</b><span>${sub}</span></div></a>` : '';
    return `${pageHero('<span class="hl">Contacto</span> e inscripciones', 'Escríbenos y forma parte de la manada Leones F.C.', 'Contacto')}
    <section class="contact"><div class="wrap"><div class="contact-grid">
      <div class="contact-info reveal">
        <h2>Únete a la <span class="hl">manada</span></h2>
        <p>¿Quieres inscribir a tu hijo o tienes dudas? Contáctanos por el medio que prefieras.</p>
        <div class="social-btns">
          ${btn('wa', 'wa', 'WhatsApp', 'Escríbenos directo', r.whatsapp ? waLink(r.whatsapp) : '')}
          ${btn('ig', 'ig', 'Instagram', 'Síguenos', r.instagram)}
          ${btn('fb', 'fb', 'Facebook', 'Síguenos', r.facebook)}
          ${btn('em', 'mail', 'Email', esc(r.email || ''), r.email ? 'mailto:' + r.email : '')}
        </div>
      </div>
      <div class="form-card reveal">
        <h3>Formulario de inscripción</h3><p class="sub">Déjanos tus datos y te contactamos.</p>
        <form id="inscForm" name="inscripcion" method="POST" data-netlify="true" netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="inscripcion">
          <p style="display:none"><label>No llenar: <input name="bot-field"></label></p>
          <div class="row2"><div class="field"><label>Nombre del niño/a</label><input name="nino" required></div><div class="field"><label>Edad</label><input name="edad" type="number" min="3" max="17"></div></div>
          <div class="field"><label>Nombre del papá/mamá</label><input name="tutor" required></div>
          <div class="row2"><div class="field"><label>Teléfono / WhatsApp</label><input name="telefono" required></div><div class="field"><label>Categoría de interés</label><select name="categoria"><option>Categoría 1</option><option>Categoría 2</option><option>Categoría 3</option><option>No estoy seguro</option></select></div></div>
          <div class="field"><label>Mensaje</label><textarea name="mensaje" placeholder="Cuéntanos sobre tu hijo/a..."></textarea></div>
          <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">Enviar inscripción ${icoStroke('arrow')}</button>
          <div class="form-msg" id="formMsg">¡Gracias! Hemos recibido tus datos. Te contactaremos muy pronto. 🦁</div>
        </form>
      </div>
    </div></div></section>`;
  };

  /* ---------- INTERACCIONES POST-RENDER ---------- */
  function wirePage(page, db) {
    if (page === 'equipo') {
      const grid = document.getElementById('squadGrid'), tabs = document.getElementById('catTabs');
      const players = db.jugadores || [];
      const draw = (cat) => {
        const list = players.filter(p => p.cat == cat);
        if (!list.length) { grid.innerHTML = emptyState(true, 'Plantilla en construcción', 'Pronto presentaremos a los jugadores de esta categoría.', 'users'); return; }
        grid.innerHTML = list.map(p => `<div class="player reveal">
          <div class="photo">${p.foto ? `<img src="${esc(p.foto)}" alt="${esc(p.nm)}">` : `<svg class="avatar" viewBox="0 0 120 140" fill="none"><circle cx="60" cy="44" r="26" fill="rgba(255,255,255,.18)"/><path d="M18 140c0-26 19-42 42-42s42 16 42 42z" fill="rgba(255,255,255,.18)"/></svg>`}
            <span class="num">${esc(p.num)}</span><span class="pos-tag${/portero|arquero|gk/i.test(p.pos || '') ? ' gk' : ''}">${esc(p.pos)}</span></div>
          <div class="info"><div class="name">${esc(p.nm)}</div><div class="meta">#${esc(p.num)} · <b>${esc(p.edad)} años</b></div>
            ${p.str ? `<div class="strength">${icoStroke('star')} ${esc(p.str)}</div>` : ''}
            ${p.q ? `<div class="quote">“${esc(p.q)}”</div>` : ''}</div></div>`).join('');
        document.querySelectorAll('#squadGrid .reveal').forEach(el => el.classList.add('in'));
      };
      if (tabs) {
        tabs.addEventListener('click', e => { const b = e.target.closest('.cat-tab'); if (!b) return; tabs.querySelectorAll('.cat-tab').forEach(x => x.classList.remove('active')); b.classList.add('active'); draw(b.dataset.cat); });
        const first = tabs.querySelector('.cat-tab');
        draw(first ? first.dataset.cat : (db.categorias[0] && db.categorias[0].id));
      }
    }
    if (page === 'tienda') {
      const grid = document.getElementById('storeGrid'), tabs = document.getElementById('storeTabs');
      const prods = (db.tienda && db.tienda.productos) || [];
      const draw = (cat) => {
        const list = cat === 'Todos' ? prods : prods.filter(p => p.cat === cat);
        grid.innerHTML = list.map((p, i) => `<div class="product reveal"><div class="pimg">${productArt(p.ic, i)}<span class="ptag">${esc(p.cat)}</span></div>
          <div class="pbody"><h3>${esc(p.n)}</h3><div class="pd">${esc(p.d)}</div>
          <div class="prow"><span class="price">${esc(p.precio)}</span><a class="buy" href="${esc(p.link || '#')}"${p.link && p.link !== '#' ? ' target="_blank" rel="noopener"' : ''}>${icoStroke('cart')} Comprar</a></div></div></div>`).join('');
        document.querySelectorAll('#storeGrid .reveal').forEach(el => el.classList.add('in'));
      };
      if (tabs) { tabs.addEventListener('click', e => { const b = e.target.closest('.store-tab'); if (!b) return; tabs.querySelectorAll('.store-tab').forEach(x => x.classList.remove('active')); b.classList.add('active'); draw(b.dataset.c); }); }
      draw('Todos');
    }
    if (page === 'contacto') {
      const f = document.getElementById('inscForm'), msg = document.getElementById('formMsg');
      if (f) f.addEventListener('submit', () => { /* Netlify Forms maneja el envío; mostramos confirmación */ if (location.hostname === 'localhost' || location.protocol === 'file:') { } setTimeout(() => msg.classList.add('show'), 50); });
    }
  }

  /* ---------- UTILIDADES FECHA/ESTADO ---------- */
  const MES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  const MESL = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  function parseDate(s) { if (!s) return { day: '—', mon: '' }; const d = new Date(s + 'T00:00:00'); if (isNaN(d)) return { day: '—', mon: '' }; return { day: String(d.getDate()).padStart(2, '0'), mon: MES[d.getMonth()] }; }
  function fmtDate(s) { if (!s) return '—'; const d = new Date(s + 'T00:00:00'); if (isNaN(d)) return s; return d.getDate() + ' ' + MESL[d.getMonth()] + ' ' + d.getFullYear(); }
  function labelEstado(e) { return ({ proximo: 'Próximo', ganado: 'Ganado', empatado: 'Empate', perdido: 'Perdido' })[e] || 'Próximo'; }

  /* ---------- ARRANQUE ---------- */
  async function loadDB() {
    try {
      const res = await fetch('data/db.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error('db');
      return await res.json();
    } catch (e) {
      console.warn('No se pudo cargar data/db.json, usando datos mínimos.', e);
      return window.LEONES_FALLBACK || { club: { nombre: 'LEONES F.C.', subtitulo: 'Academia Infantil', tagline: 'Garra, corazón y fútbol', ciudad: 'Tabasco, México', lema: 'Juntos somos Leones', descripcion: [''], redes: {} }, stats: [], valores: [], categorias: [], jugadores: [], partidos: [], resultados: [], galeria: [], tienda: { productos: [] }, historia: [], avisos: [], infoPapas: [], cuerpoTecnico: [], frases: [], himno: { lineas: [] } };
    }
  }

  async function boot() {
    const body = document.body;
    const page = body.dataset.page || 'inicio';
    const db = await loadDB();
    window.DB = db;

    const head = document.getElementById('site-header');
    const foot = document.getElementById('site-footer');
    if (head) head.innerHTML = buildHeader(page, db.club);
    if (foot) foot.innerHTML = buildFooter(db.club);

    const app = document.getElementById('app');
    if (app && R[page]) app.innerHTML = R[page](db);

    initBehaviors({ solidHeader: !!body.dataset.solidHeader });
    wirePage(page, db);

    // marca de frases (si existe contenedor)
    document.title = document.title || (db.club.nombre + ' | ' + db.club.subtitulo);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();

  // expone utilidades para admin.html
  window.LEONES = { loadDB, NAV };
})();
