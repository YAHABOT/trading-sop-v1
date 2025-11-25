// ===== START OF FILE: script.js (Build 009) =====

// =====================================================
// PART 1 — BOOTSTRAP, ACCORDION, STATUS, STORAGE KEYS
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  // Accordion: toggle .active on parent .accordion-item
  document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      if (!item) return;
      item.classList.toggle("active");
    });
  });

  const statusEl = document.getElementById("statusText");
  function setStatus(msg) {
    if (!statusEl) return;
    statusEl.textContent = msg || "";
    if (msg) {
      setTimeout(() => {
        if (statusEl.textContent === msg) {
          statusEl.textContent = "";
        }
      }, 1500);
    }
  }

  // STORAGE KEYS
  const STORAGE_KEY_SCENARIOS = "sop_v1_scenarios_only";
  const STORAGE_KEY_MODULE2 = "sop_v1_module2";
  const STORAGE_KEY_MODULE3 = "sop_v1_module3_trade_ideas";

  const resetDayBtn = document.getElementById("resetDayBtn");

  // =====================================================
  // PART 2 — MODULE 1: IF–THEN SCENARIOS (PERSISTED)
  // =====================================================

  let scenarios = [];
  let nextScenarioIndex = 1;

  const scenarioListEl = document.getElementById("scenarioList");
  const addScenarioBtn = document.getElementById("addScenarioBtn");

  function saveScenarios() {
    try {
      localStorage.setItem(STORAGE_KEY_SCENARIOS, JSON.stringify({ scenarios }));
      setStatus("Scenarios saved");
    } catch (e) {
      console.error(e);
      setStatus("Save error");
    }
  }

  function loadScenarios() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SCENARIOS);
      if (!raw) {
        scenarios = [];
        nextScenarioIndex = 1;
        return;
      }

      const parsed = JSON.parse(raw);
      scenarios = Array.isArray(parsed.scenarios) ? parsed.scenarios : [];

      let maxIndex = 0;
      scenarios.forEach(sc => {
        if (!("collapsed" in sc)) sc.collapsed = false;

        if (sc.id && typeof sc.id === "string" && sc.id.startsWith("S")) {
          const n = parseInt(sc.id.slice(1), 10);
          if (!isNaN(n) && n > maxIndex) maxIndex = n;
        }
      });

      nextScenarioIndex = maxIndex + 1;
    } catch (e) {
      console.error(e);
      scenarios = [];
      nextScenarioIndex = 1;
    }
  }

  function createScenario() {
    const id = "S" + nextScenarioIndex++;
    return { id, title: "", ifText: "", thenText: "", collapsed: false };
  }

  function renderScenarios() {
    if (!scenarioListEl) return;
    scenarioListEl.innerHTML = "";

    if (!scenarios.length) {
      const empty = document.createElement("div");
      empty.style.fontSize = "0.75rem";
      empty.style.color = "#6b7280";
      empty.textContent = "No scenarios added yet.";
      scenarioListEl.appendChild(empty);
      return;
    }

    scenarios.forEach((sc, index) => {
      const card = document.createElement("div");
      card.className = "entry-card scenario-card" + (sc.collapsed ? " collapsed" : "");

      const headerRow = document.createElement("div");
      headerRow.className = "scenario-header-row";
      headerRow.style.display = "flex";
      headerRow.style.justifyContent = "space-between";
      headerRow.style.alignItems = "center";
      headerRow.style.marginBottom = "6px";

      const left = document.createElement("div");
      left.className = "scenario-id";
      left.style.fontSize = "0.8rem";
      left.style.fontWeight = "600";
      left.textContent = sc.id + (sc.title ? " — " + sc.title : "");

      const right = document.createElement("div");
      right.style.display = "flex";
      right.style.alignItems = "center";
      right.style.gap = "4px";

      const toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.className = "card-toggle-btn";
      toggleBtn.textContent = sc.collapsed ? "+" : "−";
      toggleBtn.style.background = "#222";
      toggleBtn.style.color = "#eee";
      toggleBtn.style.border = "1px solid #444";
      toggleBtn.style.padding = "2px 6px";
      toggleBtn.style.fontSize = "0.7rem";

      toggleBtn.addEventListener("click", () => {
        sc.collapsed = !sc.collapsed;
        saveScenarios();
        renderScenarios();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        scenarios.splice(index, 1);
        saveScenarios();
        renderScenarios();
      });

      right.appendChild(toggleBtn);
      right.appendChild(deleteBtn);

      headerRow.appendChild(left);
      headerRow.appendChild(right);

      const body = document.createElement("div");
      body.style.marginTop = "8px";
      body.style.display = sc.collapsed ? "none" : "block";

      const titleLabel = document.createElement("label");
      titleLabel.textContent = "Scenario Title";
      titleLabel.style.fontSize = "0.75rem";

      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.value = sc.title || "";
      titleInput.style.marginTop = "4px";
      titleInput.style.marginBottom = "8px";
      titleInput.addEventListener("input", () => {
        sc.title = titleInput.value;
        saveScenarios();
        renderScenarios();
      });

      const ifLabel = document.createElement("label");
      ifLabel.textContent = "IF";
      ifLabel.style.fontSize = "0.75rem";

      const ifArea = document.createElement("textarea");
      ifArea.value = sc.ifText || "";
      ifArea.style.marginTop = "4px";
      ifArea.style.marginBottom = "8px";
      ifArea.addEventListener("input", () => {
        sc.ifText = ifArea.value;
        saveScenarios();
      });

      const thenLabel = document.createElement("label");
      thenLabel.textContent = "THEN";
      thenLabel.style.fontSize = "0.75rem";

      const thenArea = document.createElement("textarea");
      thenArea.value = sc.thenText || "";
      thenArea.style.marginTop = "4px";
      thenArea.style.marginBottom = "4px";
      thenArea.addEventListener("input", () => {
        sc.thenText = thenArea.value;
        saveScenarios();
      });

      body.appendChild(titleLabel);
      body.appendChild(titleInput);
      body.appendChild(ifLabel);
      body.appendChild(ifArea);
      body.appendChild(thenLabel);
      body.appendChild(thenArea);

      card.appendChild(headerRow);
      card.appendChild(body);
      scenarioListEl.appendChild(card);
    });
  }

  if (addScenarioBtn && scenarioListEl) {
    addScenarioBtn.addEventListener("click", () => {
      const sc = createScenario();
      scenarios.push(sc);
      saveScenarios();
      renderScenarios();
    });
  }

  // EXPORT HELPERS
  window.SOP_SCENARIOS = {
    getAllScenarios() {
      return scenarios.map(s => ({ ...s }));
    },
    getScenarioById(id) {
      return scenarios.find(s => s.id === id) || null;
    }
  };
