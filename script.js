// ===========================
// CONSTANTS & UTILITIES
// ===========================

const STORAGE_KEY = "tsj_v11_state";

function formatTagsString(raw) {
  return raw
    .split(",")
    .map(t => t.trim())
    .filter(Boolean)
    .join(", ");
}

function setStatus(msg) {
  const el = document.getElementById("statusText");
  if (!el) return;
  el.textContent = msg || "";
  if (msg) {
    setTimeout(() => {
      if (el.textContent === msg) el.textContent = "";
    }, 1500);
  }
}

// ===========================
// STATE SHAPE
// ===========================

const emptyState = () => ({
  module1: {
    levelsMarked: { checked: false, obs: "", tags: "" },
    newsChecked: { checked: false, obs: "", tags: "" },
    htfCheck: { checked: false, obs: "", tags: "" },
    ltfAlignment: { choice: "", obs: "", tags: "" },
    nyImpulse: "",
    sessionEmotion: ""
  },
  scenarios: [],
  module2: {
    watchEntries: [],
    surges: [],
    adaptations: [],
    session: {
      traderEnergy: "",
      marketEnergy: "",
      marketType: "",
      notes: ""
    }
  }
});

let state = emptyState();

// ===========================
// LOAD / SAVE
// ===========================

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      state = emptyState();
      return;
    }
    const parsed = JSON.parse(raw);
    // shallow merge with default to avoid missing keys
    state = Object.assign(emptyState(), parsed);
  } catch (e) {
    console.error("Failed to load state:", e);
    state = emptyState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setStatus("Saved");
  } catch (e) {
    console.error("Failed to save state:", e);
    setStatus("Error saving");
  }
}

// ===========================
// MODULE 1 — DOM BINDING
// ===========================

function applyModule1ToDOM() {
  const m1 = state.module1;

  document.getElementById("levelsMarkedCheckbox").checked = m1.levelsMarked.checked;
  document.getElementById("levelsMarkedObs").value = m1.levelsMarked.obs;
  document.getElementById("levelsMarkedTags").value = m1.levelsMarked.tags;

  document.getElementById("newsCheckedCheckbox").checked = m1.newsChecked.checked;
  document.getElementById("newsCheckedObs").value = m1.newsChecked.obs;
  document.getElementById("newsCheckedTags").value = m1.newsChecked.tags;

  document.getElementById("htfCheckedCheckbox").checked = m1.htfCheck.checked;
  document.getElementById("htfObs").value = m1.htfCheck.obs;
  document.getElementById("htfTags").value = m1.htfCheck.tags;

  document.getElementById("ltfAlignment").value = m1.ltfAlignment.choice;
  document.getElementById("ltfObs").value = m1.ltfAlignment.obs;
  document.getElementById("ltfTags").value = m1.ltfAlignment.tags;

  document.getElementById("nyImpulse").value = m1.nyImpulse || "";
  document.getElementById("sessionEmotion").value = m1.sessionEmotion || "";
}

function readModule1FromDOM() {
  const m1 = state.module1;

  m1.levelsMarked.checked = document.getElementById("levelsMarkedCheckbox").checked;
  m1.levelsMarked.obs = document.getElementById("levelsMarkedObs").value;
  m1.levelsMarked.tags = formatTagsString(
    document.getElementById("levelsMarkedTags").value
  );

  m1.newsChecked.checked = document.getElementById("newsCheckedCheckbox").checked;
  m1.newsChecked.obs = document.getElementById("newsCheckedObs").value;
  m1.newsChecked.tags = formatTagsString(
    document.getElementById("newsCheckedTags").value
  );

  m1.htfCheck.checked = document.getElementById("htfCheckedCheckbox").checked;
  m1.htfCheck.obs = document.getElementById("htfObs").value;
  m1.htfCheck.tags = formatTagsString(
    document.getElementById("htfTags").value
  );

  m1.ltfAlignment.choice = document.getElementById("ltfAlignment").value;
  m1.ltfAlignment.obs = document.getElementById("ltfObs").value;
  m1.ltfAlignment.tags = formatTagsString(
    document.getElementById("ltfTags").value
  );

  m1.nyImpulse = document.getElementById("nyImpulse").value;
  m1.sessionEmotion = document.getElementById("sessionEmotion").value;
}

