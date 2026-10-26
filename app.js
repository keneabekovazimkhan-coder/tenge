'use strict';

// ---------- data ----------
const KEY = 'tenge-v1';
const PALETTE = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16', '#06B6D4', '#94A3B8'];

const AUTO_CAT = { id: 'auto', name: 'Авто', icon: 'fuel', color: '#0EA5E9' };

const defaults = () => ({
  tx: [],
  cats: {
    expense: [
      { id: 'food', name: 'Продукты', icon: 'cart', color: '#10B981' },
      { id: 'cafe', name: 'Кафе', icon: 'coffee', color: '#F59E0B' },
      { id: 'transport', name: 'Транспорт', icon: 'bus', color: '#3B82F6' },
      { id: 'taxi', name: 'Такси', icon: 'car', color: '#EAB308' },
      { ...AUTO_CAT },
      { id: 'shop', name: 'Покупки', icon: 'bag', color: '#EC4899' },
      { id: 'home', name: 'Дом', icon: 'home', color: '#8B5CF6' },
      { id: 'phone', name: 'Связь', icon: 'phone', color: '#06B6D4' },
      { id: 'health', name: 'Здоровье', icon: 'heart', color: '#EF4444' },
      { id: 'fun', name: 'Отдых', icon: 'star', color: '#F97316' },
      { id: 'gift', name: 'Подарки', icon: 'gift', color: '#A855F7' },
      { id: 'other', name: 'Другое', icon: 'dots', color: '#94A3B8' },
    ],
    income: [
      { id: 'salary', name: 'Зарплата', icon: 'briefcase', color: '#10B981' },
      { id: 'side', name: 'Подработка', icon: 'laptop', color: '#3B82F6' },
      { id: 'gift_in', name: 'Подарок', icon: 'gift', color: '#A855F7' },
      { id: 'other_in', name: 'Другое', icon: 'dots', color: '#94A3B8' },
    ],
  },
  sections: [
    { id: 'daily', name: 'Повседневное', color: '#3B82F6' },
    { id: 'travel', name: 'Путешествие', color: '#F59E0B' },
  ],
  activeSection: 'daily',
  quickOpen: true,
});

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && Array.isArray(s.tx)) {
      // v1 data predates the Авто category
      if (!s.cats.expense.some((c) => c.id === 'auto')) {
        const i = s.cats.expense.findIndex((c) => c.id === 'other');
        s.cats.expense.splice(i < 0 ? s.cats.expense.length : i, 0, { ...AUTO_CAT });
      }
      return s;
    }
  } catch (e) { /* first run or storage blocked */ }
  return defaults();
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); }
  catch (e) { toast('Не удалось сохранить данные'); }
}

let S = load();

