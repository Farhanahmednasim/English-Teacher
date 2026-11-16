/* ============================================================
   English Guru — admin.js (Admin Panel)
   ============================================================ */

function openAdminPanel(){ $("#adminPanel").classList.remove("hidden"); $("#bottomnav").style.display="none"; $("#topbar").style.visibility="hidden"; renderAdminTab("branding"); }
function closeAdminPanel(){ $("#adminPanel").classList.add("hidden"); $("#bottomnav").style.display=""; $("#topbar").style.visibility=""; }
$("#adminBack").onclick=closeAdminPanel;

$$(".atab").forEach(b=>b.onclick=()=>{ $$(".atab").forEach(x=>x.classList.toggle("active",x===b)); renderAdminTab(b.dataset.atab); });

function renderAdminTab(tab){
  const body=$("#adminBody"); body.innerHTML="";
  $("#adminSaveBar").classList.add("hidden");
  if(tab==="branding") adminBranding(body);
  else if(tab==="content") adminContent(body);
  else if(tab==="ai") adminAI(body);
  else if(tab==="data") adminData(body);
}

/* ---------------- BRANDING ---------------- */
const ACCENTS=["#0e9f6e","#2563eb","#9333ea","#ef4444","#f59e0b","#0ea5e9","#ec4899","#14b8a6"];
function adminBranding(body){
  body.innerHTML=`
    <div class="admin-card">
      <h4>📱 অ্যাপ নাম</h4><div class="ac-sub">অ্যাপের নাম বদলান</div>
      <input class="field" id="abName" value="${esc(S.appName)}">
    </div>
    <div class="admin-card">
      <h4>🎨 রঙ</h4><div class="ac-sub">অ্যাপের প্রধান রঙ</div>
      <div class="swatches">
        ${ACCENTS.map(c=>`<button class="sw ${S.accent===c?'active':''}" data-acc="${c}" style="background:${c}"></button>`).join("")}
        <input type="color" id="abColor" value="${S.accent}" title="কাস্টম রঙ">
      </div>
    </div>
    <div class="admin-card">
      <h4>📢 ঘোষণা</h4><div class="ac-sub">হোম স্ক্রিনে ব্যানার দেখাবে</div>
      <input class="field" id="abAnn" placeholder="যেমন: আজ রাত ১২টায় নতুন লেসন!" value="${esc(S.announcement)}">
    </div>
    <div class="admin-card">
      <h4>🔐 পিন বদলান</h4><div class="ac-sub">অ্যাডমিন প্যানেলের পিন</div>
      <input class="field" id="abPin" type="password" inputmode="numeric" maxlength="8" value="${esc(S.pin)}">
    </div>
    <div class="admin-card">
      <h4>🧩 সেকশন দেখান/লুকান</h4><div class="ac-sub">হোম স্ক্রিনে কোন কার্ড থাকবে</div>
      <div class="content-row"><div class="cr-main"><b>🧒 কিডস ইংলিশ</b></div><span class="toggle ${S.showKids?'on':''}" id="abKids"></span></div>
      <div class="content-row"><div class="cr-main"><b>⚡ Fast ট্রিক্স</b></div><span class="toggle ${S.showShortcuts?'on':''}" id="abShort"></span></div>
    </div>
  `;
  const updSave=()=>$("#adminSaveBar").classList.remove("hidden");
  $("#abName").oninput=updSave;
  $("#abAnn").oninput=updSave;
  $("#abPin").oninput=updSave;
  $$(".sw",body).forEach(s=>s.onclick=()=>{ S.accent=s.dataset.acc; applyBranding(); $$(".sw",body).forEach(x=>x.classList.toggle("active",x===s)); updSave(); });
  $("#abColor").oninput=(e)=>{ S.accent=e.target.value; applyBranding(); updSave(); };
  $("#abKids").onclick=()=>{ S.showKids=!S.showKids; $("#abKids").classList.toggle("on",S.showKids); updSave(); };
  $("#abShort").onclick=()=>{ S.showShortcuts=!S.showShortcuts; $("#abShort").classList.toggle("on",S.showShortcuts); updSave(); };
  $("#adminSaveBtn").onclick=()=>{
    S.appName=$("#abName").value.trim()||"English Guru";
    S.announcement=$("#abAnn").value.trim();
    S.pin=$("#abPin").value.trim()||"1234";
    persist(); applyBranding();
    $("#adminSaveBar").classList.add("hidden");
    toast("✓ সেভ হয়েছে");
  };
}

