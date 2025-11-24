document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach((item) => {
    item.classList.add('open');
    item.querySelector('.accordion-header').addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });

  const preMarketDefaults = {
    levelsMarked: false,
    previousSessions: '',
    structureNotes: '',
    scenarios: [],
    counter: 1,
  };

  const sessionDefaults = {
    watching: [],
    surges: [],
    adaptations: [],
    energy: {
      traderEnergy: '',
      marketEnergy: '',
      marketType: '',
      marketNotes: '',
    },
  };

  const tradeIdeaDefaults = {
    ideas: [],
    counter: 1,
  };

  const preMarketState = loadState('sop-pre-market', preMarketDefaults);
  const sessionState = loadState('sop-session', sessionDefaults);
  const tradeIdeaState = loadState('sop-trade-ideas', tradeIdeaDefaults);

  // Pre-market fields
  const levelsMarked = document.getElementById('levelsMarked');
  const previousSessions = document.getElementById('previousSessions');
  const structureNotes = document.getElementById('structureNotes');
  const scenarioList = document.getElementById('scenarioList');
  const addScenarioBtn = document.getElementById('addScenarioBtn');

  levelsMarked.checked = preMarketState.levelsMarked;
  previousSessions.value = preMarketState.previousSessions;
  structureNotes.value = preMarketState.structureNotes;

  levelsMarked.addEventListener('change', () => {
    preMarketState.levelsMarked = levelsMarked.checked;
    saveState('sop-pre-market', preMarketState);
  });

  [previousSessions, structureNotes].forEach((el) => {
    el.addEventListener('input', () => {
      preMarketState.previousSessions = previousSessions.value;
      preMarketState.structureNotes = structureNotes.value;
      saveState('sop-pre-market', preMarketState);
    });
  });

  addScenarioBtn.addEventListener('click', () => {
    const scenarioId = `S${preMarketState.counter}`;
    preMarketState.counter += 1;
    preMarketState.scenarios.push({
      id: scenarioId,
      title: '',
      ifText: '',
      thenText: '',
      open: true,
    });
    saveState('sop-pre-market', preMarketState);
    renderScenarios();
    renderTradeIdeas();
  });

  scenarioList.addEventListener('click', (e) => {
    const target = e.target;
    const card = target.closest('.card');
    if (!card) return;
    const id = card.dataset.id;

    if (target.classList.contains('card-toggle')) {
      card.classList.toggle('open');
      const scenario = preMarketState.scenarios.find((s) => s.id === id);
      if (scenario) {
        scenario.open = card.classList.contains('open');
        saveState('sop-pre-market', preMarketState);
      }
    }

    if (target.classList.contains('delete-card')) {
      preMarketState.scenarios = preMarketState.scenarios.filter((s) => s.id !== id);
      saveState('sop-pre-market', preMarketState);
      renderScenarios();
      renderTradeIdeas();
    }
  });

  scenarioList.addEventListener('input', (e) => {
    const target = e.target;
    const card = target.closest('.card');
    if (!card) return;
    const id = card.dataset.id;
    const scenario = preMarketState.scenarios.find((s) => s.id === id);
    if (!scenario) return;

    if (target.dataset.field === 'title') scenario.title = target.value;
    if (target.dataset.field === 'ifText') scenario.ifText = target.value;
    if (target.dataset.field === 'thenText') scenario.thenText = target.value;

    saveState('sop-pre-market', preMarketState);
    renderTradeIdeas();
    updateScenarioHeaders();
  });

  renderScenarios();

  function updateScenarioHeaders() {
    document.querySelectorAll('[data-scenario-title]').forEach((el) => {
      const id = el.dataset.scenarioTitle;
      const scenario = preMarketState.scenarios.find((s) => s.id === id);
      el.textContent = scenario && scenario.title ? scenario.title : 'Untitled';
    });
  }

  // During session
  const watchTime = document.getElementById('watchTime');
  const watchEmotion = document.getElementById('watchEmotion');
  const watchNotes = document.getElementById('watchNotes');
  const addWatchBtn = document.getElementById('addWatchBtn');
  const watchList = document.getElementById('watchList');

  const surgeTime = document.getElementById('surgeTime');
  const surgeEmotion = document.getElementById('surgeEmotion');
  const surgeNotes = document.getElementById('surgeNotes');
  const addSurgeBtn = document.getElementById('addSurgeBtn');
  const surgeList = document.getElementById('surgeList');

  const adaptStart = document.getElementById('adaptStart');
  const adaptEnd = document.getElementById('adaptEnd');
  const adaptDescription = document.getElementById('adaptDescription');
  const addAdaptBtn = document.getElementById('addAdaptBtn');
  const adaptList = document.getElementById('adaptList');

  const traderEnergy = document.getElementById('traderEnergy');
  const marketEnergy = document.getElementById('marketEnergy');
  const marketType = document.getElementById('marketType');
  const marketNotes = document.getElementById('marketNotes');

  addWatchBtn.addEventListener('click', () => {
    const item = {
      id: `W${Date.now()}`,
      time: watchTime.value,
      emotion: watchEmotion.value,
      notes: watchNotes.value,
      open: true,
    };
    sessionState.watching.unshift(item);
    saveState('sop-session', sessionState);
    renderWatching();
    watchTime.value = '';
    watchEmotion.value = '';
    watchNotes.value = '';
  });

  addSurgeBtn.addEventListener('click', () => {
    const item = {
      id: `E${Date.now()}`,
      time: surgeTime.value,
      emotion: surgeEmotion.value,
      notes: surgeNotes.value,
      open: true,
    };
    sessionState.surges.unshift(item);
    saveState('sop-session', sessionState);
    renderSurges();
    surgeTime.value = '';
    surgeEmotion.value = '';
    surgeNotes.value = '';
  });

  addAdaptBtn.addEventListener('click', () => {
    const item = {
      id: `A${Date.now()}`,
      start: adaptStart.value,
      end: adaptEnd.value,
      description: adaptDescription.value,
      open: true,
    };
    sessionState.adaptations.unshift(item);
    saveState('sop-session', sessionState);
    renderAdaptations();
    adaptStart.value = '';
    adaptEnd.value = '';
    adaptDescription.value = '';
  });

  [traderEnergy, marketEnergy, marketType, marketNotes].forEach((el) => {
    const key = el.id;
    el.value = sessionState.energy[key] || '';
    el.addEventListener('input', () => {
      sessionState.energy[key] = el.value;
      saveState('sop-session', sessionState);
    });
  });

  watchList.addEventListener('click', (e) => handleCardActions(e, 'watching'));
  surgeList.addEventListener('click', (e) => handleCardActions(e, 'surges'));
  adaptList.addEventListener('click', (e) => handleCardActions(e, 'adaptations'));

  watchList.addEventListener('input', (e) => handleCardInput(e, 'watching'));
  surgeList.addEventListener('input', (e) => handleCardInput(e, 'surges'));
  adaptList.addEventListener('input', (e) => handleCardInput(e, 'adaptations'));

  renderWatching();
  renderSurges();
  renderAdaptations();

  function handleCardActions(e, type) {
    const target = e.target;
    const card = target.closest('.card');
    if (!card) return;
    const id = card.dataset.id;

    if (target.classList.contains('card-toggle')) {
      card.classList.toggle('open');
      const item = findItem(type, id);
      if (item) item.open = card.classList.contains('open');
      saveState('sop-session', sessionState);
    }

    if (target.classList.contains('delete-card')) {
      sessionState[type] = sessionState[type].filter((i) => i.id !== id);
      saveState('sop-session', sessionState);
      renderList(type);
    }
  }

  function handleCardInput(e, type) {
    const target = e.target;
    const card = target.closest('.card');
    if (!card) return;
    const id = card.dataset.id;
    const item = findItem(type, id);
    if (!item) return;
    if (target.dataset.field) item[target.dataset.field] = target.value;
    saveState('sop-session', sessionState);
  }

  function findItem(type, id) {
    return sessionState[type].find((i) => i.id === id);
  }

  function renderList(type) {
    if (type === 'watching') renderWatching();
    if (type === 'surges') renderSurges();
    if (type === 'adaptations') renderAdaptations();
  }

  function cardTemplate(item, fields) {
    return `
      <div class="card ${item.open ? 'open' : ''}" data-id="${item.id}">
        <div class="card-header">
          <div class="card-title">${fields.title}</div>
          <div class="card-actions">
            <button class="small-btn secondary card-toggle">Toggle</button>
            <button class="small-btn danger delete-card">Delete</button>
          </div>
        </div>
        <div class="card-body">
          ${fields.body}
        </div>
      </div>
    `;
  }

  function renderWatching() {
    watchList.innerHTML = sessionState.watching
      .map((item, idx) =>
        cardTemplate(item, {
          title: `Watching #${sessionState.watching.length - idx}`,
          body: `
            <div class="field-row">
              <label class="field-block"><span>Time</span><input data-field="time" type="time" value="${item.time || ''}" /></label>
              <label class="field-block"><span>Emotion</span><input data-field="emotion" type="text" value="${escapeValue(item.emotion)}" /></label>
            </div>
            <label class="field-block"><span>Notes</span><textarea data-field="notes">${escapeValue(item.notes)}</textarea></label>
          `,
        })
      )
      .join('');
  }

  function renderSurges() {
    surgeList.innerHTML = sessionState.surges
      .map((item, idx) =>
        cardTemplate(item, {
          title: `Surge #${sessionState.surges.length - idx}`,
          body: `
            <div class="field-row">
              <label class="field-block"><span>Time</span><input data-field="time" type="time" value="${item.time || ''}" /></label>
              <label class="field-block"><span>Emotion</span><input data-field="emotion" type="text" value="${escapeValue(item.emotion)}" /></label>
            </div>
            <label class="field-block"><span>Notes</span><textarea data-field="notes">${escapeValue(item.notes)}</textarea></label>
          `,
        })
      )
      .join('');
  }

  function renderAdaptations() {
    adaptList.innerHTML = sessionState.adaptations
      .map((item, idx) =>
        cardTemplate(item, {
          title: `Adaptation #${sessionState.adaptations.length - idx}`,
          body: `
            <div class="field-row">
              <label class="field-block"><span>Start</span><input data-field="start" type="time" value="${item.start || ''}" /></label>
              <label class="field-block"><span>End</span><input data-field="end" type="time" value="${item.end || ''}" /></label>
            </div>
            <label class="field-block"><span>Description</span><textarea data-field="description">${escapeValue(item.description)}</textarea></label>
          `,
        })
      )
      .join('');
  }

  // Trade ideas
  const tradeIdeaList = document.getElementById('tradeIdeaList');
  const addTradeIdeaBtn = document.getElementById('addTradeIdeaBtn');
  const confirmAddIdea = document.getElementById('confirmAddIdea');
  const tradeTitleInput = document.getElementById('tradeTitleInput');

  function createTradeIdea(title) {
    const id = `T${tradeIdeaState.counter}`;
    tradeIdeaState.counter += 1;
    return {
      id,
      title: title || `Trade Idea ${tradeIdeaState.counter - 1}`,
      status: 'pending',
      open: true,
      pre: { emotion: '', tags: '', confluence: '', notes: '' },
      signal: { time: '', emotion: '', entryModels: '', confluence: '', scenarioLink: '', notes: '' },
      taken: { entryPrice: '', stopLoss: '', expectedRR: '', notes: '' },
      missed: { reason: '', rValue: '', notes: '' },
    };
  }

  addTradeIdeaBtn.addEventListener('click', () => {
    tradeTitleInput.focus();
  });

  confirmAddIdea.addEventListener('click', () => {
    const idea = createTradeIdea(tradeTitleInput.value.trim());
    tradeIdeaState.ideas.unshift(idea);
    saveState('sop-trade-ideas', tradeIdeaState);
    tradeTitleInput.value = '';
    renderTradeIdeas();
  });

  tradeIdeaList.addEventListener('click', (e) => {
    const target = e.target;
    const card = target.closest('.card');
    if (!card) return;
    const id = card.dataset.id;
    const idea = tradeIdeaState.ideas.find((i) => i.id === id);
    if (!idea) return;

    if (target.classList.contains('card-toggle')) {
      card.classList.toggle('open');
      idea.open = card.classList.contains('open');
      saveState('sop-trade-ideas', tradeIdeaState);
    }

    if (target.classList.contains('delete-card')) {
      tradeIdeaState.ideas = tradeIdeaState.ideas.filter((i) => i.id !== id);
      saveState('sop-trade-ideas', tradeIdeaState);
      renderTradeIdeas();
    }

    if (target.dataset.action === 'markTaken') {
      idea.status = 'taken';
      saveState('sop-trade-ideas', tradeIdeaState);
      renderTradeIdeas();
    }

    if (target.dataset.action === 'markMissed') {
      idea.status = 'missed';
      saveState('sop-trade-ideas', tradeIdeaState);
      renderTradeIdeas();
    }
  });

  tradeIdeaList.addEventListener('input', (e) => {
    const target = e.target;
    const card = target.closest('.card');
    if (!card) return;
    const id = card.dataset.id;
    const idea = tradeIdeaState.ideas.find((i) => i.id === id);
    if (!idea) return;

    const section = target.dataset.section;
    const field = target.dataset.field;
    if (!field) return;

    if (section === 'title') {
      idea.title = target.value;
    } else if (section && idea[section]) {
      idea[section][field] = target.value;
    }
    saveState('sop-trade-ideas', tradeIdeaState);
  });

  renderTradeIdeas();

  function renderTradeIdeas() {
    tradeIdeaList.innerHTML = tradeIdeaState.ideas
      .map((idea) => {
        const statusLabel = idea.status === 'taken' ? 'Trade Taken' : idea.status === 'missed' ? 'Trade Missed' : 'Pending';
        const statusClass = idea.status === 'taken' ? 'badge taken' : idea.status === 'missed' ? 'badge missed' : 'badge';
        const scenarioOptions = buildScenarioOptions(idea.signal.scenarioLink);
        return `
          <div class="card ${idea.open ? 'open' : ''}" data-id="${idea.id}">
            <div class="card-header">
              <div class="card-title">
                <span>${idea.id}</span>
                <input data-section="title" data-field="title" type="text" value="${escapeValue(idea.title)}" />
              </div>
              <div class="card-actions">
                <span class="${statusClass}">${statusLabel}</span>
                <button class="small-btn secondary card-toggle">Toggle</button>
                <button class="small-btn danger delete-card">Delete</button>
              </div>
            </div>
            <div class="card-body">
              <div class="card-block">
                <p class="eyebrow">Baseline</p>
                <h3>Pre-Trade</h3>
                <div class="field-row">
                  <label class="field-block"><span>Emotion</span><input data-section="pre" data-field="emotion" type="text" value="${escapeValue(idea.pre.emotion)}" /></label>
                  <label class="field-block"><span>Tags</span><input data-section="pre" data-field="tags" type="text" value="${escapeValue(idea.pre.tags)}" /></label>
                </div>
                <label class="field-block"><span>Confluence</span><input data-section="pre" data-field="confluence" type="text" value="${escapeValue(idea.pre.confluence)}" /></label>
                <label class="field-block"><span>Notes</span><textarea data-section="pre" data-field="notes">${escapeValue(idea.pre.notes)}</textarea></label>
              </div>

              <div class="card-block">
                <p class="eyebrow">Signal</p>
                <h3>Trigger</h3>
                <div class="field-row">
                  <label class="field-block"><span>Time</span><input data-section="signal" data-field="time" type="time" value="${escapeValue(idea.signal.time)}" /></label>
                  <label class="field-block"><span>Emotion</span><input data-section="signal" data-field="emotion" type="text" value="${escapeValue(idea.signal.emotion)}" /></label>
                </div>
                <div class="field-row">
                  <label class="field-block"><span>Entry models</span><input data-section="signal" data-field="entryModels" type="text" value="${escapeValue(idea.signal.entryModels)}" /></label>
                  <label class="field-block"><span>Confluence</span><input data-section="signal" data-field="confluence" type="text" value="${escapeValue(idea.signal.confluence)}" /></label>
                </div>
                <label class="field-block"><span>Link to scenario</span><select data-section="signal" data-field="scenarioLink">${scenarioOptions}</select></label>
                <label class="field-block"><span>Notes</span><textarea data-section="signal" data-field="notes">${escapeValue(idea.signal.notes)}</textarea></label>
              </div>

              <div class="card-block">
                <p class="eyebrow">Decision Fork</p>
                <h3>Outcome</h3>
                <div class="status-row">
                  <button class="pill success" data-action="markTaken">Mark as Trade Taken</button>
                  <button class="pill warning" data-action="markMissed">Mark as Trade Missed</button>
                </div>
                <div class="grid-two">
                  <div>
                    <p class="eyebrow">Trade Taken</p>
                    <label class="field-block"><span>Entry price</span><input data-section="taken" data-field="entryPrice" type="text" value="${escapeValue(idea.taken.entryPrice)}" /></label>
                    <label class="field-block"><span>Stop loss</span><input data-section="taken" data-field="stopLoss" type="text" value="${escapeValue(idea.taken.stopLoss)}" /></label>
                    <label class="field-block"><span>Expected RR</span><input data-section="taken" data-field="expectedRR" type="text" value="${escapeValue(idea.taken.expectedRR)}" /></label>
                    <label class="field-block"><span>Notes</span><textarea data-section="taken" data-field="notes">${escapeValue(idea.taken.notes)}</textarea></label>
                  </div>
                  <div>
                    <p class="eyebrow">Trade Missed</p>
                    <label class="field-block"><span>Reason</span><input data-section="missed" data-field="reason" type="text" value="${escapeValue(idea.missed.reason)}" /></label>
                    <label class="field-block"><span>R value</span><input data-section="missed" data-field="rValue" type="text" value="${escapeValue(idea.missed.rValue)}" /></label>
                    <label class="field-block"><span>Notes</span><textarea data-section="missed" data-field="notes">${escapeValue(idea.missed.notes)}</textarea></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  function buildScenarioOptions(selected) {
    const options = ['<option value="">Link a scenario</option>'];
    preMarketState.scenarios.forEach((s) => {
      const label = s.title ? `${s.id} — ${s.title}` : s.id;
      options.push(`<option value="${s.id}" ${selected === s.id ? 'selected' : ''}>${label}</option>`);
    });
    return options.join('');
  }

  function renderScenarios() {
    scenarioList.innerHTML = preMarketState.scenarios
      .map((scenario) => `
        <div class="card ${scenario.open ? 'open' : ''}" data-id="${scenario.id}">
          <div class="card-header">
            <div class="card-title">
              <span>${scenario.id}</span>
              <input data-field="title" type="text" value="${escapeValue(scenario.title)}" placeholder="Scenario title" />
            </div>
            <div class="card-actions">
              <button class="small-btn secondary card-toggle">Toggle</button>
              <button class="small-btn danger delete-card">Delete</button>
            </div>
          </div>
          <div class="card-body">
            <label class="field-block"><span>IF</span><textarea data-field="ifText" placeholder="If ...">${escapeValue(scenario.ifText)}</textarea></label>
            <label class="field-block"><span>THEN</span><textarea data-field="thenText" placeholder="Then ...">${escapeValue(scenario.thenText)}</textarea></label>
          </div>
        </div>
      `)
      .join('');
  }

  function escapeValue(value) {
    if (value == null) return '';
    return String(value).replace(/\"/g, '&quot;');
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function loadState(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return clone(fallback);
      return Object.assign(clone(fallback), JSON.parse(raw));
    } catch (err) {
      return clone(fallback);
    }
  }

  function saveState(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  document.getElementById('resetDayBtn').addEventListener('click', () => {
    localStorage.clear();
    location.reload();
  });
});