// ---------- icons ----------
const ICONS = {
  cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  coffee: '<path d="M10 2v2M14 2v2M6 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>',
  bus: '<path d="M8 6v6M15 6v6M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>',
  car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  phone: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
  dots: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  briefcase: '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  laptop: '<rect width="18" height="12" x="3" y="4" rx="2"/><path d="M2 20h20"/>',
  tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5"/>',
  folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  chart: '<path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>',
  plus: '<path d="M5 12h14M12 5v14"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  chevL: '<path d="m15 18-6-6 6-6"/>',
  chevR: '<path d="m9 18 6-6-6-6"/>',
  chevD: '<path d="m6 9 6 6 6-6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  del: '<path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><path d="m18 9-6 6M12 9l6 6"/>',
  trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  note: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  fuel: '<path d="M3 22h12M4 9h10"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0V9.83a2 2 0 0 0-.59-1.42L18 5"/>',
  mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>',
};
const icon = (name) => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.tag}</svg>`;

// ---------- helpers ----------
const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const nf = new Intl.NumberFormat('ru-RU');
const money = (n) => nf.format(n) + ' ₸';
const signed = (t) => (t.type === 'income' ? '+' : '−') + money(t.amount);
const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const MONTHS_GEN = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const WD = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

const catOf = (type, id) => S.cats[type].find((c) => c.id === id) || { name: 'Без категории', icon: 'tag', color: '#64748B' };
const secOf = (id) => S.sections.find((s) => s.id === id) || S.sections[0];
const badge = (c) => `<span class="badge" style="background:${c.color}26;color:${c.color}">${icon(c.icon)}</span>`;
const sum = (list, type) => list.reduce((a, t) => a + (t.type === type ? t.amount : 0), 0);

const dayKey = (ts) => { const d = new Date(ts); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
function dayLabel(key) {
  const today = dayKey(Date.now());
  const yest = dayKey(Date.now() - 864e5);
  if (key === today) return 'Сегодня';
  if (key === yest) return 'Вчера';
  const [y, m, d] = key.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  const yr = y !== new Date().getFullYear() ? ` ${y}` : '';
  return `${d} ${MONTHS_GEN[m - 1]}${yr}, ${WD[dt.getDay()]}`;
}
const inMonth = (ts, m) => { const d = new Date(ts); return d.getFullYear() === m.getFullYear() && d.getMonth() === m.getMonth(); };
const sorted = (list) => [...list].sort((a, b) => b.ts - a.ts);

// ---------- app state ----------
let view = 'home';
let month = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let filter = { section: 'all', type: 'all', q: '' };

const NAV = [
  { id: 'home', label: 'Главная', icon: 'home' },
  { id: 'history', label: 'История', icon: 'list' },
  { id: 'add' },
  { id: 'sections', label: 'Разделы', icon: 'folder' },
  { id: 'stats', label: 'Отчёты', icon: 'chart' },
];

function go(v) { view = v; render(); window.scrollTo(0, 0); }

function render() {
  const views = { home: viewHome, history: viewHistory, sections: viewSections, stats: viewStats };
  $('#view').innerHTML = views[view]();
  $('#tabbar').innerHTML = NAV.map((n) => n.id === 'add'
    ? `<button class="tab-add" data-act="add" aria-label="Добавить запись">${icon('plus')}</button>`
    : `<button class="tab ${view === n.id ? 'on' : ''}" data-go="${n.id}">${icon(n.icon)}<span>${n.label}</span></button>`).join('');
}

// ---------- shared blocks ----------
function monthHeader() {
  return `<header class="top">
    <button class="icon-btn" data-act="prev-month" aria-label="Предыдущий месяц">${icon('chevL')}</button>
    <h1>${MONTHS[month.getMonth()]} ${month.getFullYear()}</h1>
    <button class="icon-btn" data-act="next-month" aria-label="Следующий месяц">${icon('chevR')}</button>
  </header>`;
}

function txList(list) {
  if (!list.length) return '';
  const groups = new Map();
  for (const t of sorted(list)) {
    const k = dayKey(t.ts);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(t);
  }
  let html = '';
  for (const [k, items] of groups) {
    const net = sum(items, 'income') - sum(items, 'expense');
    html += `<div class="tx-day"><span>${dayLabel(k)}</span><span class="num">${net > 0 ? '+' : net < 0 ? '−' : ''}${money(Math.abs(net))}</span></div>`;
    html += `<div class="card tx-list">${items.map(txRow).join('')}</div>`;
  }
  return html;
}

function txRow(t) {
  const c = catOf(t.type, t.cat);
  const sec = secOf(t.section);
  const sub = [sec.name, t.note].filter(Boolean).map(esc).join(' · ');
  return `<button class="tx" data-edit="${t.id}">
    ${badge(c)}
    <div style="min-width:0"><div class="t">${esc(c.name)}</div><div class="s">${sub}</div></div>
    <div class="a num ${t.type === 'income' ? 'inc' : ''}">${signed(t)}</div>
  </button>`;
}

// ---------- views ----------
function viewHome() {
  const list = S.tx.filter((t) => inMonth(t.ts, month));
  const inc = sum(list, 'income');
  const exp = sum(list, 'expense');
  const bal = inc - exp;
  const active = secOf(S.activeSection);

  const byCat = {};
  for (const t of list) if (t.type === 'expense') byCat[t.cat] = (byCat[t.cat] || 0) + t.amount;
  const top = Object.entries(byCat).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const max = top.length ? top[0][1] : 1;

  return `${monthHeader()}
  <section class="card balance">
    <div class="label">Баланс за месяц</div>
    <div class="big num">${bal < 0 ? '−' : ''}${money(Math.abs(bal))}</div>
    <div class="split">
      <div><small>Доходы</small><b class="num inc">+${money(inc)}</b></div>
      <div><small>Расходы</small><b class="num exp">−${money(exp)}</b></div>
    </div>
  </section>
  <button class="pill active-sec" data-act="pick-active">
    <span class="row"><span class="dot" style="background:${active.color}"></span><span class="lbl">Записываю в</span> ${esc(active.name)}</span>${icon('chevD')}
  </button>
  ${top.length ? `<h2>Куда уходят деньги</h2><div class="card cat-bars">${top.map(([id, v]) => {
    const c = catOf('expense', id);
    return `<div class="cat-bar">${badge(c)}<div><div class="row" style="justify-content:space-between"><span class="name">${esc(c.name)}</span><span class="num" style="color:var(--muted);font-size:14px">${Math.round((v / exp) * 100)}%</span></div><div class="track"><div class="fill" style="width:${(v / max) * 100}%;background:${c.color}"></div></div></div><b class="num">${money(v)}</b></div>`;
  }).join('')}</div>` : ''}
  ${list.length ? `<h2>Последние записи</h2>${txList(sorted(list).slice(0, 12))}` : `<div class="empty"><b>Пока пусто</b>Нажми «+» внизу и добавь первую трату</div>`}`;
}

function viewHistory() {
  const q = filter.q.trim().toLowerCase();
  const list = S.tx.filter((t) =>
    (filter.section === 'all' || t.section === filter.section) &&
    (filter.type === 'all' || t.type === filter.type) &&
    (!q || catOf(t.type, t.cat).name.toLowerCase().includes(q) || (t.note || '').toLowerCase().includes(q)));
  const inc = sum(list, 'income');
  const exp = sum(list, 'expense');
  const chip = (key, val, label) => `<button class="pill ${filter[key] === val ? 'on' : ''}" data-filter="${key}:${val}">${label}</button>`;

  return `<header class="top"><h1 class="left">История</h1></header>
  <input class="search" type="search" placeholder="Поиск по категории или заметке" value="${esc(filter.q)}" data-act="search">
  <div class="scroll-x">
    ${chip('type', 'all', 'Все')}${chip('type', 'expense', 'Расходы')}${chip('type', 'income', 'Доходы')}
  </div>
  <div class="scroll-x" style="margin-top:8px">
    ${chip('section', 'all', 'Все разделы')}
    ${S.sections.map((s) => `<button class="pill ${filter.section === s.id ? 'on' : ''}" data-filter="section:${s.id}"><span class="dot" style="background:${s.color}"></span>${esc(s.name)}</button>`).join('')}
  </div>
  ${list.length ? `<div class="split" style="margin-top:14px">
      <div class="card"><small>Доходы</small><b class="num inc">+${money(inc)}</b></div>
      <div class="card"><small>Расходы</small><b class="num exp">−${money(exp)}</b></div>
    </div>${txList(list)}` : '<div class="empty"><b>Ничего не найдено</b>Попробуй изменить фильтры</div>'}`;
}

function viewSections() {
  return `<header class="top"><h1 class="left">Разделы</h1><button class="icon-btn" data-act="settings" aria-label="Настройки">${icon('gear')}</button></header>
  <p style="color:var(--muted);margin:0 4px 16px;font-size:14px">Раздел — это отдельная «глава» трат: поездка, ремонт, свадьба. Выбери активный раздел, и новые записи будут попадать в него.</p>
  ${S.sections.map((s) => {
    const list = S.tx.filter((t) => t.section === s.id);
    const exp = sum(list, 'expense');
    const inc = sum(list, 'income');
    const isActive = s.id === S.activeSection;
    return `<button class="card sec-card" data-sec="${s.id}">
      <span class="badge" style="background:${s.color}26;color:${s.color}">${icon('folder')}</span>
      <div style="min-width:0"><div class="t">${esc(s.name)}</div>
      <div class="s">${isActive ? '<span class="tag-active">АКТИВНЫЙ</span> ' : ''}${list.length} ${plural(list.length, 'запись', 'записи', 'записей')}${inc ? ` · <span class="inc">+${money(inc)}</span>` : ''}</div></div>
      <b class="num exp">−${money(exp)}</b>
    </button>`;
  }).join('')}
  <button class="add-row" data-act="new-section">${icon('plus')} Новый раздел</button>`;
}

function viewStats() {
  const list = S.tx.filter((t) => inMonth(t.ts, month));
  const exp = sum(list, 'expense');
  const byCat = {};
  for (const t of list) if (t.type === 'expense') byCat[t.cat] = (byCat[t.cat] || 0) + t.amount;
  const parts = Object.entries(byCat).sort((a, b) => b[1] - a[1]).map(([id, v]) => ({ c: catOf('expense', id), v }));

  const bySec = {};
  for (const t of list) if (t.type === 'expense') bySec[t.section] = (bySec[t.section] || 0) + t.amount;

  return `${monthHeader()}
  <h2>Расходы по категориям</h2>
  ${exp ? `<div class="card">
    <div class="donut-wrap">${donut(parts, exp)}<div class="donut-center"><small>Всего</small><b class="num">${money(exp)}</b></div></div>
    <div class="legend">${parts.map((p) => `<div class="cat-bar">${badge(p.c)}<span class="name">${esc(p.c.name)}</span><span class="num">${money(p.v)} <span style="color:var(--muted)">· ${Math.round((p.v / exp) * 100)}%</span></span></div>`).join('')}</div>
  </div>` : '<div class="card empty">В этом месяце расходов нет</div>'}
  ${Object.keys(bySec).length > 1 ? `<h2>По разделам</h2><div class="card legend">${Object.entries(bySec).sort((a, b) => b[1] - a[1]).map(([id, v]) => {
    const s = secOf(id);
    return `<div class="cat-bar"><span class="badge" style="background:${s.color}26;color:${s.color}">${icon('folder')}</span><span class="name">${esc(s.name)}</span><b class="num">${money(v)}</b></div>`;
  }).join('')}</div>` : ''}
  <h2>Доходы и расходы за 6 месяцев</h2>
  <div class="card chart-card">${bars()}<div class="bars-legend"><span><i style="background:var(--income)"></i>Доходы</span><span><i style="background:var(--expense)"></i>Расходы</span></div></div>`;
}

function donut(parts, total) {
  const r = 70, c = 2 * Math.PI * r, gap = parts.length > 1 ? 3 : 0;
  let off = 0;
  const segs = parts.map((p) => {
    const len = (p.v / total) * c;
    const seg = `<circle r="${r}" cx="90" cy="90" fill="none" stroke="${p.c.color}" stroke-width="22" stroke-dasharray="${Math.max(len - gap, 0.1)} ${c}" stroke-dashoffset="${-off}" transform="rotate(-90 90 90)"><title>${esc(p.c.name)}: ${money(p.v)}</title></circle>`;
    off += len;
    return seg;
  });
  return `<svg width="180" height="180" viewBox="0 0 180 180" role="img" aria-label="Диаграмма расходов по категориям">${segs.join('')}</svg>`;
}

function bars() {
  const months = [];
  for (let i = 5; i >= 0; i--) months.push(new Date(month.getFullYear(), month.getMonth() - i, 1));
  const data = months.map((m) => {
    const l = S.tx.filter((t) => inMonth(t.ts, m));
    return { m, inc: sum(l, 'income'), exp: sum(l, 'expense') };
  });
  const max = Math.max(1, ...data.flatMap((d) => [d.inc, d.exp]));
  const W = 320, H = 150, bw = 14, step = W / 6;
  const cols = data.map((d, i) => {
    const x = i * step + step / 2;
    const hi = (d.inc / max) * (H - 24), he = (d.exp / max) * (H - 24);
    return `<rect x="${x - bw - 1}" y="${H - 20 - hi}" width="${bw}" height="${Math.max(hi, 1)}" rx="4" fill="var(--income)"><title>Доходы: ${money(d.inc)}</title></rect>
      <rect x="${x + 1}" y="${H - 20 - he}" width="${bw}" height="${Math.max(he, 1)}" rx="4" fill="var(--expense)"><title>Расходы: ${money(d.exp)}</title></rect>
      <text x="${x}" y="${H - 4}" text-anchor="middle" font-size="11" fill="#94A3B8">${MONTHS[d.m.getMonth()].slice(0, 3)}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Доходы и расходы по месяцам"><line x1="0" x2="${W}" y1="${H - 20}" y2="${H - 20}" stroke="rgba(148,163,184,.2)"/>${cols.join('')}</svg>`;
}