/* ---------------- CONTENT ---------------- */
function adminContent(body){
  body.innerHTML=`
    <div class="admin-card">
      <h4>📖 কাস্টম শব্দ (${(S.customContent.dict||[]).length}টি)</h4><div class="ac-sub">বিল্ট-ইন ${DEFAULT_DICT.length}টি শব্দের সাথে যোগ হবে</div>
      <div id="acDict"></div>
      <button class="add-btn" id="acAddDict">➕ নতুন শব্দ যোগ করুন</button>
    </div>
    <div class="admin-card">
      <h4>📚 কাস্টম লেসন (${(S.customContent.lessons||[]).length}টি)</h4><div class="ac-sub">আপনার নিজের লেসন যোগ করুন</div>
      <div id="acLessons"></div>
      <button class="add-btn" id="acAddLesson">➕ নতুন লেসন যোগ করুন</button>
    </div>
    <div class="admin-card">
      <h4>💬 কাস্টম প্র্যাকটিস সিনারিও (${(S.customContent.scenarios||[]).length}টি)</h4><div class="ac-sub">নিজের কথোপকথনের দৃশ্য যোগ করুন</div>
      <div id="acScen"></div>
      <button class="add-btn" id="acAddScen">➕ নতুন সিনারিও যোগ করুন</button>
    </div>
  `;
  drawAdminDict(); drawAdminLessons(); drawAdminScen();

  $("#acAddDict").onclick=()=>{ S.customContent.dict.push({en:"new word", ph:"", bn:"বাংলা অর্থ", pos:"noun", cat:"Custom", ex:"Example sentence.", exBn:""}); persist(); drawAdminDict(); editDictItem(S.customContent.dict.length-1); };
  $("#acAddLesson").onclick=()=>{
    $("#genericModalBox").innerHTML=`
      <h3 class="modal-title">নতুন লেসন</h3>
      <div class="edit-form">
        <label class="field-label">লেসনের নাম</label><input class="field" id="nlTitle" placeholder="যেমন: বাজারের ইংরেজি">
        <label class="field-label">লেভেল</label>
        <select class="field" id="nlLevel"><option value="beginner">বিগিনার</option><option value="inter">ইন্টারমিডিয়েট</option><option value="adv">অ্যাডভান্সড</option></select>
        <label class="field-label">ভূমিকা</label><input class="field" id="nlIntro" placeholder="এই লেসনে কী শেখা হবে">
        <label class="field-label">শব্দ (প্রতি লাইনে একটি: english = বাংলা)</label>
        <textarea class="field" id="nlWords" placeholder="market = বাজার&#10;price = দাম"></textarea>
        <div class="modal-row"><button class="btn ghost" id="nlCancel">বাতিল</button><button class="btn primary" id="nlSave">তৈরি করুন</button></div>
      </div>`;
    $("#genericModal").classList.remove("hidden");
    $("#nlCancel").onclick=closeGenericModal;
    $("#nlSave").onclick=()=>{
      const title=$("#nlTitle").value.trim(); if(!title){ toast("নাম দিন"); return; }
      const words=$("#nlWords").value.split("\n").filter(x=>x.includes("=")).map(x=>{ const [en,bn]=x.split("="); return {en:en.trim(), bn:bn.trim()}; });
      const id="c"+Date.now();
      S.customContent.lessons.push({ id, level:$("#nlLevel").value, title, intro:$("#nlIntro").value.trim()||"নতুন লেসন", words:words.length?words:[{en:"word",bn:"শব্দ"}], rules:[], quiz:[{q:"\"word\" এর বাংলা কী?", opts:["শব্দ","কথা","লেখা"], a:0}] });
      persist(); closeGenericModal(); drawAdminLessons(); toast("✓ লেসন তৈরি হয়েছে");
    };
  };
  $("#acAddScen").onclick=()=>{
    $("#genericModalBox").innerHTML=`
      <h3 class="modal-title">নতুন প্র্যাকটিস সিনারিও</h3>
      <div class="edit-form">
        <label class="field-label">নাম (ইংরেজি)</label><input class="field" id="nsTitle" placeholder="Bank">
        <label class="field-label">বর্ণনা (বাংলা)</label><input class="field" id="nsSub" placeholder="ব্যাংকে হিসাব খোলা">
        <label class="field-label">ইমোজি</label><input class="field" id="nsIcon" value="🏦" maxlength="4">
        <label class="field-label">AI-এর প্রথম কথা (ইংরেজি)</label>
        <textarea class="field" id="nsPrompt" placeholder="Welcome to the bank! How can I help you today?"></textarea>
        <div class="modal-row"><button class="btn ghost" id="nsCancel">বাতিল</button><button class="btn primary" id="nsSave">তৈরি করুন</button></div>
      </div>`;
    $("#genericModal").classList.remove("hidden");
    $("#nsCancel").onclick=closeGenericModal;
    $("#nsSave").onclick=()=>{
      const title=$("#nsTitle").value.trim(); if(!title){ toast("নাম দিন"); return; }
      S.customContent.scenarios.push({
        id:"c"+Date.now(), icon:$("#nsIcon").value.trim()||"💬", title,
        sub:$("#nsSub").value.trim()||"প্র্যাকটিস",
        prompt:$("#nsPrompt").value.trim()||"Hello! Let's practice English together.",
        hints:[], aiNote:"You are a role-play partner for a Bangladeshi English learner. Scenario: "+title+". Keep replies short and correct gently."
      });
      persist(); closeGenericModal(); drawAdminScen(); toast("✓ সিনারিও তৈরি হয়েছে");
    };
  };
}

