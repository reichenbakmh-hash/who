let audioCtx = null;
let droneNodes = null;
let skipCurrent = false;
let visited = { messenger:false, instagram:false, notes:false, fichiers:false, portier:false };
let unlocked = false;
let ghostTimers = [];
let currentThread = null;

/* ---- état de la couche narrative additionnelle ---- */
let currentDay = 1;
let currentTier = 0;
let corpseFound = false;
let chronologieSeen = false;
let heavyNoteUnlocked = false;
let monologueBusy = false;

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
  droneNodes = { o1, g1, o2, g2 };
}

function droneStop(fadeSec){
  if (!audioCtx || !droneNodes) return;
  const t = audioCtx.currentTime;
  try{
    droneNodes.g1.gain.exponentialRampToValueAtTime(0.0001, t + (fadeSec||1.2));
    droneNodes.g2.gain.exponentialRampToValueAtTime(0.0001, t + (fadeSec||1.2));
    droneNodes.o1.stop(t + (fadeSec||1.2) + 0.1);
    droneNodes.o2.stop(t + (fadeSec||1.2) + 0.1);
  }catch(e){}
  droneNodes = null;
}

/* ---------- Nappe de suspense évolutive pour le préambule ---------- */
let suspenseRiser = null;
let suspensePulseTimer = null;
let suspenseStingerTimer = null;

function startSuspenseScore(){
  if (!audioCtx) return;
  const t = audioCtx.currentTime;

  // nappe montante, très lente, presque imperceptible au début
  const riser = audioCtx.createOscillator();
  const riserGain = audioCtx.createGain();
  riser.type = 'sine';
  riser.frequency.setValueAtTime(78, t);
  riser.frequency.linearRampToValueAtTime(150, t + 95);
  riserGain.gain.setValueAtTime(0.0001, t);
  riserGain.gain.linearRampToValueAtTime(0.02, t + 6);
  riser.connect(riserGain).connect(audioCtx.destination);
  riser.start();
  suspenseRiser = { riser, riserGain };

  // pouls cardiaque qui accélère au fil du texte
  let pulseDelay = 2400;
  const schedulePulse = () => {
    heartbeatTick();
    pulseDelay = Math.max(680, pulseDelay - 45);
    suspensePulseTimer = setTimeout(schedulePulse, pulseDelay);
  };
  suspensePulseTimer = setTimeout(schedulePulse, pulseDelay);

  // grincements aigus rares et imprévisibles, pour l'inconfort
  const scheduleStinger = () => {
    const delay = 4200 + Math.random() * 5200;
    suspenseStingerTimer = setTimeout(() => {
      if (Math.random() < 0.65){
        tone(200 + Math.random() * 300, 1.1, 'triangle', 0.018);
      }
      scheduleStinger();
    }, delay);
  };
  scheduleStinger();
}

function stopSuspenseScore(fadeSec){
  if (suspensePulseTimer) clearTimeout(suspensePulseTimer);
  if (suspenseStingerTimer) clearTimeout(suspenseStingerTimer);
  suspensePulseTimer = null; suspenseStingerTimer = null;
  if (audioCtx && suspenseRiser){
    const t = audioCtx.currentTime;
    try{
      suspenseRiser.riserGain.gain.exponentialRampToValueAtTime(0.0001, t + (fadeSec||1.5));
      suspenseRiser.riser.stop(t + (fadeSec||1.5) + 0.1);
    }catch(e){}
  }
  suspenseRiser = null;
}

/* ---------- Nappe d'horreur d'ambiance pendant l'exploration (téléphone) ---------- */
let ambientActive = false;
let ambientPulseTimer = null;

function startAmbientHorror(){
  ambientActive = true;
  scheduleAmbientPulse();
}

function scheduleAmbientPulse(){
  if (!ambientActive) return;
  const base = currentTier >= 4 ? 5000 : currentTier >= 3 ? 7500 : currentTier >= 2 ? 11000 : 15500;
  const delay = base + Math.random() * base * 0.6;
  ambientPulseTimer = setTimeout(()=>{
    if (!ambientActive) return;
    const roll = Math.random();
    if (roll < 0.4) heartbeatTick();
    else if (roll < 0.72) tone(150 + Math.random()*220, 0.9, 'triangle', currentTier >= 3 ? 0.02 : 0.013);
    else scratchNoise();
    scheduleAmbientPulse();
  }, delay);
}

