/* ============================================================
   English Guru — app.js (main logic)
   ============================================================ */

/* ---------- Tiny helpers ---------- */
const $ = (s, r=document)=>r.querySelector(s);
const $$ = (s, r=document)=>[...r.querySelectorAll(s)];
const el = (tag, cls, html)=>{const e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e;};
const esc = (s)=>String(s==null?"":s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const todayKey=()=>{const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");};
const monthKey=()=>{const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0");};
const shuffle=(a)=>{a=[...a]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a;};
const sample=(a)=>{ if(!a||!a.length)return null; return a[Math.floor(Math.random()*a.length)]; };

/* ---------- Storage ---------- */
const LS = {
  get(k, fb){ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):fb; }catch(e){ return fb; } },
  set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};

function defaultState(){
  return {
    onboarded: LS.get("eg_onboarded", false),
    name: LS.get("eg_name", ""),
    theme: LS.get("eg_theme", "light"),
    tts: LS.get("eg_tts", true),
    xp: LS.get("eg_xp", 0),
    streak: LS.get("eg_streak", {count:0, last:""}),
    lessonsDone: LS.get("eg_lessonsDone", []),
    wordsLearned: LS.get("eg_wordsLearned", []),
    monthlyLessons: LS.get("eg_monthlyLessons", 0),
    currentMonth: LS.get("eg_month", monthKey()),
    kidGamesPlayed: LS.get("eg_kidGames", 0),
    chatsHad: LS.get("eg_chats", 0),
    monthlyGoal: LS.get("eg_monthlyGoal", 8),
    showKids: LS.get("eg_showKids", true),
    showShortcuts: LS.get("eg_showShortcuts", true),
    accent: LS.get("eg_accent", "#0e9f6e"),
    appName: LS.get("eg_appName", "English Guru"),
    announcement: LS.get("eg_announcement", ""),
    pin: LS.get("eg_pin", "1234"),
    ai: LS.get("eg_ai", {provider:"groq", baseUrl:"https://api.groq.com/openai/v1", chatModel:"llama-3.3-70b-versatile", sttModel:"whisper-large-v3-turbo", apiKey:""}),
    customContent: LS.get("eg_customContent", {dict:[], lessons:[], scenarios:[]})
  };
}
let S = defaultState();

function persist(){
  LS.set("eg_xp", S.xp);
  LS.set("eg_streak", S.streak);
  LS.set("eg_lessonsDone", S.lessonsDone);
  LS.set("eg_wordsLearned", S.wordsLearned);
  LS.set("eg_monthlyLessons", S.monthlyLessons);
  LS.set("eg_month", S.currentMonth);
  LS.set("eg_kidGames", S.kidGamesPlayed);
  LS.set("eg_chats", S.chatsHad);
  LS.set("eg_monthlyGoal", S.monthlyGoal);
  LS.set("eg_showKids", S.showKids);
  LS.set("eg_showShortcuts", S.showShortcuts);
  LS.set("eg_accent", S.accent);
  LS.set("eg_appName", S.appName);
  LS.set("eg_announcement", S.announcement);
  LS.set("eg_pin", S.pin);
  LS.set("eg_ai", S.ai);
  LS.set("eg_customContent", S.customContent);
  LS.set("eg_onboarded", S.onboarded);
  LS.set("eg_name", S.name);
  LS.set("eg_tts", S.tts);
}
function setTheme(t){ S.theme=t; LS.set("eg_theme",t); document.documentElement.dataset.theme=t; const ic=$("#themeIc"); if(ic) ic.textContent = t==="dark"?"☀️":"🌙"; }
function applyBranding(){
  document.documentElement.style.setProperty("--brand", S.accent);
  document.documentElement.style.setProperty("--brand-2", S.accent);
  $$(".app-title").forEach(e=>e.textContent=S.appName);
  document.title=S.appName+" — ইংরেজি শেখার সহজ উপায়";
  const em=$$(".app-emblem span, .splash-emblem span"); em.forEach(e=>e.textContent=(S.appName[0]||"E").toUpperCase());
}

/* ---------- Global UI ---------- */
let currentTab="home";
function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.remove("hidden"); clearTimeout(t._tm); t._tm=setTimeout(()=>t.classList.add("hidden"),2300); }
function closeGenericModal(){ $("#genericModal").classList.add("hidden"); }

/* ---------- Progress helpers ---------- */
function rollMonth(){ if(S.currentMonth!==monthKey()){ S.currentMonth=monthKey(); S.monthlyLessons=0; LS.set("eg_month",S.currentMonth); LS.set("eg_monthlyLessons",0);} }
function addXP(n){ S.xp+=n; LS.set("eg_xp",S.xp); }
function markLesson(id){
  if(!S.lessonsDone.includes(id)){ S.lessonsDone.push(id); LS.set("eg_lessonsDone",S.lessonsDone); rollMonth(); S.monthlyLessons++; LS.set("eg_monthlyLessons",S.monthlyLessons); addXP(15); }
  touchStreak();
}
function touchStreak(){
  const tk=todayKey();
  if(S.streak.last!==tk){
    const yesterday=new Date(Date.now()-86400000);
    const yk=yesterday.getFullYear()+"-"+String(yesterday.getMonth()+1).padStart(2,"0")+"-"+String(yesterday.getDate()).padStart(2,"0");
    S.streak.count = (S.streak.last===yk ? S.streak.count : 0)+1;
    S.streak.last=tk;
    LS.set("eg_streak",S.streak);
  }
}
function pct(done,total){ return total? Math.min(100, Math.round(done/total*100)):0; }

/* ---------- Content merging ---------- */
const allDict=()=>[...DEFAULT_DICT, ...(S.customContent.dict||[])];
const allLessons=()=>[...DEFAULT_LESSONS, ...(S.customContent.lessons||[])];
const allScenarios=()=>[...DEFAULT_SCENARIOS, ...(S.customContent.scenarios||[])];
const lessonById=(id)=>allLessons().find(l=>l.id===id);

const LEVELS=[
  {id:"beginner", icon:"🌱", title:"বিগিনার", sub:"শুরু থেকে — অভিবাদন, পরিচয়, দৈনন্দিন", color:"#16a34a"},
  {id:"inter", icon:"🚀", title:"ইন্টারমিডিয়েট", sub:"কাল, পরিকল্পনা, রুটিন, ভাইভা", color:"#2563eb"},
  {id:"adv", icon:"🏆", title:"অ্যাডভান্সড", sub:"Perfect tense, phrasal verb, ফরমাল ইংরেজি", color:"#9333ea"}
];

/* ---------- Text-to-speech ---------- */
let enVoice=null;
function initVoice(){ try{ const vs=speechSynthesis.getVoices(); enVoice=vs.find(v=>/en[-_]US/i.test(v.lang))||vs.find(v=>/^en/i.test(v.lang))||null; }catch(e){} }
if("speechSynthesis" in window){ initVoice(); try{ speechSynthesis.onvoiceschanged=initVoice; }catch(e){} }
function speak(text, onEnd){
  const clean=String(text).replace(/[^\x00-\x7F]+/g," ").replace(/\s+/g," ").trim();
  if(!clean){ if(onEnd) setTimeout(onEnd, 300); return; }
  // Android APK bridge (WebView has no speechSynthesis)
  if(window.NativeTTS){
    try{ window.NativeTTS.speak(clean); }catch(e){}
    if(onEnd) setTimeout(onEnd, Math.min(9000, 900+clean.length*55));
    return;
  }
  if(!S.tts || !("speechSynthesis" in window)){ if(onEnd) setTimeout(onEnd, 300); return; }
  try{
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(clean);
    u.lang="en-US"; u.rate=0.95; if(enVoice) u.voice=enVoice;
    if(onEnd) u.onend=()=>{ setTimeout(onEnd,250); };
    speechSynthesis.speak(u);
  }catch(e){ if(onEnd) setTimeout(onEnd, 300); }
}