const plural = (n, one, few, many) => {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
};

// ---------- sheets ----------
function openSheet(html, { full = false } = {}) {
  removeSheet();
  const wrap = document.createElement('div');
  wrap.className = 'sheet-wrap';
  wrap.id = 'sheet';
  wrap.innerHTML = `${full ? '' : '<div class="backdrop" data-act="close"></div>'}<div class="sheet ${full ? 'full' : ''}" role="dialog" aria-modal="true">${full ? '' : '<div class="grabber"></div>'}${html}</div>`;
  document.body.appendChild(wrap);
  document.body.style.overflow = 'hidden';
}
function removeSheet() {
  if (listener) { listener.abort(); listener = null; }
  const s = $('#sheet');
  if (s) s.remove();
  document.body.style.overflow = '';
}
function closeSheet() {
  removeSheet();
  draft = null;
}

function picker(title, options, onPick) {
  pickHandler = onPick;
  openSheet(`<h3>${title}</h3>${options.map((o) => `<button class="option ${o.on ? 'on' : ''} ${o.danger ? 'danger' : ''}" data-pick="${esc(o.value)}">
    ${o.color ? `<span class="pill" style="padding:0;min-height:0;border:0;background:none"><span class="dot" style="background:${o.color}"></span></span>` : ''}
    <span class="grow">${esc(o.label)}</span>${o.on ? icon('check') : ''}</button>`).join('')}`);
}
let pickHandler = null;

