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

    // Storage keys
    const STORAGE_KEY_SCENARIOS = "sop_v1_scenarios_only";
    const STORAGE_KEY_MODULE2 = "sop_v1_module2";
    const STORAGE_KEY_MODULE3 = "sop_v1_module3";

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
        if (!parsed || !Array.isArray(parsed.scenarios)) {
          scenarios = [];
          nextScenarioIndex = 1;
          return;
        }
        scenarios = parsed.scenarios.map((sc, idx) => {
          const id = sc.id || `S${idx + 1}`;
          return {
            id,
            title: sc.title || "",
            ifText: sc.ifText || "",
            thenText: sc.thenText || "",
            collapsed: !!sc.collapsed
          };
        });
        if (scenarios.length > 0) {
          const nums = scenarios
            .map(s => parseInt(String(s.id).replace(/\D/g, ""), 10))
            .filter(n => !isNaN(n));
          const maxNum = nums.length ? Math.max(...nums) : scenarios.length;
          nextScenarioIndex = maxNum + 1;
        } else {
          nextScenarioIndex = 1;
        }
      } catch (e) {
        console.error(e);
        scenarios = [];
        nextScenarioIndex = 1;
      }
    }

    function createScenario() {
      const id = `S${nextScenarioIndex++}`;
      return {
        id,
        title: "",
        ifText: "",
        thenText: "",
        collapsed: false
      };
    }

    function renderScenarios() {
      if (!scenarioListEl) return;
      scenarioListEl.innerHTML = "";

      scenarios.forEach((sc, index) => {
        const card = document.createElement("div");
        card.className = "scenario-card";
        if (sc.collapsed) {
          card.classList.add("collapsed");
        }

        const headerRow = document.createElement("div");
        headerRow.className = "scenario-header-row";

        const left = document.createElement("div");
        const idSpan = document.createElement("span");
        idSpan.className = "scenario-id";
        idSpan.textContent = sc.id;
        left.appendChild(idSpan);

        const titleSpan = document.createElement("span");
        titleSpan.className = "small-text";
        titleSpan.textContent = sc.title || "(no title)";
        left.appendChild(titleSpan);

        const right = document.createElement("div");
        right.style.display = "flex";
        right.style.alignItems = "center";
        right.style.gap = "4px";

        const toggleBtn = document.createElement("button");
        toggleBtn.type = "button";
        toggleBtn.className = "card-toggle-btn";
        toggleBtn.textContent = sc.collapsed ? "+" : "−";
        toggleBtn.addEventListener("click", () => {
          sc.collapsed = !sc.collapsed;
          saveScenarios();
          renderScenarios();
        });

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "scenario-delete-btn";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
          scenarios.splice(index, 1);
          saveScenarios();
          renderScenarios();
        });

        right.appendChild(toggleBtn);
        right.appendChild(delBtn);
        headerRow.appendChild(left);
        headerRow.appendChild(right);
        card.appendChild(headerRow);

        const body = document.createElement("div");
        body.className = "scenario-body";

        const titleLabel = document.createElement("label");
        titleLabel.textContent = "Title";
        body.appendChild(titleLabel);

        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.value = sc.title || "";
        titleInput.addEventListener("input", () => {
          sc.title = titleInput.value;
          saveScenarios();
        });
        body.appendChild(titleInput);

        const ifLabel = document.createElement("label");
        ifLabel.textContent = "IF (setup / trigger conditions)";
        body.appendChild(ifLabel);

        const ifArea = document.createElement("textarea");
        ifArea.value = sc.ifText || "";
        ifArea.addEventListener("input", () => {
          sc.ifText = ifArea.value;
          saveScenarios();
        });
        body.appendChild(ifArea);

        const thenLabel = document.createElement("label");
        thenLabel.textContent = "THEN (execution / management)";
        body.appendChild(thenLabel);

        const thenArea = document.createElement("textarea");
        thenArea.value = sc.thenText || "";
        thenArea.addEventListener("input", () => {
          sc.thenText = thenArea.value;
          saveScenarios();
        });
        body.appendChild(thenArea);

        card.appendChild(body);
        scenarioListEl.appendChild(card);
      });
    }

    // expose helper on window for future builds
    window.SOP_SCENARIOS = {
      getAllScenarios() {
        return scenarios.map(s => ({ ...s }));
      },
      getScenarioById(id) {
        return scenarios.find(s => s.id === id) || null;
      }
    };

    if (addScenarioBtn) {
      addScenarioBtn.addEventListener("click", () => {
        scenarios.push(createScenario());
        saveScenarios();
        renderScenarios();
      });
    }

    // ---------- Module 2: Watching + Surges + Adaptation + Session State ----------
    const watchListEl = document.getElementById("watchList");
    const addWatchBtn = document.getElementById("addWatchBtn");
    const surgeListEl = document.getElementById("surgeList");
    const addSurgeBtn = document.getElementById("addSurgeBtn");
    const adaptListEl = document.getElementById("adaptList");
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

    function createWatchEntry() {
      return {
        timestamp: new Date().toISOString(),
        structure: "",
        emotion: "",
        narrative: "",
        collapsed: false
      };
    }

    function createSurgeEntry() {
      return {
        timestamp: new Date().toISOString(),
        intensity: "",
        emotion: "",
        narrative: "",
        collapsed: false
      };
    }

    function createAdaptationEntry() {
      return {
        timestamp: new Date().toISOString(),
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
        if (!parsed || typeof parsed !== "object") {
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
          if (typeof e.timestamp !== "string") e.timestamp = new Date().toISOString();
          if (typeof e.structure !== "string") e.structure = "";
          if (typeof e.emotion !== "string") e.emotion = "";
          if (typeof e.narrative !== "string") e.narrative = "";
          if (typeof e.collapsed !== "boolean") e.collapsed = false;
        });

        surges.forEach(e => {
          if (typeof e.timestamp !== "string") e.timestamp = new Date().toISOString();
          if (typeof e.intensity !== "string") e.intensity = "";
          if (typeof e.emotion !== "string") e.emotion = "";
          if (typeof e.narrative !== "string") e.narrative = "";
          if (typeof e.collapsed !== "boolean") e.collapsed = false;
        });

        adaptations.forEach(e => {
          if (typeof e.timestamp !== "string") e.timestamp = new Date().toISOString();
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

    // ----- Watching -----
    function renderWatchEntries() {
      if (!watchListEl) return;
      watchListEl.innerHTML = "";

      watchEntries.forEach((entry, index) => {
        const card = document.createElement("div");
        card.className = "watch-card";
        if (entry.collapsed) {
          card.classList.add("collapsed");
        }

        const headerRow = document.createElement("div");
        headerRow.className = "watch-header-row";

        const left = document.createElement("div");
        const label = document.createElement("span");
        label.className = "watch-label";
        label.textContent = `Watching ${index + 1}`;
        left.appendChild(label);

        const summary = document.createElement("span");
        summary.className = "watch-summary";
        const ts = new Date(entry.timestamp);
        const timeStr = ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        summary.textContent = `${timeStr} • ${entry.structure || "No structure"}`;

        const right = document.createElement("div");
        right.style.display = "flex";
        right.style.alignItems = "center";
        right.style.gap = "4px";

        const toggleBtn = document.createElement("button");
        toggleBtn.type = "button";
        toggleBtn.className = "card-toggle-btn";
        toggleBtn.textContent = entry.collapsed ? "+" : "−";
        toggleBtn.addEventListener("click", () => {
          entry.collapsed = !entry.collapsed;
          saveModule2();
          renderWatchEntries();
        });

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "watch-delete-btn";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
          watchEntries.splice(index, 1);
          saveModule2();
          renderWatchEntries();
        });

        right.appendChild(toggleBtn);
        right.appendChild(delBtn);
        headerRow.appendChild(left);
        headerRow.appendChild(summary);
        headerRow.appendChild(right);
        card.appendChild(headerRow);

        const body = document.createElement("div");
        body.className = "watch-body";

        const structureLabel = document.createElement("label");
        structureLabel.textContent = "Structure / Area being watched";
        body.appendChild(structureLabel);

        const structureInput = document.createElement("input");
        structureInput.type = "text";
        structureInput.value = entry.structure || "";
        structureInput.addEventListener("input", () => {
          entry.structure = structureInput.value;
          saveModule2();
        });
        body.appendChild(structureInput);

        const emotionLabel = document.createElement("label");
        emotionLabel.textContent = "Emotion while watching";
        body.appendChild(emotionLabel);

        const emotionInput = document.createElement("input");
        emotionInput.type = "text";
        emotionInput.value = entry.emotion || "";
        emotionInput.addEventListener("input", () => {
          entry.emotion = emotionInput.value;
          saveModule2();
        });
        body.appendChild(emotionInput);

        const notesLabel = document.createElement("label");
        notesLabel.textContent = "Narrative";
        body.appendChild(notesLabel);

        const notesArea = document.createElement("textarea");
        notesArea.value = entry.narrative || "";
        notesArea.addEventListener("input", () => {
          entry.narrative = notesArea.value;
          saveModule2();
        });
        body.appendChild(notesArea);

        card.appendChild(body);
        watchListEl.appendChild(card);
      });
    }

    // ----- Surges -----
    function renderSurges() {
      if (!surgeListEl) return;
      surgeListEl.innerHTML = "";

      surges.forEach((entry, index) => {
        const card = document.createElement("div");
        card.className = "surge-card";
        if (entry.collapsed) {
          card.classList.add("collapsed");
        }

        const headerRow = document.createElement("div");
        headerRow.className = "surge-header-row";

        const left = document.createElement("div");
        const label = document.createElement("span");
        label.className = "surge-label";
        label.textContent = `Surge ${index + 1}`;
        left.appendChild(label);

        const summary = document.createElement("span");
        summary.className = "surge-summary";
        const ts = new Date(entry.timestamp);
        const timeStr = ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        summary.textContent = `${timeStr} • ${entry.emotion || "No emotion"}`;

        const right = document.createElement("div");
        right.style.display = "flex";
        right.style.alignItems = "center";
        right.style.gap = "4px";

        const toggleBtn = document.createElement("button");
        toggleBtn.type = "button";
        toggleBtn.className = "card-toggle-btn";
        toggleBtn.textContent = entry.collapsed ? "+" : "−";
        toggleBtn.addEventListener("click", () => {
          entry.collapsed = !entry.collapsed;
          saveModule2();
          renderSurges();
        });

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "surge-delete-btn";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
          surges.splice(index, 1);
          saveModule2();
          renderSurges();
        });

        right.appendChild(toggleBtn);
        right.appendChild(delBtn);
        headerRow.appendChild(left);
        headerRow.appendChild(summary);
        headerRow.appendChild(right);
        card.appendChild(headerRow);

        const body = document.createElement("div");
        body.className = "surge-body";

        const intensityLabel = document.createElement("label");
        intensityLabel.textContent = "Intensity (1–10 or description)";
        body.appendChild(intensityLabel);

        const intensityInput = document.createElement("input");
        intensityInput.type = "text";
        intensityInput.value = entry.intensity || "";
        intensityInput.addEventListener("input", () => {
          entry.intensity = intensityInput.value;
          saveModule2();
        });
        body.appendChild(intensityInput);

        const emotionLabel = document.createElement("label");
        emotionLabel.textContent = "Emotion";
        body.appendChild(emotionLabel);

        const emotionInput = document.createElement("input");
        emotionInput.type = "text";
        emotionInput.value = entry.emotion || "";
        emotionInput.addEventListener("input", () => {
          entry.emotion = emotionInput.value;
          saveModule2();
        });
        body.appendChild(emotionInput);

        const notesLabel = document.createElement("label");
        notesLabel.textContent = "Narrative";
        body.appendChild(notesLabel);

        const notesArea = document.createElement("textarea");
        notesArea.value = entry.narrative || "";
        notesArea.addEventListener("input", () => {
          entry.narrative = notesArea.value;
          saveModule2();
        });
        body.appendChild(notesArea);

        card.appendChild(body);
        surgeListEl.appendChild(card);
      });
    }

    // ----- Adaptations -----
    function renderAdaptations() {
      if (!adaptListEl) return;
      adaptListEl.innerHTML = "";

      adaptations.forEach((entry, index) => {
        const card = document.createElement("div");
        card.className = "adapt-card";
        if (entry.collapsed) {
          card.classList.add("collapsed");
        }

        const headerRow = document.createElement("div");
        headerRow.className = "adapt-header-row";

        const left = document.createElement("div");
        const label = document.createElement("span");
        label.className = "adapt-label";
        label.textContent = `Adaptation ${index + 1}`;
        left.appendChild(label);

        const summary = document.createElement("span");
        summary.className = "adapt-summary";
        const ts = new Date(entry.timestamp);
        const timeStr = ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        summary.textContent = `${timeStr} • ${entry.customTags || "No tags"}`;

        const right = document.createElement("div");
        right.style.display = "flex";
        right.style.alignItems = "center";
        right.style.gap = "4px";

        const toggleBtn = document.createElement("button");
        toggleBtn.type = "button";
        toggleBtn.className = "card-toggle-btn";
        toggleBtn.textContent = entry.collapsed ? "+" : "−";
        toggleBtn.addEventListener("click", () => {
          entry.collapsed = !entry.collapsed;
          saveModule2();
          renderAdaptations();
        });

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "adapt-delete-btn";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
          adaptations.splice(index, 1);
          saveModule2();
          renderAdaptations();
        });

        right.appendChild(toggleBtn);
        right.appendChild(delBtn);
        headerRow.appendChild(left);
        headerRow.appendChild(summary);
        headerRow.appendChild(right);
        card.appendChild(headerRow);

        const body = document.createElement("div");
        body.className = "adapt-body";

        const tagsLabel = document.createElement("label");
        tagsLabel.textContent = "Tags (what changed?)";
        body.appendChild(tagsLabel);

        const tagsRow = document.createElement("div");
        tagsRow.style.display = "flex";
        tagsRow.style.flexWrap = "wrap";
        tagsRow.style.gap = "4px";
        tagsRow.style.marginBottom = "6px";

        const tempoLabel = document.createElement("label");
        tempoLabel.className = "small-text";
        const tempoCheckbox = document.createElement("input");
        tempoCheckbox.type = "checkbox";
        tempoCheckbox.checked = !!entry.tagTempoChange;
        tempoCheckbox.style.marginRight = "4px";
        tempoCheckbox.addEventListener("change", () => {
          entry.tagTempoChange = tempoCheckbox.checked;
          saveModule2();
        });
        tempoLabel.appendChild(tempoCheckbox);
        tempoLabel.appendChild(document.createTextNode("Tempo change"));
        tagsRow.appendChild(tempoLabel);

        const liqLabel = document.createElement("label");
        liqLabel.className = "small-text";
        const liqCheckbox = document.createElement("input");
        liqCheckbox.type = "checkbox";
        liqCheckbox.checked = !!entry.tagLiquidityChange;
        liqCheckbox.style.marginRight = "4px";
        liqCheckbox.addEventListener("change", () => {
          entry.tagLiquidityChange = liqCheckbox.checked;
          saveModule2();
        });
        liqLabel.appendChild(liqCheckbox);
        liqLabel.appendChild(document.createTextNode("Liquidity change"));
        tagsRow.appendChild(liqLabel);

        const ofLabel = document.createElement("label");
        ofLabel.className = "small-text";
        const ofCheckbox = document.createElement("input");
        ofCheckbox.type = "checkbox";
        ofCheckbox.checked = !!entry.tagOrderflowChange;
        ofCheckbox.style.marginRight = "4px";
        ofCheckbox.addEventListener("change", () => {
          entry.tagOrderflowChange = ofCheckbox.checked;
          saveModule2();
        });
        ofLabel.appendChild(ofCheckbox);
        ofLabel.appendChild(document.createTextNode("Orderflow change"));
        tagsRow.appendChild(ofLabel);

        body.appendChild(tagsRow);

        const customTagsLabel = document.createElement("label");
        customTagsLabel.textContent = "Custom tags";
        body.appendChild(customTagsLabel);

        const customTagsInput = document.createElement("input");
        customTagsInput.type = "text";
        customTagsInput.value = entry.customTags || "";
        customTagsInput.addEventListener("input", () => {
          entry.customTags = customTagsInput.value;
          saveModule2();
        });
        body.appendChild(customTagsInput);

        const whatChangedLabel = document.createElement("label");
        whatChangedLabel.textContent = "What changed?";
        body.appendChild(whatChangedLabel);

        const whatChangedArea = document.createElement("textarea");
        whatChangedArea.value = entry.whatChanged || "";
        whatChangedArea.addEventListener("input", () => {
          entry.whatChanged = whatChangedArea.value;
          saveModule2();
        });
        body.appendChild(whatChangedArea);

        const howAdaptedLabel = document.createElement("label");
        howAdaptedLabel.textContent = "How did you adapt?";
        body.appendChild(howAdaptedLabel);

        const howAdaptedArea = document.createElement("textarea");
        howAdaptedArea.value = entry.howAdapted || "";
        howAdaptedArea.addEventListener("input", () => {
          entry.howAdapted = howAdaptedArea.value;
          saveModule2();
        });
        body.appendChild(howAdaptedArea);

        card.appendChild(body);
        adaptListEl.appendChild(card);
      });
    }

    function initSessionStateUI() {
      if (!traderEnergyInput || !marketEnergyInput || !marketTypeSelect || !marketNotesArea) return;

      traderEnergyInput.value = sessionState.traderEnergy || "";
      marketEnergyInput.value = sessionState.marketEnergy || "";
      marketTypeSelect.value = sessionState.marketType || "";
      marketNotesArea.value = sessionState.notes || "";

      traderEnergyInput.addEventListener("input", () => {
        sessionState.traderEnergy = traderEnergyInput.value;
        saveModule2();
      });

      marketEnergyInput.addEventListener("input", () => {
        sessionState.marketEnergy = marketEnergyInput.value;
        saveModule2();
      });

      marketTypeSelect.addEventListener("change", () => {
        sessionState.marketType = marketTypeSelect.value;
        saveModule2();
      });

      marketNotesArea.addEventListener("input", () => {
        sessionState.notes = marketNotesArea.value;
        saveModule2();
      });
    }

    // ----- Reset Day -----

    // ---------- Module 3: Trade Idea Logic (Baseline + Signal) ----------
    const pretradeEmotionSelect = document.getElementById("pretrade_emotion");
    const pretradeNotesArea = document.getElementById("pretrade_notes");
    const signalEmotionSelect = document.getElementById("signal_emotion");
    const signalNotesArea = document.getElementById("signal_notes");
    const entryTagsInput = document.getElementById("entry_tags");

    let module3State = {
      pretradeEmotion: "",
      pretradeNotes: "",
      signalEmotion: "",
      signalNotes: "",
      entryTags: ""
    };

    function saveModule3() {
      try {
        localStorage.setItem(STORAGE_KEY_MODULE3, JSON.stringify(module3State));
        setStatus("Module 3 saved");
      } catch (e) {
        console.error(e);
        setStatus("Save error");
      }
    }

    function loadModule3() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_MODULE3);
        if (!raw) {
          module3State = {
            pretradeEmotion: "",
            pretradeNotes: "",
            signalEmotion: "",
            signalNotes: "",
            entryTags: ""
          };
          return;
        }
        const parsed = JSON.parse(raw);
        if (typeof parsed !== "object" || parsed === null) {
          module3State = {
            pretradeEmotion: "",
            pretradeNotes: "",
            signalEmotion: "",
            signalNotes: "",
            entryTags: ""
          };
          return;
        }
        module3State = {
          pretradeEmotion: parsed.pretradeEmotion || "",
          pretradeNotes: parsed.pretradeNotes || "",
          signalEmotion: parsed.signalEmotion || "",
          signalNotes: parsed.signalNotes || "",
          entryTags: parsed.entryTags || ""
        };
      } catch (e) {
        console.error(e);
        module3State = {
          pretradeEmotion: "",
          pretradeNotes: "",
          signalEmotion: "",
          signalNotes: "",
          entryTags: ""
        };
      }
    }

    function initModule3UI() {
      if (!pretradeEmotionSelect || !pretradeNotesArea || !signalEmotionSelect || !signalNotesArea || !entryTagsInput) {
        return;
      }

      pretradeEmotionSelect.value = module3State.pretradeEmotion || "";
      pretradeNotesArea.value = module3State.pretradeNotes || "";
      signalEmotionSelect.value = module3State.signalEmotion || "";
      signalNotesArea.value = module3State.signalNotes || "";
      entryTagsInput.value = module3State.entryTags || "";

      pretradeEmotionSelect.addEventListener("change", () => {
        module3State.pretradeEmotion = pretradeEmotionSelect.value;
        saveModule3();
      });

      pretradeNotesArea.addEventListener("input", () => {
        module3State.pretradeNotes = pretradeNotesArea.value;
        saveModule3();
      });

      signalEmotionSelect.addEventListener("change", () => {
        module3State.signalEmotion = signalEmotionSelect.value;
        saveModule3();
      });

      signalNotesArea.addEventListener("input", () => {
        module3State.signalNotes = signalNotesArea.value;
        saveModule3();
      });

      entryTagsInput.addEventListener("input", () => {
        module3State.entryTags = entryTagsInput.value;
        saveModule3();
      });
    }

    function resetDayAll() {
      if (!confirm("Reset M1 scenarios, all Module 2 entries, and Module 3 trade logic for this day? This cannot be undone.")) return;

      // Module 1
      scenarios = [];
      nextScenarioIndex = 1;
      localStorage.removeItem(STORAGE_KEY_SCENARIOS);
      renderScenarios();

      // Module 2
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

      if (traderEnergyInput) traderEnergyInput.value = "";
      if (marketEnergyInput) marketEnergyInput.value = "";
      if (marketTypeSelect) marketTypeSelect.value = "";
      if (marketNotesArea) marketNotesArea.value = "";

      // Module 3
      module3State = {
        pretradeEmotion: "",
        pretradeNotes: "",
        signalEmotion: "",
        signalNotes: "",
        entryTags: ""
      };
      localStorage.removeItem(STORAGE_KEY_MODULE3);

      if (pretradeEmotionSelect) pretradeEmotionSelect.value = "";
      if (pretradeNotesArea) pretradeNotesArea.value = "";
      if (signalEmotionSelect) signalEmotionSelect.value = "";
      if (signalNotesArea) signalNotesArea.value = "";
      if (entryTagsInput) entryTagsInput.value = "";

      setStatus("Day reset (M1 + M2 + M3)");
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
    loadModule3();
    initModule3UI();
