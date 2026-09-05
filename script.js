let audioCtx = null;
let skipCurrent = false;
let visited = { messenger:false, instagram:false, notes:false, fichiers:false };
let unlocked = false;
let ghostTimers = [];
let currentThread = null;

document.addEventListener('click', () => { skipCurrent = true; }, true);

function wait(ms){ return new Promise(r => setTimeout(r, ms)); }

function ensureAudio(){
  if (audioCtx) return;
  try{ audioCtx = new (window.AudioContext||window.webkitAudioContext)(); }catch(e){}
}

function tone(freq, dur, type, gainVal){
  if (!audioCtx) return;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type || 'sine';
  o.frequency.value = freq;
  g.gain.value = gainVal || 0.05;
  o.connect(g).connect(audioCtx.destination);
  o.start();
  g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
  o.stop(audioCtx.currentTime + dur + 0.05);
}

function droneStart(){
  if (!audioCtx) return;
  const o1 = audioCtx.createOscillator(); const g1 = audioCtx.createGain();
  o1.type='sine'; o1.frequency.value=52; g1.gain.value=0.03;
  o1.connect(g1).connect(audioCtx.destination); o1.start();
  const o2 = audioCtx.createOscillator(); const g2 = audioCtx.createGain();
  o2.type='sine'; o2.frequency.value=55.5; g2.gain.value=0.018;
  o2.connect(g2).connect(audioCtx.destination); o2.start();
}

function jumpNoise(){ tone(140, 0.55, 'sawtooth', 0.18); }
function thud(){ tone(70, 0.3, 'square', 0.12); }
function heartbeatTick(){ tone(45, 0.18, 'sine', 0.05); }
function ding(){ tone(880, 0.12, 'sine', 0.04); }
function scratchNoise(){
  if (!audioCtx) return;
  const bufferSize = audioCtx.sampleRate * 0.18;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i=0;i<bufferSize;i++) data[i] = (Math.random()*2-1) * 0.3;
  const src = audioCtx.createBufferSource();
  src.buffer = buffer;
  const g = audioCtx.createGain(); g.gain.value = 0.15;
  src.connect(g).connect(audioCtx.destination);
  src.start();
}

function flashWhite(){
  const f = document.getElementById('flash');
  f.style.transition='none'; f.style.opacity='0.9';
  requestAnimationFrame(()=>{ f.style.transition='opacity 0.6s ease'; f.style.opacity='0'; });
}
function glitchPulse(ms){
  const g = document.getElementById('glitchbar');
  g.style.display='block';
  setTimeout(()=>{ g.style.display='none'; }, ms||220);
}
function shakeBig(el){ el.classList.remove('shakeBig'); void el.offsetWidth; el.classList.add('shakeBig'); }
function shakeSmall(el){ el.classList.remove('shakeSmall'); void el.offsetWidth; el.classList.add('shakeSmall'); }

async function typeParagraph(container, text, cls, speed){
  const p = document.createElement('p');
  if (cls) p.className = cls;
  p.classList.add('cursor');
  container.appendChild(p);
  container.scrollTop = container.scrollHeight;
  skipCurrent = false;
  for (let i=0;i<text.length;i++){
    if (skipCurrent){ p.textContent = text; break; }
    p.textContent += text[i];
    container.scrollTop = container.scrollHeight;
    await wait(speed || 22);
  }
  p.classList.remove('cursor');
  skipCurrent = false;
}

async function typeScene(scene, opts){
  opts = opts || {};
  const container = document.getElementById('introText');
  for (const line of scene){
    await typeParagraph(container, line, opts.cls, opts.speed);
    await wait(opts.pause || 550);
  }
}

async function bigFlashText(text, holdMs){
  const el = document.getElementById('bigFlash');
  el.textContent = text;
  el.classList.remove('hidden');
  flashWhite(); jumpNoise(); shakeBig(document.body);
  await wait(holdMs || 1400);
  el.classList.add('hidden');
}

