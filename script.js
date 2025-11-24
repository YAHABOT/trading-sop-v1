const storageKeys = {
  preMarket: 'tsj_pre_market',
  scenarios: 'tsj_scenarios',
  watching: 'tsj_watching',
  surges: 'tsj_surges',
  adaptations: 'tsj_adaptations',
  session: 'tsj_session_global',
  trades: 'tsj_trades',
};

const state = {
  preMarket: load(storageKeys.preMarket, {
    levelsMarked: false,
    previousSessions: '',
    structure: '',
    sessionEmotion: '',
  }),
  scenarios: load(storageKeys.scenarios, []),
  watching: load(storageKeys.watching, []),
  surges: load(storageKeys.surges, []),
  adaptations: load(storageKeys.adaptations, []),
  session: load(storageKeys.session, {
    traderEnergy: '',
    marketEnergy: '',
    marketType: '',
    notes: '',
  }),
  trades: load(storageKeys.trades, []),
};

function load(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (err) {
    console.warn('Load error', key, err);
    return fallback;
  }
}

function persist(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* Accordion setup */

function initAccordion() {
  document.querySelectorAll('[data-accordion]').forEach((acc) => {
    const trigger = acc.querySelector('[data-accordion-trigger]');
    trigger?.addEventListener('click', () => {
      acc.classList.toggle('open');
    });
  });
}

/* Scenario dropdown options for trades */

function renderScenarioOptions() {
  const select = document.getElementById('trade-scenario-link');
  if (!select) return;
  select.innerHTML = '<option value="">Link to scenario (optional)</option>';
  state.scenarios.forEach((s) => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = `${s.id} — ${s.title || 'Untitled'}`;
    select.appendChild(opt);
  });
}

/* Render scenarios */

function renderScenarios() {
  const container = document.getElementById('scenario-list');
  if (!container) return;
  container.innerHTML = '';

  if (!state.scenarios.length) {
    const empty = document.createElement('div');
    empty.className = 'tagline';
    empty.textContent = 'No scenarios logged yet.';
    container.appendChild(empty);
    renderScenarioOptions();
    return;
  }

  state.scenarios.forEach((scenario) => {
    const card = document.createElement('div');
    card.className = 'item-card';

    card.innerHTML = `
      <div class="item-header">
        <div class="item-title">
          <span class="badge">${scenario.id}</span>
          <strong>${scenario.title || 'Untitled scenario'}</strong>
        </div>
        <div class="item-actions">
          <button type="button" class="small-btn toggle-card">Toggle</button>
          <button type="button" class="small-btn" data-delete-scenario="${scenario.id}">Delete</button>
        </div>
      </div>
      <div class="item-body">
        <p class="tagline"><strong>IF:</strong> ${scenario.if || '—'}</p>
        <p class="tagline"><strong>THEN:</strong> ${scenario.then || '—'}</p>
      </div>
    `;

    attachCardToggle(card);
    container.appendChild(card);
  });

  renderScenarioOptions();
}

/* Watching entries */

function renderWatching() {
  const container = document.getElementById('watching-list');
  if (!container) return;
  container.innerHTML = '';

  if (!state.watching.length) {
    const empty = document.createElement('div');
    empty.className = 'tagline';
    empty.textContent = 'No watching entries logged yet.';
    container.appendChild(empty);
    return;
  }

  state.watching.forEach((entry) => {
    const card = document.createElement('div');
    card.className = 'item-card';

    card.innerHTML = `
      <div class="item-header">
        <div class="item-title">
          <span class="badge">${entry.time || '—'}</span>
          <span>${entry.emotion || 'Watching'}</span>
        </div>
        <div class="item-actions">
          <button type="button" class="small-btn toggle-card">Toggle</button>
          <button type="button" class="small-btn" data-delete-watch="${entry.id}">Delete</button>
        </div>
      </div>
      <div class="item-body">
        <p>${entry.notes || 'No notes provided.'}</p>
      </div>
    `;

    attachCardToggle(card);
    container.appendChild(card);
  });
}