// Add blur handler for tag formatting on the fly
["levelsMarkedTags", "newsCheckedTags", "htfTags", "ltfTags"].forEach(id => {
  document.addEventListener("blur", e => {
    if (e.target && e.target.id === id) {
      e.target.value = formatTagsString(e.target.value);
      readModule1FromDOM();
      saveState();
    }
  }, true);
});

// Basic input listener for Module 1
document.addEventListener("input", e => {
  const m1Ids = [
    "levelsMarkedCheckbox",
    "levelsMarkedObs",
    "levelsMarkedTags",
    "newsCheckedCheckbox",
    "newsCheckedObs",
    "newsCheckedTags",
    "htfCheckedCheckbox",
    "htfObs",
    "htfTags",
    "ltfAlignment",
    "ltfObs",
    "ltfTags",
    "nyImpulse",
    "sessionEmotion"
  ];
  if (m1Ids.includes(e.target.id)) {
    readModule1FromDOM();
    saveState();
  }
});

// ===========================
// SCENARIOS ENGINE (MODULE 1)
// ===========================

const scenarioListEl = document.getElementById("scenarioList");
const addScenarioBtn = document.getElementById("addScenarioBtn");

function createScenario() {
  const id = "S" + (state.scenarios.length + 1);
  return { id, title: "", ifText: "", thenText: "", collapsed: false };
}

function renderScenarios() {
  scenarioListEl.innerHTML = "";
  if (!state.scenarios.length) {
    const empty = document.createElement("div");
    empty.className = "helper";
    empty.textContent = "No scenarios yet. Use + Add Scenario to define pre-market IF / THEN plans.";
    scenarioListEl.appendChild(empty);
    return;
  }

  state.scenarios.forEach((sc, index) => {
    const card = document.createElement("div");
    card.className = "scenario-card";

    const head = document.createElement("div");
    head.className = "scenario-card-header";

    const left = document.createElement("div");
    left.className = "scenario-id-title";

    const idLine = document.createElement("div");
    idLine.className = "scenario-id-line";
    idLine.textContent = sc.id + " — " + (sc.title || "no title yet");

    const subtitle = document.createElement("div");
    subtitle.className = "scenario-subtitle";
    subtitle.textContent = "Tap Collapse / Expand to show full IF & THEN";

    left.appendChild(idLine);
    left.appendChild(subtitle);

    const actions = document.createElement("div");
    actions.className = "scenario-header-actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "btn-pill btn-ghost";
    toggleBtn.type = "button";
    toggleBtn.textContent = sc.collapsed ? "Expand" : "Collapse";
    toggleBtn.addEventListener("click", () => {
      sc.collapsed = !sc.collapsed;
      saveState();
      renderScenarios();
    });

    const delBtn = document.createElement("button");
    delBtn.className = "btn-pill btn-danger";
    delBtn.type = "button";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      state.scenarios.splice(index, 1);
      saveState();
      renderScenarios();
    });

    actions.appendChild(toggleBtn);
    actions.appendChild(delBtn);

    head.appendChild(left);
    head.appendChild(actions);
    card.appendChild(head);

    const body = document.createElement("div");
    body.className = "scenario-body";
    body.style.display = sc.collapsed ? "none" : "block";

    const titleLabel = document.createElement("label");
    titleLabel.className = "field-label";
    titleLabel.textContent = "Title";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = sc.title;
    titleInput.placeholder = "Scenario name (e.g. NYO sweep + reclaim)…";
    titleInput.addEventListener("input", () => {
      sc.title = titleInput.value;
      saveState();
      renderScenarios();
    });

    const ifLabel = document.createElement("label");
    ifLabel.className = "field-label";
    ifLabel.textContent = "IF";

    const ifArea = document.createElement("textarea");
    ifArea.value = sc.ifText;
    ifArea.placeholder = "Condition (price behavior, key level interaction, time window, etc.)";
    ifArea.addEventListener("input", () => {
      sc.ifText = ifArea.value;
      saveState();
    });

    const thenLabel = document.createElement("label");
    thenLabel.className = "field-label";
    thenLabel.textContent = "THEN";

    const thenArea = document.createElement("textarea");
    thenArea.value = sc.thenText;
    thenArea.placeholder = "Execution expectation (direction, entry model, TP/SL behavior, etc.)";
    thenArea.addEventListener("input", () => {
      sc.thenText = thenArea.value;
      saveState();
    });

    body.appendChild(titleLabel);
    body.appendChild(titleInput);
    body.appendChild(ifLabel);
    body.appendChild(ifArea);
    body.appendChild(thenLabel);
    body.appendChild(thenArea);

    card.appendChild(body);
    scenarioListEl.appendChild(card);
  });
}