function drawAdminDict(){
  const box=$("#acDict"); if(!box) return;
  const custom=S.customContent.dict||[];
  box.innerHTML= custom.length? custom.map((d,i)=>`
    <div class="content-row">
      <div class="cr-main"><b>${esc(d.en)}</b><small>${esc(d.bn)}</small></div>
      <div class="cr-btns"><button class="minibtn" data-edict="${i}">✏️</button><button class="minibtn del" data-deldict="${i}">🗑</button></div>
    </div>`).join("")
    : `<div class="empty-note">কাস্টম শব্দ নেই</div>`;
  $$("[data-edict]",box).forEach(b=>b.onclick=()=>editDictItem(parseInt(b.dataset.edict)));
  $$("[data-deldict]",box).forEach(b=>b.onclick=()=>{ S.customContent.dict.splice(parseInt(b.dataset.deldict),1); persist(); drawAdminDict(); });
}

function editDictItem(i){
  const d=S.customContent.dict[i]; if(!d) return;
  $("#genericModalBox").innerHTML=`
    <h3 class="modal-title">শব্দ সম্পাদনা</h3>
    <div class="edit-form">
      <label class="field-label">ইংরেজি শব্দ</label><input class="field" id="edEn" value="${esc(d.en)}">
      <label class="field-label">বাংলা অর্থ</label><input class="field" id="edBn" value="${esc(d.bn)}">
      <label class="field-label">উচ্চারণ (ঐচ্ছিক)</label><input class="field" id="edPh" value="${esc(d.ph||"")}">
      <label class="field-label">উদাহরণ (ঐচ্ছিক)</label><input class="field" id="edEx" value="${esc(d.ex||"")}">
      <div class="modal-row"><button class="btn ghost" id="edCancel">বাতিল</button><button class="btn primary" id="edSave">সেভ</button></div>
    </div>`;
  $("#genericModal").classList.remove("hidden");
  $("#edCancel").onclick=closeGenericModal;
  $("#edSave").onclick=()=>{
    d.en=$("#edEn").value.trim()||d.en; d.bn=$("#edBn").value.trim()||d.bn;
    d.ph=$("#edPh").value.trim(); d.ex=$("#edEx").value.trim();
    persist(); closeGenericModal(); drawAdminDict(); toast("✓ সেভ হয়েছে");
  };
}