// =====================================================
  // PART 3 — MODULE 2: WATCHING, SURGES, ADAPTATION, SESSION STATE
  // =====================================================

  const watchListEl = document.getElementById("watchList");
  const surgeListEl = document.getElementById("surgeList");
  const adaptListEl = document.getElementById("adaptList");

  const addWatchBtn = document.getElementById("addWatchBtn");
  const addSurgeBtn = document.getElementById("addSurgeBtn");
  const addAdaptBtn = document.getElementById("addAdaptBtn");

  const traderEnergyInput = document.getElementById("trader_energy");
  const marketEnergyInput = document.getElementById("market_energy");
  const marketTypeSelect = document.getElementById("market_type");
  const marketNotesArea = document.getElementById("market_notes");

  let watchEntries = [];
  let surges = [];
  let adaptations = [];
  let sessionState = {
    traderEnergy: "",
    marketEnergy: "",
    marketType: "",
    notes: ""
  };

  function defaultPresets() {
    return {
      chop: false,
      compression: false,
      sweep: false,
      displacement: false,
      indecision: false,
      stalling: false
    };
  }

  function createWatchEntry() {
    return {
      time: "",
      emotion: "",
      presets: defaultPresets(),
      customInterp: "",
      notes: "",
      collapsed: false
    };
  }

  function createSurgeEntry() {
    return {
      time: "",
      emotion: "",
      trigger: "",
      notes: "",
      collapsed: false
    };
  }

  function createAdaptationEntry() {
    return {
      startTime: "",
      endTime: "",
      tagStructShift: false,
      tagTempoChange: false,
      tagLiquidityChange: false,
      tagOrderflowChange: false,
      customTags: "",
      whatChanged: "",
      howAdapted: "",
      collapsed: false
    };
  }

  function saveModule2() {
    try {
      localStorage.setItem(
        STORAGE_KEY_MODULE2,
        JSON.stringify({ watchEntries, surges, adaptations, sessionState })
      );
      setStatus("Module 2 saved");
    } catch (e) {
      console.error(e);
      setStatus("Save error");
    }
  }

  function loadModule2() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_MODULE2);
      if (!raw) {
        watchEntries = [];
        surges = [];
        adaptations = [];
        sessionState = {
          traderEnergy: "",
          marketEnergy: "",
          marketType: "",
          notes: ""
        };
        return;
      }

      const parsed = JSON.parse(raw);

      watchEntries = Array.isArray(parsed.watchEntries) ? parsed.watchEntries : [];
      surges = Array.isArray(parsed.surges) ? parsed.surges : [];
      adaptations = Array.isArray(parsed.adaptations) ? parsed.adaptations : [];
      sessionState = parsed.sessionState || {
        traderEnergy: "",
        marketEnergy: "",
        marketType: "",
        notes: ""
      };

      watchEntries.forEach(e => {
        if (!e.presets) e.presets = defaultPresets();
        else {
          const def = defaultPresets();
          Object.keys(def).forEach(k => {
            if (typeof e.presets[k] !== "boolean") e.presets[k] = false;
          });
        }
        if (!("collapsed" in e)) e.collapsed = false;
      });

      surges.forEach(e => {
        if (!("collapsed" in e)) e.collapsed = false;
      });

      adaptations.forEach(e => {
        if (!("collapsed" in e)) e.collapsed = false;
        if (typeof e.tagStructShift !== "boolean") e.tagStructShift = false;
        if (typeof e.tagTempoChange !== "boolean") e.tagTempoChange = false;
        if (typeof e.tagLiquidityChange !== "boolean") e.tagLiquidityChange = false;
        if (typeof e.tagOrderflowChange !== "boolean") e.tagOrderflowChange = false;

        if (typeof e.customTags !== "string") e.customTags = "";
        if (typeof e.whatChanged !== "string") e.whatChanged = "";
        if (typeof e.howAdapted !== "string") e.howAdapted = "";
      });
    } catch (e) {
      console.error(e);
      watchEntries = [];
      surges = [];
      adaptations = [];
      sessionState = {
        traderEnergy: "",
        marketEnergy: "",
        marketType: "",
        notes: ""
      };
    }
  }

  // =====================================================
  // RENDER WATCH ENTRIES
  // =====================================================

  function renderWatchEntries() {
    if (!watchListEl) return;
    watchListEl.innerHTML = "";

    if (!watchEntries.length) {
      const empty = document.createElement("div");
      empty.style.fontSize = "0.75rem";
      empty.style.color = "#6b7280";
      empty.textContent = "No watching entries logged.";
      watchListEl.appendChild(empty);
      return;
    }

    watchEntries.forEach((entry, index) => {
      const card = document.createElement("div");
      card.className = "entry-card watch-card";

      const header = document.createElement("div");
      header.className = "entry-card-header";

      const title = document.createElement("div");
      title.className = "entry-card-title";
      const label = entry.time || entry.emotion
        ? `${entry.time || "Time ?"} — ${entry.emotion || "Emotion ?"}`
        : `Watching Entry ${index + 1}`;
      title.textContent = label;

      const controls = document.createElement("div");
      controls.style.display = "flex";
      controls.style.alignItems = "center";
      controls.style.gap = "4px";

      const toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.className = "card-toggle-btn";
      toggleBtn.textContent = entry.collapsed ? "+" : "−";
      toggleBtn.style.background = "#222";
      toggleBtn.style.color = "#eee";
      toggleBtn.style.border = "1px solid #444";
      toggleBtn.style.padding = "2px 6px";
      toggleBtn.style.fontSize = "0.7rem";

      toggleBtn.addEventListener("click", () => {
        entry.collapsed = !entry.collapsed;
        saveModule2();
        renderWatchEntries();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        watchEntries.splice(index, 1);
        saveModule2();
        renderWatchEntries();
      });

      controls.appendChild(toggleBtn);
      controls.appendChild(deleteBtn);

      header.appendChild(title);
      header.appendChild(controls);

      const body = document.createElement("div");
      body.className = "entry-card-body";
      body.style.display = entry.collapsed ? "none" : "block";

      // Time
      const timeLabel = document.createElement("label");
      timeLabel.textContent = "Time (EST)";
      const timeInput = document.createElement("input");
      timeInput.type = "text";
      timeInput.value = entry.time || "";
      timeInput.addEventListener("input", () => {
        entry.time = timeInput.value;
        saveModule2();
        renderWatchEntries();
      });

      // Emotion
      const emotionLabel = document.createElement("label");
      emotionLabel.textContent = "Emotion";
      const emotionInput = document.createElement("input");
      emotionInput.type = "text";
      emotionInput.value = entry.emotion || "";
      emotionInput.addEventListener("input", () => {
        entry.emotion = emotionInput.value;
        saveModule2();
        renderWatchEntries();
      });

      // Presets
      const presetsLabel = document.createElement("label");
      presetsLabel.textContent = "Interpretation Presets";

      const presetsRow = document.createElement("div");
      presetsRow.style.display = "flex";
      presetsRow.style.flexWrap = "wrap";
      presetsRow.style.gap = "8px";
      presetsRow.style.marginBottom = "8px";

      const presetDefs = [
        ["chop", "Chop"],
        ["compression", "Compression"],
        ["sweep", "Sweep"],
        ["displacement", "Displacement"],
        ["indecision", "Indecision"],
        ["stalling", "Stalling"]
      ];

      presetDefs.forEach(([key, labelText]) => {
        const wrapper = document.createElement("label");
        wrapper.style.fontSize = "0.75rem";
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "center";

        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = !!entry.presets[key];
        cb.style.marginRight = "4px";
        cb.addEventListener("change", () => {
          entry.presets[key] = cb.checked;
          saveModule2();
        });

        wrapper.appendChild(cb);
        wrapper.appendChild(document.createTextNode(labelText));
        presetsRow.appendChild(wrapper);
      });

      const customLabel = document.createElement("label");
      customLabel.textContent = "Custom interpretation tags";
      const customInput = document.createElement("input");
      customInput.type = "text";
      customInput.value = entry.customInterp || "";
      customInput.addEventListener("input", () => {
        entry.customInterp = customInput.value;
        saveModule2();
      });

      const notesLabel = document.createElement("label");
      notesLabel.textContent = "Notes";
      const notesArea = document.createElement("textarea");
      notesArea.value = entry.notes || "";
      notesArea.addEventListener("input", () => {
        entry.notes = notesArea.value;
        saveModule2();
      });

      body.appendChild(timeLabel);
      body.appendChild(timeInput);
      body.appendChild(emotionLabel);
      body.appendChild(emotionInput);
      body.appendChild(presetsLabel);
      body.appendChild(presetsRow);
      body.appendChild(customLabel);
      body.appendChild(customInput);
      body.appendChild(notesLabel);
      body.appendChild(notesArea);

      card.appendChild(header);
      card.appendChild(body);
      watchListEl.appendChild(card);
    });
  }