/* ============================================================
   ROUTER
   ============================================================ */
function go(tab){
  if(!S.onboarded) return;
  currentTab=tab;
  $$(".nav-btn").forEach(b=>b.classList.toggle("active", b.dataset.nav===tab));
  const view=$("#view");
  if(tab==="home") renderHome(view);
  else if(tab==="learn") renderLearn(view);
  else if(tab==="dict") renderDict(view);
  else if(tab==="practice") renderPractice(view);
  else if(tab==="profile") renderProfile(view);
  else if(tab==="shortcuts") renderShortcuts(view);
  else if(tab==="kids") renderKids(view);
  window.scrollTo({top:0});
}

/* ============================================================
   HOME
   ============================================================ */
function renderHome(v){
  rollMonth();
  const dict=allDict();
  const goalPct=pct(S.lessonsDone.length, Math.max(1,S.monthlyGoal));
  const hour=new Date().getHours();
  const greet= hour<12?"সুপ্রভাত": hour<17?"শুভ দুপুর": hour<20?"শুভ সন্ধ্যা":"শুভ রাত্রি";
  const wotd=dict[(new Date().getDate()) % dict.length];

  const features=[
    {k:"learn", icon:"📚", title:"লার্ন পাঠ", sub:"অভ্যাস ও কুইজসহ পাঠ", cls:"fc-learn"},
    {k:"dict", icon:"📖", title:"ডিকশনারি", sub:"ইংরেজি→বাংলা + অনলাইন", cls:"fc-dict"},
    {k:"practice", icon:"💬", title:"AI প্র্যাকটিস", sub:"ভয়েসসহ AI-এর সাথে কথা", cls:"fc-practice"},
    {k:"shortcuts", icon:"⚡", title:"Fast ট্রিক্স", sub:"নেটিভদের মতো কথা বলুন", cls:"fc-shortcut"},
    {k:"kids", icon:"🧒", title:"কিডস ইংলিশ", sub:"ABC থেকে শুরু — ছোটদের জন্য", cls:"fc-kids"}
  ].filter(f=> (f.k!=="kids"||S.showKids) && (f.k!=="shortcuts"||S.showShortcuts));

  v.innerHTML=`
    ${S.announcement? `<div style="background:var(--gold-soft);border:1px solid var(--line);border-radius:14px;padding:10px 14px;font-size:13.5px;margin:6px 0 4px">📢 ${esc(S.announcement)}</div>`:""}
    <div class="hellocard">
      <div class="hello-ghost">📘</div>
      ${S.name? `<div class="hello-hi">${greet},</div><div class="hello-name">${esc(S.name)} 👋</div>` : `<div class="hello-hi">${greet} 👋</div><div class="hello-name">English শিখুন সহজে</div>`}
      <div class="hello-stats">
        <div class="hstat"><div class="h-ic">⚡</div><div><b>${S.xp}</b><small>XP</small></div></div>
        <div class="hstat"><div class="h-ic">🔥</div><div><b>${S.streak.count}</b><small>দিন streak</small></div></div>
        <div class="hstat"><div class="h-ic">✅</div><div><b>${S.lessonsDone.length}</b><small>লেসন শেষ</small></div></div>
      </div>
    </div>

    <div class="goal-card">
      <div class="goal-top"><h3>🎯 এই মাসের টার্গেট</h3><span>${S.lessonsDone.length} / ${S.monthlyGoal} লেসন</span></div>
      <div class="progress"><div class="fill" style="width:${goalPct}%"></div></div>
      <div class="goal-foot"><span>আরও ${Math.max(0,S.monthlyGoal-S.lessonsDone.length)}টা লেসন বাকি</span><span>${goalPct}%</span></div>
    </div>

    <div class="sec-head"><h2>এক নজরে</h2></div>
    <div class="feature-grid">
      ${features.map(f=>`
        <button class="feature-card ${f.cls}" data-nav-to="${f.k}">
          <div class="fc-ic">${f.icon}</div>
          <b>${f.title}</b><small>${f.sub}</small>
        </button>`).join("")}
    </div>

    <div class="sec-head"><h2>আজকের শব্দ</h2><button data-nav-to="dict">সব শব্দ →</button></div>
    <div class="wotd">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div><div class="wotd-word">${esc(wotd.en)}</div><div class="wotd-phon">${esc(wotd.ph)}</div></div>
        <button class="tts-btn" data-tts="${esc(wotd.en)}">🔊</button>
      </div>
      <div class="wotd-meaning">${esc(wotd.bn)} — <em>${esc(wotd.pos)}</em></div>
      <div class="wotd-ex">“${esc(wotd.ex)}”<br><span style="font-family:var(--font-bn);font-style:normal">${esc(wotd.exBn)}</span></div>
    </div>

    <div style="margin-top:26px" class="center-txt">
      <button class="btn primary wide" data-nav-to="learn">📚 আজকের পড়া শুরু করুন</button>
    </div>
  `;
}

/* ============================================================
   LEARN — পূর্ণাঙ্গ A-Z কোর্স (ক্যাটাগরি ভিত্তিক)
   ============================================================ */
const COURSE_CATS=[
  {id:"basics", icon:"🔤", title:"Basic ভিত্তি", sub:"বর্ণমালা, সংখ্যা, বার, মাস", color:"#0ea5e9"},
  {id:"grammar", icon:"📐", title:"ব্যাকরণ (Grammar)", sub:"বাক্যের কাঠামো, Parts of Speech", color:"#8b5cf6"},
  {id:"tense", icon:"⏰", title:"Tense মাস্টার", sub:"১২টি কাল — সূত্র ও উদাহরণ", color:"#f59e0b"},
  {id:"sentence", icon:"🧱", title:"বাক্য গঠন", sub:"কীভাবে বাক্য বানাবেন ধাপে ধাপে", color:"#10b981"},
  {id:"speaking", icon:"🗣️", title:"Speaking", sub:"দৈনন্দিন কথোপকথন", color:"#ef4444"},
  {id:"writing", icon:"✍️", title:"Writing", sub:"ইমেইল, প্রেজেন্টেশন", color:"#3b82f6"},
  {id:"advanced", icon:"🏆", title:"Advanced", sub:"Phrasal verb, Conditionals", color:"#eab308"},
  {id:"mistakes", icon:"❌", title:"ভুল-সংশোধন", sub:"সাধারণ ভুলগুলো এড়ান", color:"#dc2626"}
];
const lessonCat=(l)=>l.cat || (l.level==="beginner"?"speaking":l.level==="inter"?"grammar":"advanced");
const lessonsIn=(catId)=>allLessons().filter(l=>lessonCat(l)===catId);

function renderLearn(v){
  const lessons=allLessons();
  const done=S.lessonsDone.length;
  v.innerHTML=`
    <div class="page-head"><h1>📚 শেখার কোর্স</h1><p>A থেকে Z পর্যন্ত — ধাপে ধাপে ইংরেজি</p></div>
    <div class="goal-card" style="margin-top:0">
      <div class="goal-top"><h3>📖 আপনার অগ্রগতি</h3><span>${done} / ${lessons.length} লেসন</span></div>
      <div class="progress"><div class="fill" style="width:${pct(done,lessons.length)}%"></div></div>
      <div class="goal-foot"><span>${pct(done,lessons.length)}% সম্পন্ন</span><span>⚡ ${S.xp} XP</span></div>
    </div>
    <div class="sec-head"><h2>বিষয় বেছে নিন</h2></div>
    <div class="course-grid">
      ${COURSE_CATS.map(c=>{
        const ls=lessonsIn(c.id);
        const d=ls.filter(l=>S.lessonsDone.includes(l.id)).length;
        return `<button class="course-card" data-course="${c.id}">
          <div class="cc-icon" style="background:${c.color}22">${c.icon}</div>
          <div class="cc-info"><b>${c.title}</b><small>${c.sub}</small>
          ${ls.length?`<div class="cc-meta"><span class="cc-badge">${ls.length} লেসন</span>${d?`<span class="cc-badge done">${d} শেষ</span>`:""}</div>`:`<div class="cc-meta"><span class="cc-badge">শীঘ্রই</span></div>`}</div>
        </button>`;
      }).join("")}
    </div>
    <div style="height:20px"></div>
  `;
}

