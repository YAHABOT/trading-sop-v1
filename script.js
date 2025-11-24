diff --git a/script.js b/script.js
new file mode 100644
index 0000000000000000000000000000000000000000..fa1adbd8ddcd28bcde7bc00d152c24753e8f37d1
--- /dev/null
+++ b/script.js
@@ -0,0 +1,542 @@
+const storageKeys = {
+  preMarket: 'tsj_pre_market',
+  scenarios: 'tsj_scenarios',
+  watching: 'tsj_watching',
+  surges: 'tsj_surges',
+  adaptations: 'tsj_adaptations',
+  session: 'tsj_session_global',
+  trades: 'tsj_trades',
+};
+
+const state = {
+  preMarket: load(storageKeys.preMarket, {
+    levelsMarked: false,
+    previousSessions: '',
+    structure: '',
+    sessionEmotion: '',
+  }),
+  scenarios: load(storageKeys.scenarios, []),
+  watching: load(storageKeys.watching, []),
+  surges: load(storageKeys.surges, []),
+  adaptations: load(storageKeys.adaptations, []),
+  session: load(storageKeys.session, {
+    traderEnergy: '',
+    marketEnergy: '',
+    marketType: '',
+    notes: '',
+  }),
+  trades: load(storageKeys.trades, []),
+};
+
+function load(key, fallback) {
+  try {
+    const data = localStorage.getItem(key);
+    return data ? JSON.parse(data) : fallback;
+  } catch (err) {
+    console.warn('Load error', key, err);
+    return fallback;
+  }
+}
+
+function persist(key, value) {
+  localStorage.setItem(key, JSON.stringify(value));
+}
+
+function initAccordion() {
+  document.querySelectorAll('[data-accordion]').forEach((acc) => {
+    const trigger = acc.querySelector('[data-accordion-trigger]');
+    trigger?.addEventListener('click', () => {
+      acc.classList.toggle('open');
+    });
+  });
+}
+
+function renderScenarioOptions() {
+  const select = document.getElementById('trade-scenario-link');
+  select.innerHTML = '<option value="">Link to scenario</option>';
+  state.scenarios.forEach((s) => {
+    const opt = document.createElement('option');
+    opt.value = s.id;
+    opt.textContent = `${s.id} — ${s.title}`;
+    select.appendChild(opt);
+  });
+}
+
+function renderScenarios() {
+  const container = document.getElementById('scenario-list');
+  container.innerHTML = '';
+  state.scenarios.forEach((scenario) => {
+    const card = document.createElement('div');
+    card.className = 'item-card';
+    card.innerHTML = `
+      <div class="item-header">
+        <div class="item-title">
+          <span class="badge">${scenario.id}</span>
+          <strong>${scenario.title || 'Untitled'}</strong>
+        </div>
+        <div class="item-actions">
+          <button class="small-btn toggle-card">Toggle</button>
+          <button class="small-btn" data-delete-scenario="${scenario.id}">Delete</button>
+        </div>
+      </div>
+      <div class="item-body">
+        <p class="tagline"><strong>IF:</strong> ${scenario.if || '—'}</p>
+        <p class="tagline"><strong>THEN:</strong> ${scenario.then || '—'}</p>
+      </div>
+    `;
+    container.appendChild(card);
+    attachCardToggle(card);
+  });
+  renderScenarioOptions();
+}
+
+function renderWatching() {
+  const container = document.getElementById('watching-list');
+  container.innerHTML = '';
+  state.watching.forEach((entry) => {
+    const card = document.createElement('div');
+    card.className = 'item-card';
+    card.innerHTML = `
+      <div class="item-header">
+        <div class="item-title">
+          <span class="badge">${entry.time || '—'}</span>
+          <span>${entry.emotion || 'Watching'}</span>
+        </div>
+        <div class="item-actions">
+          <button class="small-btn toggle-card">Toggle</button>
+          <button class="small-btn" data-delete-watch="${entry.id}">Delete</button>
+        </div>
+      </div>
+      <div class="item-body">
+        <p>${entry.notes || 'No notes provided.'}</p>
+      </div>
+    `;
+    container.appendChild(card);
+    attachCardToggle(card);
+  });
+}
+
+function renderSurges() {
+  const container = document.getElementById('surge-list');
+  container.innerHTML = '';
+  state.surges.forEach((entry) => {
+    const card = document.createElement('div');
+    card.className = 'item-card';
+    card.innerHTML = `
+      <div class="item-header">
+        <div class="item-title">
+          <span class="badge">${entry.time || '—'}</span>
+          <span>${entry.emotion || 'Spike'}</span>
+        </div>
+        <div class="item-actions">
+          <button class="small-btn toggle-card">Toggle</button>
+          <button class="small-btn" data-delete-surge="${entry.id}">Delete</button>
+        </div>
+      </div>
+      <div class="item-body">
+        <p>${entry.notes || 'No notes provided.'}</p>
+      </div>
+    `;
+    container.appendChild(card);
+    attachCardToggle(card);
+  });
+}
+
+function renderAdaptations() {
+  const container = document.getElementById('adapt-list');
+  container.innerHTML = '';
+  state.adaptations.forEach((entry) => {
+    const card = document.createElement('div');
+    card.className = 'item-card';
+    card.innerHTML = `
+      <div class="item-header">
+        <div class="item-title">
+          <span class="badge">${entry.start || '—'} → ${entry.end || '—'}</span>
+          <span>Adaptation</span>
+        </div>
+        <div class="item-actions">
+          <button class="small-btn toggle-card">Toggle</button>
+          <button class="small-btn" data-delete-adapt="${entry.id}">Delete</button>
+        </div>
+      </div>
+      <div class="item-body">
+        <p>${entry.description || 'No description provided.'}</p>
+      </div>
+    `;
+    container.appendChild(card);
+    attachCardToggle(card);
+  });
+}
+
+function tradeTemplate(trade) {
+  const scenarioName = trade.signal.scenarioId
+    ? state.scenarios.find((s) => s.id === trade.signal.scenarioId)?.title || 'Linked scenario'
+    : 'No scenario link';
+
+  return `
+    <div class="item-card" data-trade="${trade.id}">
+      <div class="item-header">
+        <div class="item-title">
+          <span class="badge">${trade.id}</span>
+          <strong>${trade.title || 'Trade Idea'}</strong>
+        </div>
+        <div class="item-actions">
+          <button class="small-btn toggle-card">Toggle</button>
+          <button class="small-btn" data-delete-trade="${trade.id}">Delete</button>
+        </div>
+      </div>
+      <div class="item-body">
+        <div class="label-grid">
+          <div><strong>Pre-Trade Emotion:</strong> ${trade.pre.emotion || '—'}</div>
+          <div><strong>Tags:</strong> ${trade.pre.tags || '—'}</div>
+          <div><strong>Confluence:</strong> ${trade.pre.confluence || '—'}</div>
+        </div>
+        <p class="tagline"><strong>Pre-Trade Notes:</strong> ${trade.pre.notes || '—'}</p>
+        <hr />
+        <div class="label-grid">
+          <div><strong>Signal Time:</strong> ${trade.signal.time || '—'}</div>
+          <div><strong>Signal Emotion:</strong> ${trade.signal.emotion || '—'}</div>
+          <div><strong>Entry Models:</strong> ${trade.signal.entryModels || '—'}</div>
+          <div><strong>Signal Confluence:</strong> ${trade.signal.confluence || '—'}</div>
+          <div><strong>Scenario Link:</strong> ${trade.signal.scenarioId ? `${trade.signal.scenarioId} — ${scenarioName}` : 'None'}</div>
+        </div>
+        <p class="tagline"><strong>Signal Notes:</strong> ${trade.signal.notes || '—'}</p>
+        <hr />
+        <div class="form-row">
+          <button class="small-btn" data-mark-taken="${trade.id}">Mark as Trade Taken</button>
+          <button class="small-btn" data-mark-missed="${trade.id}">Mark as Trade Missed</button>
+          <span class="badge">Status: ${trade.decision.toUpperCase()}</span>
+        </div>
+        <div class="label-grid">
+          <label class="field">
+            <span>Entry price</span>
+            <input type="number" step="0.0001" data-entry-price="${trade.id}" value="${trade.taken.entryPrice || ''}" />
+          </label>
+          <label class="field">
+            <span>Stop loss</span>
+            <input type="number" step="0.0001" data-stop-loss="${trade.id}" value="${trade.taken.stopLoss || ''}" />
+          </label>
+          <label class="field">
+            <span>Expected RR</span>
+            <input type="text" data-expected-rr="${trade.id}" value="${trade.taken.expectedRR || ''}" />
+          </label>
+        </div>
+        <label class="field">
+          <span>Taken notes</span>
+          <textarea data-taken-notes="${trade.id}">${trade.taken.notes || ''}</textarea>
+        </label>
+        <hr />
+        <div class="label-grid">
+          <label class="field">
+            <span>Reason missed</span>
+            <input type="text" data-missed-reason="${trade.id}" value="${trade.missed.reason || ''}" />
+          </label>
+          <label class="field">
+            <span>Missed R value</span>
+            <input type="text" data-missed-r="${trade.id}" value="${trade.missed.rValue || ''}" />
+          </label>
+        </div>
+        <label class="field">
+          <span>Missed notes</span>
+          <textarea data-missed-notes="${trade.id}">${trade.missed.notes || ''}</textarea>
+        </label>
+      </div>
+    </div>
+  `;
+}
+
+function renderTrades() {
+  const container = document.getElementById('trade-list');
+  container.innerHTML = '';
+  state.trades.forEach((trade) => {
+    const wrapper = document.createElement('div');
+    wrapper.innerHTML = tradeTemplate(trade);
+    const card = wrapper.firstElementChild;
+    container.appendChild(card);
+    attachCardToggle(card);
+  });
+}
+
+function attachCardToggle(card) {
+  const header = card.querySelector('.item-header');
+  header?.addEventListener('click', (e) => {
+    if (e.target.closest('button')) return;
+    card.classList.toggle('open');
+  });
+  card.querySelector('.toggle-card')?.addEventListener('click', () => {
+    card.classList.toggle('open');
+  });
+}
+
+function setupPreMarket() {
+  document.getElementById('levels-marked').checked = state.preMarket.levelsMarked;
+  document.getElementById('previous-sessions').value = state.preMarket.previousSessions;
+  document.getElementById('structure').value = state.preMarket.structure;
+  document.getElementById('session-emotion').value = state.preMarket.sessionEmotion;
+
+  document.getElementById('levels-marked').addEventListener('change', (e) => {
+    state.preMarket.levelsMarked = e.target.checked;
+    persist(storageKeys.preMarket, state.preMarket);
+  });
+  ['previous-sessions', 'structure', 'session-emotion'].forEach((id) => {
+    document.getElementById(id).addEventListener('input', (e) => {
+      const map = {
+        'previous-sessions': 'previousSessions',
+        structure: 'structure',
+        'session-emotion': 'sessionEmotion',
+      };
+      state.preMarket[map[id]] = e.target.value;
+      persist(storageKeys.preMarket, state.preMarket);
+    });
+  });
+
+  document.getElementById('add-scenario').addEventListener('click', () => {
+    const title = document.getElementById('scenario-title').value.trim();
+    const ifText = document.getElementById('scenario-if').value.trim();
+    const thenText = document.getElementById('scenario-then').value.trim();
+    if (!title && !ifText && !thenText) return;
+    const nextId = `S${state.scenarios.length + 1}`;
+    state.scenarios.push({ id: nextId, title, if: ifText, then: thenText });
+    persist(storageKeys.scenarios, state.scenarios);
+    document.getElementById('scenario-title').value = '';
+    document.getElementById('scenario-if').value = '';
+    document.getElementById('scenario-then').value = '';
+    renderScenarios();
+  });
+
+  document.getElementById('scenario-list').addEventListener('click', (e) => {
+    const delId = e.target.getAttribute('data-delete-scenario');
+    if (delId) {
+      state.scenarios = state.scenarios.filter((s) => s.id !== delId);
+      persist(storageKeys.scenarios, state.scenarios);
+      renderScenarios();
+    }
+  });
+
+  renderScenarios();
+}
+
+function setupSessionModule() {
+  document.getElementById('trader-energy').value = state.session.traderEnergy;
+  document.getElementById('market-energy').value = state.session.marketEnergy;
+  document.getElementById('market-type').value = state.session.marketType;
+  document.getElementById('session-notes').value = state.session.notes;
+
+  ['trader-energy', 'market-energy', 'market-type', 'session-notes'].forEach((id) => {
+    document.getElementById(id).addEventListener('input', (e) => {
+      const map = {
+        'trader-energy': 'traderEnergy',
+        'market-energy': 'marketEnergy',
+        'market-type': 'marketType',
+        'session-notes': 'notes',
+      };
+      state.session[map[id]] = e.target.value;
+      persist(storageKeys.session, state.session);
+    });
+  });
+
+  document.getElementById('add-watching').addEventListener('click', () => {
+    const time = document.getElementById('watch-time').value;
+    const emotion = document.getElementById('watch-emotion').value.trim();
+    const notes = document.getElementById('watch-notes').value.trim();
+    if (!time && !emotion && !notes) return;
+    state.watching.push({ id: crypto.randomUUID(), time, emotion, notes });
+    persist(storageKeys.watching, state.watching);
+    document.getElementById('watch-time').value = '';
+    document.getElementById('watch-emotion').value = '';
+    document.getElementById('watch-notes').value = '';
+    renderWatching();
+  });
+
+  document.getElementById('watching-list').addEventListener('click', (e) => {
+    const delId = e.target.getAttribute('data-delete-watch');
+    if (delId) {
+      state.watching = state.watching.filter((w) => w.id !== delId);
+      persist(storageKeys.watching, state.watching);
+      renderWatching();
+    }
+  });
+
+  document.getElementById('add-surge').addEventListener('click', () => {
+    const time = document.getElementById('surge-time').value;
+    const emotion = document.getElementById('surge-emotion').value.trim();
+    const notes = document.getElementById('surge-notes').value.trim();
+    if (!time && !emotion && !notes) return;
+    state.surges.push({ id: crypto.randomUUID(), time, emotion, notes });
+    persist(storageKeys.surges, state.surges);
+    document.getElementById('surge-time').value = '';
+    document.getElementById('surge-emotion').value = '';
+    document.getElementById('surge-notes').value = '';
+    renderSurges();
+  });
+
+  document.getElementById('surge-list').addEventListener('click', (e) => {
+    const delId = e.target.getAttribute('data-delete-surge');
+    if (delId) {
+      state.surges = state.surges.filter((s) => s.id !== delId);
+      persist(storageKeys.surges, state.surges);
+      renderSurges();
+    }
+  });
+
+  document.getElementById('add-adaptation').addEventListener('click', () => {
+    const start = document.getElementById('adapt-start').value;
+    const end = document.getElementById('adapt-end').value;
+    const description = document.getElementById('adapt-description').value.trim();
+    if (!start && !end && !description) return;
+    state.adaptations.push({ id: crypto.randomUUID(), start, end, description });
+    persist(storageKeys.adaptations, state.adaptations);
+    document.getElementById('adapt-start').value = '';
+    document.getElementById('adapt-end').value = '';
+    document.getElementById('adapt-description').value = '';
+    renderAdaptations();
+  });
+
+  document.getElementById('adapt-list').addEventListener('click', (e) => {
+    const delId = e.target.getAttribute('data-delete-adapt');
+    if (delId) {
+      state.adaptations = state.adaptations.filter((a) => a.id !== delId);
+      persist(storageKeys.adaptations, state.adaptations);
+      renderAdaptations();
+    }
+  });
+
+  renderWatching();
+  renderSurges();
+  renderAdaptations();
+}
+
+function setupTrades() {
+  renderTrades();
+
+  document.getElementById('add-trade').addEventListener('click', () => {
+    const title = document.getElementById('trade-title').value.trim();
+    const preEmotion = document.getElementById('trade-pre-emotion').value.trim();
+    const tags = document.getElementById('trade-tags').value.trim();
+    const confluence = document.getElementById('trade-confluence').value.trim();
+    const preNotes = document.getElementById('trade-pre-notes').value.trim();
+    const signalTime = document.getElementById('trade-signal-time').value;
+    const signalEmotion = document.getElementById('trade-signal-emotion').value.trim();
+    const entryModels = document.getElementById('trade-entry-models').value.trim();
+    const signalConfluence = document.getElementById('trade-signal-confluence').value.trim();
+    const scenarioLink = document.getElementById('trade-scenario-link').value;
+    const signalNotes = document.getElementById('trade-signal-notes').value.trim();
+
+    if (!title && !preEmotion && !tags && !signalTime && !entryModels && !signalNotes) return;
+
+    const nextId = `T${state.trades.length + 1}`;
+    state.trades.push({
+      id: nextId,
+      title,
+      pre: {
+        emotion: preEmotion,
+        tags,
+        confluence,
+        notes: preNotes,
+      },
+      signal: {
+        time: signalTime,
+        emotion: signalEmotion,
+        entryModels,
+        confluence: signalConfluence,
+        scenarioId: scenarioLink,
+        notes: signalNotes,
+      },
+      decision: 'none',
+      taken: { entryPrice: '', stopLoss: '', expectedRR: '', notes: '' },
+      missed: { reason: '', rValue: '', notes: '' },
+    });
+    persist(storageKeys.trades, state.trades);
+    clearTradeForm();
+    renderTrades();
+  });
+
+  document.getElementById('trade-list').addEventListener('click', (e) => {
+    const delId = e.target.getAttribute('data-delete-trade');
+    if (delId) {
+      state.trades = state.trades.filter((t) => t.id !== delId);
+      persist(storageKeys.trades, state.trades);
+      renderTrades();
+      return;
+    }
+
+    const markTaken = e.target.getAttribute('data-mark-taken');
+    const markMissed = e.target.getAttribute('data-mark-missed');
+
+    if (markTaken) {
+      updateTradeDecision(markTaken, 'taken');
+    } else if (markMissed) {
+      updateTradeDecision(markMissed, 'missed');
+    }
+  });
+}
+
+function updateTradeDecision(tradeId, decision) {
+  const trade = state.trades.find((t) => t.id === tradeId);
+  if (!trade) return;
+
+  const entryPrice = document.querySelector(`[data-entry-price="${tradeId}"]`)?.value || '';
+  const stopLoss = document.querySelector(`[data-stop-loss="${tradeId}"]`)?.value || '';
+  const expectedRR = document.querySelector(`[data-expected-rr="${tradeId}"]`)?.value || '';
+  const takenNotes = document.querySelector(`[data-taken-notes="${tradeId}"]`)?.value || '';
+  const missedReason = document.querySelector(`[data-missed-reason="${tradeId}"]`)?.value || '';
+  const missedR = document.querySelector(`[data-missed-r="${tradeId}"]`)?.value || '';
+  const missedNotes = document.querySelector(`[data-missed-notes="${tradeId}"]`)?.value || '';
+
+  trade.decision = decision;
+  trade.taken = { entryPrice, stopLoss, expectedRR, notes: takenNotes };
+  trade.missed = { reason: missedReason, rValue: missedR, notes: missedNotes };
+
+  persist(storageKeys.trades, state.trades);
+  renderTrades();
+}
+
+function clearTradeForm() {
+  [
+    'trade-title',
+    'trade-pre-emotion',
+    'trade-tags',
+    'trade-confluence',
+    'trade-pre-notes',
+    'trade-signal-time',
+    'trade-signal-emotion',
+    'trade-entry-models',
+    'trade-signal-confluence',
+    'trade-signal-notes',
+  ].forEach((id) => (document.getElementById(id).value = ''));
+  document.getElementById('trade-scenario-link').value = '';
+}
+
+function setupReset() {
+  document.getElementById('reset-day').addEventListener('click', () => {
+    Object.values(storageKeys).forEach((key) => localStorage.removeItem(key));
+    Object.keys(state).forEach((key) => {
+      if (Array.isArray(state[key])) state[key] = [];
+    });
+    state.preMarket = { levelsMarked: false, previousSessions: '', structure: '', sessionEmotion: '' };
+    state.session = { traderEnergy: '', marketEnergy: '', marketType: '', notes: '' };
+    location.reload();
+  });
+}
+
+function setupItemBodyToggle() {
+  document.addEventListener('click', (e) => {
+    if (e.target.classList.contains('toggle-card')) {
+      const card = e.target.closest('.item-card');
+      card?.classList.toggle('open');
+    }
+  });
+}
+
+function init() {
+  initAccordion();
+  setupPreMarket();
+  setupSessionModule();
+  setupTrades();
+  setupReset();
+  setupItemBodyToggle();
+  // open all accordions by default for visibility
+  document.querySelectorAll('[data-accordion]').forEach((acc) => acc.classList.add('open'));
+}
+
+document.addEventListener('DOMContentLoaded', init);