/* Surges */

function renderSurges() {
  const container = document.getElementById('surge-list');
  if (!container) return;
  container.innerHTML = '';

  if (!state.surges.length) {
    const empty = document.createElement('div');
    empty.className = 'tagline';
    empty.textContent = 'No emotional surges logged yet.';
    container.appendChild(empty);
    return;
  }

  state.surges.forEach((entry) => {
    const card = document.createElement('div');
    card.className = 'item-card';

    card.innerHTML = `
      <div class="item-header">
        <div class="item-title">
          <span class="badge">${entry.time || '—'}</span>
          <span>${entry.emotion || 'Surge'}</span>
        </div>
        <div class="item-actions">
          <button type="button" class="small-btn toggle-card">Toggle</button>
          <button type="button" class="small-btn" data-delete-surge="${entry.id}">Delete</button>
        </div>
      </div>
      <div class="item-body">
        <p>${entry.notes || 'No notes provided.'}</p>
      </div>
    `;

    attachCardToggle(card);
    container.appendChild(card);
  });
}

/* Adaptations */

function renderAdaptations() {
  const container = document.getElementById('adapt-list');
  if (!container) return;
  container.innerHTML = '';

  if (!state.adaptations.length) {
    const empty = document.createElement('div');
    empty.className = 'tagline';
    empty.textContent = 'No adaptation windows logged yet.';
    container.appendChild(empty);
    return;
  }

  state.adaptations.forEach((entry) => {
    const card = document.createElement('div');
    card.className = 'item-card';

    card.innerHTML = `
      <div class="item-header">
        <div class="item-title">
          <span class="badge">${entry.start || '—'} → ${entry.end || '—'}</span>
          <span>Adaptation</span>
        </div>
        <div class="item-actions">
          <button type="button" class="small-btn toggle-card">Toggle</button>
          <button type="button" class="small-btn" data-delete-adapt="${entry.id}">Delete</button>
        </div>
      </div>
      <div class="item-body">
        <p>${entry.description || 'No description provided.'}</p>
      </div>
    `;

    attachCardToggle(card);
    container.appendChild(card);
  });
}

/* Trade cards */

function tradeTemplate(trade) {
  const scenarioName = trade.signal.scenarioId
    ? (state.scenarios.find((s) => s.id === trade.signal.scenarioId)?.title || 'Linked scenario')
    : 'No scenario link';

  return `
    <div class="item-card" data-trade="${trade.id}">
      <div class="item-header">
        <div class="item-title">
          <span class="badge">${trade.id}</span>
          <strong>${trade.title || 'Trade Idea'}</strong>
        </div>
        <div class="item-actions">
          <button type="button" class="small-btn toggle-card">Toggle</button>
          <button type="button" class="small-btn" data-delete-trade="${trade.id}">Delete</button>
        </div>
      </div>
      <div class="item-body">
        <div class="label-grid">
          <div><strong>Pre-Trade Emotion:</strong> ${trade.pre.emotion || '—'}</div>
          <div><strong>Tags:</strong> ${trade.pre.tags || '—'}</div>
          <div><strong>Confluence:</strong> ${trade.pre.confluence || '—'}</div>
        </div>
        <p class="tagline"><strong>Pre-Trade Notes:</strong> ${trade.pre.notes || '—'}</p>

        <hr />

        <div class="label-grid">
          <div><strong>Signal Time:</strong> ${trade.signal.time || '—'}</div>
          <div><strong>Signal Emotion:</strong> ${trade.signal.emotion || '—'}</div>
          <div><strong>Entry Models:</strong> ${trade.signal.entryModels || '—'}</div>
          <div><strong>Signal Confluence:</strong> ${trade.signal.confluence || '—'}</div>
          <div><strong>Scenario Link:</strong> ${
            trade.signal.scenarioId ? `${trade.signal.scenarioId} — ${scenarioName}` : 'None'
          }</div>
        </div>
        <p class="tagline"><strong>Signal Notes:</strong> ${trade.signal.notes || '—'}</p>

        <hr />

        <div class="form-row">
          <button type="button" class="small-btn" data-mark-taken="${trade.id}">Mark as Trade Taken</button>
          <button type="button" class="small-btn" data-mark-missed="${trade.id}">Mark as Trade Missed</button>
          <span class="badge">Status: ${trade.decision.toUpperCase()}</span>
        </div>

        <div class="label-grid">
          <label class="field">
            <span>Entry price</span>
            <input type="number" step="0.0001" data-entry-price="${trade.id}" value="${trade.taken.entryPrice || ''}" />
          </label>
          <label class="field">
            <span>Stop loss</span>
            <input type="number" step="0.0001" data-stop-loss="${trade.id}" value="${trade.taken.stopLoss || ''}" />
          </label>
          <label class="field">
            <span>Expected R:R</span>
            <input type="text" data-expected-rr="${trade.id}" value="${trade.taken.expectedRR || ''}" />
          </label>
        </div>

        <label class="field">
          <span>Trade taken notes</span>
          <textarea data-taken-notes="${trade.id}">${trade.taken.notes || ''}</textarea>
        </label>

        <hr />

        <div class="label-grid">
          <label class="field">
            <span>Reason missed</span>
            <input type="text" data-missed-reason="${trade.id}" value="${trade.missed.reason || ''}" />
          </label>
          <label class="field">
            <span>Missed R value</span>
            <input type="text" data-missed-r="${trade.id}" value="${trade.missed.rValue || ''}" />
          </label>
        </div>

        <label class="field">
          <span>Missed notes</span>
          <textarea data-missed-notes="${trade.id}">${trade.missed.notes || ''}</textarea>
        </label>
      </div>
    </div>
  `;
}

