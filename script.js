    // ---------- Accordion ----------
    document.querySelectorAll(".accordion-header").forEach(header => {
      header.addEventListener("click", () => {
        header.parentNode.classList.toggle("open");
      });
    });

    // ---------- Global status ----------
    const statusEl = document.getElementById("statusText");
    function setStatus(msg) {
      if (!statusEl) return;
      statusEl.textContent = msg || "";
      if (msg) {
        setTimeout(() => {
          if (statusEl.textContent === msg) statusEl.textContent = "";
        }, 1500);
      }
    }

    // ---------- Storage Keys ----------
    const STORAGE_KEY_SCENARIOS = "sop_v1_scenarios_only";
    const STORAGE_KEY_MODULE2 = "sop_v1_module2";

    const resetDayBtn = document.getElementById("resetDayBtn");

    // ---------- Module 1: Scenarios ----------
    let scenarios = [];
    let nextScenarioIndex = 1;

    const scenarioListEl = document.getElementById("scenarioList");
    const addScenarioBtn = document.getElementById("addScenarioBtn");

    function saveScenarios() {
      try {
        localStorage.setItem(STORAGE_KEY_SCENARIOS, JSON.stringify({ scenarios }));
        setStatus("Scenarios saved");
      } catch (e) {
        console.error("Failed to save scenarios:", e);
        setStatus("Error saving scenarios");
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
        scenarios = parsed.scenarios || [];
        if (!Array.isArray(scenarios)) scenarios = [];
        // compute next index from last scenario id
        if (scenarios.length) {
          const last = scenarios[scenarios.length - 1];
          const id = last.id || "S1";
          const num = parseInt(id.replace("S", ""), 10);
          nextScenarioIndex = isNaN(num) ? scenarios.length + 1 : num + 1;
        } else {
          nextScenarioIndex = 1;
        }
      } catch (e) {
        console.error("Failed to load scenarios:", e);
        scenarios = [];
        nextScenarioIndex = 1;
      }
    }

    function createScenario(id) {
      return { id, title: "", ifText: "", thenText: "", collapsed: false };
    }

    function renderScenarios() {
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
        card.className = "scenario-card";

        const headerRow = document.createElement("div");
        headerRow.className = "scenario-header-row";

        const left = document.createElement("div");
        left.style.display = "flex";
        left.style.flexDirection = "column";
        left.style.gap = "2px";

        const idRow = document.createElement("div");
        idRow.className = "scenario-id-row";

        const idSpan = document.createElement("span");
        idSpan.className = "scenario-id";
        idSpan.textContent = sc.id || `S${index + 1}`;

        const titleInline = document.createElement("span");
        titleInline.className = "scenario-inline-title";
        titleInline.textContent = sc.title || "(no title yet)";

        idRow.appendChild(idSpan);
        idRow.appendChild(titleInline);

        left.appendChild(idRow);

        const helper = document.createElement("span");
        helper.className = "scenario-inline-helper";
        helper.textContent = "Tap to expand / collapse the full IF / THEN.";
        left.appendChild(helper);

        headerRow.appendChild(left);

        const right = document.createElement("div");
        right.className = "scenario-header-actions";

        const toggleBtn = document.createElement("button");
        toggleBtn.type = "button";
        toggleBtn.className = "card-toggle-btn";
        toggleBtn.textContent = sc.collapsed ? "Expand" : "Collapse";
        toggleBtn.addEventListener("click", () => {
          sc.collapsed = !sc.collapsed;
          saveScenarios();
          renderScenarios();
        });

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "surge-delete-btn";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
          scenarios.splice(index, 1);
          saveScenarios();
          renderScenarios();
        });

        right.appendChild(toggleBtn);
        right.appendChild(delBtn);
        headerRow.appendChild(right);

        const content = document.createElement("div");
        content.className = "scenario-body";
        if (sc.collapsed) {
          content.style.display = "none";
        }

        const titleLabel = document.createElement("label");
        titleLabel.textContent = "Title";
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.value = sc.title || "";
        titleInput.placeholder = "Scenario title (e.g. NY open sweep + reclaim)…";
        titleInput.addEventListener("input", () => {
          sc.title = titleInput.value;
          saveScenarios();
        });

        const ifLabel = document.createElement("label");
        ifLabel.textContent = "IF:";
        const ifArea = document.createElement("textarea");
        ifArea.value = sc.ifText || "";
        ifArea.placeholder = "Condition (price behavior, level interaction, time window, etc.)";
        ifArea.addEventListener("input", () => {
          sc.ifText = ifArea.value;
          saveScenarios();
        });

        const thenLabel = document.createElement("label");
        thenLabel.textContent = "THEN:";
        const thenArea = document.createElement("textarea");
        thenArea.value = sc.thenText || "";
        thenArea.placeholder = "Execution expectation (direction, entry model, TP/SL behavior, etc.)";
        thenArea.addEventListener("input", () => {
          sc.thenText = thenArea.value;
          saveScenarios();
        });

        content.appendChild(titleLabel);
        content.appendChild(titleInput);
        content.appendChild(ifLabel);
        content.appendChild(ifArea);
        content.appendChild(thenLabel);
        content.appendChild(thenArea);

        card.appendChild(headerRow);
        card.appendChild(content);
        scenarioListEl.appendChild(card);
      });
    }

    if (addScenarioBtn) {
      addScenarioBtn.addEventListener("click", () => {
        const id = "S" + nextScenarioIndex++;
        scenarios.push(createScenario(id));
        saveScenarios();
        renderScenarios();
      });
    }

    // ---------- Module 2: Watching / Surges / Adaptation / Session State ----------

    let watchEntries = [];
    let surges = [];
    let adaptations = [];
    let sessionState = {
      traderEnergy: "",
      marketEnergy: "",
      marketType: "",
      notes: ""
    };

    const watchListEl = document.getElementById("watchList");
    const addWatchBtn = document.getElementById("addWatchBtn");
    const surgeListEl = document.getElementById("surgeList");
    const addSurgeBtn = document.getElementById("addSurgeBtn");
    const adaptListEl = document.getElementById("adaptList");
    const addAdaptBtn = document.getElementById("addAdaptBtn");

    const traderEnergyInput = document.getElementById("trader_energy");
    const marketEnergyInput = document.getElementById("market_energy");
    const marketTypeSelect = document.getElementById("market_type");
    const sessionNotesArea = document.getElementById("session_notes");

    function saveModule2() {
      try {
        const payload = {
          watchEntries,
          surges,
          adaptations,
          sessionState
        };
        localStorage.setItem(STORAGE_KEY_MODULE2, JSON.stringify(payload));
        setStatus("Module 2 saved");
      } catch (e) {
        console.error("Failed to save Module 2:", e);
        setStatus("Error saving Module 2");
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
      } catch (e) {
        console.error("Failed to load Module 2:", e);
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

    // ----- Watching entries -----
    function createEmptyWatchEntry() {
      return {
        time: "",
        emotion: "",
        interpretation: {
          chop: false,
          compression: false,
          sweep: false,
          displacement: false,
          indecision: false,
          stalling: false
        },
        tags: "",
        notes: ""
      };
    }

    function renderWatchEntries() {
      watchListEl.innerHTML = "";
      if (!watchEntries.length) {
        const empty = document.createElement("div");
        empty.textContent = "No watching entries yet.";
        empty.className = "empty-text";
        watchListEl.appendChild(empty);
        return;
      }

      watchEntries.forEach((entry, index) => {
        const card = document.createElement("div");
        card.className = "watch-card";

        const headerRow = document.createElement("div");
        headerRow.className = "card-header-row";

        const titleSpan = document.createElement("span");
        titleSpan.className = "watch-label";
        titleSpan.textContent = `Watching Entry #${index + 1}`;
        headerRow.appendChild(titleSpan);

        const timeDisplay = document.createElement("span");
        timeDisplay.className = "watch-time-display";
        timeDisplay.textContent = entry.time || "–";
        headerRow.appendChild(timeDisplay);

        const actions = document.createElement("div");
        actions.className = "card-header-actions";

        const collapseBtn = document.createElement("button");
        collapseBtn.type = "button";
        collapseBtn.className = "card-toggle-btn";
        collapseBtn.textContent = entry.collapsed ? "Expand" : "Collapse";
        collapseBtn.addEventListener("click", () => {
          entry.collapsed = !entry.collapsed;
          saveModule2();
          renderWatchEntries();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "watch-delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
          watchEntries.splice(index, 1);
          saveModule2();
          renderWatchEntries();
        });

        actions.appendChild(collapseBtn);
        actions.appendChild(deleteBtn);
        headerRow.appendChild(actions);

        const body = document.createElement("div");
        body.className = "card-body";
        if (entry.collapsed) {
          body.style.display = "none";
        }

        const timeLabel = document.createElement("label");
        timeLabel.textContent = "Time (EST)";
        const timeInput = document.createElement("input");
        timeInput.type = "text";
        timeInput.value = entry.time;
        timeInput.placeholder = "e.g. 09:30, 10:05, etc.";
        timeInput.addEventListener("input", () => {
          entry.time = timeInput.value;
          saveModule2();
          renderWatchEntries();
        });

        const emotionLabel = document.createElement("label");
        emotionLabel.textContent = "Emotion";
        const emotionInput = document.createElement("input");
        emotionInput.type = "text";
        emotionInput.value = entry.emotion;
        emotionInput.placeholder = "What you felt as you were watching…";
        emotionInput.addEventListener("input", () => {
          entry.emotion = emotionInput.value;
          saveModule2();
        });

        const interpLabel = document.createElement("label");
        interpLabel.textContent = "Interpretation (how the market looks)";

        const interpGrid = document.createElement("div");
        interpGrid.className = "interpretation-grid";

        const interpOptions = [
          { key: "chop", label: "Chop" },
          { key: "compression", label: "Compression" },
          { key: "sweep", label: "Sweep" },
          { key: "displacement", label: "Displacement" },
          { key: "indecision", label: "Indecision" },
          { key: "stalling", label: "Stalling" }
        ];

        interpOptions.forEach(opt => {
          const row = document.createElement("label");
          row.className = "interpretation-option";
          const cb = document.createElement("input");
          cb.type = "checkbox";
          cb.checked = !!entry.interpretation[opt.key];
          cb.addEventListener("change", () => {
            entry.interpretation[opt.key] = cb.checked;
            saveModule2();
          });
          const span = document.createElement("span");
          span.textContent = opt.label;
          row.appendChild(cb);
          row.appendChild(span);
          interpGrid.appendChild(row);
        });

        const tagsLabel = document.createElement("label");
        tagsLabel.textContent = "Custom interpretation tags (manual)";
        const tagsInput = document.createElement("input");
        tagsInput.type = "text";
        tagsInput.value = entry.tags;
        tagsInput.placeholder = "e.g. liquidity hunt, grind up, fake pump (comma separated if needed)";
        tagsInput.addEventListener("input", () => {
          entry.tags = tagsInput.value;
          saveModule2();
        });

        const notesLabel = document.createElement("label");
        notesLabel.textContent = "Notes";
        const notesArea = document.createElement("textarea");
        notesArea.value = entry.notes;
        notesArea.placeholder = "Short description of what you saw and how it influenced your thinking.";
        notesArea.addEventListener("input", () => {
          entry.notes = notesArea.value;
          saveModule2();
        });

        body.appendChild(timeLabel);
        body.appendChild(timeInput);
        body.appendChild(emotionLabel);
        body.appendChild(emotionInput);
        body.appendChild(interpLabel);
        body.appendChild(interpGrid);
        body.appendChild(tagsLabel);
        body.appendChild(tagsInput);
        body.appendChild(notesLabel);
        body.appendChild(notesArea);

        card.appendChild(headerRow);
        card.appendChild(body);
        watchListEl.appendChild(card);
      });
    }

    if (addWatchBtn) {
      addWatchBtn.addEventListener("click", () => {
        watchEntries.push(createEmptyWatchEntry());
        saveModule2();
        renderWatchEntries();
      });
    }

    // ----- Emotional Surges -----
    function createEmptySurge() {
      return {
        time: "",
        spike: "",
        trigger: "",
        notes: ""
      };
    }

    function renderSurges() {
      surgeListEl.innerHTML = "";
      if (!surges.length) {
        const empty = document.createElement("div");
        empty.textContent = "No emotional surges yet.";
        empty.className = "empty-text";
        surgeListEl.appendChild(empty);
        return;
      }

      surges.forEach((surge, index) => {
        const card = document.createElement("div");
        card.className = "surge-card";

        const headerRow = document.createElement("div");
        headerRow.className = "card-header-row";

        const labelSpan = document.createElement("span");
        labelSpan.className = "surge-label";
        labelSpan.textContent = `Surge #${index + 1}`;
        headerRow.appendChild(labelSpan);

        const actions = document.createElement("div");
        actions.className = "card-header-actions";

        const collapseBtn = document.createElement("button");
        collapseBtn.type = "button";
        collapseBtn.className = "card-toggle-btn";
        collapseBtn.textContent = surge.collapsed ? "Expand" : "Collapse";
        collapseBtn.addEventListener("click", () => {
          surge.collapsed = !surge.collapsed;
          saveModule2();
          renderSurges();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "surge-delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
          surges.splice(index, 1);
          saveModule2();
          renderSurges();
        });

        actions.appendChild(collapseBtn);
        actions.appendChild(deleteBtn);
        headerRow.appendChild(actions);

        const body = document.createElement("div");
        body.className = "card-body";
        if (surge.collapsed) {
          body.style.display = "none";
        }

        const timeLabel = document.createElement("label");
        timeLabel.textContent = "Time (EST)";
        const timeInput = document.createElement("input");
        timeInput.type = "text";
        timeInput.value = surge.time;
        timeInput.placeholder = "e.g. 10:05, 11:32, etc.";
        timeInput.addEventListener("input", () => {
          surge.time = timeInput.value;
          saveModule2();
        });

        const spikeLabel = document.createElement("label");
        spikeLabel.textContent = "Emotion Spike";
        const spikeInput = document.createElement("input");
        spikeInput.type = "text";
        spikeInput.value = surge.spike;
        spikeInput.placeholder = "panic, tilt, anger, FOMO, etc.";
        spikeInput.addEventListener("input", () => {
          surge.spike = spikeInput.value;
          saveModule2();
        });

        const triggerLabel = document.createElement("label");
        triggerLabel.textContent = "Trigger (what caused the surge)";
        const triggerInput = document.createElement("input");
        triggerInput.type = "text";
        triggerInput.value = surge.trigger;
        triggerInput.placeholder = "e.g. candle spike against position, missed entry, sudden drawdown, etc.";
        triggerInput.addEventListener("input", () => {
          surge.trigger = triggerInput.value;
          saveModule2();
        });

        const notesLabel = document.createElement("label");
        notesLabel.textContent = "Notes / Reaction";
        const notesArea = document.createElement("textarea");
        notesArea.value = surge.notes;
        notesArea.placeholder = "How you reacted, what you did next, whether you regained control.";
        notesArea.addEventListener("input", () => {
          surge.notes = notesArea.value;
          saveModule2();
        });

        body.appendChild(timeLabel);
        body.appendChild(timeInput);
        body.appendChild(spikeLabel);
        body.appendChild(spikeInput);
        body.appendChild(triggerLabel);
        body.appendChild(triggerInput);
        body.appendChild(notesLabel);
        body.appendChild(notesArea);

        card.appendChild(headerRow);
        card.appendChild(body);
        surgeListEl.appendChild(card);
      });
    }

    if (addSurgeBtn) {
      addSurgeBtn.addEventListener("click", () => {
        surges.push(createEmptySurge());
        saveModule2();
        renderSurges();
      });
    }

    // ----- Adaptation Windows -----
    function createEmptyAdaptation() {
      return {
        startTime: "",
        endTime: "",
        whatChanged: {
          structuralShift: false,
          tempoChange: false,
          liquidityChange: false,
          orderflowShift: false
        },
        tags: "",
        marketDescription: "",
        traderResponse: ""
      };
    }

    function renderAdaptations() {
      adaptListEl.innerHTML = "";
      if (!adaptations.length) {
        const empty = document.createElement("div");
        empty.textContent = "No adaptation windows yet.";
        empty.className = "empty-text";
        adaptListEl.appendChild(empty);
        return;
      }

      adaptations.forEach((adapt, index) => {
        const card = document.createElement("div");
        card.className = "adapt-card";

        const headerRow = document.createElement("div");
        headerRow.className = "card-header-row";

        const labelSpan = document.createElement("span");
        labelSpan.className = "adapt-label";
        labelSpan.textContent = `Adaptation #${index + 1}`;
        headerRow.appendChild(labelSpan);

        const actions = document.createElement("div");
        actions.className = "card-header-actions";

        const collapseBtn = document.createElement("button");
        collapseBtn.type = "button";
        collapseBtn.className = "card-toggle-btn";
        collapseBtn.textContent = adapt.collapsed ? "Expand" : "Collapse";
        collapseBtn.addEventListener("click", () => {
          adapt.collapsed = !adapt.collapsed;
          saveModule2();
          renderAdaptations();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "adapt-delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
          adaptations.splice(index, 1);
          saveModule2();
          renderAdaptations();
        });

        actions.appendChild(collapseBtn);
        actions.appendChild(deleteBtn);
        headerRow.appendChild(actions);

        const body = document.createElement("div");
        body.className = "card-body";
        if (adapt.collapsed) {
          body.style.display = "none";
        }

        const startLabel = document.createElement("label");
        startLabel.textContent = "Start Time (EST)";
        const startInput = document.createElement("input");
        startInput.type = "text";
        startInput.value = adapt.startTime;
        startInput.placeholder = "e.g. 10:15";
        startInput.addEventListener("input", () => {
          adapt.startTime = startInput.value;
          saveModule2();
        });

        const endLabel = document.createElement("label");
        endLabel.textContent = "End Time (EST)";
        const endInput = document.createElement("input");
        endInput.type = "text";
        endInput.value = adapt.endTime;
        endInput.placeholder = "e.g. 10:40";
        endInput.addEventListener("input", () => {
          adapt.endTime = endInput.value;
          saveModule2();
        });

        const whatLabel = document.createElement("label");
        whatLabel.textContent = "What changed?";

        const whatGrid = document.createElement("div");
        whatGrid.className = "interpretation-grid";

        const whatOptions = [
          { key: "structuralShift", label: "Structural shift" },
          { key: "tempoChange", label: "Tempo change" },
          { key: "liquidityChange", label: "Liquidity behaviour change" },
          { key: "orderflowShift", label: "Orderflow / tape shift" }
        ];

        whatOptions.forEach(opt => {
          const row = document.createElement("label");
          row.className = "interpretation-option";
          const cb = document.createElement("input");
          cb.type = "checkbox";
          cb.checked = !!adapt.whatChanged[opt.key];
          cb.addEventListener("change", () => {
            adapt.whatChanged[opt.key] = cb.checked;
            saveModule2();
          });
          const span = document.createElement("span");
          span.textContent = opt.label;
          row.appendChild(cb);
          row.appendChild(span);
          whatGrid.appendChild(row);
        });

        const tagsLabel = document.createElement("label");
        tagsLabel.textContent = "Custom tags (comma separated)";
        const tagsInput = document.createElement("input");
        tagsInput.type = "text";
        tagsInput.value = adapt.tags;
        tagsInput.placeholder = "e.g. NYO shift, late-day melt, news reaction…";
        tagsInput.addEventListener("input", () => {
          adapt.tags = tagsInput.value;
          saveModule2();
        });

        const mktLabel = document.createElement("label");
        mktLabel.textContent = "Describe what changed in the market";
        const mktArea = document.createElement("textarea");
        mktArea.value = adapt.marketDescription;
        mktArea.placeholder = "Structure, tempo, who was in control…";
        mktArea.addEventListener("input", () => {
          adapt.marketDescription = mktArea.value;
          saveModule2();
        });

        const respLabel = document.createElement("label");
        respLabel.textContent = "How did you adapt (or fail to adapt)?";
        const respArea = document.createElement("textarea");
        respArea.value = adapt.traderResponse;
        respArea.placeholder = "Execution changes, emotional response, what you did differently…";
        respArea.addEventListener("input", () => {
          adapt.traderResponse = respArea.value;
          saveModule2();
        });

        body.appendChild(startLabel);
        body.appendChild(startInput);
        body.appendChild(endLabel);
        body.appendChild(endInput);
        body.appendChild(whatLabel);
        body.appendChild(whatGrid);
        body.appendChild(tagsLabel);
        body.appendChild(tagsInput);
        body.appendChild(mktLabel);
        body.appendChild(mktArea);
        body.appendChild(respLabel);
        body.appendChild(respArea);

        card.appendChild(headerRow);
        card.appendChild(body);
        adaptListEl.appendChild(card);
      });
    }

    if (addAdaptBtn) {
      addAdaptBtn.addEventListener("click", () => {
        adaptations.push(createEmptyAdaptation());
        saveModule2();
        renderAdaptations();
      });
    }

    // ----- Session State (bottom of Module 2) -----
    function initSessionStateUI() {
      if (traderEnergyInput) {
        traderEnergyInput.value = sessionState.traderEnergy;
        traderEnergyInput.addEventListener("input", () => {
          sessionState.traderEnergy = traderEnergyInput.value;
          saveModule2();
        });
      }

      if (marketEnergyInput) {
        marketEnergyInput.value = sessionState.marketEnergy;
        marketEnergyInput.addEventListener("input", () => {
          sessionState.marketEnergy = marketEnergyInput.value;
          saveModule2();
        });
      }

      if (marketTypeSelect) {
        marketTypeSelect.value = sessionState.marketType;
        marketTypeSelect.addEventListener("change", () => {
          sessionState.marketType = marketTypeSelect.value;
          saveModule2();
        });
      }

      if (sessionNotesArea) {
        sessionNotesArea.value = sessionState.notes;
        sessionNotesArea.addEventListener("input", () => {
          sessionState.notes = sessionNotesArea.value;
          saveModule2();
        });
      }
    }

    // ---------- Reset Day (M1 scenarios + M2 data) ----------
    function resetDayAll() {
      if (!confirm("Reset M1 scenarios and all Module 2 entries for this day? This cannot be undone.")) return;

      scenarios = [];
      nextScenarioIndex = 1;
      localStorage.removeItem(STORAGE_KEY_SCENARIOS);
      renderScenarios();

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
      renderWatchEntries();
      renderSurges();
      renderAdaptations();

      traderEnergyInput && (traderEnergyInput.value = "");
      marketEnergyInput && (marketEnergyInput.value = "");
      marketTypeSelect && (marketTypeSelect.value = "");
      sessionNotesArea && (sessionNotesArea.value = "");

      setStatus("Day reset");
    }

    if (resetDayBtn) {
      resetDayBtn.addEventListener("click", resetDayAll);
    }

    // ---------- Init ----------
    loadScenarios();
    renderScenarios();
    loadModule2();
    renderWatchEntries();
    renderSurges();
    renderAdaptations();
    initSessionStateUI();