function renderCourse(catId){
  const c=COURSE_CATS.find(x=>x.id===catId); if(!c) return;
  const view=$("#view");
  const ls=lessonsIn(catId);
  view.innerHTML=`
    <div class="page-head">
      <button class="btn sm ghost" data-back="learn" style="padding-left:0">← কোর্স</button>
      <h1 style="margin-top:6px">${c.icon} ${c.title}</h1><p>${c.sub}</p>
    </div>
    <div id="catContent"></div>
  `;
  const box=$("#catContent");
  if(catId==="basics"){
    // Alphabet + numbers + days + months tabs
    box.innerHTML=`<div class="chip-row">
      <button class="chip active" data-bt="abc">🔤 Alphabet</button>
      <button class="chip" data-bt="numbers">🔢 Numbers</button>
      <button class="chip" data-bt="days">📅 Days</button>
      <button class="chip" data-bt="months">🗓️ Months</button>
    </div><div id="btBody"></div>`;
    const basicsView=(tab)=>{
      const body=$("#btBody");
      if(tab==="abc") body.innerHTML=`<div class="kids-grid">${ALPHABET.map(k=>`<button class="letter-tile" data-tts="${k.l} for ${k.word}"><b>${k.l}</b><span class="lt-emoji">${k.emoji}</span><small>${k.bn}</small></button>`).join("")}</div>`;
      else if(tab==="numbers") body.innerHTML=NUMBERS.map(n=>`<div class="lesson-item" style="cursor:default"><div class="li-num">${n.en.split(" ")[0]}</div><div class="li-info"><b>${n.en.split(" ").slice(1).join(" ")}</b><small>${n.bn}</small></div><button class="tts-btn" data-tts="${n.en.split(" ").slice(1).join(" ")}">🔊</button></div>`).join("");
      else if(tab==="days") body.innerHTML=DAYS.map(d=>`<div class="lesson-item" style="cursor:default"><div class="li-num">📅</div><div class="li-info"><b>${d.en}</b><small>${d.bn}</small></div><button class="tts-btn" data-tts="${d.en}">🔊</button></div>`).join("");
      else body.innerHTML=MONTHS.map(m=>`<div class="lesson-item" style="cursor:default"><div class="li-num">🗓️</div><div class="li-info"><b>${m.en}</b><small>${m.bn}</small></div><button class="tts-btn" data-tts="${m.en}">🔊</button></div>`).join("");
    };
    $$("[data-bt]").forEach(b=>b.onclick=()=>{ $$("[data-bt]").forEach(x=>x.classList.toggle("active",x===b)); basicsView(b.dataset.bt); });
    basicsView("abc");
    return;
  }
  if(catId==="mistakes"){
    box.innerHTML=COMMON_MISTAKES.map(m=>`
      <div class="rule-card" style="margin-bottom:10px">
        <div style="color:var(--danger);font-size:14px">❌ ${esc(m.wrong)}</div>
        <div style="color:var(--brand-deep);font-size:15px;font-weight:600;margin:3px 0">✅ ${esc(m.right)}</div>
        <div style="font-size:13px;color:var(--ink-3)">💡 ${esc(m.why)}</div>
      </div>`).join("");
    return;
  }
  if(catId==="tense"){
    box.innerHTML=`
      <div class="admin-card"><h4>⏰ ১২টি Tense — সম্পূর্ণ চার্ট</h4><div class="ac-sub">সূত্র + ব্যবহার + উদাহরণ</div></div>
      ${TENSE_CHART.map(t=>`
        <div class="ex-card">
          <b style="font-size:15.5px">${t.name}</b>
          <div style="font-family:var(--font-en);background:var(--bg);padding:9px 13px;border-radius:11px;margin:8px 0;font-size:14px">📐 ${esc(t.formula)}</div>
          <div style="font-size:13.5px;color:var(--ink-3)">🎯 ${esc(t.use)}</div>
          <div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center">
            <div><b style="font-family:var(--font-en);font-size:14px">${esc(t.example)}</b><div style="font-size:13px;color:var(--ink-3)">${esc(t.bn)}</div></div>
            <button class="tts-btn" data-tts="${esc(t.example)}">🔊</button>
          </div>
        </div>`).join("")}
    `;
    return;
  }
  if(catId==="grammar"){
    box.innerHTML=`
      <div class="admin-card"><h4>📐 ৮টি Parts of Speech</h4><div class="ac-sub">ইংরেজি ব্যাকরণের মূল ভিত্তি</div></div>
      ${PARTS_OF_SPEECH.map(p=>`<div class="rule-card"><b>${esc(p.part)}</b><br><span style="font-size:13.5px">${esc(p.bn)}</span></div>`).join("")}
      <div class="admin-card" style="margin-top:16px"><h4>📖 ৮টি গুরুত্বপূর্ণ নিয়ম</h4></div>
      ${GRAMMAR_RULES.map(g=>`<div class="ex-card"><b>${esc(g.title)}</b><div style="font-size:13.5px;color:var(--ink-2);margin-top:4px">${esc(g.desc)}</div></div>`).join("")}
      ${ls.length?`<div class="sec-head"><h2>প্র্যাকটিস লেসন</h2></div>${ls.map((l,i)=>lessonRow(l,i)).join("")}`:""}
    `;
    return;
  }
  if(catId==="sentence"){
    box.innerHTML=`
      <div class="admin-card"><h4>❓ প্রশ্ন করার ৮টি শব্দ (WH Words)</h4><div class="ac-sub">কে, কী, কোথায় — সব প্রশ্নের সূত্র</div></div>
      ${QUESTION_TYPES.map(q=>`<div class="ex-card"><div style="display:flex;justify-content:space-between"><b style="font-family:var(--font-en)">${q.type}</b><button class="tts-btn" data-tts="${esc(q.example)}">🔊</button></div><div style="font-size:13.5px;color:var(--ink-3);margin-top:3px">${esc(q.bn)} — <em>${esc(q.use)}</em></div><div style="font-family:var(--font-en);font-size:13.5px;margin-top:5px;background:var(--bg);padding:7px 11px;border-radius:9px">${esc(q.example)}</div></div>`).join("")}
      ${ls.length?`<div class="sec-head"><h2>বাক্য গঠনের লেসন</h2></div>${ls.map((l,i)=>lessonRow(l,i)).join("")}`:""}
    `;
    return;
  }
  // speaking / writing / advanced
  box.innerHTML= ls.length? ls.map((l,i)=>lessonRow(l,i)).join("") : `<div class="empty-note">শীঘ্রই আসছে</div>`;
}
function lessonRow(l,i){
  return `<button class="lesson-item ${S.lessonsDone.includes(l.id)?'done':''}" data-lesson="${l.id}">
    <div class="li-num">${S.lessonsDone.includes(l.id)?"✓":(i+1)}</div>
    <div class="li-info"><b>${esc(l.title)}</b><small>${(l.words||[]).length} শব্দ · ${(l.rules||[]).length} নিয়ম · কুইজসহ</small></div>
    <div class="li-xp">⚡15</div>
  </button>`;
}