function renderTrades() {
  const container = document.getElementById('trade-list');
  if (!container) return;
  container.innerHTML = '';

  if (!state.trades.length) {
    const empty = document.createElement('div');
    empty.className = 'tagline';
    empty.textContent = 'No trade ideas logged yet.';
    container.appendChild(empty);
    return;
  }

  state.trades.forEach((trade) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = tradeTemplate(trade);
    const card = wrapper.firstElementChild;
    attachCardToggle(card);
    container.appendChild(card);
  });

  attachTradeFieldListeners();
}

/* Generic card toggle */

function attachCardToggle(card) {
  const header = card.querySelector('.item-header');
  const body = card.querySelector('.item-body');
  const toggleBtn = card.querySelector('.toggle-card');

  function toggle() {
    card.classList.toggle('open');
  }

  header?.addEventListener('click', (e) => {
    if (e.target.closest('button')) return;
    toggle();
  });

  toggleBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle();
  });
}

/* Pre-market setup */

function setupPreMarket() {
  const levels = document.getElementById('levels-marked');
  const prevSessions = document.getElementById('previous-sessions');
  const structure = document.getElementById('structure');
  const sessionEmotion = document.getElementById('session-emotion');

  if (!levels) return; // page not loaded correctly

  levels.checked = state.preMarket.levelsMarked;
  prevSessions.value = state.preMarket.previousSessions;
  structure.value = state.preMarket.structure;
  sessionEmotion.value = state.preMarket.sessionEmotion;

  levels.addEventListener('change', (e) => {
    state.preMarket.levelsMarked = e.target.checked;
    persist(storageKeys.preMarket, state.preMarket);
  });

  prevSessions.addEventListener('input', (e) => {
    state.preMarket.previousSessions = e.target.value;
    persist(storageKeys.preMarket, state.preMarket);
  });

  structure.addEventListener('input', (e) => {
    state.preMarket.structure = e.target.value;
    persist(storageKeys.preMarket, state.preMarket);
  });

  sessionEmotion.addEventListener('input', (e) => {
    state.preMarket.sessionEmotion = e.target.value;
    persist(storageKeys.preMarket, state.preMarket);
  });

  // Add scenario
  const addScenarioBtn = document.getElementById('add-scenario');
  addScenarioBtn?.addEventListener('click', () => {
    const titleInput = document.getElementById('scenario-title');
    const ifInput = document.getElementById('scenario-if');
    const thenInput = document.getElementById('scenario-then');

    const title = titleInput.value.trim();
    const ifText = ifInput.value.trim();
    const thenText = thenInput.value.trim();

    if (!title && !ifText && !thenText) return;

    const nextId = `S${state.scenarios.length + 1}`;
    state.scenarios.push({ id: nextId, title, if: ifText, then: thenText });
    persist(storageKeys.scenarios, state.scenarios);

    titleInput.value = '';
    ifInput.value = '';
    thenInput.value = '';

    renderScenarios();
  });

  document.getElementById('scenario-list').addEventListener('click', (e) => {
    const delId = e.target.getAttribute('data-delete-scenario');
    if (delId) {
      state.scenarios = state.scenarios.filter((s) => s.id !== delId);
      persist(storageKeys.scenarios, state.scenarios);
      renderScenarios();
    }
  });

  renderScenarios();
}