// =====================================================
  // RENDER SURGES
  // =====================================================

  function renderSurges() {
    if (!surgeListEl) return;
    surgeListEl.innerHTML = "";

    if (!surges.length) {
      const empty = document.createElement("div");
      empty.style.fontSize = "0.75rem";
      empty.style.color = "#6b7280";
      empty.textContent = "No emotional surges logged.";
      surgeListEl.appendChild(empty);
      return;
    }

    surges.forEach((entry, index) => {
      const card = document.createElement("div");
      card.className = "entry-card surge-card";

      const header = document.createElement("div");
      header.className = "entry-card-header";

      const title = document.createElement("div");
      title.className = "entry-card-title";
      const label = entry.time || entry.emotion
        ? `${entry.time || "Time ?"} — ${entry.emotion || "Spike ?"}`
        : `Surge ${index + 1}`;
      title.textContent = label;

      const controls = document.createElement("div");
      controls.style.display = "flex";
      controls.style.alignItems = "center";
      controls.style.gap = "4px";

      const toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.className = "card-toggle-btn";
      toggleBtn.textContent = entry.collapsed ? "+" : "−";
      toggleBtn.style.background = "#222";
      toggleBtn.style.color = "#eee";
      toggleBtn.style.border = "1px solid #444";
      toggleBtn.style.padding = "2px 6px";
      toggleBtn.style.fontSize = "0.7rem";

      toggleBtn.addEventListener("click", () => {
        entry.collapsed = !entry.collapsed;
        saveModule2();
        renderSurges();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        surges.splice(index, 1);
        saveModule2();
        renderSurges();
      });

      controls.appendChild(toggleBtn);
      controls.appendChild(deleteBtn);

      header.appendChild(title);
      header.appendChild(controls);

      const body = document.createElement("div");
      body.className = "entry-card-body";
      body.style.display = entry.collapsed ? "none" : "block";

      const timeLabel = document.createElement("label");
      timeLabel.textContent = "Time (EST)";
      const timeInput = document.createElement("input");
      timeInput.type = "text";
      timeInput.value = entry.time || "";
      timeInput.addEventListener("input", () => {
        entry.time = timeInput.value;
        saveModule2();
        renderSurges();
      });

      const emotionLabel = document.createElement("label");
      emotionLabel.textContent = "Emotion Spike";
      const emotionInput = document.createElement("input");
      emotionInput.type = "text";
      emotionInput.value = entry.emotion || "";
      emotionInput.addEventListener("input", () => {
        entry.emotion = emotionInput.value;
        saveModule2();
        renderSurges();
      });

      const triggerLabel = document.createElement("label");
      triggerLabel.textContent = "Trigger / Cause";
      const triggerInput = document.createElement("input");
      triggerInput.type = "text";
      triggerInput.value = entry.trigger || "";
      triggerInput.addEventListener("input", () => {
        entry.trigger = triggerInput.value;
        saveModule2();
      });

      const notesLabel = document.createElement("label");
      notesLabel.textContent = "Notes";
      const notesArea = document.createElement("textarea");
      notesArea.value = entry.notes || "";
      notesArea.addEventListener("input", () => {
        entry.notes = notesArea.value;
        saveModule2();
      });

      body.appendChild(timeLabel);
      body.appendChild(timeInput);
      body.appendChild(emotionLabel);
      body.appendChild(emotionInput);
      body.appendChild(triggerLabel);
      body.appendChild(triggerInput);
      body.appendChild(notesLabel);
      body.appendChild(notesArea);

      card.appendChild(header);
      card.appendChild(body);
      surgeListEl.appendChild(card);
    });
  }

  // =====================================================
  // RENDER ADAPTATION ENTRIES
  // =====================================================

  function renderAdaptations() {
    if (!adaptListEl) return;
    adaptListEl.innerHTML = "";

    if (!adaptations.length) {
      const empty = document.createElement("div");
      empty.style.fontSize = "0.75rem";
      empty.style.color = "#6b7280";
      empty.textContent = "No adaptation windows logged.";
      adaptListEl.appendChild(empty);
      return;
    }

    adaptations.forEach((entry, index) => {
      const card = document.createElement("div");
      card.className = "entry-card adapt-card";

      const header = document.createElement("div");
      header.className = "entry-card-header";

      const title = document.createElement("div");
      title.className = "entry-card-title";
      const label =
        entry.startTime || entry.endTime
          ? `${entry.startTime || "?"} → ${entry.endTime || "?"}`
          : `Adaptation ${index + 1}`;
      title.textContent = label;

      const controls = document.createElement("div");
      controls.style.display = "flex";
      controls.style.alignItems = "center";
      controls.style.gap = "4px";

      const toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.className = "card-toggle-btn";
      toggleBtn.textContent = entry.collapsed ? "+" : "−";
      toggleBtn.style.background = "#222";
      toggleBtn.style.color = "#eee";
      toggleBtn.style.border = "1px solid #444";
      toggleBtn.style.padding = "2px 6px";
      toggleBtn.style.fontSize = "0.7rem";

      toggleBtn.addEventListener("click", () => {
        entry.collapsed = !entry.collapsed;
        saveModule2();
        renderAdaptations();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        adaptations.splice(index, 1);
        saveModule2();
        renderAdaptations();
      });

      controls.appendChild(toggleBtn);
      controls.appendChild(deleteBtn);

      header.appendChild(title);
      header.appendChild(controls);

      const body = document.createElement("div");
      body.className = "entry-card-body";
      body.style.display = entry.collapsed ? "none" : "block";

      // TIME BLOCK
      const startLabel = document.createElement("label");
      startLabel.textContent = "Start Time (EST)";
      const startInput = document.createElement("input");
      startInput.type = "text";
      startInput.value = entry.startTime || "";
      startInput.addEventListener("input", () => {
        entry.startTime = startInput.value;
        saveModule2();
        renderAdaptations();
      });

      const endLabel = document.createElement("label");
      endLabel.textContent = "End Time (EST)";
      const endInput = document.createElement("input");
      endInput.type = "text";
      endInput.value = entry.endTime || "";
      endInput.addEventListener("input", () => {
        entry.endTime = endInput.value;
        saveModule2();
        renderAdaptations();
      });

      // TAGS BLOCK
      const tagLabel = document.createElement("label");
      tagLabel.textContent = "Tags";

      const tagsRow = document.createElement("div");
      tagsRow.style.display = "flex";
      tagsRow.style.flexWrap = "wrap";
      tagsRow.style.gap = "8px";
      tagsRow.style.marginBottom = "8px";

      const tagDefs = [
        ["tagStructShift", "Structure Shift"],
        ["tagTempoChange", "Tempo Change"],
        ["tagLiquidityChange", "Liquidity Change"],
        ["tagOrderflowChange", "Orderflow Change"]
      ];

      tagDefs.forEach(([key, labelText]) => {
        const wrapper = document.createElement("label");
        wrapper.style.fontSize = "0.75rem";
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "center";

        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = !!entry[key];
        cb.style.marginRight = "4px";
        cb.addEventListener("change", () => {
          entry[key] = cb.checked;
          saveModule2();
        });

        wrapper.appendChild(cb);
        wrapper.appendChild(document.createTextNode(labelText));
        tagsRow.appendChild(wrapper);
      });

      const customTagsLabel = document.createElement("label");
      customTagsLabel.textContent = "Custom Tags";
      const customTagsInput = document.createElement("input");
      customTagsInput.type = "text";
      customTagsInput.value = entry.customTags || "";
      customTagsInput.addEventListener("input", () => {
        entry.customTags = customTagsInput.value;
        saveModule2();
      });

      // WHAT CHANGED / HOW ADAPTED
      const whatLabel = document.createElement("label");
      whatLabel.textContent = "What changed?";
      const whatArea = document.createElement("textarea");
      whatArea.value = entry.whatChanged || "";
      whatArea.addEventListener("input", () => {
        entry.whatChanged = whatArea.value;
        saveModule2();
      });

      const howLabel = document.createElement("label");
      howLabel.textContent = "How did you adapt?";
      const howArea = document.createElement("textarea");
      howArea.value = entry.howAdapted || "";
      howArea.addEventListener("input", () => {
        entry.howAdapted = howArea.value;
        saveModule2();
      });

      body.appendChild(startLabel);
      body.appendChild(startInput);
      body.appendChild(endLabel);
      body.appendChild(endInput);
      body.appendChild(tagLabel);
      body.appendChild(tagsRow);
      body.appendChild(customTagsLabel);
      body.appendChild(customTagsInput);
      body.appendChild(whatLabel);
      body.appendChild(whatArea);
      body.appendChild(howLabel);
      body.appendChild(howArea);

      card.appendChild(header);
      card.appendChild(body);
      adaptListEl.appendChild(card);
    });
  }