if (addScenarioBtn) {
  addScenarioBtn.addEventListener("click", () => {
    state.scenarios.push(createScenario());
    saveState();
    renderScenarios();
  });
}

// ===========================
// MODULE 2 — WATCHING / SURGES / ADAPTATION
// ===========================

const watchListEl = document.getElementById("watchList");
const addWatchBtn = document.getElementById("addWatchBtn");

const surgeListEl = document.getElementById("surgeList");
const addSurgeBtn = document.getElementById("addSurgeBtn");

const adaptListEl = document.getElementById("adaptList");
const addAdaptBtn = document.getElementById("addAdaptBtn");

function createWatchEntry() {
  return {
    time: "",
    emotion: "",
    tags: "",
    notes: "",
    interpretation: {
      breakout: false,
      continuation: false,
      consolidation: false,
      reversal: false,
      rejection: false,
      expansion: false
    },
    collapsed: false
  };
}

function createSurgeEntry() {
  return {
    time: "",
    spike: "",
    trigger: "",
    notes: "",
    collapsed: false
  };
}

function createAdaptationEntry() {
  return {
    startTime: "",
    endTime: "",
    volatilityShift: false,
    volumeShift: false,
    newsEvent: false,
    trendChange: false,
    structureBreak: false,
    sessionTransition: false,
    tags: "",
    marketNotes: "",
    traderNotes: "",
    collapsed: false
  };
}

// ---------- WATCH ENTRIES ----------

