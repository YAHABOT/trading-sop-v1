// storage.js — Centralized state management for Trading SOP Journal V1.1

const STORAGE_KEY = "trading_sop_v1_state";

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getEmptyState();
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load state:", e);
    return getEmptyState();
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save state:", e);
  }
}

export function resetState() {
  const empty = getEmptyState();
  saveState(empty);
  return empty;
}

export function getEmptyState() {
  return {
    module1: {
      levelsMarked: {
        checked: false,
        observation: "",
        tags: ""
      },
      newsChecked: {
        checked: false,
        observation: "",
        tags: ""
      },
      htfCheck: {
        checked: false,
        observation: "",
        tags: ""
      },
      ltfAlignment: {
        yesno: "",
        observation: "",
        tags: ""
      },
      nyImpulse: "",
      emotionComingIn: "",
      scenarios: [] // handled by components/scenarios.js
    },

    module2: {
      watchingEntries: [],
      emotionalSurges: [],
      adaptations: [],
      sessionEnergy: {
        trader: "",
        market: "",
        type: "",
        notes: ""
      }
    },

    module3: {}, // filled later
    module4: {}  // filled later
  };
}