function drawAdminLessons(){
  const box=$("#acLessons"); if(!box) return;
  const custom=S.customContent.lessons||[];
  box.innerHTML= custom.length? custom.map((l,i)=>`
    <div class="content-row">
      <div class="cr-main"><b>${esc(l.title)}</b><small>${(l.words||[]).length} শব্দ · ${esc(l.level)}</small></div>
      <div class="cr-btns"><button class="minibtn del" data-dellesson="${i}">🗑</button></div>
    </div>`).join("")
    : `<div class="empty-note">কাস্টম লেসন নেই</div>`;
  $$("[data-dellesson]",box).forEach(b=>b.onclick=()=>{ S.customContent.lessons.splice(parseInt(b.dataset.dellesson),1); persist(); drawAdminLessons(); });
}

function drawAdminScen(){
  const box=$("#acScen"); if(!box) return;
  const custom=S.customContent.scenarios||[];
  box.innerHTML= custom.length? custom.map((s,i)=>`
    <div class="content-row">
      <div class="cr-main"><b>${esc(s.icon+" "+s.title)}</b><small>${esc(s.sub)}</small></div>
      <div class="cr-btns"><button class="minibtn del" data-delscen="${i}">🗑</button></div>
    </div>`).join("")
    : `<div class="empty-note">কাস্টম সিনারিও নেই — বিল্ট-ইন ${DEFAULT_SCENARIOS.length}টি আছে</div>`;
  $$("[data-delscen]",box).forEach(b=>b.onclick=()=>{ S.customContent.scenarios.splice(parseInt(b.dataset.delscen),1); persist(); drawAdminScen(); });
}