async function playIntro(){
  ensureAudio();
  droneStart();
  const container = document.getElementById('introText');

  await typeScene(INTRO.s1);
  await wait(300);
  await typeScene(INTRO.s2);
  await wait(300);
  await typeScene(INTRO.s3);
  await wait(300);
  await typeScene(INTRO.s4);
  await wait(400);

  await bigFlashText('.......', 900);
  await bigFlashText(INTRO.qui, 1600);

  document.getElementById('shakeWrap').classList.add('trembleContinuous');
  await typeScene(INTRO.s5.slice(0,1));
  await wait(200);
  await typeScene(INTRO.s5.slice(1,3));
  shakeBig(document.getElementById('shakeWrap'));
  thud();
  await typeScene(INTRO.s5.slice(3));
  document.getElementById('shakeWrap').classList.remove('trembleContinuous');
  await wait(400);

  document.getElementById('shakeWrap').classList.add('trembleContinuous');
  await typeScene(INTRO.s6);
  document.getElementById('shakeWrap').classList.remove('trembleContinuous');
  await wait(400);

  await typeParagraph(container, INTRO.s7[0], 'whisperUp');
  await wait(700);
  await typeParagraph(container, INTRO.s7[1]);
  await wait(900);
  await typeParagraph(container, INTRO.s7[2]);
  await wait(1200);
  await typeParagraph(container, INTRO.s7[3]);
  await wait(500);

  await typeScene(INTRO.s8);
  const mock = document.getElementById('introMock');
  mock.classList.remove('hidden');
  ding();
  await wait(2600);
  for (const line of INTRO.s8b){
    await typeParagraph(container, line, line===INTRO.s8b[2] ? 'shout' : null, 40);
    await wait(450);
  }
  mock.classList.add('hidden');
  await wait(300);

  await typeScene(INTRO.s9);
  await wait(300);

  const photoEl = document.getElementById('introPhoto');
  photoEl.classList.remove('hidden');
  flashWhite(); jumpNoise();
  await wait(1800);

  await typeScene(INTRO.s10);
  const scratchInterval = setInterval(()=>{ scratchNoise(); shakeSmall(document.getElementById('shakeWrap')); }, 900);
  await wait(200);
  clearInterval(scratchInterval);
  await wait(300);

  await typeScene(INTRO.s11);
  await wait(600);
  await bigFlashText(INTRO.door, 2400);

  await wait(600);
  const btn = document.getElementById('enterBtn');
  btn.classList.remove('hidden');
}

window.addEventListener('DOMContentLoaded', () => {
  const pre = document.getElementById('preamble');
  const startOnce = () => {
    pre.removeEventListener('click', startOnce);
    ensureAudio();
    playIntro();
  };
  pre.addEventListener('click', startOnce);

  document.getElementById('enterBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    startGame();
  });

  document.getElementById('pwInput').addEventListener('keydown', (e)=>{
    if (e.key === 'Enter') tryPassword();
  });

  document.querySelectorAll('.appicon').forEach(btn=>{
    btn.addEventListener('click', ()=> openApp(btn.dataset.app));
  });
  document.querySelectorAll('[data-back]').forEach(btn=>{
    btn.addEventListener('click', closeApp);
  });
  document.querySelectorAll('.tabBtn').forEach(btn=>{
    btn.addEventListener('click', ()=> switchTab(btn.dataset.tab));
  });
});

function startGame(){
  document.getElementById('preamble').classList.add('hidden');
  document.getElementById('phone').classList.remove('hidden');
  renderHome();
  scheduleClock();
  scheduleGhosts();
}

function scheduleClock(){
  const clock = document.getElementById('clock');
  setInterval(()=>{
    if (Math.random() < 0.15){
      clock.textContent = '03:12';
      clock.classList.add('glitchClock');
      setTimeout(()=>{ clock.classList.remove('glitchClock'); clock.textContent='03:41'; }, 700);
    }
  }, 6000);
}

function openApp(name){
  document.getElementById('app-'+name).classList.add('open');
  if (name in visited && !visited[name]){
    visited[name] = true;
    checkProgress();
  }
  if (name === 'messenger') renderThreadList();
  if (name === 'instagram') renderInstagram();
  if (name === 'notes') renderNotesList();
  if (name === 'fichiers') renderFichiers();
}
function closeApp(){
  document.querySelectorAll('.appscreen').forEach(s=>s.classList.remove('open'));
  document.getElementById('threadView').classList.add('hidden');
  document.getElementById('noteView').classList.add('hidden');
}

function renderHome(){}

function renderThreadList(){
  const list = document.getElementById('threadList');
  list.innerHTML = '';
  THREADS.forEach(t=>{
    const row = document.createElement('div');
    row.className = 'threadRow' + (t.status==='ghost' ? ' ghostThread' : '');
    row.innerHTML = `
      <div class="threadAvatarLg" style="background:${t.color}">${t.initial}</div>
      <div class="threadMeta">
        <div class="n">${t.name}</div>
        <div class="p">${t.preview}</div>
      </div>
      <div class="threadTime">${t.time}</div>
    `;
    row.addEventListener('click', ()=> openThread(t.id));
    list.appendChild(row);
  });
}