function renderWatchEntries() {
  const arr = state.module2.watchEntries;
  watchListEl.innerHTML = "";

  if (!arr.length) {
    const empty = document.createElement("div");
    empty.className = "helper";
    empty.textContent = "No watching entries yet.";
    watchListEl.appendChild(empty);
    return;
  }

  arr.forEach((entry, index) => {
    const card = document.createElement("div");
    card.className = "entry-card";

    const header = document.createElement("div");
    header.className = "entry-card-header";

    const left = document.createElement("div");
    left.className = "entry-title";

    const titleLine = document.createElement("div");
    titleLine.className = "entry-title-line";
    titleLine.textContent = `Watching Entry #${index + 1}`;

    const meta = document.createElement("div");
    meta.className = "entry-meta";
    meta.textContent = entry.time ? entry.time : "--:--";

    left.appendChild(titleLine);
    left.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "entry-header-actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "btn-pill btn-ghost";
    toggleBtn.textContent = entry.collapsed ? "Expand" : "Collapse";
    toggleBtn.addEventListener("click", () => {
      entry.collapsed = !entry.collapsed;
      saveState();
      renderWatchEntries();
    });

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "btn-pill btn-danger";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      state.module2.watchEntries.splice(index, 1);
      saveState();
      renderWatchEntries();
    });

    actions.appendChild(toggleBtn);
    actions.appendChild(delBtn);

    header.appendChild(left);
    header.appendChild(actions);
    card.appendChild(header);

    const body = document.createElement("div");
    body.className = "entry-card-body";
    body.style.display = entry.collapsed ? "none" : "block";

    const timeLabel = document.createElement("label");
    timeLabel.className = "field-label";
    timeLabel.textContent = "Time";

    const timeInput = document.createElement("input");
    timeInput.type = "text";
    timeInput.value = entry.time;
    timeInput.placeholder = "e.g. 09:45, 10:10, etc.";
    timeInput.addEventListener("input", () => {
      entry.time = timeInput.value;
      saveState();
      renderWatchEntries(); // refresh header meta
    });

    const emotionLabel = document.createElement("label");
    emotionLabel.className = "field-label";
    emotionLabel.textContent = "Emotion";

    const emotionInput = document.createElement("input");
    emotionInput.type = "text";
    emotionInput.value = entry.emotion;
    emotionInput.placeholder = "calm, hesitant, FOMO, etc.";
    emotionInput.addEventListener("input", () => {
      entry.emotion = emotionInput.value;
      saveState();
    });

    const interpLabel = document.createElement("label");
    interpLabel.className = "field-label";
    interpLabel.textContent = "Interpretation";

    const grid = document.createElement("div");
    grid.className = "tag-grid";

    const interpOptions = [
      ["breakout", "Breakout"],
      ["continuation", "Continuation"],
      ["consolidation", "Consolidation"],
      ["reversal", "Reversal"],
      ["rejection", "Rejection"],
      ["expansion", "Expansion"]
    ];

    interpOptions.forEach(([key, label]) => {
      const wrap = document.createElement("label");
      wrap.className = "tag-checkbox";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = !!entry.interpretation[key];
      cb.addEventListener("change", () => {
        entry.interpretation[key] = cb.checked;
        saveState();
      });
      const txt = document.createElement("span");
      txt.textContent = label;
      wrap.appendChild(cb);
      wrap.appendChild(txt);
      grid.appendChild(wrap);
    });

    const tagsLabel = document.createElement("label");
    tagsLabel.className = "field-label";
    tagsLabel.textContent = "Custom tags";

    const tagsInput = document.createElement("input");
    tagsInput.type = "text";
    tagsInput.value = entry.tags;
    tagsInput.placeholder = "e.g. liquidity hunt, fake pump";
    tagsInput.addEventListener("blur", () => {
      entry.tags = formatTagsString(tagsInput.value);
      tagsInput.value = entry.tags;
      saveState();
    });
    tagsInput.addEventListener("input", () => {
      entry.tags = tagsInput.value;
      saveState();
    });

    const notesLabel = document.createElement("label");
    notesLabel.className = "field-label";
    notesLabel.textContent = "Notes";

    const notesArea = document.createElement("textarea");
    notesArea.value = entry.notes;
    notesArea.placeholder = "What you saw and why it mattered…";
    notesArea.addEventListener("input", () => {
      entry.notes = notesArea.value;
      saveState();
    });

    body.appendChild(timeLabel);
    body.appendChild(timeInput);
    body.appendChild(emotionLabel);
    body.appendChild(emotionInput);
    body.appendChild(interpLabel);
    body.appendChild(grid);
    body.appendChild(tagsLabel);
    body.appendChild(tagsInput);
    body.appendChild(notesLabel);
    body.appendChild(notesArea);

    card.appendChild(body);
    watchListEl.appendChild(card);
  });
}

if (addWatchBtn) {
  addWatchBtn.addEventListener("click", () => {
    state.module2.watchEntries.push(createWatchEntry());
    saveState();
    renderWatchEntries();
  });
}