/* ---------------- AI ---------------- */
function adminAI(body){
  body.innerHTML=`
    <div class="admin-card">
      <h4>🤖 AI সেটিংস</h4>
      <div class="ac-sub">Groq ব্যবহার করুন (ফ্রি, দ্রুত) — <b>console.groq.com</b> থেকে ফ্রি API key নিন। OpenAI-compatible যেকোনো API-ও চলবে।</div>
      <label class="field-label">API Key</label>
      <input class="field" id="aaKey" type="password" placeholder="gsk_..." value="${esc(S.ai.apiKey||"")}">
      <label class="field-label">API Base URL</label>
      <input class="field" id="aaBase" value="${esc(S.ai.baseUrl)}">
      <label class="field-label">Chat Model</label>
      <input class="field" id="aaModel" value="${esc(S.ai.chatModel)}">
      <label class="field-label">Speech-to-Text Model (ভয়েস ইনপুটের জন্য)</label>
      <input class="field" id="aaStt" value="${esc(S.ai.sttModel)}">
      <button class="btn soft wide mt14" id="aaTest">🔬 সংযোগ পরীক্ষা</button>
      <div id="aaTestOut" class="mt8" style="font-size:13px"></div>
    </div>
    <div class="admin-card">
      <h4>ℹ️ কীভাবে কাজ করে</h4>
      <div class="ac-sub" style="line-height:1.8">
        • <b>টেক্সট চ্যাট:</b> AI দিয়ে চলে — key লাগবে<br>
        • <b>ভয়েস ইনপুট:</b> ব্রাউজারে ফ্রি SpeechRecognition; APK-তে Whisper STT (এই key দিয়েই)<br>
        • <b>AI-এর উত্তর শোনা:</b> ফোনের বিল্ট-ইন Text-to-Speech — ফ্রি<br>
        • Key শুধু আপনার ফোনে সেভ থাকে
      </div>
    </div>`;
  $("#adminSaveBar").classList.remove("hidden");
  $("#adminSaveBtn").onclick=()=>{
    S.ai.apiKey=$("#aaKey").value.trim();
    S.ai.baseUrl=$("#aaBase").value.trim()||"https://api.groq.com/openai/v1";
    S.ai.chatModel=$("#aaModel").value.trim()||"llama-3.3-70b-versatile";
    S.ai.sttModel=$("#aaStt").value.trim()||"whisper-large-v3-turbo";
    persist();
    $("#adminSaveBar").classList.add("hidden");
    toast("✓ AI সেটিংস সেভ হয়েছে");
  };
  $("#aaTest").onclick=async()=>{
    const out=$("#aaTestOut"); out.textContent="পরীক্ষা চলছে...";
    const key=$("#aaKey").value.trim(), base=$("#aaBase").value.trim().replace(/\/+$/,""), model=$("#aaModel").value.trim();
    try{
      const res=await fetch(base+"/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+key},body:JSON.stringify({model, messages:[{role:"user",content:"Say OK"}], max_tokens:5})});
      const j=await res.json();
      out.innerHTML= res.ok? `<span style="color:var(--brand-deep)">✓ সংযোগ সফল! AI বলল: "${esc((j.choices?.[0]?.message?.content||"OK").trim())}"</span>` : `<span style="color:var(--danger)">✗ সমস্যা: ${esc(String(j.error?.message||res.status).slice(0,150))}</span>`;
    }catch(e){ out.innerHTML=`<span style="color:var(--danger)">✗ সংযোগ ব্যর্থ — ইন্টারনেট/URL চেক করুন</span>`; }
  };
}

/* ---------------- DATA ---------------- */
function adminData(body){
  body.innerHTML=`
    <div class="admin-card">
      <h4>💾 ব্যাকআপ ও রিস্টোর</h4>
      <div class="ac-sub">সব কনটেন্ট ও সেটিংস ফাইল হিসেবে সেভ/লোড করুন</div>
      <button class="btn primary wide" id="adExport">⬇️ ব্যাকআপ ডাউনলোড (JSON)</button>
      <div class="mt8"></div>
      <label class="btn ghost wide" style="border:1.5px dashed var(--line)">⬆️ ব্যাকআপ লোড করুন<input type="file" id="adImport" accept=".json" style="display:none"></label>
      <div class="divider"></div>
      <button class="btn danger wide" id="adResetAll">⚠️ সব ডেটা রিসেট (ফ্যাক্টরি)</button>
    </div>
    <div class="admin-card">
      <h4>📊 পরিসংখ্যান</h4>
      <div class="content-row"><div class="cr-main"><b>ডিকশনারি শব্দ</b></div><span class="badge-soft">${allDict().length}</span></div>
      <div class="content-row"><div class="cr-main"><b>লেসন</b></div><span class="badge-soft">${allLessons().length}</span></div>
      <div class="content-row"><div class="cr-main"><b>প্র্যাকটিস সিনারিও</b></div><span class="badge-soft">${allScenarios().length}</span></div>
      <div class="content-row"><div class="cr-main"><b>শর্টকাট</b></div><span class="badge-soft">${DEFAULT_SHORTCUTS.length}</span></div>
      <div class="content-row"><div class="cr-main"><b>কিডস আইটেম</b></div><span class="badge-soft">${KID_FIRST_WORDS.length+KIDS_LETTERS.length}</span></div>
    </div>`;
  $("#adExport").onclick=()=>{
    const data={appName:S.appName, accent:S.accent, announcement:S.announcement, pin:S.pin, showKids:S.showKids, showShortcuts:S.showShortcuts, ai:S.ai, customContent:S.customContent, exportedAt:new Date().toISOString()};
    const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
    const a=document.createElement("a"); a.href=URL.createObjectURL(blob);
    a.download="english-guru-backup-"+todayKey()+".json"; a.click();
  };
  $("#adImport").onchange=(e)=>{
    const f=e.target.files[0]; if(!f) return;
    const r=new FileReader();
    r.onload=()=>{
      try{
        const j=JSON.parse(r.result);
        if(j.appName)S.appName=j.appName; if(j.accent)S.accent=j.accent; if(j.announcement!==undefined)S.announcement=j.announcement;
        if(j.pin)S.pin=j.pin; if(j.showKids!==undefined)S.showKids=j.showKids; if(j.showShortcuts!==undefined)S.showShortcuts=j.showShortcuts;
        if(j.ai)S.ai=j.ai; if(j.customContent)S.customContent=j.customContent;
        persist(); applyBranding(); renderAdminTab("data"); toast("✓ ব্যাকআপ লোড হয়েছে");
      }catch(err){ toast("ভুল ফাইল ফরম্যাট"); }
    };
    r.readAsText(f);
  };
  $("#adResetAll").onclick=()=>{
    if(confirm("সব সেটিংস, কনটেন্ট ও প্রোগ্রেস মুছে যাবে। নিশ্চিত?")){
      Object.keys(localStorage).filter(k=>k.startsWith("eg_")).forEach(k=>localStorage.removeItem(k));
      S=defaultState(); applyBranding(); closeAdminPanel(); go("home"); toast("ফ্যাক্টরি রিসেট সম্পন্ন");
    }
  };
}