function openThread(id){
  currentThread = id;
  document.getElementById('threadView').classList.remove('hidden');
  const t = THREADS.find(x=>x.id===id);
  document.getElementById('threadName').textContent = t.name;
  document.getElementById('threadAvatar').textContent = t.initial;
  document.getElementById('threadAvatar').style.background = t.color;
  const statusEl = document.getElementById('threadStatus');
  if (t.status === 'ghost'){
    statusEl.textContent = 'Actif à l\u2019instant';
    statusEl.classList.add('creepy');
  } else {
    statusEl.textContent = '';
    statusEl.classList.remove('creepy');
  }
  const msgs = document.getElementById('messagesList');
  msgs.innerHTML = '';
  const data = id === 'antoine' ? MSG_ANTOINE : MSG_LILY_GHOST_INITIAL;
  data.forEach(m => msgs.appendChild(renderMessage(m)));
  msgs.scrollTop = msgs.scrollHeight;
}

function renderMessage(m){
  if (m.from === 'system'){
    const d = document.createElement('div');
    d.className = 'systemLine';
    d.textContent = m.text;
    return d;
  }
  const row = document.createElement('div');
  row.className = 'bubbleRow ' + (m.from === 'me' ? 'me' : 'them');
  const b = document.createElement('div');
  b.className = 'bubble ' + (m.from === 'draft' ? 'draft' : m.from);
  b.textContent = m.text;
  const time = document.createElement('div');
  time.className = 'msgTime';
  time.textContent = m.time;
  row.appendChild(b);
  row.appendChild(time);
  return row;
}

document.addEventListener('click', (e)=>{
  if (e.target.matches('[data-thread-back]')){
    document.getElementById('threadView').classList.add('hidden');
  }
  if (e.target.matches('[data-note-back]')){
    document.getElementById('noteView').classList.add('hidden');
  }
});

function renderInstagram(){
  document.getElementById('igHandle').textContent = '@' + INSTA_PROFILE.handle;
  document.getElementById('igStats').textContent = `${INSTA_PROFILE.posts} publications · ${INSTA_PROFILE.followers} abonnés · ${INSTA_PROFILE.following} abonnements`;
  document.getElementById('igBio').textContent = INSTA_PROFILE.bio;
  const feed = document.getElementById('igFeed');
  feed.innerHTML = '';
  INSTA_POSTS.forEach(p=>{
    const post = document.createElement('div');
    post.className = 'igPost';
    const comments = p.comments.map(c => `<div class="igComment${c.user.includes('unknown')?' creepy':''}"><b>${c.user}</b> ${c.text}</div>`).join('');
    post.innerHTML = `
      <div class="igPostHead"><div class="av"></div><b>lily.echoes</b></div>
      <div class="igImg">${p.desc}</div>
      <div class="igActions">♡ 💬 ➤</div>
      <div class="igLikes">${p.likes} mentions J'aime</div>
      <div class="igCaption"><b>lily.echoes</b> ${p.caption}</div>
      ${comments}
      <div class="igTime">${p.time}</div>
    `;
    feed.appendChild(post);
  });
  document.getElementById('storyArchived').onclick = () => {
    openLightbox(INSTA_STORY_DESC);
  };
}

function renderNotesList(){
  const list = document.getElementById('notesList');
  list.innerHTML = '';
  JOURNAL.forEach((n, idx)=>{
    const row = document.createElement('div');
    row.className = 'noteRow';
    row.innerHTML = `<div class="d">${n.date}</div><div class="t">${n.text}</div>`;
    row.addEventListener('click', ()=> openNote(idx));
    list.appendChild(row);
  });
}
function openNote(idx){
  const n = JOURNAL[idx];
  document.getElementById('noteView').classList.remove('hidden');
  document.getElementById('noteDate').textContent = n.date;
  const body = document.getElementById('noteBody');
  body.innerHTML = '';
  const p = document.createElement('p');
  p.textContent = n.text;
  if (n.glitch) p.classList.add('glitchNote');
  body.appendChild(p);
}