// ---------- SURGES ----------

function renderSurges() {
  const arr = state.module2.surges;
  surgeListEl.innerHTML = "";

  if (!arr.length) {
    const empty = document.createElement("div");
    empty.className = "helper";
    empty.textContent = "No emotional surges logged yet.";
    surgeListEl.appendChild(empty);
    return;
  }

  arr.forEach((surge, index) => {
    const card = document.createElement("div");
    card.className = "entry-card";

    const header = document.createElement("div");
    header.className = "entry-card-header";

    const left = document.createElement("div");
    const title = document.createElement("div");
    title.className = "entry-title-line";
    title.textContent = `Surge #${index + 1}`;
    const meta = document.createElement("div");
    meta.className = "entry-meta";
    meta.textContent = surge.time || "--:--";
    left.appendChild(title);
    left.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "entry-header-actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "btn-pill btn-ghost";
    toggleBtn.textContent = surge.collapsed ? "Expand" : "Collapse";
    toggleBtn.addEventListener("click", () => {
      surge.collapsed = !surge.collapsed;
      saveState();
      renderSurges();
    });

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "btn-pill btn-danger";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      state.module2.surges.splice(index, 1);
      saveState();
      renderSurges();
    });

    actions.appendChild(toggleBtn);
    actions.appendChild(delBtn);

    header.appendChild(left);
    header.appendChild(actions);
    card.appendChild(header);

    const body = document.createElement("div");
    body.className = "entry-card-body";
    body.style.display = surge.collapsed ? "none" : "block";

    const timeLabel = document.createElement("label");
    timeLabel.className = "field-label";
    timeLabel.textContent = "Time";

    const timeInput = document.createElement("input");
    timeInput.type = "text";
    timeInput.value = surge.time;
    timeInput.placeholder = "e.g. 10:05, 11:32";
    timeInput.addEventListener("input", () => {
      surge.time = timeInput.value;
      saveState();
      renderSurges();
    });

    const spikeLabel = document.createElement("label");
    spikeLabel.className = "field-label";
    spikeLabel.textContent = "Emotion spike";

    const spikeInput = document.createElement("input");
    spikeInput.type = "text";
    spikeInput.value = surge.spike;
    spikeInput.placeholder = "panic, tilt, anger, FOMO…";
    spikeInput.addEventListener("input", () => {
      surge.spike = spikeInput.value;
      saveState();
    });

    const triggerLabel = document.createElement("label");
    triggerLabel.className = "field-label";
    triggerLabel.textContent = "Trigger";

    const triggerInput = document.createElement("input");
    triggerInput.type = "text";
    triggerInput.value = surge.trigger;
    triggerInput.placeholder = "what caused the spike (missed entry, drawdown, etc.)";
    triggerInput.addEventListener("input", () => {
      surge.trigger = triggerInput.value;
      saveState();
    });

    const notesLabel = document.createElement("label");
    notesLabel.className = "field-label";
    notesLabel.textContent = "Notes / reaction";

    const notesArea = document.createElement("textarea");
    notesArea.value = surge.notes;
    notesArea.placeholder = "How you reacted, what you did next, whether you regained control.";
    notesArea.addEventListener("input", () => {
      surge.notes = notesArea.value;
      saveState();
    });

    body.appendChild(timeLabel);
    body.appendChild(timeInput);
    body.appendChild(spikeLabel);
    body.appendChild(spikeInput);
    body.appendChild(triggerLabel);
    body.appendChild(triggerInput);
    body.appendChild(notesLabel);
    body.appendChild(notesArea);

    card.appendChild(body);
    surgeListEl.appendChild(card);
  });
}

if (addSurgeBtn) {
  addSurgeBtn.addEventListener("click", () => {
    state.module2.surges.push(createSurgeEntry());
    saveState();
    renderSurges();
  });
}

// ---------- ADAPTATION WINDOWS ----------