/* ---------- Lesson overlay ---------- */
function openLesson(id){
  const l=lessonById(id); if(!l) return;
  const ov=$("#lessonOverlay"); ov.classList.remove("hidden");
  $("#lessonProgFill").style.width="0%";
  const words=l.words||[]; const rules=l.rules||[]; const st=l.structure;
  const catObj=COURSE_CATS.find(c=>c.id===lessonCat(l));
  $("#lessonBody").innerHTML=`
    <div class="lesson-kicker">${catObj?catObj.icon+" "+catObj.title:""}</div>
    <div class="lesson-title">${esc(l.title)}</div>
    <div class="lesson-intro">${esc(l.intro)}</div>

    ${words.length?`<div class="lesson-sec-title">📖 শব্দভাণ্ডার</div>
    ${words.map(w=>`
      <div class="ex-card">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div class="ex-en">${esc(w.en)}</div>
          <button class="tts-btn" data-tts="${esc(w.en)}">🔊</button>
        </div>
        <div class="ex-bn">${esc(w.bn)}</div>
      </div>`).join("")}`:""}

    ${rules.length?`<div class="lesson-sec-title">📝 নিয়ম ও অর্থ</div>
    ${rules.map(r=>`<div class="rule-card">${esc(r.en)}<br><span style="color:var(--ink-2);font-size:13.5px">${esc(r.bn)}</span></div>`).join("")}`:""}

    ${st?`<div class="lesson-sec-title">🧱 ${esc(st.title||"গঠনের সূত্র")}</div>
    ${(st.points||[]).map(p=>`
      <div class="struct-card">
        <div class="sc-pattern">${esc(p.pattern)}</div>
        <div class="sc-bn">${esc(p.bn)}</div>
      </div>`).join("")}`:""}

    ${l.quiz&&l.quiz.length?`<button class="btn primary wide lesson-cta" data-quiz="${esc(l.id)}">🎯 কুইজ শুরু করুন (${l.quiz.length}টি প্রশ্ন)</button>`:"<div style='height:20px'></div>"}
  `;
  ov.scrollTop=0;
}

function startQuiz(id){
  const l=lessonById(id); if(!l) return; const qs=l.quiz;
  let qi=0, score=0;
  const body=$("#lessonBody");
  $("#lessonProgFill").style.width="0%";
  function renderQ(){
    const q=qs[qi];
    const pairs=shuffle(q.opts.map((o,i)=>({o,i})));
    $("#lessonProgFill").style.width=((qi+1)/qs.length*100)+"%";
    body.innerHTML=`
      <div class="lesson-kicker">প্রশ্ন ${qi+1} / ${qs.length}</div>
      <div class="quiz-q">${esc(q.q)}</div>
      ${pairs.map((p,pos)=>`<button class="opt" data-pick="${pos}"><div class="opt-key">${["A","B","C","D"][pos]}</div>${esc(p.o)}</button>`).join("")}
      <div id="qf"></div>
    `;
    $$(".opt",body).forEach(b=>{
      b.onclick=()=>{
        const pos=parseInt(b.dataset.pick); const isRight=pairs[pos].i===q.a;
        if(isRight) score++;
        $$(".opt",body).forEach((o,op)=>{
          o.disabled=true;
          if(pairs[op].i===q.a) o.classList.add("correct");
          else if(op===pos) o.classList.add("wrong");
          else o.classList.add("dim");
        });
        $("#qf").innerHTML=`<div class="quiz-feedback ${isRight?'ok':'bad'}">${isRight?"🎉 সঠিক!":"❌ ভুল — সঠিক উত্তর: "+esc(q.opts[q.a])}</div>`;
        setTimeout(()=>{ qi++; if(qi<qs.length) renderQ(); else finish(); }, isRight?850:1600);
      };
    });
  }
  function finish(){
    const p=Math.round(score/qs.length*100);
    $("#lessonProgFill").style.width="100%";
    markLesson(l.id);
    body.innerHTML=`
      <div class="result-wrap">
        <div class="result-ring" style="--pct:${p*3.6}deg"><div class="rr-in"><b>${p}%</b><small>স্কোর</small></div></div>
        <h2>${p>=80?"দুর্দান্ত! 🎉":p>=50?"ভালো হয়েছে! 💪":"চালিয়ে যান! 📖"}</h2>
        <p>${score} / ${qs.length} সঠিক — লেসন সম্পন্ন ✓</p>
        <div class="result-xp">⚡ +15 XP অর্জিত</div>
        <button class="btn primary wide" data-close-lesson>চালিয়ে যান</button>
      </div>`;
  }
  renderQ();
}

/* ============================================================
   DICTIONARY (local + online)
   ============================================================ */
let dictQuery="";
function renderDict(v){
  v.innerHTML=`
    <div class="page-head"><h1>📖 ডিকশনারি</h1><p>ইংরেজি শব্দের বাংলা অর্থ — সাথে অনলাইন সার্চ</p></div>
    <div class="search-wrap"><span class="search-ic">🔍</span><input id="dictSearch" class="field" placeholder="যেকোনো ইংরেজি বা বাংলা শব্দ..." value="${esc(dictQuery)}"></div>
    <div id="dictList"></div>
  `;
  const inp=$("#dictSearch");
  inp.oninput=()=>{ dictQuery=inp.value; drawDictList(dictQuery); };
  inp.onkeydown=(e)=>{ if(e.key==="Enter") onlineDictSearch(dictQuery); };
  drawDictList(dictQuery);
  setTimeout(()=>{ if(dictQuery) inp.focus(); },50);
}
function drawDictList(q, allowOnline){
  const box=$("#dictList"); if(!box) return;
  const dict=allDict();
  const t=(q||"").toLowerCase().trim();
  let items=dict;
  if(t) items=dict.filter(d=>d.en.toLowerCase().includes(t)||d.bn.includes(t));
  let html="";
  if(items.length){
    html=items.slice(0,60).map(d=>`
      <button class="dict-item" data-word="${esc(d.en)}">
        <div class="di-book">${esc(d.en[0].toUpperCase())}</div>
        <div class="di-info"><b>${esc(d.en)}</b><small>${esc(d.bn)}</small></div>
        <span class="di-arrow">›</span>
      </button>`).join("");
  }
  if(t && allowOnline && !items.some(d=>d.en.toLowerCase()===t)){
    html+=`<button class="btn soft wide mt14" id="onlineSearchBtn">🌐 " ${esc(q)} " — অনলাইন ডিকশনারিতে খুঁজুন</button><div id="onlineResult" class="mt14"></div>`;
  }
  if(!items.length && !(t&&allowOnline)){
    if(t){
      html=`<button class="btn soft wide" id="onlineSearchBtn">🌐 "${esc(q)}" অনলাইন ডিকশনারিতে খুঁজুন</button><div id="onlineResult" class="mt14"></div>`;
    } else {
      html=`<div class="dict-empty"><div class="de-ic">📖</div>শব্দ লিখে খুঁজুন</div>`;
    }
  }
  box.innerHTML=html;
  $$(".dict-item",box).forEach(b=>b.onclick=()=>{ const d=allDict().find(x=>x.en===b.dataset.word); if(d) showWordSheet(d); });
  const ob=$("#onlineSearchBtn"); if(ob) ob.onclick=()=>onlineDictSearch(q);
  // auto online search when nothing local matched (debounced)
  clearTimeout(window._dictOnlineTimer);
  if(t && !items.length){
    window._dictOnlineTimer=setTimeout(()=>{ if(dictQuery===q && !$("#onlineResult")?.children.length) onlineDictSearch(q); }, 650);
  }
}
function showWordSheet(d){
  $("#genericModalBox").innerHTML=`
    <div class="sheet-grip"></div>
    <div class="sheet-word">${esc(d.en)}</div>
    <div class="sheet-phon">${esc(d.ph)} <button class="tts-btn" id="wsTts">🔊</button></div>
    <div class="sheet-sec"><h4>বাংলা অর্থ</h4><div class="sheet-def">${esc(d.bn)}</div></div>
    <div class="sheet-sec"><h4>উদাহরণ</h4><div class="sheet-ex">“${esc(d.ex)}”</div><div class="ex-bn mt8">${esc(d.exBn||"")}</div></div>
    <div class="sheet-tags"><span class="tag">${esc(d.pos)}</span><span class="tag">${esc(d.cat)}</span>${S.wordsLearned.includes(d.en)?'<span class="tag" style="background:var(--gold-soft);color:#92610a">✔ শিখেছি</span>':""}</div>
    <div class="modal-row">
      <button class="btn ghost" id="wsClose">বন্ধ</button>
      ${S.wordsLearned.includes(d.en)?"":`<button class="btn primary" id="wsLearn">✓ শিখেছি</button>`}
    </div>`;
  $("#genericModal").classList.remove("hidden");
  $("#wsTts").onclick=()=>speak(d.en);
  $("#wsClose").onclick=closeGenericModal;
  const wl=$("#wsLearn"); if(wl) wl.onclick=()=>{ S.wordsLearned.push(d.en); LS.set("eg_wordsLearned",S.wordsLearned); addXP(2); toast("+2 XP — শব্দ শেখা হয়েছে!"); speak(d.en); closeGenericModal(); };
}