// ---------- quick add ----------
let draft = null;

function openAdd(type = 'expense', tx = null) {
  draft = tx
    ? { id: tx.id, type: tx.type, amount: String(tx.amount), cat: tx.cat, section: tx.section, note: tx.note || '', day: dayKey(tx.ts) }
    : { id: null, type, amount: '', cat: null, section: S.activeSection, note: '', day: dayKey(Date.now()) };
  openSheet('<div id="qa" style="display:flex;flex-direction:column;flex:1"></div>', { full: true });
  renderAdd();
}

function renderAdd() {
  const d = draft;
  const amt = Number(d.amount || 0);
  const sec = secOf(d.section);
  const isToday = d.day === dayKey(Date.now());
  const cats = S.cats[d.type];
  $('#qa').innerHTML = `
    <div class="qa-head">
      <button class="icon-btn" data-act="close" aria-label="Закрыть">${icon('x')}</button>
      <div class="seg" role="tablist">
        <button class="${d.type === 'expense' ? 'on e' : ''}" data-type="expense">Расход</button>
        <button class="${d.type === 'income' ? 'on i' : ''}" data-type="income">Доход</button>
      </div>
      ${d.id ? `<button class="icon-btn" data-act="delete" aria-label="Удалить" style="color:var(--danger)">${icon('trash')}</button>` : `<button class="icon-btn voice-btn" data-act="voice" aria-label="Сказать голосом">${icon('mic')}</button>`}
    </div>
    <div class="amount num ${amt ? '' : 'zero'}" id="amt" style="color:${amt ? (d.type === 'income' ? 'var(--income)' : 'var(--text)') : ''}">${money(amt)}</div>
    <div class="meta">
      <button class="pill" data-act="pick-section"><span class="dot" style="background:${sec.color}"></span>${esc(sec.name)}</button>
      <label class="pill">${icon('calendar')}${isToday ? 'Сегодня' : dayLabel(d.day)}<input type="date" value="${d.day}" max="${dayKey(Date.now())}" data-act="date" aria-label="Дата"></label>
    </div>
    <input class="note" placeholder="Заметка (необязательно)" value="${esc(d.note)}" data-act="note" maxlength="80">
    <div class="cats">
      ${cats.map((c) => `<button class="cat ${d.cat === c.id ? 'on' : ''}" data-cat="${c.id}">${badge(c)}<span>${esc(c.name)}</span></button>`).join('')}
      <button class="cat" data-act="new-cat">${badge({ icon: 'plus', color: '#64748B' })}<span>Своя</span></button>
    </div>
    <div class="pad">
      ${['1', '2', '3', '4', '5', '6', '7', '8', '9', '000', '0'].map((k) => `<button class="num" data-key="${k}">${k}</button>`).join('')}
      <button data-key="del" aria-label="Стереть">${icon('del')}</button>
    </div>
    ${d.id ? `<button class="save" data-act="save" ${amt && d.cat ? '' : 'disabled'}>Сохранить</button>` : ''}`;
}