function renderAdaptations() {
  const arr = state.module2.adaptations;
  adaptListEl.innerHTML = "";

  if (!arr.length) {
    const empty = document.createElement("div");
    empty.className = "helper";
    empty.textContent = "No adaptation windows logged yet.";
    adaptListEl.appendChild(empty);
    return;
  }

  arr.forEach((ad, index) => {
    const card = document.createElement("div");
    card.className = "entry-card";

    const header = document.createElement("div");
    header.className = "entry-card-header";

    const left = document.createElement("div");
    const title = document.createElement("div");
    title.className = "entry-title-line";
    title.textContent = `Adaptation #${index + 1}`;
    const meta = document.createElement("div");
    meta.className = "entry-meta";
    meta.textContent = ad.startTime && ad.endTime ? `${ad.startTime} → ${ad.endTime}` : "--:--";
    left.appendChild(title);
    left.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "entry-header-actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "btn-pill btn-ghost";
    toggleBtn.textContent = ad.collapsed ? "Expand" : "Collapse";
    toggleBtn.addEventListener("click", () => {
      ad.collapsed = !ad.collapsed;
      saveState();
      renderAdaptations();
    });

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "btn-pill btn-danger";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      state.module2.adaptations.splice(index, 1);
      saveState();
      renderAdaptations();
    });

    actions.appendChild(toggleBtn);
    actions.appendChild(delBtn);

    header.appendChild(left);
    header.appendChild(actions);
    card.appendChild(header);

    const body = document.createElement("div");
    body.className = "entry-card-body";
    body.style.display = ad.collapsed ? "none" : "block";

    const startLabel = document.createElement("label");
    startLabel.className = "field-label";
    startLabel.textContent = "Start time";

    const startInput = document.createElement("input");
    startInput.type = "text";
    startInput.value = ad.startTime;
    startInput.placeholder = "--:--";
    startInput.addEventListener("input", () => {
      ad.startTime = startInput.value;
      saveState();
      renderAdaptations();
    });

    const endLabel = document.createElement("label");
    endLabel.className = "field-label";
    endLabel.textContent = "End time";

    const endInput = document.createElement("input");
    endInput.type = "text";
    endInput.value = ad.endTime;
    endInput.placeholder = "--:--";
    endInput.addEventListener("input", () => {
      ad.endTime = endInput.value;
      saveState();
      renderAdaptations();
    });

    const whatLabel = document.createElement("label");
    whatLabel.className = "field-label";
    whatLabel.textContent = "What changed?";

    const grid = document.createElement("div");
    grid.className = "tag-grid";

    const opts = [
      ["volatilityShift", "Volatility shift"],
      ["volumeShift", "Volume shift"],
      ["newsEvent", "News event"],
      ["trendChange", "Trend change"],
      ["structureBreak", "Structure break"],
      ["sessionTransition", "Session transition"]
    ];

    opts.forEach(([key, label]) => {
      const wrap = document.createElement("label");
      wrap.className = "tag-checkbox";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = !!ad[key];
      cb.addEventListener("change", () => {
        ad[key] = cb.checked;
        saveState();
      });
      const span = document.createElement("span");
      span.textContent = label;
      wrap.appendChild(cb);
      wrap.appendChild(span);
      grid.appendChild(wrap);
    });

    const tagsLabel = document.createElement("label");
    tagsLabel.className = "field-label";
    tagsLabel.textContent = "Custom tags";

    const tagsInput = document.createElement("input");
    tagsInput.type = "text";
    tagsInput.value = ad.tags;
    tagsInput.placeholder = "Add custom change indicators…";
    tagsInput.addEventListener("blur", () => {
      ad.tags = formatTagsString(tagsInput.value);
      tagsInput.value = ad.tags;
      saveState();
    });
    tagsInput.addEventListener("input", () => {
      ad.tags = tagsInput.value;
      saveState();
    });

    const mktLabel = document.createElement("label");
    mktLabel.className = "field-label";
    mktLabel.textContent = "Market change notes";

    const mktArea = document.createElement("textarea");
    mktArea.value = ad.marketNotes;
    mktArea.placeholder = "Describe what changed in the market…";
    mktArea.addEventListener("input", () => {
      ad.marketNotes = mktArea.value;
      saveState();
    });

    const traderLabel = document.createElement("label");
    traderLabel.className = "field-label";
    traderLabel.textContent = "Trader response notes";

    const traderArea = document.createElement("textarea");
    traderArea.value = ad.traderNotes;
    traderArea.placeholder = "How did you adapt your approach?";
    traderArea.addEventListener("input", () => {
      ad.traderNotes = traderArea.value;
      saveState();
    });

    body.appendChild(startLabel);
    body.appendChild(startInput);
    body.appendChild(endLabel);
    body.appendChild(endInput);
    body.appendChild(whatLabel);
    body.appendChild(grid);
    body.appendChild(tagsLabel);
    body.appendChild(tagsInput);
    body.appendChild(mktLabel);
    body.appendChild(mktArea);
    body.appendChild(traderLabel);
    body.appendChild(traderArea);

    card.appendChild(body);
    adaptListEl.appendChild(card);
  });
}