// =====================================================
  // SESSION STATE — ENERGY, MARKET TYPE, NOTES
  // =====================================================

  function syncSessionStateToUI() {
    traderEnergyInput.value = sessionState.traderEnergy || "";
    marketEnergyInput.value = sessionState.marketEnergy || "";
    marketTypeSelect.value = sessionState.marketType || "";
    marketNotesArea.value = sessionState.notes || "";
  }

  if (traderEnergyInput) {
    traderEnergyInput.addEventListener("input", () => {
      sessionState.traderEnergy = traderEnergyInput.value;
      saveModule2();
    });
  }

  if (marketEnergyInput) {
    marketEnergyInput.addEventListener("input", () => {
      sessionState.marketEnergy = marketEnergyInput.value;
      saveModule2();
    });
  }

  if (marketTypeSelect) {
    marketTypeSelect.addEventListener("change", () => {
      sessionState.marketType = marketTypeSelect.value;
      saveModule2();
    });
  }

  if (marketNotesArea) {
    marketNotesArea.addEventListener("input", () => {
      sessionState.notes = marketNotesArea.value;
      saveModule2();
    });
  }

  // =====================================================
  // MODULE 2 BUTTONS
  // =====================================================

  if (addWatchBtn) {
    addWatchBtn.addEventListener("click", () => {
      const entry = createWatchEntry();
      watchEntries.push(entry);
      saveModule2();
      renderWatchEntries();
    });
  }

  if (addSurgeBtn) {
    addSurgeBtn.addEventListener("click", () => {
      const entry = createSurgeEntry();
      surges.push(entry);
      saveModule2();
      renderSurges();
    });
  }

  if (addAdaptBtn) {
    addAdaptBtn.addEventListener("click", () => {
      const entry = createAdaptationEntry();
      adaptations.push(entry);
      saveModule2();
      renderAdaptations();
    });
  }

  // =====================================================
  // INITIAL LOAD FOR MODULE 2
  // =====================================================

  loadModule2();
  syncSessionStateToUI();
  renderWatchEntries();
  renderSurges();
  renderAdaptations();

  // =====================================================
  // PART 5 — MODULE 3: TRADE IDEAS (BUILD 009)
  // =====================================================

  const tradeIdeaListEl = document.getElementById("tradeIdeaList");
  const addTradeIdeaBtn = document.getElementById("addTradeIdeaBtn");

  let tradeIdeas = [];
  let nextTradeId = 1;

  function createTradeIdea() {
    return {
      id: "T" + nextTradeId++,
      title: "",
      bias: "",
      invalidation: "",
      notes: "",
      collapsed: false,
      signalSection: {
        collapsed: true,
        signal: "",
        triggerConfidence: "",
        liveNotes: ""
      },
      outcomeSection: {
        collapsed: true,
        taken: false,
        missed: false,
        entryPrice: "",
        stopPrice: "",
        targetPrice: "",
        executionNotes: "",
        missReason: "",
        lessons: ""
      }
    };
  }

  function saveModule3() {
    try {
      localStorage.setItem(
        STORAGE_KEY_MODULE3,
        JSON.stringify({ tradeIdeas })
      );
      setStatus("Trade ideas saved");
    } catch (e) {
      console.error(e);
      setStatus("Save error");
    }
  }

  function loadModule3() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_MODULE3);
      if (!raw) {
        tradeIdeas = [];
        nextTradeId = 1;
        return;
      }

      const parsed = JSON.parse(raw);
      tradeIdeas = Array.isArray(parsed.tradeIdeas) ? parsed.tradeIdeas : [];

      let maxIndex = 0;
      tradeIdeas.forEach(ti => {
        if (!("collapsed" in ti)) ti.collapsed = false;

        if (!ti.signalSection) {
          ti.signalSection = { collapsed: true, signal: "", triggerConfidence: "", liveNotes: "" };
        }
        if (!ti.outcomeSection) {
          ti.outcomeSection = {
            collapsed: true,
            taken: false,
            missed: false,
            entryPrice: "",
            stopPrice: "",
            targetPrice: "",
            executionNotes: "",
            missReason: "",
            lessons: ""
          };
        }

        if (ti.id && ti.id.startsWith("T")) {
          const n = parseInt(ti.id.slice(1), 10);
          if (!isNaN(n) && n > maxIndex) maxIndex = n;
        }
      });

      nextTradeId = maxIndex + 1;
    } catch (e) {
      console.error(e);
      tradeIdeas = [];
      nextTradeId = 1;
    }
  }

  // =====================================================
  // RENDER TRADE IDEAS LIST
  // =====================================================

  function renderTradeIdeas() {
    if (!tradeIdeaListEl) return;
    tradeIdeaListEl.innerHTML = "";

    if (!tradeIdeas.length) {
      const empty = document.createElement("div");
      empty.style.fontSize = "0.75rem";
      empty.style.color = "#6b7280";
      empty.textContent = "No trade ideas logged.";
      tradeIdeaListEl.appendChild(empty);
      return;
    }

    tradeIdeas.forEach((ti, index) => {
      const card = document.createElement("div");
      card.className = "trade-idea-card" + (ti.collapsed ? " collapsed" : "");

      // HEADER
      const header = document.createElement("div");
      header.className = "trade-idea-header";

      const title = document.createElement("div");
      title.className = "trade-idea-title";
      title.textContent = ti.title ? `${ti.id} — ${ti.title}` : `${ti.id} — (no title)`;

      const controls = document.createElement("div");
      controls.style.display = "flex";
      controls.style.alignItems = "center";
      controls.style.gap = "4px";

      const toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.className = "card-toggle-btn";
      toggleBtn.textContent = ti.collapsed ? "+" : "−";
      toggleBtn.style.background = "#222";
      toggleBtn.style.color = "#eee";
      toggleBtn.style.border = "1px solid #444";
      toggleBtn.style.padding = "2px 6px";
      toggleBtn.style.fontSize = "0.7rem";

      toggleBtn.addEventListener("click", () => {
        ti.collapsed = !ti.collapsed;
        saveModule3();
        renderTradeIdeas();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        tradeIdeas.splice(index, 1);
        saveModule3();
        renderTradeIdeas();
      });

      controls.appendChild(toggleBtn);
      controls.appendChild(deleteBtn);

      header.appendChild(title);
      header.appendChild(controls);

      // BODY
      const body = document.createElement("div");
      body.className = "trade-idea-body";
      body.style.display = ti.collapsed ? "none" : "block";

      // TITLE
      const tLabel = document.createElement("label");
      tLabel.textContent = "Title";
      const tInput = document.createElement("input");
      tInput.type = "text";
      tInput.value = ti.title || "";
      tInput.addEventListener("input", () => {
        ti.title = tInput.value;
        saveModule3();
        renderTradeIdeas();
      });

      // BIAS
      const bLabel = document.createElement("label");
      bLabel.textContent = "Bias";
      const bInput = document.createElement("input");
      bInput.type = "text";
      bInput.value = ti.bias || "";
      bInput.addEventListener("input", () => {
        ti.bias = bInput.value;
        saveModule3();
      });

      // INVALIDATION
      const invLabel = document.createElement("label");
      invLabel.textContent = "Invalidation Level";
      const invInput = document.createElement("input");
      invInput.type = "text";
      invInput.value = ti.invalidation || "";
      invInput.addEventListener("input", () => {
        ti.invalidation = invInput.value;
        saveModule3();
      });

      // NOTES
      const notesLabel = document.createElement("label");
      notesLabel.textContent = "Notes";
      const notesArea = document.createElement("textarea");
      notesArea.value = ti.notes || "";
      notesArea.addEventListener("input", () => {
        ti.notes = notesArea.value;
        saveModule3();
      });

      body.appendChild(tLabel);
      body.appendChild(tInput);
      body.appendChild(bLabel);
      body.appendChild(bInput);
      body.appendChild(invLabel);
      body.appendChild(invInput);
      body.appendChild(notesLabel);
      body.appendChild(notesArea);

      // SIGNAL SECTION
      const signalSec = renderSignalSection(ti);
      body.appendChild(signalSec);

      // OUTCOME SECTION
      const outcomeSec = renderOutcomeSection(ti);
      body.appendChild(outcomeSec);

      card.appendChild(header);
      card.appendChild(body);
      tradeIdeaListEl.appendChild(card);
    });
  }
