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
        scenarios = Array.isArray(parsed.scenarios) ? parsed.scenarios : [];
        let maxIndex = 0;
        scenarios.forEach(sc => {
          if (!sc.hasOwnProperty("collapsed")) sc.collapsed = false;
          if (sc.id && sc.id.startsWith("S")) {
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
        card.className = "scenario-card" + (sc.collapsed ? " collapsed" : "");

        const headerRow = document.createElement("div");
        headerRow.className = "scenario-header-row";

        const left = document.createElement("div");
        left.className = "scenario-id";
        left.textContent = sc.id + (sc.title ? " — " + sc.title : "");

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
        delBtn.className = "surge-delete-btn";
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
        ifLabel.textContent = "IF:";
        body.appendChild(ifLabel);

        const ifArea = document.createElement("textarea");
        ifArea.value = sc.ifText || "";
        ifArea.placeholder = "Condition (price behavior, level interaction, time window, etc.)";
        ifArea.addEventListener("input", () => {
          sc.ifText = ifArea.value;
          saveScenarios();
        });
        body.appendChild(ifArea);

        const thenLabel = document.createElement("label");
        thenLabel.textContent = "THEN:";
        body.appendChild(thenLabel);

        const thenArea = document.createElement("textarea");
        thenArea.value = sc.thenText || "";
        thenArea.placeholder = "Execution expectation (direction, entry model, TP/SL behavior, etc.)";
        thenArea.addEventListener("input", () => {
          sc.thenText = thenArea.value;
          saveScenarios();
        });
        body.appendChild(thenArea);

        card.appendChild(body);
        scenarioListEl.appendChild(card);
      });
    }

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
          if (!e.hasOwnProperty("collapsed")) e.collapsed = false;
        });

        surges.forEach(e => {
          if (!e.hasOwnProperty("collapsed")) e.collapsed = false;
        });

        adaptations.forEach(e => {
          if (!e.hasOwnProperty("collapsed")) e.collapsed = false;
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

    // ----- Watching -----
    function renderWatchEntries() {
      watchListEl.innerHTML = "";
      if (!watchEntries.length) {
        const empty = document.createElement("div");
        empty.style.fontSize = "0.75rem";
        empty.style.color = "#6b7280";
        empty.textContent = "No watching entries logged yet.";
        watchListEl.appendChild(empty);
        return;
      }

      watchEntries.forEach((entry, index) => {
        const card = document.createElement("div");
        card.className = "watch-card" + (entry.collapsed ? " collapsed" : "");

        const headerRow = document.createElement("div");
        headerRow.className = "watch-header-row";

        const left = document.createElement("div");
        left.className = "watch-label";
        left.textContent = `Watching Entry #${index + 1}`;

        const summary = document.createElement("div");
        summary.className = "watch-summary";
        const setSummary = () => {
          summary.textContent = `${entry.time || "—"} | ${entry.emotion || "no emotion"}`;
        };
        setSummary();

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

        const row = document.createElement("div");
        row.className = "watch-row";
        row.innerHTML = `
          <div>
            <label>Time (EST)</label>
            <input type="text" placeholder="09:45, 10:10, etc.">
          </div>
          <div>
            <label>Emotion</label>
            <input type="text" placeholder="calm, hesitant, FOMO, etc.">
          </div>
        `;
        const timeInput = row.querySelectorAll("input")[0];
        const emoInput = row.querySelectorAll("input")[1];
        timeInput.value = entry.time || "";
        emoInput.value = entry.emotion || "";

        timeInput.addEventListener("input", () => {
          entry.time = timeInput.value;
          setSummary();
          saveModule2();
        });
        emoInput.addEventListener("input", () => {
          entry.emotion = emoInput.value;
          setSummary();
          saveModule2();
        });

        body.appendChild(row);

        const interpLabel = document.createElement("label");
        interpLabel.textContent = "Interpretation (how the market looks)";
        body.appendChild(interpLabel);

        const options = document.createElement("div");
        options.className = "interp-options";
        const presets = [
          ["chop", "Chop"], ["compression", "Compression"],
          ["sweep", "Sweep"], ["displacement", "Displacement"],
          ["indecision", "Indecision"], ["stalling", "Stalling"]
        ];
        presets.forEach(([key, text]) => {
          const wrap = document.createElement("label");
          const cb = document.createElement("input");
          cb.type = "checkbox";
          cb.checked = !!entry.presets[key];
          cb.addEventListener("change", () => {
            entry.presets[key] = cb.checked;
            saveModule2();
          });
          const span = document.createElement("span");
          span.textContent = text;
          wrap.appendChild(cb);
          wrap.appendChild(span);
          options.appendChild(wrap);
        });
        body.appendChild(options);

        const customLabel = document.createElement("label");
        customLabel.textContent = "Custom interpretation tags (manual)";
        body.appendChild(customLabel);

        const customInput = document.createElement("input");
        customInput.type = "text";
        customInput.placeholder = "e.g. liquidity hunt, grind up, fake pump (comma separated if needed)";
        customInput.value = entry.customInterp || "";
        customInput.addEventListener("input", () => {
          entry.customInterp = customInput.value;
          saveModule2();
        });
        body.appendChild(customInput);

        const notesLabel = document.createElement("label");
        notesLabel.textContent = "Notes";
        body.appendChild(notesLabel);

        const notesArea = document.createElement("textarea");
        notesArea.placeholder = "Short description of what you saw and how it influenced your thinking.";
        notesArea.value = entry.notes || "";
        notesArea.addEventListener("input", () => {
          entry.notes = notesArea.value;
          saveModule2();
        });
        body.appendChild(notesArea);

        card.appendChild(body);
        watchListEl.appendChild(card);
      });
    }

    // ----- Surges -----
    function renderSurges() {
      surgeListEl.innerHTML = "";
      if (!surges.length) {
        const empty = document.createElement("div");
        empty.style.fontSize = "0.75rem";
        empty.style.color = "#6b7280";
        empty.textContent = "No emotional surges logged yet.";
        surgeListEl.appendChild(empty);
        return;
      }

      surges.forEach((entry, index) => {
        const card = document.createElement("div");
        card.className = "surge-card" + (entry.collapsed ? " collapsed" : "");

        const headerRow = document.createElement("div");
        headerRow.className = "surge-header-row";

        const left = document.createElement("div");
        left.className = "surge-label";
        left.textContent = `Surge #${index + 1}`;

        const summary = document.createElement("div");
        summary.className = "surge-summary";
        const setSummary = () => {
          summary.textContent = `${entry.time || "—"} | ${entry.emotion || "no label"}`;
        };
        setSummary();

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

        const row = document.createElement("div");
        row.className = "surge-row";
        row.innerHTML = `
          <div>
            <label>Time (EST)</label>
            <input type="text" placeholder="10:05, 11:32, etc.">
          </div>
          <div>
            <label>Emotion Spike</label>
            <input type="text" placeholder="panic, tilt, anger, FOMO, etc.">
          </div>
        `;
        const timeInput = row.querySelectorAll("input")[0];
        const emoInput = row.querySelectorAll("input")[1];
        timeInput.value = entry.time || "";
        emoInput.value = entry.emotion || "";

        timeInput.addEventListener("input", () => {
          entry.time = timeInput.value;
          setSummary();
          saveModule2();
        });
        emoInput.addEventListener("input", () => {
          entry.emotion = emoInput.value;
          setSummary();
          saveModule2();
        });

        body.appendChild(row);

        const triggerLabel = document.createElement("label");
        triggerLabel.textContent = "Trigger (what caused the surge)";
        body.appendChild(triggerLabel);

        const triggerInput = document.createElement("input");
        triggerInput.type = "text";
        triggerInput.placeholder = "e.g. candle spike against position, missed entry, sudden drawdown, etc.";
        triggerInput.value = entry.trigger || "";
        triggerInput.addEventListener("input", () => {
          entry.trigger = triggerInput.value;
          saveModule2();
        });
        body.appendChild(triggerInput);

        const notesLabel = document.createElement("label");
        notesLabel.textContent = "Notes / Reaction";
        body.appendChild(notesLabel);

        const notesArea = document.createElement("textarea");
        notesArea.placeholder = "How you reacted, what you did next, whether you regained control.";
        notesArea.value = entry.notes || "";
        notesArea.addEventListener("input", () => {
          entry.notes = notesArea.value;
          saveModule2();
        });
        body.appendChild(notesArea);

        card.appendChild(body);
        surgeListEl.appendChild(card);
      });
    }

    // ----- Adaptations -----
    function renderAdaptations() {
      adaptListEl.innerHTML = "";
      if (!adaptations.length) {
        const empty = document.createElement("div");
        empty.style.fontSize = "0.75rem";
        empty.style.color = "#6b7280";
        empty.textContent = "No adaptation windows logged yet.";
        adaptListEl.appendChild(empty);
        return;
      }

      adaptations.forEach((entry, index) => {
        const card = document.createElement("div");
        card.className = "adapt-card" + (entry.collapsed ? " collapsed" : "");

        const headerRow = document.createElement("div");
        headerRow.className = "adapt-header-row";

        const left = document.createElement("div");
        left.className = "adapt-label";
        left.textContent = `Adaptation #${index + 1}`;

        const summary = document.createElement("div");
        summary.className = "adapt-summary";
        const setSummary = () => {
          const windowLabel = (entry.startTime || "?") + "–" + (entry.endTime || "?");
          const tags = [];
          if (entry.tagStructShift) tags.push("struct shift");
          if (entry.tagTempoChange) tags.push("tempo");
          if (entry.tagLiquidityChange) tags.push("liquidity");
          if (entry.tagOrderflowChange) tags.push("orderflow");
          const tagStr = tags.length ? tags.join(", ") : "no tags";
          summary.textContent = `${windowLabel} | ${tagStr}`;
        };
        setSummary();

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

        const row = document.createElement("div");
        row.className = "adapt-row";
        row.innerHTML = `
          <div>
            <label>Start Time (EST)</label>
            <input type="text" placeholder="e.g. 10:15">
          </div>
          <div>
            <label>End Time (EST)</label>
            <input type="text" placeholder="e.g. 10:45">
          </div>
        `;
        const startInput = row.querySelectorAll("input")[0];
        const endInput = row.querySelectorAll("input")[1];
        startInput.value = entry.startTime || "";
        endInput.value = entry.endTime || "";

        startInput.addEventListener("input", () => {
          entry.startTime = startInput.value;
          setSummary();
          saveModule2();
        });
        endInput.addEventListener("input", () => {
          entry.endTime = endInput.value;
          setSummary();
          saveModule2();
        });

        body.appendChild(row);

        const tagsLabel = document.createElement("label");
        tagsLabel.textContent = "What changed?";
        body.appendChild(tagsLabel);

        const tagsWrap = document.createElement("div");
        tagsWrap.className = "adapt-tags";

        const tagDefs = [
          ["tagStructShift", "Structural shift"],
          ["tagTempoChange", "Tempo change"],
          ["tagLiquidityChange", "Liquidity behaviour change"],
          ["tagOrderflowChange", "Orderflow / tape shift"]
        ];

        tagDefs.forEach(([key, labelText]) => {
          const wrap = document.createElement("label");
          const cb = document.createElement("input");
          cb.type = "checkbox";
          cb.checked = !!entry[key];
          cb.addEventListener("change", () => {
            entry[key] = cb.checked;
            setSummary();
            saveModule2();
          });
          const span = document.createElement("span");
          span.textContent = labelText;
          wrap.appendChild(cb);
          wrap.appendChild(span);
          tagsWrap.appendChild(wrap);
        });

        body.appendChild(tagsWrap);

        const customTagsLabel = document.createElement("label");
        customTagsLabel.textContent = "Custom tags (comma separated)";
        body.appendChild(customTagsLabel);

        const customInput = document.createElement("input");
        customInput.type = "text";
        customInput.placeholder = "e.g. news spike, VWAP reclaim, killzone flip";
        customInput.value = entry.customTags || "";
        customInput.addEventListener("input", () => {
          entry.customTags = customInput.value;
          saveModule2();
        });
        body.appendChild(customInput);

        const whatChangedLabel = document.createElement("label");
        whatChangedLabel.textContent = "Describe what changed in the market";
        body.appendChild(whatChangedLabel);

        const whatChangedArea = document.createElement("textarea");
        whatChangedArea.placeholder = "Tape, volatility, structure, liquidity behaviour…";
        whatChangedArea.value = entry.whatChanged || "";
        whatChangedArea.addEventListener("input", () => {
          entry.whatChanged = whatChangedArea.value;
          saveModule2();
        });
        body.appendChild(whatChangedArea);

        const howAdaptedLabel = document.createElement("label");
        howAdaptedLabel.textContent = "How did you adapt (or fail to adapt)?";
        body.appendChild(howAdaptedLabel);

        const howAdaptedArea = document.createElement("textarea");
        howAdaptedArea.placeholder = "Execution change: sizing, model, timing, or stayed stubborn…";
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

    // ----- Session State -----
    function initSessionStateUI() {
      traderEnergyInput.value = sessionState.traderEnergy ?? "";
      marketEnergyInput.value = sessionState.marketEnergy ?? "";
      marketTypeSelect.value = sessionState.marketType ?? "";
      marketNotesArea.value = sessionState.notes ?? "";

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

    // ----- Add buttons -----
    if (addWatchBtn) {
      addWatchBtn.addEventListener("click", () => {
        watchEntries.push(createWatchEntry());
        saveModule2();
        renderWatchEntries();
      });
    }

    if (addSurgeBtn) {
      addSurgeBtn.addEventListener("click", () => {
        surges.push(createSurgeEntry());
        saveModule2();
        renderSurges();
      });
    }

    if (addAdaptBtn) {
      addAdaptBtn.addEventListener("click", () => {
        adaptations.push(createAdaptationEntry());
        saveModule2();
        renderAdaptations();
      });
    }

    // ----- Reset Day -----
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

      traderEnergyInput.value = "";
      marketEnergyInput.value = "";
      marketTypeSelect.value = "";
      marketNotesArea.value = "";

      setStatus("Day reset (M1 + M2)");
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