function stopAmbientHorror(){
  ambientActive = false;
  if (ambientPulseTimer) clearTimeout(ambientPulseTimer);
  ambientPulseTimer = null;
}

function intensifyAmbient(tier){
  if (!audioCtx || !droneNodes) return;
  const t = audioCtx.currentTime;
  const targetG1 = 0.03 + tier * 0.012;
  const targetG2 = 0.018 + tier * 0.008;
  try{
    droneNodes.g1.gain.linearRampToValueAtTime(targetG1, t + 3);
    droneNodes.g2.gain.linearRampToValueAtTime(targetG2, t + 3);
  }catch(e){}
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
  for (let i=0;i<scene.length;i++){
    await typeParagraph(container, scene[i], opts.cls, opts.speed);
    const pause = Array.isArray(opts.pauses) ? (opts.pauses[i] != null ? opts.pauses[i] : 550) : (opts.pause || 550);
    await wait(pause);
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
  startSuspenseScore();
  const container = document.getElementById('introText');

  // s1 : constat froid, presque détaché, puis la dernière ligne tombe plus sèchement
  await typeScene(INTRO.s1, { pauses:[650, 1300, 1500, 900] });
  await wait(700);

  // s2 : hésitation qui s'étire, le geste qui se prend son temps
  await typeScene(INTRO.s2, { pauses:[500, 850, 1400, 1900, 1600, 1100] });
  await wait(600);

  // s3 : la découverte, avec un silence net avant/après "Pardon."
  await typeScene(INTRO.s3, { pauses:[550, 1200, 1000, 1800, 1400, 700, 1500] });
  await wait(900);

  // s4 : la bascule vers la peur, rythme qui se resserre
  await typeScene(INTRO.s4, { pauses:[900, 1100, 400, 1300, 500, 600, 2000] });

  await bigFlashText('.......', 1100);
  await bigFlashText(INTRO.qui, 1900);
  await wait(300);

  document.getElementById('shakeWrap').classList.add('trembleContinuous');
  await typeScene(INTRO.s5.slice(0,1), { pauses:[300] });
  await wait(350);
  await typeScene(INTRO.s5.slice(1,3), { pauses:[250, 500] });
  shakeBig(document.getElementById('shakeWrap'));
  thud();
  await typeScene(INTRO.s5.slice(3), { pauses:[900] });
  document.getElementById('shakeWrap').classList.remove('trembleContinuous');
  await wait(700);

  document.getElementById('shakeWrap').classList.add('trembleContinuous');
  await typeScene(INTRO.s6, { pauses:[350, 900, 600, 700] });
  document.getElementById('shakeWrap').classList.remove('trembleContinuous');
  await wait(700);

  await typeParagraph(container, INTRO.s7[0], 'whisperUp');
  await wait(1000);
  await typeParagraph(container, INTRO.s7[1]);
  await wait(1200);
  await typeParagraph(container, INTRO.s7[2]);
  await wait(1800);
  await typeParagraph(container, INTRO.s7[3]);
  await wait(900);

  await typeScene(INTRO.s8, { pauses:[400, 800] });
  const mock = document.getElementById('introMock');
  mock.classList.remove('hidden');
  ding();
  await wait(2600);
  for (const line of INTRO.s8b){
    await typeParagraph(container, line, line===INTRO.s8b[2] ? 'shout' : null, 40);
    await wait(450);
  }
  mock.classList.add('hidden');
  await wait(500);

  await typeScene(INTRO.s9, { pauses:[600, 700, 1600, 1900, 400, 500, 400, 1200] });
  await wait(500);

  const photoEl = document.getElementById('introPhoto');
  photoEl.classList.remove('hidden');
  flashWhite(); jumpNoise();
  await wait(2000);

  await typeScene(INTRO.s10, { pauses:[500, 700, 800, 500, 400, 900, 1600] });
  const scratchInterval = setInterval(()=>{ scratchNoise(); shakeSmall(document.getElementById('shakeWrap')); }, 900);
  await wait(200);
  clearInterval(scratchInterval);
  await wait(500);

  await typeScene(INTRO.s11, { pauses:[600, 1400] });
  await wait(900);
  stopSuspenseScore(2);
  await bigFlashText(INTRO.door, 2600);

  await wait(700);
  const btn = document.getElementById('enterBtn');
  btn.classList.remove('hidden');
  btn.scrollIntoView({ behavior:'smooth', block:'center' });
}

window.addEventListener('DOMContentLoaded', () => {
  const pre = document.getElementById('preamble');
  const startOnce = () => {
    pre.removeEventListener('click', startOnce);
    const hint = document.getElementById('tapHint');
    if (hint) hint.remove();
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

  const sleepBtn = document.getElementById('sleepBtn');
  if (sleepBtn) sleepBtn.addEventListener('click', sleepAdvance);
});

function startGame(){
  stopSuspenseScore(1.5);
  document.getElementById('preamble').classList.add('hidden');
  document.getElementById('phone').classList.remove('hidden');
  renderHome();
  scheduleClock();
  scheduleGhosts();
  startAmbientHorror();
  updateHomeAffordances();
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
  if (name === 'portier') renderPortier();
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
    row.className = 'noteRow' + (n.author==='moi' ? ' mineNote' : n.author==='article' ? ' articleNote' : '') + (n.locked ? ' heavyNote' : '');
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
  if (n.locked) p.classList.add('heavyText');
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
  if (name === 'chronologie') renderChronologie();
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
    setTier(3);
    scheduleCorpseDiscovery();
    updateHomeAffordances();
  } else {
    err.style.color = '#b3261e';
    err.textContent = 'Mot de passe incorrect.';
  }
}

function goToChronologieOrHint(){
  if (corpseFound){
    switchTab('chronologie');
  } else {
    showNotif("Il manque encore quelque chose. Continue de chercher.");
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
  if (count >= 2){ maybeGhostEvent(4000); setTier(1); }
  if (count >= 3){ maybeGhostEvent(9000); }
  if (count >= 4){ setTier(2); }
  updateHomeAffordances();
}

function maybeGhostEvent(delay){
  const t = setTimeout(()=> fireGhostEvent(), delay);
  ghostTimers.push(t);
}

function ghostPoolForTier(){
  if (currentTier >= 4) return GHOST_LINES_T4;
  if (currentTier >= 3) return GHOST_LINES_T3;
  if (currentTier >= 2) return GHOST_LINES_T2;
  return GHOST_LINES;
}

function fireGhostEvent(){
  ensureAudio();
  const phone = document.getElementById('phone');
  phone.classList.add('buzz');
  thud();
  setTimeout(()=> phone.classList.remove('buzz'), 500);

  const pool = ghostPoolForTier();
  const line = pool[Math.floor(Math.random()*pool.length)];
  showNotif('Lily : ' + line);

  const ghostThread = THREADS.find(t=>t.id==='lily');
  ghostThread.preview = line;
  MSG_LILY_GHOST_INITIAL.push({ from:'ghostmsg', text:line, time:'à l\u2019instant' });
  if (currentThread === 'lily') openThread('lily');

  if (currentTier >= 3){
    glitchPulse(currentTier >= 4 ? 700 : 420);
    scratchNoise();
    shakeSmall(document.getElementById('phone'));
    document.body.classList.add('dread');
    setTimeout(()=> document.body.classList.remove('dread'), currentTier >= 4 ? 1600 : 900);
  }
  if (currentTier >= 4){
    flashWhite();
  }
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
  scheduleRecurringGhosts();
}

function scheduleRecurringGhosts(){
  const delay = currentTier >= 4 ? 22000 : currentTier >= 3 ? 34000 : currentTier >= 2 ? 48000 : 65000;
  const t = setTimeout(()=>{
    fireGhostEvent();
    scheduleRecurringGhosts();
  }, delay);
  ghostTimers.push(t);
}

/* ================= PALIERS ================= */
function setTier(n){
  if (n <= currentTier) return;
  currentTier = n;
  intensifyAmbient(n);
  if (INNER_MONOLOGUE[n]) playInnerMonologue(n);
  if (n === 2) doorbellEvent(2);
  if (n === 3) doorbellEvent(3);
  if (n === 4) doorbellEvent(4);
  updateHomeAffordances();
}

async function playInnerMonologue(tier){
  monologueBusy = true;
  const overlay = document.getElementById('innerVoice');
  const box = document.getElementById('innerVoiceText');
  box.innerHTML = '';
  overlay.classList.remove('hidden');
  overlay.classList.add(tier >= 4 ? 'tierHeavy' : tier >= 3 ? 'tierMid' : 'tierLow');
  ensureAudio();
  for (const line of INNER_MONOLOGUE[tier]){
    await typeParagraph(box, line, null, 24);
    await wait(700);
  }
  await wait(900);
  overlay.classList.add('hidden');
  overlay.classList.remove('tierHeavy','tierMid','tierLow');
  monologueBusy = false;
}

/* ================= APP PORTIER (caméra d'entrée) ================= */
function doorbellEvent(tier){
  showNotif('Portier : mouvement détecté');
}

function renderPortier(){
  const list = document.getElementById('portierList');
  list.innerHTML = '';
  const events = DOORBELL_EVENTS.filter(e => e.tier <= Math.max(1, currentTier));
  events.forEach(ev=>{
    const row = document.createElement('div');
    row.className = 'portierRow' + (ev.tier >= 3 ? ' creepyRow' : '');
    row.innerHTML = `<div class="portierTime">${ev.time}</div><div class="portierDesc">${ev.desc}</div>`;
    row.addEventListener('click', ()=> openLightbox(ev.desc));
    list.appendChild(row);
  });
}

/* ================= JOURS ================= */
function canSleepNext(){
  const count = Object.values(visited).filter(Boolean).length;
  if (currentDay === 1) return count >= 2;
  if (currentDay === 2) return count >= 4;
  if (currentDay === 3) return unlocked === true;
  if (currentDay === 4) return corpseFound === true;
  return false;
}

function updateHomeAffordances(){
  const btn = document.getElementById('sleepBtn');
  if (!btn) return;
  if (currentDay < 5 && canSleepNext() && !monologueBusy){
    btn.classList.remove('hidden');
  } else {
    btn.classList.add('hidden');
  }
}

async function sleepAdvance(){
  if (!canSleepNext() || currentDay >= 5) return;
  document.getElementById('sleepBtn').classList.add('hidden');
  closeApp();
  ensureAudio();
  const overlay = document.getElementById('dayTransition');
  const txt = document.getElementById('dayTransitionText');
  overlay.classList.remove('hidden');
  txt.textContent = '';
  await wait(300);
  flashWhite();
  await wait(600);
  currentDay += 1;
  txt.textContent = DAY_TRANSITIONS[currentDay] || ('JOUR ' + currentDay);
  await wait(2600);
  overlay.classList.add('hidden');

  applyDayContent(currentDay);
  updateHomeAffordances();
}

function applyDayContent(day){
  const d = DAY_CONTENT[day];
  if (!d) return;
  if (d.antoineMsgs){
    d.antoineMsgs.forEach(m => MSG_ANTOINE.push(m));
    const th = THREADS.find(t=>t.id==='antoine');
    if (th) th.preview = d.antoineMsgs[d.antoineMsgs.length-1].text;
  }
  if (d.journal) JOURNAL.push(d.journal);
  if (d.photo) PHOTOS.push(d.photo);
}

/* ================= CADAVRE ================= */
function scheduleCorpseDiscovery(){
  const t = setTimeout(()=> revealCorpse(), 16000);
  ghostTimers.push(t);
}

function revealCorpse(){
  if (corpseFound) return;
  corpseFound = true;
  showNotif(CORPSE_DISCOVERY.notif);
  JOURNAL.push(CORPSE_DISCOVERY.journal);
  PHOTOS.push(CORPSE_DISCOVERY.photo);
  setTier(4);
  const tab = document.getElementById('chronologieTab');
  if (tab){ tab.disabled = false; tab.textContent = '🕯️ chrono'; }
  updateHomeAffordances();
}

/* ================= CHRONOLOGIE (reconstitution finale) ================= */
function renderChronologie(){
  chronologieSeen = true;
  const c = document.getElementById('chronologieContent');
  c.innerHTML = '';
  CHRONOLOGIE.forEach((item, idx)=>{
    const block = document.createElement('div');
    block.className = 'chronoBlock';
    block.innerHTML = `
      <div class="lbl">${item.time}</div>
      <div class="chronoClaim">${item.claim}</div>
      <button class="chronoToggle" data-idx="${idx}">recouper ↓</button>
      <div class="chronoReveal hidden" id="chronoReveal${idx}">${item.reveal}</div>
    `;
    c.appendChild(block);
  });
  c.querySelectorAll('.chronoToggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const idx = btn.dataset.idx;
      const rev = document.getElementById('chronoReveal'+idx);
      rev.classList.toggle('hidden');
      btn.textContent = rev.classList.contains('hidden') ? 'recouper ↓' : 'recoupé ✓';
      ensureAudio(); ding();
      maybeUnlockHeavyNote();
    });
  });
}