// =====================================================
  // SIGNAL SECTION (inside a trade idea)
  // =====================================================

  function renderSignalSection(ti) {
    const wrapper = document.createElement("div");
    wrapper.className = "trade-section" + (ti.signalSection.collapsed ? " collapsed" : "");

    const header = document.createElement("div");
    header.className = "trade-section-header";
    header.textContent = "Signal / Trigger";

    const controls = document.createElement("div");
    controls.style.display = "flex";
    controls.style.alignItems = "center";
    controls.style.gap = "6px";

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "card-toggle-btn";
    toggleBtn.textContent = ti.signalSection.collapsed ? "+" : "−";
    toggleBtn.style.background = "#222";
    toggleBtn.style.color = "#eee";
    toggleBtn.style.border = "1px solid #444";
    toggleBtn.style.padding = "2px 6px";
    toggleBtn.style.fontSize = "0.7rem";

    toggleBtn.addEventListener("click", () => {
      ti.signalSection.collapsed = !ti.signalSection.collapsed;
      saveModule3();
      renderTradeIdeas();
    });

    controls.appendChild(toggleBtn);
    header.appendChild(controls);

    const body = document.createElement("div");
    body.className = "trade-section-body";
    body.style.display = ti.signalSection.collapsed ? "none" : "block";

    // SIGNAL
    const sLabel = document.createElement("label");
    sLabel.textContent = "Signal Description";
    const sInput = document.createElement("textarea");
    sInput.value = ti.signalSection.signal || "";
    sInput.addEventListener("input", () => {
      ti.signalSection.signal = sInput.value;
      saveModule3();
    });

    // TRIGGER CONFIDENCE
    const cLabel = document.createElement("label");
    cLabel.textContent = "Trigger Confidence (0–10)";
    const cInput = document.createElement("input");
    cInput.type = "number";
    cInput.min = "0";
    cInput.max = "10";
    cInput.step = "1";
    cInput.value = ti.signalSection.triggerConfidence || "";
    cInput.addEventListener("input", () => {
      ti.signalSection.triggerConfidence = cInput.value;
      saveModule3();
    });

    // LIVE NOTES
    const lnLabel = document.createElement("label");
    lnLabel.textContent = "Live Notes (during signal)";
    const lnInput = document.createElement("textarea");
    lnInput.value = ti.signalSection.liveNotes || "";
    lnInput.addEventListener("input", () => {
      ti.signalSection.liveNotes = lnInput.value;
      saveModule3();
    });

    body.appendChild(sLabel);
    body.appendChild(sInput);
    body.appendChild(cLabel);
    body.appendChild(cInput);
    body.appendChild(lnLabel);
    body.appendChild(lnInput);

    wrapper.appendChild(header);
    wrapper.appendChild(body);
    return wrapper;
  }

  // =====================================================
  // OUTCOME SECTION (inside a trade idea)
  // =====================================================

  function renderOutcomeSection(ti) {
    const wrapper = document.createElement("div");
    wrapper.className = "trade-section" + (ti.outcomeSection.collapsed ? " collapsed" : "");

    const header = document.createElement("div");
    header.className = "trade-section-header";
    header.textContent = "Outcome / Execution";

    const controls = document.createElement("div");
    controls.style.display = "flex";
    controls.style.alignItems = "center";
    controls.style.gap = "6px";

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "card-toggle-btn";
    toggleBtn.textContent = ti.outcomeSection.collapsed ? "+" : "−";
    toggleBtn.style.background = "#222";
    toggleBtn.style.color = "#eee";
    toggleBtn.style.border = "1px solid #444";
    toggleBtn.style.padding = "2px 6px";
    toggleBtn.style.fontSize = "0.7rem";

    toggleBtn.addEventListener("click", () => {
      ti.outcomeSection.collapsed = !ti.outcomeSection.collapsed;
      saveModule3();
      renderTradeIdeas();
    });

    controls.appendChild(toggleBtn);
    header.appendChild(controls);

    const body = document.createElement("div");
    body.className = "trade-section-body";
    body.style.display = ti.outcomeSection.collapsed ? "none" : "block";

    // TAKEN / MISSED
    const takeRow = document.createElement("div");
    takeRow.className = "trade-action-row";

    const takenBtn = document.createElement("button");
    takenBtn.type = "button";
    takenBtn.className = "trade-action-btn";
    takenBtn.textContent = "Trade Taken";
    takenBtn.style.background = ti.outcomeSection.taken ? "#155e29" : "#222";

    takenBtn.addEventListener("click", () => {
      ti.outcomeSection.taken = true;
      ti.outcomeSection.missed = false;
      saveModule3();
      renderTradeIdeas();
    });

    const missedBtn = document.createElement("button");
    missedBtn.type = "button";
    missedBtn.className = "trade-action-btn";
    missedBtn.textContent = "Trade Missed";
    missedBtn.style.background = ti.outcomeSection.missed ? "#5e1a1a" : "#222";

    missedBtn.addEventListener("click", () => {
      ti.outcomeSection.missed = true;
      ti.outcomeSection.taken = false;
      saveModule3();
      renderTradeIdeas();
    });

    takeRow.appendChild(takenBtn);
    takeRow.appendChild(missedBtn);

    // ENTRY / STOP / TARGET
    const entryLabel = document.createElement("label");
    entryLabel.textContent = "Entry Price";
    const entryInput = document.createElement("input");
    entryInput.type = "text";
    entryInput.value = ti.outcomeSection.entryPrice || "";
    entryInput.addEventListener("input", () => {
      ti.outcomeSection.entryPrice = entryInput.value;
      saveModule3();
    });

    const stopLabel = document.createElement("label");
    stopLabel.textContent = "Stop Price";
    const stopInput = document.createElement("input");
    stopInput.type = "text";
    stopInput.value = ti.outcomeSection.stopPrice || "";
    stopInput.addEventListener("input", () => {
      ti.outcomeSection.stopPrice = stopInput.value;
      saveModule3();
    });

    const targetLabel = document.createElement("label");
    targetLabel.textContent = "Target Price";
    const targetInput = document.createElement("input");
    targetInput.type = "text";
    targetInput.value = ti.outcomeSection.targetPrice || "";
    targetInput.addEventListener("input", () => {
      ti.outcomeSection.targetPrice = targetInput.value;
      saveModule3();
    });

    // EXECUTION NOTES
    const execLabel = document.createElement("label");
    execLabel.textContent = "Execution Notes";
    const execArea = document.createElement("textarea");
    execArea.value = ti.outcomeSection.executionNotes || "";
    execArea.addEventListener("input", () => {
      ti.outcomeSection.executionNotes = execArea.value;
      saveModule3();
    });

    // MISS REASON
    const missLabel = document.createElement("label");
    missLabel.textContent = "Reason Missed (if missed)";
    const missInput = document.createElement("textarea");
    missInput.value = ti.outcomeSection.missReason || "";
    missInput.addEventListener("input", () => {
      ti.outcomeSection.missReason = missInput.value;
      saveModule3();
    });

    // LESSONS
    const lessonsLabel = document.createElement("label");
    lessonsLabel.textContent = "Lessons Learned";
    const lessonsArea = document.createElement("textarea");
    lessonsArea.value = ti.outcomeSection.lessons || "";
    lessonsArea.addEventListener("input", () => {
      ti.outcomeSection.lessons = lessonsArea.value;
      saveModule3();
    });

    body.appendChild(takeRow);
    body.appendChild(entryLabel);
    body.appendChild(entryInput);
    body.appendChild(stopLabel);
    body.appendChild(stopInput);
    body.appendChild(targetLabel);
    body.appendChild(targetInput);
    body.appendChild(execLabel);
    body.appendChild(execArea);
    body.appendChild(missLabel);
    body.appendChild(missInput);
    body.appendChild(lessonsLabel);
    body.appendChild(lessonsArea);

    wrapper.appendChild(header);
    wrapper.appendChild(body);
    return wrapper;
  }