function pressKey(k) {
  if (k === 'del') draft.amount = draft.amount.slice(0, -1);
  else if (draft.amount.length < 10) draft.amount = (draft.amount + k).replace(/^0+/, '');
  renderAdd();
}

function shake() {
  const el = $('#amt');
  el.classList.remove('shake');
  void el.offsetWidth;
  el.classList.add('shake');
}

function commit() {
  const d = draft;
  const amount = Number(d.amount || 0);
  if (!amount) return shake();
  if (!d.cat) return;
  const [y, m, dd] = d.day.split('-').map(Number);
  const now = new Date();
  const ts = d.day === dayKey(now) ? now.getTime() : new Date(y, m - 1, dd, 12).getTime();
  const rec = { id: d.id || uid(), type: d.type, amount, cat: d.cat, section: d.section, note: d.note.trim(), ts };
  if (d.id) {
    const old = S.tx.find((t) => t.id === d.id);
    rec.ts = d.day === dayKey(old.ts) ? old.ts : ts;
    S.tx = S.tx.map((t) => (t.id === d.id ? rec : t));
  } else {
    S.tx.push(rec);
  }
  save();
  closeSheet();
  render();
  if (navigator.vibrate) navigator.vibrate(10);
  toast(`${signed(rec)} · ${catOf(rec.type, rec.cat).name}`, d.id ? null : () => { S.tx = S.tx.filter((t) => t.id !== rec.id); save(); render(); });
}

// ---------- voice ----------
// Phrases like «1500 тенге сегодня потратил на бензин» are parsed on the device, no network needed.
const NUM_WORDS = {
  один: 1, одна: 1, одну: 1, два: 2, две: 2, три: 3, четыре: 4, пять: 5, шесть: 6, семь: 7, восемь: 8, девять: 9, десять: 10,
  одиннадцать: 11, двенадцать: 12, тринадцать: 13, четырнадцать: 14, пятнадцать: 15, шестнадцать: 16, семнадцать: 17,
  восемнадцать: 18, девятнадцать: 19, двадцать: 20, тридцать: 30, сорок: 40, пятьдесят: 50, шестьдесят: 60, семьдесят: 70,
  восемьдесят: 80, девяносто: 90, сто: 100, двести: 200, триста: 300, четыреста: 400, пятьсот: 500, шестьсот: 600,
  семьсот: 700, восемьсот: 800, девятьсот: 900,
};

const KEYWORDS = {
  expense: [
    ['auto', /бензин|заправ|топлив|солярк|мойк|парковк|штраф|шиномонтаж|автосервис|машин/],
    ['taxi', /такси|яндекс\s?го|uber|убер|indrive|индрайв/],
    ['transport', /автобус|метро|проезд|транспорт|онай|электричк|поезд|самол|авиа|билет/],
    ['cafe', /кафе|коф|ресторан|обед|ужин|завтрак|бургер|пицц|шаурм|суши|столов|макдон/],
    ['food', /продукт|магазин|супермаркет|магнум|смолл|хлеб|молок|мяс|овощ|фрукт|(?<![а-я])ед[ау](?![а-я])|рынок|базар/],
    ['shop', /одежд|обув|кроссов|куртк|футболк|вайлдб|wildberries|ozon|озон|техник|косметик/],
    ['phone', /связ|телефон|мобильн|интернет|баланс/],
    ['home', /квартир|аренд|коммунал|(?<![а-я])свет|электричеств|ремонт|мебел|посуд/],
    ['health', /аптек|лекарств|таблет|врач|больниц|клиник|стоматолог|зуб|анализ/],
    ['fun', /кино|развлеч|(?<![а-я])бар(?![а-я])|клуб|игр|концерт|отдых|спортзал|фитнес|бассейн|подписк/],
    ['gift', /подар|цвет/],
  ],
  income: [
    ['salary', /зарплат|(?<![а-я])зп(?![а-я])|аванс|оклад|преми/],
    ['side', /подработ|фриланс|заказ|халтур/],
    ['gift_in', /подарил|подарок|подарк/],
  ],
};
const INCOME_RE = /зарплат|(?<![а-я])зп(?![а-я])|аванс|оклад|преми|получил|заработ|пришл|пришел|поступ|доход|подработ|фриланс|кешб|кэшб|вернули|мне перевел|перевели мне|подарили/;