/* ---- Online dictionary: free APIs, no key needed ---- */
async function onlineDictSearch(word){
  const box=$("#onlineResult"); if(!box) return;
  word=(word||"").trim(); if(!word) return;
  box.innerHTML=`<div class="typing" style="margin:0 auto"><span></span><span></span><span></span></div>`;
  const w=word.toLowerCase();
  try{
    const [enRes, bnRes]=await Promise.allSettled([
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(w)}`),
      fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|bn`)
    ]);
    let enData=null, bnText=null;
    if(enRes.status==="fulfilled"&&enRes.value.ok){ const j=await enRes.value.json(); enData=Array.isArray(j)?j[0]:null; }
    if(bnRes.status==="fulfilled"&&bnRes.value.ok){ const j=await bnRes.value.json(); if(j.responseData&&j.responseData.translatedText) bnText=j.responseData.translatedText; }
    if(!enData&&!bnText){ box.innerHTML=`<div class="empty-note">"${esc(word)}" পাওয়া যায়নি 😕<br><small>অ্যাপের প্রিভিউতে খুলে থাকলে ইন্টারনেট কাজ করে না — <b>Chrome বা অন্য ব্রাউজারে খুলুন</b>। অথবা অ্যাডমিন প্যানেল থেকে শব্দটি যোগ করুন।</small></div>`; return; }
    const phon=enData?.phonetic || (enData?.phonetics||[]).find(p=>p.text)?.text || "";
    const defs=[]; (enData?.meanings||[]).slice(0,2).forEach(m=>{ (m.definitions||[]).slice(0,2).forEach(dd=>defs.push({pos:m.partOfSpeech, def:dd.definition, ex:dd.example})); });
    const item=el("div","wotd");
    item.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div><div class="wotd-word">${esc(word)} <span style="font-size:11px;color:var(--ink-3);font-weight:400">(অনলাইন)</span></div><div class="wotd-phon">${esc(phon)}</div></div>
        <button class="tts-btn" id="onTts">🔊</button>
      </div>
      ${bnText?`<div class="wotd-meaning" style="font-weight:600">🇧🇩 ${esc(bnText)}</div>`:""}
      ${defs.map(d=>`<div class="sheet-ex" style="margin-top:8px"><em>${esc(d.pos)}</em> — ${esc(d.def)}${d.ex?`<br>“${esc(d.ex)}”`:""}</div>`).join("")}
      <button class="btn soft sm mt14" id="onAdd">➕ ডিকশনারিতে সেভ করুন</button>`;
    box.innerHTML=""; box.appendChild(item);
    $("#onTts").onclick=()=>speak(word);
    $("#onAdd").onclick=()=>{
      if(!allDict().some(d=>d.en.toLowerCase()===w)){
        S.customContent.dict.push({en:word, ph:phon, bn:bnText||defs[0]?.def||"", pos:defs[0]?.pos||"word", cat:"Online", ex:defs[0]?.ex||"", exBn:""});
        persist(); toast("ডিকশনারিতে যোগ হয়েছে ✓"); addXP(1);
      }
    };
  }catch(e){ box.innerHTML=`<div class="empty-note">ইন্টারনেট সংযোগ পাওয়া যায়নি 😕<br><small>প্রিভিউ প্যানেলে খুলে থাকলে ইন্টারনেট ব্লক থাকে — <b>Chrome বা অন্য ব্রাউজারে ফাইলটা খুলুন</b>।</small></div>`; }
}

/* ============================================================
   PRACTICE (AI chat + voice)
   ============================================================ */
function renderPractice(v){
  const sc=allScenarios();
  const aiOn=!!(S.ai && S.ai.apiKey);
  v.innerHTML=`
    <div class="page-head"><h1>💬 প্র্যাকটিস</h1><p>AI-এর সাথে কথা বলে ইংরেজি শিখুন</p></div>
    <div class="practice-banner">
      <div class="pb-ic">🤖</div>
      <div><b>আপনার ব্যক্তিগত ইংরেজি কোচ</b><small>মাইকে বলুন বা লিখুন — AI সঙ্গে সঙ্গে উত্তর দেবে, আর ভুল হলে শিখিয়ে দেবে</small></div>
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
      <span class="status-pill ${aiOn?"ok":"off"}">${aiOn?"🤖 AI সংযুক্ত":"⚠️ AI key সেট করা হয়নি — অফলাইন মোডে চলবে"}</span>
    </div>
    <div class="sec-head"><h2>একটি পরিস্থিতি বেছে নিন</h2></div>
    ${sc.map((s,i)=>`
      <button class="scenario-card" data-scenario="${esc(s.id)}">
        <div class="sc-art" style="background:${["#fef3e2","#e9f7ef","#eef2ff","#fff1f2","#f3e8ff","#e0f2fe"][i%6]}">${s.icon}</div>
        <div class="sc-info"><b>${esc(s.title)}</b><small>${esc(s.sub)}</small></div>
        <span class="sc-arrow">›</span>
      </button>`).join("")}
    <div style="height:20px"></div>
  `;
}

let chatState=null;
function openChat(id){
  const sc=allScenarios().find(s=>s.id===id); if(!sc) return;
  const co=$("#chatOverlay"); co.classList.remove("hidden");
  $("#chatTitle").textContent=sc.icon+" "+sc.title;
  $("#chatSub").textContent=sc.sub;
  $("#chatBody").innerHTML="";
  chatState={sc, history:[], voiceOn:true, auto:false};
  const tt=$("#chatTtsToggle"); tt.classList.remove("hidden"); tt.onclick=()=>{ chatState.voiceOn=!chatState.voiceOn; $("#chatTtsIc").textContent=chatState.voiceOn?"🔊":"🔇"; if(!chatState.voiceOn) try{speechSynthesis.cancel();}catch(e){} };
  $("#chatTtsIc").textContent="🔊";
  const ab=$("#chatAutoBtn"); ab.classList.remove("hidden");
  ab.classList.toggle("auto-on", false); ab.style.background="";
  ab.onclick=()=>toggleAutoVoice();
  addMsg("ai", sc.prompt, true);
  setSuggestions(sc.hints);
}
function toggleAutoVoice(){
  if(!chatState) return;
  const ab=$("#chatAutoBtn");
  if(chatState.auto){ chatState.auto=false; ab.style.background=""; toast("অটো-ভয়েস বন্ধ"); stopRecording(); return; }
  chatState.auto=true; ab.style.background="var(--brand-soft)";
  toast("🎧 অটো-ভয়েস চালু — AI বলবে, তারপর আপনি বলবেন");
  setTimeout(()=>{ if(chatState && chatState.auto && !recActive) startVoice(true); }, 600);
}
function closeChat(){ $("#chatOverlay").classList.add("hidden"); chatState=null; try{ if(recActive) stopRecording(); }catch(e){} }
function addMsg(who, text, tts){
  const body=$("#chatBody");
  let correction="";
  if(who==="ai" && typeof text==="string" && text.includes("📝")){ const i=text.indexOf("📝"); correction=text.slice(i+1).trim(); text=text.slice(0,i).trim(); }
  const m=el("div","msg "+(who==="ai"?"ai":"me"), esc(text));
  body.appendChild(m);
  if(who==="ai" && text) m.onclick=()=>speak(text);
  if(correction){ body.appendChild(el("div","msg-correction","📝 "+esc(correction))); }
  body.scrollTop=body.scrollHeight;
  if(who==="ai"&&tts&&chatState&&chatState.voiceOn) speak(text, chatState&&chatState.auto? ()=>{ if(chatState&&chatState.auto&&!recActive) startVoice(true); } : undefined);
}
function setSuggestions(arr){ const s=$("#chatSuggestions"); s.innerHTML=""; (arr||[]).forEach(x=>{ const b=el("button","sugg",esc(x)); b.onclick=()=>sendUser(x); s.appendChild(b); }); }
function typingIndicator(on){ const body=$("#chatBody"); const ex=$("#typing"); if(on&&!ex){ const t=el("div","typing","<span></span><span></span><span></span>"); t.id="typing"; body.appendChild(t); body.scrollTop=body.scrollHeight; } else if(!on&&ex){ ex.remove(); } }

let aiBusy=false;
function sendUser(text){
  if(!chatState) return;
  text=(text||"").trim(); if(!text||aiBusy) return;
  $("#chatInput").value=""; setSuggestions([]);
  addMsg("me", text);
  S.chatsHad++; LS.set("eg_chats",S.chatsHad); touchStreak();
  typingIndicator(true); aiBusy=true;
  const msgs=[{role:"system",content:chatState.sc.aiNote}];
  chatState.history.push({role:"user",content:text});
  chatState.history.slice(-8).forEach(h=>msgs.push(h));
  if(S.ai.apiKey){
    fetchAI(msgs).then(reply=>{
      typingIndicator(false); aiBusy=false;
      chatState.history.push({role:"assistant",content:reply});
      addMsg("ai", reply, true);
      setSuggestions(chatState.sc.hints);
    }).catch(err=>{ typingIndicator(false); aiBusy=false; aiFallback(text); });
  } else {
    setTimeout(()=>{ typingIndicator(false); aiBusy=false; aiFallback(text); }, 700);
  }
}
async function fetchAI(msgs){
  const base=(S.ai.baseUrl||"").replace(/\/+$/,"");
  const res=await fetch(base+"/chat/completions",{
    method:"POST",
    headers:{"Content-Type":"application/json","Authorization":"Bearer "+S.ai.apiKey},
    body:JSON.stringify({model:S.ai.chatModel||"llama-3.3-70b-versatile", messages:msgs, temperature:0.7, max_tokens:220})
  });
  if(!res.ok){ const t=await res.text().catch(()=>""); throw new Error("AI error "+res.status+" "+t.slice(0,120)); }
  const j=await res.json();
  return j.choices?.[0]?.message?.content || "Could you say that again?";
}
/* offline fallback teacher */
function aiFallback(text){
  const sc=chatState.sc;
  let reply, corr="";
  const t=text.toLowerCase();
  if(/\b(dont|cant|wont|didnt|isnt)\b/.test(t)) corr="ইংরেজিতে সংক্ষিপ্ত রূপের আগে apostrophe লাগে: don't, can't, won't, didn't, isn't।";
  if(/\bi\b/.test(t)&&!/\bI\b/.test(text)) corr="ব্যক্তিগত সর্বনাম 'I' সবসময় বড় হাতের অক্ষরে লিখতে হয়।";
  const answers=["That's great! Could you tell me more?","Nice! By the way, how long have you been learning English?","Interesting! Let's keep going. What would you do next?","Good job! Try making one more sentence.","That sounds nice! Can you say it in a longer sentence?"];
  reply=sample(answers);
  if(corr) reply+= " 📝 "+corr;
  addMsg("ai", reply, true);
  setSuggestions(sc.hints);
}

/* ---- Voice input ---- */
let recActive=false, mediaRecorder=null, mediaChunks=[], audioStream=null, audioCtx=null, speechRec=null, recTimer=null;

async function startVoice(auto){
  if(!chatState) return;
  const mic=$("#chatMic");
  if(recActive){ if(!auto) stopRecording(); return; }
  if(window.SpeechRecognition||window.webkitSpeechRecognition){
    try{
      const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
      speechRec=new SR(); speechRec.lang="en-US"; speechRec.interimResults=false; speechRec.maxAlternatives=1; speechRec.continuous=false;
      recActive=true; mic.classList.add("rec");
      $("#chatSub").textContent=auto?"🎧 আপনার পালা — বলুন...":"🎙️ শুনছি...";
      speechRec.onresult=(e)=>{ const t=e.results[0][0].transcript; recActive=false; mic.classList.remove("rec"); if(chatState)$("#chatSub").textContent=chatState.sc.sub; sendUser(t); };
      speechRec.onerror=(e)=>{ recActive=false; mic.classList.remove("rec"); if(chatState)$("#chatSub").textContent=chatState.sc.sub; if(e.error==="not-allowed"){ toast("মাইক্রোফোন অনুমতি প্রয়োজন"); chatState&&(chatState.auto=false); } };
      speechRec.onend=()=>{ if(recActive){ recActive=false; mic.classList.remove("rec"); if(chatState)$("#chatSub").textContent=chatState.sc.sub; } };
      speechRec.start();
      return;
    }catch(e){ try{ speechRec&&speechRec.abort(); }catch(x){} }
  }
  // MediaRecorder → Whisper (needs AI key)
  if(!S.ai.apiKey){ if(!auto){ toast("ভয়েসের জন্য অ্যাডমিন প্যানেলে AI key সেট করুন"); } return; }
  try{
    audioStream=await navigator.mediaDevices.getUserMedia({audio:true});
    mediaRecorder=new MediaRecorder(audioStream);
    mediaChunks=[];
    mediaRecorder.ondataavailable=e=>{ if(e.data.size>0) mediaChunks.push(e.data); };
    mediaRecorder.onstop=async()=>{
      const blob=new Blob(mediaChunks,{type:mediaRecorder.mimeType||"audio/webm"});
      audioStream.getTracks().forEach(t=>t.stop());
      if(chatState)$("#chatSub").textContent="⏳ ভয়েস প্রসেস হচ্ছে...";
      try{
        const text=await transcribe(blob);
        if(chatState)$("#chatSub").textContent=chatState?chatState.sc.sub:"";
        if(text&&text.trim()) sendUser(text.trim()); else { toast("কিছু বোঝা যায়নি, আবার বলুন"); if(chatState&&chatState.auto) setTimeout(()=>{ if(chatState&&chatState.auto) startVoice(true); },800); }
      }catch(e){ if(chatState)$("#chatSub").textContent=chatState?chatState.sc.sub:""; toast("ভয়েস ট্রান্সক্রিপশন ব্যর্থ"); }
    };
    recActive=true; mic.classList.add("rec");
    $("#chatSub").textContent=auto?"🎧 আপনার পালা — বলুন...":"🎙️ শুনছি... (ট্যাপ করে থামান)";
    mediaRecorder.start();
    recTimer=setTimeout(()=>{ if(recActive) stopRecording(); }, auto?6000:8000);
  }catch(e){ toast("মাইক্রোফোন পাওয়া যায়নি"); }
}
function stopRecording(){
  recActive=false;
  const mic=$("#chatMic"); if(mic) mic.classList.remove("rec");
  clearTimeout(recTimer);
  try{ if(speechRec) speechRec.stop(); }catch(e){}
  try{ if(mediaRecorder&&mediaRecorder.state!=="inactive") mediaRecorder.stop(); }catch(e){}
}
async function transcribe(blob){
  const base=(S.ai.baseUrl||"").replace(/\/+$/,"");
  const fd=new FormData();
  fd.append("file", blob, "voice.webm");
  fd.append("model", S.ai.sttModel||"whisper-large-v3-turbo");
  const res=await fetch(base+"/audio/transcriptions",{ method:"POST", headers:{"Authorization":"Bearer "+S.ai.apiKey}, body:fd });
  if(!res.ok) throw new Error("stt "+res.status);
  const j=await res.json();
  return j.text||"";
}

/* ============================================================
   SHORTCUTS
   ============================================================ */
function renderShortcuts(v){
  v.innerHTML=`
    <div class="page-head"><button class="btn sm ghost" data-back="home" style="padding-left:0">← হোম</button>
      <h1 style="margin-top:6px">⚡ Fast ট্রিক্স</h1><p>নেটিভদের মতো ছোট ছোট শর্টকাট</p></div>
    <div id="scWrap"></div>
  `;
  const wrap=$("#scWrap");
  wrap.innerHTML=DEFAULT_SHORTCUTS.map(s=>`
    <div class="shortcut-card">
      <div class="sc-en">${esc(s.en)} <button class="tts-btn" data-tts="${esc(s.en)}">🔊</button></div>
      <div class="sc-bn">${esc(s.bn)}</div>
      <div class="sc-tip">💡 ${esc(s.tip)}</div>
    </div>`).join("");
}

/* ============================================================
   KIDS
   ============================================================ */
function renderKids(v){
  let mode="abc";
  v.innerHTML=`
    <div class="kids-hero"><h2>ছোটদের English 🧒</h2><p>৩-৬ বছরের বাচ্চাদের জন্য মজার ইংরেজি</p><span class="kh-emojis">🎨</span></div>
    <div class="chip-row mt14">
      <button class="chip active" data-kmode="abc">🔤 ABC</button>
      <button class="chip" data-kmode="words">🌸 শব্দ</button>
      <button class="chip" data-kmode="game">🎯 গেম</button>
    </div>
    <div id="kidsBody"></div>
  `;
  function draw(){
    const body=$("#kidsBody");
    if(mode==="abc"){
      body.innerHTML=`<div class="kids-grid">${KIDS_LETTERS.map(k=>`
        <button class="letter-tile" data-letter="${k.l}">
          <b>${k.l}</b><span class="lt-emoji">${k.emoji}</span><small>${esc(k.word)}</small>
        </button>`).join("")}</div>`;
    } else if(mode==="words"){
      body.innerHTML=KID_FIRST_WORDS.map(w=>`
        <button class="kid-word-card" data-tts="${esc(w.en)}">
          <span class="kw-emoji">${w.emoji}</span>
          <div class="kw-info"><b>${esc(w.en)}</b><small>${esc(w.bn)}</small></div>
          <span class="kw-play">🔊</span>
        </button>`).join("");
    } else {
      body.innerHTML=`
        <button class="kid-game-card" data-kgame="pickword"><div class="kg-ic">🎯</div><div><b>শব্দ মেলাও!</b><small>ছবি দেখে সঠিক শব্দ বাছাই করো</small></div></button>
        <button class="kid-game-card" data-kgame="abcsong"><div class="kg-ic">🎵</div><div><b>ABC গাই</b><small>পুরো বর্ণমালা শুনে শুনে শেখো</small></div></button>`;
    }
  }
  $$("[data-kmode]").forEach(b=>b.onclick=()=>{ mode=b.dataset.kmode; $$("[data-kmode]").forEach(x=>x.classList.toggle("active",x===b)); draw(); });
  draw();
}
function kidLetterTap(L){
  const k=KIDS_LETTERS.find(x=>x.l===L); if(!k) return;
  $("#genericModalBox").innerHTML=`
    <div style="text-align:center;padding:10px 0">
      <div style="font-size:90px;line-height:1.1;font-family:var(--font-en);font-weight:800;color:var(--brand)">${k.l}${k.l.toLowerCase()}</div>
      <div style="font-size:64px">${k.emoji}</div>
      <div style="font-family:var(--font-en);font-size:26px;font-weight:700">${esc(k.word)}</div>
      <div style="color:var(--ink-3)">${esc(k.bn)}</div>
      <div class="modal-row"><button class="btn primary wide" id="kSay">🔊 শুনুন — ${esc(k.phon)}</button></div>
      <div class="modal-row"><button class="btn ghost wide" id="kClose">বন্ধ করো</button></div>
    </div>`;
  $("#genericModal").classList.remove("hidden");
  $("#kSay").onclick=()=>speak(k.phon+" "+k.word);
  $("#kClose").onclick=closeGenericModal;
  speak(k.phon+" "+k.word);
}
function kidGame(type){
  if(type==="abcsong"){ speak("A B C D E F G, H I J K L M N O P, Q R S T U V, W X Y and Z. Now I know my ABC, next time won't you sing with me!"); toast("🔊 ABC গান চলছে!"); return; }
  // pickword game
  let score=0, round=0;
  const ov=$("#lessonOverlay"); ov.classList.remove("hidden");
  $("#lessonProgFill").style.width="0%";
  const body=$("#lessonBody");
  function newRound(){
    if(round>=5){ finish(); return; }
    const correct=sample(KID_FIRST_WORDS); const others=shuffle(KID_FIRST_WORDS.filter(w=>w!==correct)).slice(0,3);
    const opts=shuffle([correct,...others]);
    $("#lessonProgFill").style.width=((round+1)/5*100)+"%";
    body.innerHTML=`
      <div class="kid-question">
        <div class="kq-emoji">${correct.emoji}</div>
        <div class="kq-q">এটা ইংরেজিতে কী?</div>
      </div>
      <div class="kid-opt-grid">${opts.map(o=>`<button class="kid-opt" data-kopt="${esc(o.en)}">${esc(o.en)}</button>`).join("")}</div>`;
    $$(".kid-opt",body).forEach(b=>b.onclick=()=>{
      const ok=b.dataset.kopt===correct.en;
      b.classList.add(ok?"correct":"wrong");
      if(ok){ score++; speak(correct.en); }
      $$(".kid-opt",body).forEach(x=>x.disabled=true);
      setTimeout(()=>{ round++; newRound(); }, 850);
    });
  }
  function finish(){
    S.kidGamesPlayed++; LS.set("eg_kidGames",S.kidGamesPlayed); addXP(5); touchStreak();
    $("#lessonProgFill").style.width="100%";
    body.innerHTML=`<div class="result-wrap">
      <div style="font-size:70px">${score>=4?"🏆🌟":"🎈"}</div>
      <h2>${score}/5 সঠিক!</h2>
      <p>${score>=4?"বাচ্চা তো চ্যাম্পিয়ন!":"আরেকবার খেলো!"}</p>
      <div class="result-xp">⚡ +5 XP</div>
      <button class="btn primary wide" data-close-lesson>আবার খেলো</button>
    </div>`;
  }
  newRound();
}

/* ============================================================
   PROFILE
   ============================================================ */
function renderProfile(v){
  const initial=(S.name||"A").trim()[0].toUpperCase();
  v.innerHTML=`
    <div class="profile-head">
      <div class="avatar">${esc(initial)}</div>
      <h2>${esc(S.name||"শিক্ষার্থী")}</h2>
      <p>${S.lessonsDone.length} লেসন · ${S.wordsLearned.length} শব্দ · ${S.chatsHad} প্র্যাকটিস চ্যাট</p>
    </div>
    <div class="stat-grid">
      <div class="stat-box"><div class="sb-ic">⚡</div><b>${S.xp}</b><small>মোট XP</small></div>
      <div class="stat-box"><div class="sb-ic">🔥</div><b>${S.streak.count}</b><small>দিনের streak</small></div>
      <div class="stat-box"><div class="sb-ic">🎯</div><b>${S.monthlyLessons}/${S.monthlyGoal}</b><small>মাসিক টার্গেট</small></div>
      <div class="stat-box"><div class="sb-ic">✔</div><b>${S.lessonsDone.length}</b><small>সম্পন্ন লেসন</small></div>
    </div>
    <div class="settings-list">
      <button class="set-item" id="setGoal"><span class="set-ic">🎯</span>মাসিক টার্গেট<span class="set-val">${S.monthlyGoal} লেসন</span></button>
      <button class="set-item" id="setTts"><span class="set-ic">🔊</span>অটো-সাউন্ড<span class="toggle ${S.tts?'on':''}" id="ttsToggle"></span></button>
      <button class="set-item" id="setName"><span class="set-ic">✏️</span>নাম পরিবর্তন<span class="set-val">${esc(S.name||"সেট করুন")}</span></button>
      <button class="set-item" id="setReset"><span class="set-ic">🔄</span>প্রোগ্রেস রিসেট<span class="set-val">সতর্ক</span></button>
    </div>
    <p class="about-txt">${esc(S.appName)} · ভার্সন ১.০<br>ইংরেজি শেখার সহজ উপায় 🇧🇩</p>
  `;
  $("#setGoal").onclick=()=>{ const val=prompt("মাসিক টার্গেট কত লেসন? (১-৫০)",String(S.monthlyGoal)); if(val){ const n=Math.max(1,Math.min(50,parseInt(val)||8)); S.monthlyGoal=n; LS.set("eg_monthlyGoal",n); renderProfile(v); toast("টার্গেট আপডেট হয়েছে"); } };
  $("#setTts").onclick=()=>{ S.tts=!S.tts; LS.set("eg_tts",S.tts); $("#ttsToggle").classList.toggle("on",S.tts); };
  $("#setName").onclick=()=>{ const val=prompt("আপনার নাম লিখুন:",S.name); if(val!==null){ S.name=val.trim(); LS.set("eg_name",S.name); renderProfile(v); } };
  $("#setReset").onclick=()=>{ if(confirm("আপনার সব XP, স্ট্রিক আর সম্পন্ন লেসন মুছে যাবে। নিশ্চিত?")){ ["eg_xp","eg_streak","eg_lessonsDone","eg_wordsLearned","eg_monthlyLessons","eg_kidGames","eg_chats"].forEach(k=>localStorage.removeItem(k)); S.xp=0; S.streak={count:0,last:""}; S.lessonsDone=[]; S.wordsLearned=[]; S.monthlyLessons=0; S.kidGamesPlayed=0; S.chatsHad=0; renderProfile(v); toast("প্রোগ্রেস রিসেট হয়েছে"); } };
}

/* ============================================================
   ONBOARDING
   ============================================================ */
let onbStep=0;
function setupOnboarding(){
  const slides=$$(".onb-slide"); const dots=$$(".onb-dots .dot");
  function show(i){
    slides.forEach((s)=>s.classList.toggle("hidden", parseInt(s.dataset.step)!==i));
    dots.forEach((d,di)=>d.classList.toggle("active", di===i));
    if(i===slides.length-1){ $("#onbName").classList.remove("hidden"); $("#onbNext").textContent="শুরু করুন 🚀"; } else { $("#onbName").classList.add("hidden"); $("#onbNext").textContent="পরবর্তী"; }
  }
  $("#onbNext").onclick=()=>{ if(onbStep>=slides.length-1){ finishOnboarding(); } else { onbStep++; show(onbStep); } };
  $("#onbSkip").onclick=()=>finishOnboarding();
  function finishOnboarding(){
    const n=$("#onbName").value.trim(); if(n) S.name=n;
    S.onboarded=true; LS.set("eg_onboarded",true); LS.set("eg_name",S.name);
    $("#onboarding").classList.add("hidden");
    $("#main").classList.remove("hidden");
    go("home");
  }
  show(0);
}

/* ============================================================
   BOOT
   ============================================================ */
window.addEventListener("DOMContentLoaded",()=>{
  setTheme(S.theme);
  applyBranding();

  // splash → 1.5s
  setTimeout(()=>{
    $("#splash").classList.add("out");
    setTimeout(()=>{
      $("#splash").classList.add("hidden");
      if(!S.onboarded){ $("#onboarding").classList.remove("hidden"); setupOnboarding(); }
      else { $("#main").classList.remove("hidden"); go("home"); }
    },450);
  },1400);

  // nav
  $$(".nav-btn").forEach(b=>b.onclick=()=>go(b.dataset.nav));
  $("#btnTheme").onclick=()=>setTheme(S.theme==="dark"?"light":"dark");
  $("#btnAdmin").onclick=()=>{ $("#adminGate").classList.remove("hidden"); $("#adminPin").value=""; $("#pinErr").classList.add("hidden"); setTimeout(()=>$("#adminPin").focus(),100); };
  $("#adminCancel").onclick=()=>$("#adminGate").classList.add("hidden");
  $("#adminEnter").onclick=tryAdminLogin;
  $("#adminPin").onkeydown=(e)=>{ if(e.key==="Enter") tryAdminLogin(); };

  // lesson overlay
  $("#lessonClose").onclick=()=>{ $("#lessonOverlay").classList.add("hidden"); if(currentTab==="learn") go("learn"); };
  // chat
  $("#chatBack").onclick=closeChat;
  $("#chatSend").onclick=()=>sendUser($("#chatInput").value);
  $("#chatInput").onkeydown=(e)=>{ if(e.key==="Enter") sendUser($("#chatInput").value); };
  $("#chatMic").onclick=startVoice;
  // generic modal backdrop
  $("#genericModal").addEventListener("click",(e)=>{ if(e.target.id==="genericModal") closeGenericModal(); });

  // ===== GLOBAL EVENT DELEGATION =====
  document.addEventListener("click",(e)=>{
    const t=e.target;
    // tts buttons
    const tt=t.closest("[data-tts]"); if(tt){ speak(tt.dataset.tts); return; }
    // nav-to cards
    const nv=t.closest("[data-nav-to]"); if(nv){ go(nv.dataset.navTo); return; }
    // level open
    const lv=t.closest("[data-level]"); if(lv){ renderLessonsForLevel(lv.dataset.level); window.scrollTo(0,0); return; }
    const lc=t.closest("[data-level-ch]"); if(lc){ renderLessonsForLevel(lc.dataset.levelCh); return; }
    const co=t.closest("[data-course]"); if(co){ renderCourse(co.dataset.course); window.scrollTo(0,0); return; }
    const back=t.closest("[data-back]"); if(back){ if(back.dataset.back==="learn") go("learn"); else go("home"); return; }
    // lesson open
    const ls=t.closest("[data-lesson]"); if(ls){ openLesson(ls.dataset.lesson); return; }
    const qz=t.closest("[data-quiz]"); if(qz){ startQuiz(qz.dataset.quiz); return; }
    const cl=t.closest("[data-close-lesson]"); if(cl){ $("#lessonOverlay").classList.add("hidden"); if(currentTab==="learn") go("learn"); return; }
    // scenario
    const sc=t.closest("[data-scenario]"); if(sc){ openChat(sc.dataset.scenario); return; }
    // kids
    const kl=t.closest("[data-letter]"); if(kl){ kidLetterTap(kl.dataset.letter); return; }
    const kg=t.closest("[data-kgame]"); if(kg){ kidGame(kg.dataset.kgame); return; }
  });

  // hash nav for debugging / deep links
  if(location.hash==="#admin") $("#btnAdmin").click();
});

/* admin login (admin.js hooks) */
function tryAdminLogin(){
  const v=$("#adminPin").value.trim();
  if(v===S.pin){ $("#adminGate").classList.add("hidden"); openAdminPanel(); }
  else { $("#pinErr").classList.remove("hidden"); }
}
