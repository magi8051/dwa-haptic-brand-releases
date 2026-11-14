/* Haptic Design Lab Gallery — 렌더링 (데이터는 data/exhibits.js) */
(function () {
  var SVGNS = 'http://www.w3.org/2000/svg';
  var WINGS = window.WINGS, EX = window.EXHIBITS;
  var wingName = {};
  WINGS.forEach(function (w) { wingName[w.id] = w; });

  EX.forEach(function (e, i) { e.no = String(i + 1).padStart(2, '0'); });
  var byId = {};
  EX.forEach(function (e) { byId[e.id] = e; });

  var state = { wing: 'all', openId: null };

  /* ---------- helpers ---------- */
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'text') n.textContent = attrs[k];
      else if (k === 'class') n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }

  function wavePath(w, h, cycles, decay, amp, steps) {
    var mid = h / 2, d = '';
    for (var i = 0; i <= steps; i++) {
      var t = i / steps;
      var y = mid - amp * Math.exp(-decay * t) * Math.sin(2 * Math.PI * cycles * t);
      d += (i === 0 ? 'M' : 'L') + (t * w).toFixed(1) + ' ' + y.toFixed(1) + ' ';
    }
    return d;
  }
  /* 전시마다 고유한 시그니처 파형 (id에서 결정) */
  function signature(id) {
    var h = hash(id);
    return { cycles: 3 + (h % 10), decay: 1 + ((h >> 4) % 30) / 10, amp: 16 + ((h >> 8) % 8) };
  }
  function waveSvg(w, h, p, cls, stroke) {
    var s = document.createElementNS(SVGNS, 'svg');
    s.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    s.setAttribute('preserveAspectRatio', 'none');
    s.setAttribute('aria-hidden', 'true');
    var path = document.createElementNS(SVGNS, 'path');
    path.setAttribute('d', wavePath(w, h, p.cycles, p.decay, p.amp, Math.round(w)));
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', stroke || '#F2A33A');
    path.setAttribute('stroke-width', '1.8');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    if (cls) path.setAttribute('class', cls);
    s.appendChild(path);
    return s;
  }
  function icClass(name) {
    if (/7802/.test(name)) return 'blue';
    if (/7912/.test(name)) return 'teal';
    if (/791[47]/.test(name)) return 'coral';
    if (/3M120|Piezo/.test(name)) return 'purple';
    if (/7601/.test(name)) return 'white';
    return '';
  }
  function chips(list) {
    return el('div', { class: 'chips' }, list.map(function (n) { return el('span', { class: 'ic ' + icClass(n), text: n }); }));
  }
  function statusText(s) { return s === 'done' ? '제작 완료' : '진행 중'; }
  function statusEl(s) {
    return el('span', { class: 'st' }, [el('span', { class: 'dot' + (s === 'done' ? '' : ' progress') }), document.createTextNode(statusText(s))]);
  }
  function photoSrc(e, f) { return 'assets/photos/' + e.id + '/' + f; }

  /* ---------- hero / logo ---------- */
  function drawStatic() {
    var logo = document.getElementById('logoMark');
    if (logo) logo.appendChild(waveSvg(44, 28, { cycles: 3, decay: 1.6, amp: 11 }, '', '#F2A33A'));
    var hero = document.getElementById('heroWave');
    if (hero) {
      var line = document.createElementNS(SVGNS, 'line');
      line.setAttribute('x1', 0); line.setAttribute('x2', 1200); line.setAttribute('y1', 80); line.setAttribute('y2', 80);
      line.setAttribute('stroke', '#1E2631');
      hero.appendChild(line);
      var path = document.createElementNS(SVGNS, 'path');
      path.setAttribute('d', wavePath(1200, 160, 14, 3.2, 70, 480));
      path.setAttribute('pathLength', '1');
      path.setAttribute('class', 'draw');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', '#F2A33A');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('stroke-linecap', 'round');
      hero.appendChild(path);
    }
    document.getElementById('count').textContent = EX.length;
  }

  /* ---------- filters ---------- */
  function renderFilters() {
    var box = document.getElementById('filters');
    box.textContent = '';
    var defs = [{ id: 'all', ko: '전체' }].concat(WINGS);
    defs.forEach(function (w) {
      var n = w.id === 'all' ? EX.length : EX.filter(function (e) { return e.wing === w.id; }).length;
      if (n === 0) return;
      var b = el('button', { type: 'button', class: 'chipbtn', 'aria-pressed': String(state.wing === w.id) }, [
        document.createTextNode(w.ko), el('span', { class: 'n', text: String(n) })
      ]);
      b.addEventListener('click', function () { state.wing = w.id; renderFilters(); renderGrid(); });
      box.appendChild(b);
    });
  }

  /* ---------- grid ---------- */
  function visible() { return state.wing === 'all' ? EX : EX.filter(function (e) { return e.wing === state.wing; }); }

  function renderGrid() {
    var grid = document.getElementById('grid');
    grid.textContent = '';
    visible().forEach(function (e) {
      var plate = el('div', { class: 'plate' });
      if (e.photos.length) {
        plate.appendChild(el('img', { src: photoSrc(e, e.photos[0]), alt: e.title, loading: 'lazy' }));
      } else {
        plate.appendChild(waveSvg(240, 56, signature(e.id)));
        plate.appendChild(el('span', { class: 'photo-flag', text: 'PHOTO · 추가' }));
      }
      var cap = el('div', { class: 'cap' }, [
        el('div', { class: 'no', text: 'EXHIBIT ' + e.no + ' · ' + wingName[e.wing].name.toUpperCase() }),
        el('h3', { text: e.title }),
        el('div', { class: 'feel', text: e.feel }),
        chips(e.ic),
        el('div', { class: 'foot' }, [statusEl(e.status), el('span', { class: 'open', text: '전시실 입장 →' })])
      ]);
      var card = el('button', { type: 'button', class: 'card', 'aria-haspopup': 'dialog', 'aria-label': e.title + ' 전시실 열기' }, [plate, cap]);
      card.addEventListener('click', function () { openRoom(e.id); });
      grid.appendChild(card);
    });
  }

  /* ---------- commissions ---------- */
  function renderCommissions() {
    var box = document.getElementById('rows');
    window.COMMISSIONS.forEach(function (c, i) {
      var who = c.client + (c.where ? ' · ' + c.where : '');
      var link = el('button', { type: 'button', class: 'link', text: '관련 전시 보기 →' });
      link.addEventListener('click', function () { openRoom(c.exhibit); });
      box.appendChild(el('div', { class: 'row' }, [
        el('div', null, [el('div', { class: 'k a', text: 'COMMISSION ' + String(i + 1).padStart(2, '0') }), el('div', { class: 'who', text: c.client }), c.where ? el('div', { class: 'where', text: c.where }) : null]),
        el('div', null, [el('div', { class: 'k', text: 'BRIEF' }), el('div', { class: 'v', text: c.brief })]),
        el('div', null, [el('div', { class: 'k', text: 'DELIVERED' }), el('div', { class: 'v', text: c.delivered }), link])
      ]));
    });
  }

  /* ---------- lab ---------- */
  function renderLab() {
    var tools = document.getElementById('tools');
    window.LAB_TOOLS.forEach(function (t) {
      tools.appendChild(el('div', { class: 'tool' }, [el('div', { class: 'tag', text: t.tag }), el('b', { text: t.name }), el('p', { text: t.desc })]));
    });
    var ics = document.getElementById('ics');
    window.DRIVER_ICS.forEach(function (c) {
      ics.appendChild(el('div', { class: 'icard ' + (c.tone === 'neutral' ? '' : c.tone) }, [el('b', { text: c.name }), c.note ? el('span', { text: c.note }) : null]));
    });
  }

  /* ---------- room ---------- */
  var dlg;
  function openRoom(id, fromHash) {
    var e = byId[id];
    if (!e) return;
    state.openId = id;
    var list = visible();
    if (list.indexOf(e) < 0) list = EX;
    var idx = list.indexOf(e);
    var prev = list[(idx - 1 + list.length) % list.length];
    var next = list[(idx + 1) % list.length];

    var close = el('button', { type: 'button', class: 'closebtn', text: '닫기 ✕' });
    close.addEventListener('click', closeRoom);

    var photo = el('div', { class: 'photo' });
    if (e.photos.length) {
      var main = el('img', { src: photoSrc(e, e.photos[0]), alt: e.title });
      photo.appendChild(main);
      if (e.photos.length > 1) {
        var th = el('div', { class: 'thumbs' });
        e.photos.forEach(function (f) {
          var b = el('button', { type: 'button', 'aria-label': f + ' 보기' }, [el('img', { src: photoSrc(e, f), alt: '' })]);
          b.addEventListener('click', function () { main.src = photoSrc(e, f); });
          th.appendChild(b);
        });
        photo.appendChild(th);
      }
    } else {
      photo.appendChild(el('div', { class: 'photo-box' }, [
        waveSvg(240, 56, signature(e.id)),
        el('div', { class: 'k', text: '[PHOTO · 추가]' }),
        el('p', { text: '데모기 사진 또는 시연 영상이 들어갈 자리입니다.' })
      ]));
      photo.querySelector('svg').style.width = '240px';
    }

    var spec = el('dl', { class: 'spec' });
    spec.style.margin = '0';
    var rows = [['STATUS', statusText(e.status)], ['DRIVER', e.ic.join(' · ')]];
    if (e.client) rows.push(['CLIENT', e.client]);
    e.specs.forEach(function (s) { rows.push([s[0], s[1]]); });
    rows.forEach(function (r) {
      spec.appendChild(el('div', null, [el('dt', { class: 'l', text: r[0] }), el('dd', { class: 'r', text: r[1] })]));
      spec.lastChild.lastChild.style.margin = '0';
    });

    var hl = el('ul', null, e.highlights.map(function (h) { return el('li', { text: h }); }));
    var story = el('div', { class: 'story' }, [
      el('section', null, [el('div', { class: 'k', text: '01 · BRIEF' }), el('p', { text: e.purpose })]),
      el('section', null, [el('div', { class: 'k', text: '02 · HIGHLIGHTS' }), hl]),
      el('section', null, [el('div', { class: 'k', text: '03 · DELIVERY' }), el('p', { text: e.deploy })])
    ]);

    var bp = el('button', { type: 'button', text: '← ' + prev.no + ' · ' + prev.title });
    var bn = el('button', { type: 'button', text: next.no + ' · ' + next.title + ' →' });
    bp.addEventListener('click', function () { openRoom(prev.id); });
    bn.addEventListener('click', function () { openRoom(next.id); });

    dlg.textContent = '';
    dlg.setAttribute('aria-label', e.title);
    dlg.appendChild(el('div', { class: 'room-in' }, [
      el('div', { class: 'room-top' }, [el('div', { class: 'eyebrow', text: 'EXHIBIT ' + e.no + ' · ' + wingName[e.wing].name }), close]),
      el('h2', { text: e.title }),
      el('p', { class: 'sub', text: e.feel }),
      el('div', { class: 'room-body' }, [photo, spec]),
      story,
      el('div', { class: 'room-nav' }, [bp, bn])
    ]));
    if (!dlg.open) dlg.showModal();
    dlg.scrollTop = 0;
    if (!fromHash) history.replaceState(null, '', '#ex=' + id);
  }
  function closeRoom() {
    if (dlg.open) dlg.close();
  }

  /* ---------- init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    dlg = document.getElementById('room');
    dlg.addEventListener('close', function () { state.openId = null; history.replaceState(null, '', location.pathname + location.search); });
    dlg.addEventListener('click', function (ev) { if (ev.target === dlg) closeRoom(); });
    drawStatic();
    renderFilters();
    renderGrid();
    renderCommissions();
    renderLab();
    var m = /#ex=([\w-]+)/.exec(location.hash);
    if (m) openRoom(m[1], true);
  });
})();