function parseAmount(t) {
  // «450 тысяч», «2,5 тыс», «450к» (к only when glued to the number, so «1500 к ужину» stays 1500)
  const m = t.match(/(\d[\d\s ]*\d|\d)(?:[.,](\d+))?(?:\s*(тыс\S*|млн\S*|миллион\S*)|(к)(?![а-яa-z]))?/);
  if (m) {
    const n = parseFloat(m[1].replace(/[\s ]/g, '') + (m[2] ? '.' + m[2] : ''));
    const unit = m[3] || m[4];
    const mult = unit ? (unit.startsWith('м') ? 1e6 : 1000) : 1;
    return { amount: Math.round(n * mult), used: [m[0]] };
  }
  // spelled out: «полторы тысячи», «две тысячи пятьсот», «тысячу»
  let total = 0, cur = 0, started = false;
  const used = [];
  for (const w of t.split(/\s+/)) {
    if (w in NUM_WORDS) cur += NUM_WORDS[w];
    else if (/^полтор/.test(w)) cur += 1.5;
    else if (/^тысяч/.test(w)) { total += (cur || 1) * 1000; cur = 0; }
    else if (started) break;
    else continue;
    started = true;
    used.push(w);
  }
  const amount = Math.round(total + cur);
  return amount ? { amount, used } : null;
}

function parseSpeech(raw) {
  const t = raw.toLowerCase().replace(/ё/g, 'е').trim();
  const a = parseAmount(t);
  if (!a) return null;
  const type = INCOME_RE.test(t) ? 'income' : 'expense';

  let cat = (KEYWORDS[type].find(([, re]) => re.test(t)) || [])[0];
  if (!cat) {
    // user-made categories: match by the start of their name
    const own = S.cats[type].find((c) => c.name.length > 2 && t.includes(c.name.toLowerCase().slice(0, Math.max(3, c.name.length - 2))));
    cat = own ? own.id : (S.cats[type].find((c) => /^other/.test(c.id)) || S.cats[type].at(-1)).id;
  }

  const sec = S.sections.find((s) => t.includes(s.name.toLowerCase().replace(/ё/g, 'е').slice(0, Math.max(4, s.name.length - 3))));
  const back = /позавчера/.test(t) ? 2 : /вчера/.test(t) ? 1 : 0;
  const d = new Date();
  const ts = back ? new Date(d.getFullYear(), d.getMonth(), d.getDate() - back, 12).getTime() : d.getTime();

  let note = t;
  for (const u of a.used) note = note.replace(u, ' ');
  note = note
    .replace(/тенге|(?<![а-я])тг(?![а-я])|₸/g, ' ')
    .replace(/позавчера|вчера|сегодня/g, ' ')
    .replace(/(?<![а-я])(я\s+)?(потратил|заплатил|отдал|купил|получил|заработал|пришел|пришл)[аио]?(?![а-я])/g, ' ')
    .replace(/\s+/g, ' ').trim()
    .replace(/^(на|за|в|во)\s+/, '')
    .slice(0, 80);
  note = note.charAt(0).toUpperCase() + note.slice(1);

  return { type, amount: a.amount, cat, section: sec ? sec.id : S.activeSection, ts, note };
}

const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
let listener = null;

function openVoice() {
  draft = null;
  openSheet(`<h3>Скажи, что записать</h3>
    <p class="voice-hint">Например: «1500 на бензин», «вчера такси 2000», «зарплата 450 тысяч»</p>
    <form class="voice-row" data-form="voice">
      <input class="field" id="voice-text" autocomplete="off" placeholder="Говори или пиши…" enterkeyhint="done" aria-label="Фраза">
      <button type="button" class="mic-btn" data-act="mic" aria-label="Слушать">${icon('mic')}</button>
    </form>
    <p class="voice-status" id="voice-status" role="status"></p>
    <button class="save" data-act="voice-save">Записать</button>`);
  listen();
}

function voiceStatus(text) { const el = $('#voice-status'); if (el) el.textContent = text; }
function keyboardFallback() {
  voiceStatus('Нажми на поле выше, потом на микрофон на клавиатуре iPhone и продиктуй. Затем «Записать».');
}

function listen() {
  if (!SpeechRec) return keyboardFallback();
  let finalText = '';
  try {
    listener = new SpeechRec();
    listener.lang = 'ru-RU';
    listener.interimResults = true;
    listener.onresult = (e) => {
      const text = [...e.results].map((r) => r[0].transcript).join('');
      const input = $('#voice-text');
      if (input) input.value = text;
      if (e.results[e.results.length - 1].isFinal) finalText = text;
    };
    listener.onerror = (e) => {
      if (e.error === 'no-speech') voiceStatus('Ничего не услышал. Нажми микрофон и скажи ещё раз.');
      else if (e.error !== 'aborted') keyboardFallback();
    };
    listener.onend = () => {
      listener = null;
      $('.mic-btn')?.classList.remove('on');
      if (finalText.trim() && $('#voice-text')) voiceCommit(finalText);
    };
    listener.start();
    $('.mic-btn')?.classList.add('on');
    voiceStatus('Слушаю…');
  } catch (e) {
    listener = null;
    keyboardFallback();
  }
}

function voiceCommit(text) {
  const p = parseSpeech(text || '');
  if (!p) { voiceStatus('Не понял сумму. Скажи, например: «1500 на бензин».'); return; }
  const rec = { id: uid(), ...p };
  S.tx.push(rec);
  save();
  closeSheet();
  render();
  const where = p.section !== S.activeSection ? ` · ${secOf(p.section).name}` : '';
  toast(`${signed(rec)} · ${catOf(rec.type, rec.cat).name}${where}`, () => { S.tx = S.tx.filter((t) => t.id !== rec.id); save(); render(); });
}