function renderFichiers(){
  const grid = document.getElementById('photoGrid');
  grid.innerHTML = '';
  PHOTOS.forEach(p=>{
    const t = document.createElement('div');
    t.className = 'photoThumb';
    t.textContent = p.desc;
    t.addEventListener('click', ()=> openLightbox(p.desc + (p.meta ? ' — ' + p.meta : '')));
    grid.appendChild(t);
  });
  document.getElementById('brouillonText').textContent = BROUILLON_TEXT;
  document.getElementById('brouillonHint').textContent = BROUILLON_HINT;
}

function switchTab(name){
  document.querySelectorAll('.tabBtn').forEach(b=>b.classList.toggle('active', b.dataset.tab===name));
  document.querySelectorAll('.tabPane').forEach(p=>p.classList.add('hidden'));
  document.getElementById('tab-'+name).classList.remove('hidden');
}

function tryPassword(){
  const val = document.getElementById('pwInput').value.trim().toLowerCase();
  const err = document.getElementById('pwError');
  if (val === 'milo' || val === 'chien'){
    unlocked = true;
    err.style.color = '#8fae3c';
    err.textContent = 'Déverrouillé.';
    const tab = document.getElementById('preuvesTab');
    tab.disabled = false;
    tab.textContent = '📁 preuves';
    renderPreuves();
    glitchPulse(300);
    ensureAudio(); jumpNoise();
  } else {
    err.style.color = '#b3261e';
    err.textContent = 'Mot de passe incorrect.';
  }
}

function renderPreuves(){
  const c = document.getElementById('preuvesContent');
  c.innerHTML = `
    <div class="proofBlock">
      <div class="lbl">photo</div>
      <div>${PREUVES.photoDesc}</div>
    </div>
    <div class="proofBlock">
      <div class="lbl">memo_vocal_0007 — transcription</div>
      <div class="q">${PREUVES.audioTranscript}</div>
    </div>
    <div class="proofBlock">
      <div class="lbl">residence_secours.txt</div>
      <div class="q">${PREUVES.note}</div>
    </div>
  `;
}

function openLightbox(caption){
  document.getElementById('lightbox').classList.remove('hidden');
  document.querySelector('.lightboxCaption').textContent = caption;
}
function closeLightbox(){
  document.getElementById('lightbox').classList.add('hidden');
}

function checkProgress(){
  const count = Object.values(visited).filter(Boolean).length;
  if (count >= 2){ maybeGhostEvent(4000); }
  if (count >= 3){ maybeGhostEvent(9000); }
}

function maybeGhostEvent(delay){
  const t = setTimeout(()=> fireGhostEvent(), delay);
  ghostTimers.push(t);
}

function fireGhostEvent(){
  ensureAudio();
  const phone = document.getElementById('phone');
  phone.classList.add('buzz');
  thud();
  setTimeout(()=> phone.classList.remove('buzz'), 500);

  const line = GHOST_LINES[Math.floor(Math.random()*GHOST_LINES.length)];
  showNotif('Lily : ' + line);

  const ghostThread = THREADS.find(t=>t.id==='lily');
  ghostThread.preview = line;
  MSG_LILY_GHOST_INITIAL.push({ from:'ghostmsg', text:line, time:'à l\u2019instant' });
}

function showNotif(text){
  const el = document.getElementById('notifBanner');
  el.textContent = text;
  el.classList.add('show');
  setTimeout(()=> el.classList.remove('show'), 3200);
}

function scheduleGhosts(){
  maybeGhostEvent(30000);
  maybeGhostEvent(70000);
  maybeGhostEvent(130000);
}

async function triggerEnding(){
  ghostTimers.forEach(t=>clearTimeout(t));
  document.querySelectorAll('.appscreen').forEach(s=>s.classList.remove('open'));
  const phone = document.getElementById('phone');
  ensureAudio();

  phone.classList.add('buzz'); thud();
  await wait(250);
  phone.classList.remove('buzz');
  showNotif(ENDING.vibrate);
  await wait(1600);

  showNotif(ENDING.typing);
  await wait(2200);

  showNotif(ENDING.photo);
  flashWhite(); jumpNoise();
  await wait(2000);

  phone.classList.add('hidden');
  const end = document.getElementById('ending');
  end.classList.remove('hidden');
  end.textContent = ENDING.line1;
  await wait(3200);

  flashWhite();
  end.textContent = ENDING.line2;
  await wait(3200);

  end.textContent = ENDING.line3;
  await wait(2800);

  flashWhite();
  await wait(700);
  end.textContent = '';
  end.style.background = '#000';
    }
        