/* Session module (Module 2) */

function setupSessionModule() {
  const traderEnergy = document.getElementById('trader-energy');
  const marketEnergy = document.getElementById('market-energy');
  const marketType = document.getElementById('market-type');
  const sessionNotes = document.getElementById('session-notes');

  traderEnergy.value = state.session.traderEnergy;
  marketEnergy.value = state.session.marketEnergy;
  marketType.value = state.session.marketType;
  sessionNotes.value = state.session.notes;

  traderEnergy.addEventListener('input', (e) => {
    state.session.traderEnergy = e.target.value;
    persist(storageKeys.session, state.session);
  });
  marketEnergy.addEventListener('input', (e) => {
    state.session.marketEnergy = e.target.value;
    persist(storageKeys.session, state.session);
  });
  marketType.addEventListener('input', (e) => {
    state.session.marketType = e.target.value;
    persist(storageKeys.session, state.session);
  });
  sessionNotes.addEventListener('input', (e) => {
    state.session.notes = e.target.value;
    persist(storageKeys.session, state.session);
  });

  // Watching
  document.getElementById('add-watching').addEventListener('click', () => {
    const time = document.getElementById('watch-time').value;
    const emotion = document.getElementById('watch-emotion').value.trim();
    const notes = document.getElementById('watch-notes').value.trim();
    if (!time && !emotion && !notes) return;

    state.watching.push({
      id: crypto.randomUUID(),
      time,
      emotion,
      notes,
    });
    persist(storageKeys.watching, state.watching);

    document.getElementById('watch-time').value = '';
    document.getElementById('watch-emotion').value = '';
    document.getElementById('watch-notes').value = '';

    renderWatching();
  });

  document.getElementById('watching-list').addEventListener('click', (e) => {
    const delId = e.target.getAttribute('data-delete-watch');
    if (delId) {
      state.watching = state.watching.filter((w) => w.id !== delId);
      persist(storageKeys.watching, state.watching);
      renderWatching();
    }
  });

  // Surges
  document.getElementById('add-surge').addEventListener('click', () => {
    const time = document.getElementById('surge-time').value;
    const emotion = document.getElementById('surge-emotion').value.trim();
    const notes = document.getElementById('surge-notes').value.trim();
    if (!time && !emotion && !notes) return;

    state.surges.push({
      id: crypto.randomUUID(),
      time,
      emotion,
      notes,
    });
    persist(storageKeys.surges, state.surges);

    document.getElementById('surge-time').value = '';
    document.getElementById('surge-emotion').value = '';
    document.getElementById('surge-notes').value = '';

    renderSurges();
  });

  document.getElementById('surge-list').addEventListener('click', (e) => {
    const delId = e.target.getAttribute('data-delete-surge');
    if (delId) {
      state.surges = state.surges.filter((s) => s.id !== delId);
      persist(storageKeys.surges, state.surges);
      renderSurges();
    }
  });

  // Adaptations
  document.getElementById('add-adaptation').addEventListener('click', () => {
    const start = document.getElementById('adapt-start').value;
    const end = document.getElementById('adapt-end').value;
    const description = document.getElementById('adapt-description').value.trim();
    if (!start && !end && !description) return;

    state.adaptations.push({
      id: crypto.randomUUID(),
      start,
      end,
      description,
    });
    persist(storageKeys.adaptations, state.adaptations);

    document.getElementById('adapt-start').value = '';
    document.getElementById('adapt-end').value = '';
    document.getElementById('adapt-description').value = '';

    renderAdaptations();
  });

  document.getElementById('adapt-list').addEventListener('click', (e) => {
    const delId = e.target.getAttribute('data-delete-adapt');
    if (delId) {
      state.adaptations = state.adaptations.filter((a) => a.id !== delId);
      persist(storageKeys.adaptations, state.adaptations);
      renderAdaptations();
    }
  });

  renderWatching();
  renderSurges();
  renderAdaptations();
}