// ---------- toast ----------
let toastTimer;
function toast(text, undo) {
  clearTimeout(toastTimer);
  document.querySelector('.toast')?.remove();
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.innerHTML = `<span class="grow num">${esc(text)}</span>${undo ? '<button>Отменить</button>' : ''}`;
  if (undo) el.querySelector('button').onclick = () => { undo(); el.remove(); };
  document.body.appendChild(el);
  toastTimer = setTimeout(() => el.remove(), 3500);
}

// ---------- sections & settings ----------
function sectionForm(sec) {
  const s = sec || { id: null, name: '', color: PALETTE[S.sections.length % PALETTE.length] };
  secDraft = { ...s };
  openSheet(`<h3>${sec ? 'Раздел' : 'Новый раздел'}</h3>
    <input class="field" id="sec-name" placeholder="Например: Поездка в Стамбул" value="${esc(s.name)}" maxlength="40">
    <div class="colors">${PALETTE.map((c) => `<button style="background:${c}" class="${c === s.color ? 'on' : ''}" data-color="${c}" aria-label="Цвет ${c}"></button>`).join('')}</div>
    <div class="btn-row">
      ${sec && S.sections.length > 1 ? `<button class="btn danger" data-act="del-section">Удалить</button>` : ''}
      <button class="btn primary" data-act="save-section">${sec ? 'Сохранить' : 'Создать'}</button>
    </div>
    ${sec && sec.id !== S.activeSection ? `<button class="btn" style="width:100%;margin-top:10px" data-act="activate-section">Сделать активным</button>` : ''}
    ${sec ? `<button class="btn" style="width:100%;margin-top:10px" data-act="open-section">Показать записи</button>` : ''}`);
  setTimeout(() => { if (!sec) $('#sec-name')?.focus(); }, 50);
}
let secDraft = null;

function settings() {
  openSheet(`<h3>Настройки</h3>
    <button class="option" data-act="toggle-quick"><span class="grow">Открывать сразу ввод траты</span>${S.quickOpen ? icon('check') : ''}</button>
    <button class="option" data-act="export-csv"><span class="grow">Экспорт в Excel (CSV)</span></button>
    <button class="option" data-act="export-json"><span class="grow">Сохранить резервную копию</span></button>
    <label class="option"><span class="grow">Восстановить из копии</span><input type="file" accept="application/json,.json" data-act="import" hidden></label>
    <button class="option danger" data-act="reset"><span class="grow">Удалить все данные</span></button>
    <p style="color:var(--dim);font-size:13px;margin:12px 4px 0">Данные хранятся только на этом телефоне. Делай резервную копию раз в месяц.</p>`);
}

function download(name, text, type) {
  const blob = new Blob([text], { type });
  const file = new File([blob], name, { type });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    navigator.share({ files: [file] }).catch(() => {});
    return;
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function exportCSV() {
  const rows = [['Дата', 'Тип', 'Сумма', 'Категория', 'Раздел', 'Заметка']];
  for (const t of sorted(S.tx)) rows.push([dayKey(t.ts), t.type === 'income' ? 'Доход' : 'Расход', t.type === 'income' ? t.amount : -t.amount, catOf(t.type, t.cat).name, secOf(t.section).name, t.note || '']);
  const csv = '﻿' + rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(';')).join('\r\n');
  download(`tenge-${dayKey(Date.now())}.csv`, csv, 'text/csv');
}