// =====================================================
  // BUTTON: ADD NEW TRADE IDEA
  // =====================================================

  if (addTradeIdeaBtn) {
    addTradeIdeaBtn.addEventListener("click", () => {
      const ti = createTradeIdea();
      tradeIdeas.push(ti);
      saveModule3();
      renderTradeIdeas();
    });
  }

  // =====================================================
  // INITIAL LOAD FOR MODULE 3
  // =====================================================

  loadModule3();
  renderTradeIdeas();

  // =====================================================
  // PART 6 — RESET DAY (clears M1 + M2 + M3 ONLY)
  // =====================================================

  if (resetDayBtn) {
    resetDayBtn.addEventListener("click", () => {
      if (!confirm("Reset the entire trading day? This clears M1 + M2 + M3.")) return;

      // MODULE 1
      scenarios = [];
      nextScenarioIndex = 1;
      localStorage.removeItem(STORAGE_KEY_SCENARIOS);

      // MODULE 2
      watchEntries = [];
      surges = [];
      adaptations = [];
      sessionState = {
        traderEnergy: "",
        marketEnergy: "",
        marketType: "",
        notes: ""
      };
      localStorage.removeItem(STORAGE_KEY_MODULE2);

      // MODULE 3
      tradeIdeas = [];
      nextTradeId = 1;
      localStorage.removeItem(STORAGE_KEY_MODULE3);

      // RERENDER UI
      renderScenarios();
      renderWatchEntries();
      renderSurges();
      renderAdaptations();
      renderTradeIdeas();
      syncSessionStateToUI();

      setStatus("Day reset");
    });
  }
// =====================================================
  // FINAL INITIALIZATION SEQUENCE (AFTER ALL MODULES)
  // =====================================================

  // Load M1 again (we already defined loadScenarios above)
  loadScenarios();
  renderScenarios();

  // M2 & M3 were already loaded earlier.
  // Everything is now fully initialized.

}); 
// ===== END OF FILE: script.js (Build 009) =====