/* Trades (Module 3) */

function setupTrades() {
  renderTrades();

  document.getElementById('add-trade').addEventListener('click', () => {
    const title = document.getElementById('trade-title').value.trim();
    const preEmotion = document.getElementById('trade-pre-emotion').value.trim();
    const tags = document.getElementById('trade-tags').value.trim();
    const confluence = document.getElementById('trade-confluence').value.trim();
    const preNotes = document.getElementById('trade-pre-notes').value.trim();
    const signalTime = document.getElementById('trade-signal-time').value;
    const signalEmotion = document.getElementById('trade-signal-emotion').value.trim();
    const entryModels = document.getElementById('trade-entry-models').value.trim();
    const signalConfluence = document.getElementById('trade-signal-confluence').value.trim();
    const scenarioLink = document.getElementById('trade-scenario-link').value;
    const signalNotes = document.getElementById('trade-signal-notes').value.trim();

    if (!title && !preEmotion && !tags && !signalTime && !entryModels && !signalNotes) return;

    const nextId = `T${state.trades.length + 1}`;
    state.trades.push({
      id: nextId,
      title,
      pre: {
        emotion: preEmotion,
        tags,
        confluence,
        notes: preNotes,
      },
      signal: {
        time: signalTime,
        emotion: signalEmotion,
        entryModels,
        confluence: signalConfluence,
        scenarioId: scenarioLink,
        notes: signalNotes,
      },
      decision: 'none',
      taken: { entryPrice: '', stopLoss: '', expectedRR: '', notes: '' },
      missed: { reason: '', rValue: '', notes: '' },
    });

    persist(storageKeys.trades, state.trades);
    clearTradeForm();
    renderTrades();
  });

  document.getElementById('trade-list').addEventListener('click', (e) => {
    const delId = e.target.getAttribute('data-delete-trade');
    if (delId) {
      state.trades = state.trades.filter((t) => t.id !== delId);
      persist(storageKeys.trades, state.trades);
      renderTrades();
      return;
    }

    const markTaken = e.target.getAttribute('data-mark-taken');
    const markMissed = e.target.getAttribute('data-mark-missed');

    if (markTaken) {
      updateTradeDecision(markTaken, 'taken');
    } else if (markMissed) {
      updateTradeDecision(markMissed, 'missed');
    }
  });
}

function updateTradeDecision(tradeId, decision) {
  const trade = state.trades.find((t) => t.id === tradeId);
  if (!trade) return;

  const entryPrice = document.querySelector(`[data-entry-price="${tradeId}"]`)?.value || '';
  const stopLoss = document.querySelector(`[data-stop-loss="${tradeId}"]`)?.value || '';
  const expectedRR = document.querySelector(`[data-expected-rr="${tradeId}"]`)?.value || '';
  const takenNotes = document.querySelector(`[data-taken-notes="${tradeId}"]`)?.value || '';
  const missedReason = document.querySelector(`[data-missed-reason="${tradeId}"]`)?.value || '';
  const missedR = document.querySelector(`[data-missed-r="${tradeId}"]`)?.value || '';
  const missedNotes = document.querySelector(`[data-missed-notes="${tradeId}"]`)?.value || '';

  trade.decision = decision;
  trade.taken = { entryPrice, stopLoss, expectedRR, notes: takenNotes };
  trade.missed = { reason: missedReason, rValue: missedR, notes: missedNotes };

  persist(storageKeys.trades, state.trades);
  renderTrades();
}