function maybeUnlockHeavyNote(){
  if (heavyNoteUnlocked) return;
  const allOpen = Array.from(document.querySelectorAll('.chronoReveal')).every(el => !el.classList.contains('hidden'));
  if (!allOpen) return;
  heavyNoteUnlocked = true;
  JOURNAL.push(HEAVY_MEMORY_NOTE);
  showNotif('Un souvenir remonte. Un nouveau mémo est apparu.');
}

async function triggerEnding(){
  ghostTimers.forEach(t=>clearTimeout(t));
  document.querySelectorAll('.appscreen').forEach(s=>s.classList.remove('open'));
  const phone = document.getElementById('phone');
  ensureAudio();
  stopAmbientHorror();

  phone.classList.add('buzz'); thud();
  await wait(250);
  phone.classList.remove('buzz');
  showNotif(ENDING2.vibrate);
  await wait(2000);

  showNotif(ENDING2.calm);
  droneStop(2.6);
  await wait(2600);

  const end = document.getElementById('ending');
  end.classList.remove('hidden');
  end.textContent = ENDING2.line1;
  await wait(3000);

  end.textContent = ENDING2.line2;
  await wait(2600);

  /* le brouillon jamais envoyé, tapé lettre par lettre, sans trembler */
  end.textContent = '';
  const draftWrap = document.createElement('div');
  draftWrap.className = 'endingDraft';
  end.appendChild(draftWrap);
  await typeParagraph(draftWrap, ENDING2.draftText, null, 90);
  await wait(1000);

  const sendHint = document.createElement('div');
  sendHint.className = 'endingSendHint';
  sendHint.textContent = ENDING2.line3;
  end.appendChild(sendHint);
  await wait(3200);

  end.innerHTML = '';
  end.textContent = ENDING2.line4;
  await wait(3400);

  end.textContent = ENDING2.line5;
  await wait(3000);

  end.textContent = ENDING2.line6;
  end.classList.add('stillness');
  await wait(3600);

  end.textContent = ENDING2.line7;
  await wait(2600);

  phone.classList.add('hidden');
  end.textContent = '';
  await wait(900);
  const foot = document.createElement('div');
  foot.className = 'endingFooter';
  foot.textContent = ENDING2.screenOff;
  end.appendChild(foot);
  await wait(2600);

  end.style.transition = 'opacity 2.4s ease';
  end.style.opacity = '0';
  await wait(2500);
  end.innerHTML = '';
  end.style.background = '#000';

  await playFinalMonologue();
}