if (addAdaptBtn) {
  addAdaptBtn.addEventListener("click", () => {
    state.module2.adaptations.push(createAdaptationEntry());
    saveState();
    renderAdaptations();
  });
}

// ---------- SESSION ENERGY ----------

const traderEnergyInput = document.getElementById("traderEnergy");
const marketEnergyInput = document.getElementById("marketEnergy");
const marketTypeSelect = document.getElementById("marketType");
const sessionNotesArea = document.getElementById("sessionNotes");

function applySessionToDOM() {
  const s = state.module2.session;
  traderEnergyInput.value = s.traderEnergy;
  marketEnergyInput.value = s.marketEnergy;
  marketTypeSelect.value = s.marketType;
  sessionNotesArea.value = s.notes;
}

function bindSessionEvents() {
  traderEnergyInput.addEventListener("input", () => {
    state.module2.session.traderEnergy = traderEnergyInput.value;
    saveState();
  });
  marketEnergyInput.addEventListener("input", () => {
    state.module2.session.marketEnergy = marketEnergyInput.value;
    saveState();
  });
  marketTypeSelect.addEventListener("change", () => {
    state.module2.session.marketType = marketTypeSelect.value;
    saveState();
  });
  sessionNotesArea.addEventListener("input", () => {
    state.module2.session.notes = sessionNotesArea.value;
    saveState();
  });
}

// ===========================
// RESET DAY
// ===========================

const resetBtn = document.getElementById("resetDayBtn");

function resetDay() {
  if (!confirm("Reset all Module 1 & 2 data for this day? This cannot be undone.")) return;
  state = emptyState();
  saveState();
  // Re-apply everything
  applyModule1ToDOM();
  renderScenarios();
  renderWatchEntries();
  renderSurges();
  renderAdaptations();
  applySessionToDOM();
  setStatus("Day reset");
}

if (resetBtn) {
  resetBtn.addEventListener("click", resetDay);
}

// ===========================
// ACCORDION
// ===========================

document.querySelectorAll(".accordion-header").forEach(header => {
  header.addEventListener("click", () => {
    const parent = header.closest(".accordion-item");
    parent.classList.toggle("open");
  });
});

// ===========================
// INIT
// ===========================

window.addEventListener("DOMContentLoaded", () => {
  loadState();
  applyModule1ToDOM();
  renderScenarios();
  renderWatchEntries();
  renderSurges();
  renderAdaptations();
  applySessionToDOM();
  bindSessionEvents();

  // Ensure Module 1 open by default
  const m1 = document.getElementById("module1");
  if (m1) m1.classList.add("open");
});