function attachTradeFieldListeners() {
  // Live update on change instead of only when marking taken/missed
  state.trades.forEach((trade) => {
    const id = trade.id;

    const entryPriceEl = document.querySelector(`[data-entry-price="${id}"]`);
    const stopLossEl = document.querySelector(`[data-stop-loss="${id}"]`);
    const expectedRREl = document.querySelector(`[data-expected-rr="${id}"]`);
    const takenNotesEl = document.querySelector(`[data-taken-notes="${id}"]`);
    const missedReasonEl = document.querySelector(`[data-missed-reason="${id}"]`);
    const missedREl = document.querySelector(`[data-missed-r="${id}"]`);
    const missedNotesEl = document.querySelector(`[data-missed-notes="${id}"]`);

    if (entryPriceEl)
      entryPriceEl.addEventListener('input', (e) => {
        trade.taken.entryPrice = e.target.value;
        persist(storageKeys.trades, state.trades);
      });
    if (stopLossEl)
      stopLossEl.addEventListener('input', (e) => {
        trade.taken.stopLoss = e.target.value;
        persist(storageKeys.trades, state.trades);
      });
    if (expectedRREl)
      expectedRREl.addEventListener('input', (e) => {
        trade.taken.expectedRR = e.target.value;
        persist(storageKeys.trades, state.trades);
      });
    if (takenNotesEl)
      takenNotesEl.addEventListener('input', (e) => {
        trade.taken.notes = e.target.value;
        persist(storageKeys.trades, state.trades);
      });
    if (missedReasonEl)
      missedReasonEl.addEventListener('input', (e) => {
        trade.missed.reason = e.target.value;
        persist(storageKeys.trades, state.trades);
      });
    if (missedREl)
      missedREl.addEventListener('input', (e) => {
        trade.missed.rValue = e.target.value;
        persist(storageKeys.trades, state.trades);
      });
    if (missedNotesEl)
      missedNotesEl.addEventListener('input', (e) => {
        trade.missed.notes = e.target.value;
        persist(storageKeys.trades, state.trades);
      });
  });
}

function clearTradeForm() {
  [
    'trade-title',
    'trade-pre-emotion',
    'trade-tags',
    'trade-confluence',
    'trade-pre-notes',
    'trade-signal-time',
    'trade-signal-emotion',
    'trade-entry-models',
    'trade-signal-confluence',
    'trade-signal-notes',
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const scenarioSelect = document.getElementById('trade-scenario-link');
  if (scenarioSelect) scenarioSelect.value = '';
}

/* Reset Day */

function setupReset() {
  document.getElementById('reset-day').addEventListener('click', () => {
    if (!confirm('Reset the entire day (all modules)? This cannot be undone.')) return;

    Object.values(storageKeys).forEach((key) => localStorage.removeItem(key));

    // Reset in-memory state
    state.preMarket = {
      levelsMarked: false,
      previousSessions: '',
      structure: '',
      sessionEmotion: '',
    };
    state.scenarios = [];
    state.watching = [];
    state.surges = [];
    state.adaptations = [];
    state.session = {
      traderEnergy: '',
      marketEnergy: '',
      marketType: '',
      notes: '',
    };
    state.trades = [];

    location.reload();
  });
}

/* Global small-card body toggle safety */

function setupItemBodyToggle() {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-card')) {
      const card = e.target.closest('.item-card');
      card?.classList.toggle('open');
    }
  });
}

/* Init */

function init() {
  initAccordion();
  setupPreMarket();
  setupSessionModule();
  setupTrades();
  setupReset();
  setupItemBodyToggle();

  // Open all accordions by default for visibility
  document.querySelectorAll('[data-accordion]').forEach((acc) => acc.classList.add('open'));
}

document.addEventListener('DOMContentLoaded', init);