// ---------- events ----------
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act],[data-go],[data-key],[data-cat],[data-type],[data-edit],[data-filter],[data-sec],[data-pick],[data-color]');
  if (!el) return;
  const ds = el.dataset;

  if (ds.go) return go(ds.go);
  if (ds.key) return pressKey(ds.key);
  if (ds.type) { draft.type = ds.type; draft.cat = null; return renderAdd(); }
  if (ds.cat) {
    draft.cat = ds.cat;
    if (!draft.id && Number(draft.amount)) return commit();
    renderAdd();
    if (!Number(draft.amount)) shake();
    return;
  }
  if (ds.edit) return openAdd('expense', S.tx.find((t) => t.id === ds.edit));
  if (ds.filter) { const [k, v] = ds.filter.split(':'); filter[k] = v; return render(); }
  if (ds.sec) return sectionForm(secOf(ds.sec));
  if (ds.pick) { const h = pickHandler; closeSheet(); return h && h(ds.pick); }
  if (ds.color) {
    secDraft.color = ds.color;
    document.querySelectorAll('[data-color]').forEach((b) => b.classList.toggle('on', b.dataset.color === ds.color));
    return;
  }

  switch (ds.act) {
    case 'add': return openAdd();
    case 'voice': return openVoice();
    case 'mic': return listener ? listener.stop() : listen();
    case 'voice-save': return voiceCommit($('#voice-text').value);
    case 'close': return closeSheet();
    case 'save': return commit();
    case 'prev-month': month = new Date(month.getFullYear(), month.getMonth() - 1, 1); return render();
    case 'next-month': month = new Date(month.getFullYear(), month.getMonth() + 1, 1); return render();
    case 'pick-active':
      return picker('Записывать в раздел', S.sections.map((s) => ({ value: s.id, label: s.name, color: s.color, on: s.id === S.activeSection })), (id) => { S.activeSection = id; save(); render(); });
    case 'pick-section': {
      const d = draft;
      const back = () => { draft = d; openSheet('<div id="qa" style="display:flex;flex-direction:column;flex:1"></div>', { full: true }); renderAdd(); };
      picker('Раздел для записи', S.sections.map((s) => ({ value: s.id, label: s.name, color: s.color, on: s.id === d.section })), (id) => { d.section = id; back(); });
      $('#sheet .backdrop').dataset.act = 'back-to-add';
      backToAdd = back;
      return;
    }
    case 'back-to-add': return backToAdd && backToAdd();
    case 'delete':
      if (confirm('Удалить эту запись?')) { S.tx = S.tx.filter((t) => t.id !== draft.id); save(); closeSheet(); render(); toast('Запись удалена'); }
      return;
    case 'new-cat': {
      const name = (prompt('Название категории') || '').trim().slice(0, 20);
      if (!name) return;
      const c = { id: uid(), name, icon: 'tag', color: PALETTE[S.cats[draft.type].length % PALETTE.length] };
      S.cats[draft.type].splice(S.cats[draft.type].length - 1, 0, c);
      save();
      draft.cat = c.id;
      return renderAdd();
    }
    case 'new-section': return sectionForm(null);
    case 'save-section': {
      const name = $('#sec-name').value.trim();
      if (!name) return $('#sec-name').focus();
      if (secDraft.id) S.sections = S.sections.map((s) => (s.id === secDraft.id ? { ...secDraft, name } : s));
      else S.sections.push({ id: uid(), name, color: secDraft.color });
      save(); closeSheet(); return render();
    }
    case 'del-section': {
      const n = S.tx.filter((t) => t.section === secDraft.id).length;
      const fallback = S.sections.find((s) => s.id !== secDraft.id);
      if (!confirm(n ? `Удалить раздел? ${n} ${plural(n, 'запись перейдёт', 'записи перейдут', 'записей перейдут')} в «${fallback.name}».` : 'Удалить раздел?')) return;
      S.tx.forEach((t) => { if (t.section === secDraft.id) t.section = fallback.id; });
      S.sections = S.sections.filter((s) => s.id !== secDraft.id);
      if (S.activeSection === secDraft.id) S.activeSection = fallback.id;
      if (filter.section === secDraft.id) filter.section = 'all';
      save(); closeSheet(); return render();
    }
    case 'activate-section': S.activeSection = secDraft.id; save(); closeSheet(); render(); return toast(`Новые записи идут в «${secOf(S.activeSection).name}»`);
    case 'open-section': filter = { section: secDraft.id, type: 'all', q: '' }; closeSheet(); return go('history');
    case 'settings': return settings();
    case 'toggle-quick': S.quickOpen = !S.quickOpen; save(); return settings();
    case 'export-csv': return exportCSV();
    case 'export-json': return download(`tenge-backup-${dayKey(Date.now())}.json`, JSON.stringify(S), 'application/json');
    case 'reset':
      if (confirm('Удалить ВСЕ записи и разделы? Это нельзя отменить.')) { S = defaults(); save(); closeSheet(); go('home'); }
      return;
  }
});
let backToAdd = null;

document.addEventListener('input', (e) => {
  const act = e.target.dataset.act;
  if (act === 'note') draft.note = e.target.value;
  if (act === 'search') {
    filter.q = e.target.value;
    const pos = e.target.selectionStart;
    render();
    const s = $('.search');
    s.focus();
    s.setSelectionRange(pos, pos);
  }
});

document.addEventListener('change', (e) => {
  const act = e.target.dataset.act;
  if (act === 'date' && e.target.value) { draft.day = e.target.value; renderAdd(); }
  if (act === 'import') {
    const f = e.target.files[0];
    if (!f) return;
    f.text().then((txt) => {
      const data = JSON.parse(txt);
      if (!Array.isArray(data.tx) || !data.cats || !data.sections) throw new Error('bad file');
      if (!confirm(`Заменить текущие данные копией (${data.tx.length} записей)?`)) return;
      S = data; save(); closeSheet(); go('home'); toast('Данные восстановлены');
    }).catch(() => toast('Это не файл резервной копии'));
  }
});

document.addEventListener('submit', (e) => {
  if (e.target.dataset.form !== 'voice') return;
  e.preventDefault();
  voiceCommit($('#voice-text').value);
});

document.addEventListener('keydown', (e) => {
  if (!draft || e.target.tagName === 'INPUT') return;
  if (/^[0-9]$/.test(e.key)) pressKey(e.key);
  else if (e.key === 'Backspace') pressKey('del');
  else if (e.key === 'Escape') closeSheet();
});

// ---------- boot ----------
render();
const params = new URLSearchParams(location.search);
const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
// The home-screen icon launches with ?add=expense; the setting decides whether that opens the keypad.
if (standalone ? S.quickOpen : params.has('add')) openAdd(params.get('add') === 'income' ? 'income' : 'expense');
if (params.has('add')) history.replaceState(null, '', location.pathname);

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
