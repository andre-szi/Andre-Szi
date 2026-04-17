/* ---- SKILLS ---- */
const skills = [
  { name:'HTML5',      cat:'frontend', icon:'https://cdn.simpleicons.org/html5/E34F26' },
  { name:'CSS3',       cat:'frontend', icon:'https://cdn.simpleicons.org/css/1572B6' },
  { name:'JavaScript', cat:'frontend', icon:'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name:'TypeScript', cat:'frontend', icon:'https://cdn.simpleicons.org/typescript/3178C6' },
  { name:'React',      cat:'frontend', icon:'https://cdn.simpleicons.org/react/61DAFB' },
  { name:'Bootstrap',  cat:'frontend', icon:'https://cdn.simpleicons.org/bootstrap/7952B3' },
  { name:'Python',     cat:'backend',  icon:'https://cdn.simpleicons.org/python/3776AB' },
  { name:'PHP',        cat:'backend',  icon:'https://cdn.simpleicons.org/php/777BB4' },
  { name:'Node.js',    cat:'backend',  icon:'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name:'Laravel',    cat:'backend',  icon:'https://cdn.simpleicons.org/laravel/FF2D20' },
  { name:'MySQL',      cat:'database', icon:'https://cdn.simpleicons.org/mysql/4479A1' },
  { name:'PostgreSQL', cat:'database', icon:'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name:'MongoDB',    cat:'database', icon:'https://cdn.simpleicons.org/mongodb/47A248' },
  { name:'Git',        cat:'tools',    icon:'https://cdn.simpleicons.org/git/F05032' },
  { name:'GitHub',     cat:'tools',    icon:'https://cdn.simpleicons.org/github/ffffff' },
  { name:'VS Code',    cat:'tools',    icon:'https://cdn.simpleicons.org/codecrafters/ffffff' },
  { name:'Figma',      cat:'tools',    icon:'https://cdn.simpleicons.org/figma/F24E1E' },
  { name:'Postman',    cat:'tools',    icon:'https://cdn.simpleicons.org/postman/FF6C37' },
];

function renderSkills(cat) {
  const list = cat === 'all' ? skills : skills.filter(s => s.cat === cat);
  document.getElementById('skGrid').innerHTML = list.map(s =>
    `<div class="sk-card">
      <img src="${s.icon}" alt="${s.name}" loading="lazy">
      <h4>${s.name}</h4>
      <span>${s.cat}</span>
    </div>`
  ).join('');
}
renderSkills('all');

document.querySelectorAll('.sk-flt').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.sk-flt').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
    renderSkills(b.dataset.c);
  });
});

/* ---- DISCUSSION ---- */
const initMsgs = [
  { i:'S', name:'Salvatore',   staff:false, time:'2h ago', text:'Keren banget portfolionya Andre! Designnya clean dan modern.' },
  { i:'A', name:'Andre Alfaridzi', staff:true,  time:'1h ago', text:'Makasih Salvatore! Semoga bisa terus improve.' },
  { i:'C', name:'Cupa',     staff:false, time:'5h ago', text:'Sukses terus ya Andre, keep learning & growing!' },
];
let discList = [...initMsgs];

function renderDisc() {
  document.getElementById('discBody').innerHTML = discList.map(m => `
    <div class="c-disc-msg">
      <div class="c-disc-avatar">${m.i}</div>
      <div class="c-disc-content">
        <div class="c-disc-meta">
          <span class="c-disc-name">${m.name}${m.staff ? '.' : ''}</span>
          ${m.staff ? '<span class="c-disc-badge">Owner</span>' : ''}
          <span class="c-disc-time">• ${m.time}</span>
        </div>
        <div class="c-disc-text">${m.text}</div>
      </div>
    </div>`).join('');
}
renderDisc();

document.getElementById('discSend').addEventListener('click', () => {
  const inp = document.getElementById('discInput');
  const val = inp.value.trim();
  if (!val) return;
  discList.push({ i:'Y', name:'You', staff:false, time:'Just now', text: val });
  renderDisc();
  inp.value = '';
});

document.getElementById('discInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('discSend').click();
});

/* ---- 3D TILT + SPOTLIGHT + GRAYSCALE-TO-COLOR ---- */
const frame = document.getElementById('heroFrame');
const spot  = document.getElementById('heroSpot');

frame.addEventListener('mousemove', e => {
  const rect = frame.getBoundingClientRect();
  const x    = e.clientX - rect.left;
  const y    = e.clientY - rect.top;
  const cx   = rect.width  / 2;
  const cy   = rect.height / 2;
  const rotX = ((y - cy) / cy) * -14;
  const rotY = ((x - cx) / cx) *  14;

  frame.style.transition = 'transform .1s ease-out';
  frame.style.transform  =
    `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04,1.04,1.04)`;

  spot.style.background =
    `radial-gradient(circle 130px at ${x}px ${y}px, rgba(255,255,255,0.13), transparent 70%)`;
});

frame.addEventListener('mouseleave', () => {
  frame.style.transition = 'transform .6s cubic-bezier(.23,1,.32,1)';
  frame.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
});

/* ---- THEME TOGGLE ---- */
const htmlEl = document.documentElement;
const moon   = document.getElementById('iconMoon');
const sun    = document.getElementById('iconSun');

document.getElementById('thBtn').addEventListener('click', () => {
  const isDark = htmlEl.getAttribute('data-theme') === 'dark';
  htmlEl.setAttribute('data-theme', isDark ? 'light' : 'dark');
  moon.style.display = isDark ? 'block' : 'none';
  sun.style.display  = isDark ? 'none'  : 'block';
});

/* ---- MOBILE MENU ---- */
document.getElementById('hbgBtn').addEventListener('click', () =>
  document.getElementById('mobMenu').classList.toggle('open'));

function closeMob() {
  document.getElementById('mobMenu').classList.remove('open');
}

/* ---- SCROLL OBSERVER ---- */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: 0.08 });

document.querySelectorAll('.fi, .edu-item').forEach(el => obs.observe(el));
document.querySelectorAll('.edu-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
});