/* ================= Monologue final long + musique dédiée ================= */
async function playFinalMonologue(){
  const wrap = document.getElementById('finalMonologue');
  const song = document.getElementById('endingSong');

  wrap.innerHTML = '';
  wrap.classList.remove('hidden');
  void wrap.offsetWidth;
  wrap.classList.add('show');

  if (song){
    song.loop = true;
    song.volume = 0;
    song.currentTime = 0;
    song.play().catch(()=>{});
    let v = 0;
    const fadeIn = setInterval(()=>{
      v = Math.min(0.5, v + 0.02);
      song.volume = v;
      if (v >= 0.5) clearInterval(fadeIn);
    }, 220);
  }

  await wait(2200);

  for (const block of FINAL_MONOLOGUE){
    for (let i=0;i<block.lines.length;i++){
      const p = document.createElement('p');
      p.textContent = block.lines[i];
      const lineCls = (block.clsList && block.clsList[i]) || block.cls;
      if (lineCls) p.classList.add(lineCls);
      const isRevealLine = block.reveal && i === block.lines.length - 1;
      if (isRevealLine) p.classList.add('monoReveal');
      wrap.appendChild(p);
      void p.offsetWidth;
      p.classList.add('visible');
      wrap.scrollTop = wrap.scrollHeight;
      if (isRevealLine){ ensureAudio(); flashWhite(); tone(90, 1.6, 'sawtooth', 0.05); }
      const pause = (block.pauses && block.pauses[i] != null) ? block.pauses[i] : 3200;
      await wait(pause);
    }
    wrap.classList.add('breatheOut');
    await wait(900);
    wrap.classList.remove('breatheOut');
    await wait(block.breathe || 1800);
  }

  await wait(1800);

  if (song){
    let v2 = song.volume;
    const fadeOut = setInterval(()=>{
      v2 = Math.max(0, v2 - 0.015);
      song.volume = v2;
      if (v2 <= 0){ clearInterval(fadeOut); song.pause(); }
    }, 200);
  }

  wrap.classList.remove('show');
  await wait(3400);
  wrap.innerHTML = '';
}

