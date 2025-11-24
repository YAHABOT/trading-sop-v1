document.querySelectorAll("[data-acc-trigger]").forEach(h => {
  h.addEventListener("click", () => {
    h.parentElement.classList.toggle("open");
  });
});

function load(k, f) {
  try { return JSON.parse(localStorage.getItem(k)) ?? f; }
  catch { return f; }
}
function save(k,v){ localStorage.setItem(k,JSON.stringify(v)); }

// Storage keys
const K = {
  scenarios:"scenarios",
  watch:"watch",
  surge:"surge",
  adapt:"adapt",
  tradem:"tradeModule",
};

// State
let S = {
  scenarios: load(K.scenarios, []),
  watch: load(K.watch, []),
  surge: load(K.surge, []),
  adapt: load(K.adapt, []),
  trades: load(K.tradem, []),
};

// Renderers -----------------------------------
function renderScenarios(){
  const box=document.getElementById("scenarioList");
  box.innerHTML="";
  S.scenarios.forEach((sc,i)=>{
    const c=document.createElement("div");
    c.className="card";
    c.innerHTML=`
      <div class="card-header">
        <strong>S${i+1} — ${sc.title||"Untitled"}</strong>
        <button data-del-s="${i}">Delete</button>
      </div>
      <p><strong>IF:</strong> ${sc.if||"—"}</p>
      <p><strong>THEN:</strong> ${sc.then||"—"}</p>
    `;
    box.appendChild(c);
  });
}
function renderList(list,boxId,label){
  const box=document.getElementById(boxId);
  box.innerHTML="";
  list.forEach((e,i)=>{
    const c=document.createElement("div");
    c.className="card";
    c.innerHTML=`
      <div class="card-header">
        <strong>${label} #${i+1}</strong>
        <button data-del="${boxId}-${i}">Delete</button>
      </div>
      <p>${e.time||""} ${e.emotion||""}</p>
      <p>${e.notes||""}</p>`;
    box.appendChild(c);
  });
}
function renderTrades(){
  const box=document.getElementById("tradeIdeaList");
  box.innerHTML="";
  S.trades.forEach((t,i)=>{
    const c=document.createElement("div");
    c.className="card";
    c.innerHTML=`
      <div class="card-header">
        <strong>T${i+1} — ${t.title||"Trade Idea"}</strong>
        <button data-del-trade="${i}">Delete</button>
      </div>
      <p><strong>Pre-Trade:</strong> ${t.pre||"—"}</p>
      <p><strong>Signal:</strong> ${t.signal||"—"}</p>
      <p><strong>Status:</strong> ${t.status||"none"}</p>
    `;
    box.appendChild(c);
  });
}

// Add buttons -----------------------------------
document.getElementById("addScenarioBtn").onclick=()=>{
  const t=document.getElementById("scenario_title")?.value||"";
  const ift=document.getElementById("scenario_if")?.value||"";
  const th=document.getElementById("scenario_then")?.value||"";
  S.scenarios.push({title:t,if:ift,then:th});
  save(K.scenarios,S.scenarios);
  renderScenarios();
};

document.getElementById("addWatchBtn").onclick=()=>{
  S.watch.push({time:"",emotion:"",notes:""});
  save(K.watch,S.watch);
  renderList(S.watch,"watchList","Watch");
};

document.getElementById("addSurgeBtn").onclick=()=>{
  S.surge.push({time:"",emotion:"",notes:""});
  save(K.surge,S.surge);
  renderList(S.surge,"surgeList","Surge");
};

document.getElementById("addAdaptBtn").onclick=()=>{
  S.adapt.push({time:"",notes:""});
  save(K.adapt,S.adapt);
  renderList(S.adapt,"adaptList","Adapt");
};

document.getElementById("addTradeIdeaBtn").onclick=()=>{
  S.trades.push({title:"",pre:"",signal:"",status:"none"});
  save(K.tradem,S.trades);
  renderTrades();
};

// Delete handlers
document.body.onclick=e=>{
  if(e.target.dataset.delS !== undefined){
    const i=+e.target.dataset.delS;
    S.scenarios.splice(i,1);
    save(K.scenarios,S.scenarios);
    renderScenarios();
  }
  if(e.target.dataset.del){
    const [box,i]=e.target.dataset.del.split("-");
    const idx=+i;
    if(box==="watchList") S.watch.splice(idx,1);
    if(box==="surgeList") S.surge.splice(idx,1);
    if(box==="adaptList") S.adapt.splice(idx,1);
    save(K.watch,S.watch); save(K.surge,S.surge); save(K.adapt,S.adapt);
    renderList(S.watch,"watchList","Watch");
    renderList(S.surge,"surgeList","Surge");
    renderList(S.adapt,"adaptList","Adapt");
  }
  if(e.target.dataset.delTrade !== undefined){
    const i=+e.target.dataset.delTrade;
    S.trades.splice(i,1);
    save(K.tradem,S.trades);
    renderTrades();
  }
};

// Reset day
document.getElementById("resetDayBtn").onclick=()=>{
  localStorage.clear();
  location.reload();
};

// INIT
renderScenarios();
renderList(S.watch,"watchList","Watch");
renderList(S.surge,"surgeList","Surge");
renderList(S.adapt,"adaptList","Adapt");
renderTrades();
