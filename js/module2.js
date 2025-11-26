// module2.js — Module 2 (During Session)

import { renderWatchingEntries } from "./components/watchEntries.js";
import { renderSurges } from "./components/surges.js";
import { renderAdaptations } from "./components/adaptations.js";

export function initModule2(state, onChange) {
  const root = document.getElementById("module2");
  if (!root) return;

  setupSectionAccordions(root);

  // Watching Entries
  const watchContainer = document.getElementById("m2-watching-container");
  if (watchContainer) {
    renderWatchingEntries(watchContainer, state, onChange);
  }

  // Emotional Surges
  const surgeContainer = document.getElementById("m2-surges-container");
  if (surgeContainer) {
    renderSurges(surgeContainer, state, onChange);
  }

  // Adaptation Windows
  const adaptContainer = document.getElementById("m2-adapt-container");
  if (adaptContainer) {
    renderAdaptations(adaptContainer, state, onChange);
  }

  // Session Energy & Market Behavior
  bindInput("m2-session-notes", state.module2.sessionEnergy, "notes", onChange, state);
  bindInput("m2-trader-energy", state.module2.sessionEnergy, "trader", onChange, state);
  bindInput("m2-market-energy", state.module2.sessionEnergy, "market", onChange, state);
  bindSelect("m2-market-type", state.module2.sessionEnergy, "type", onChange, state);
}

// Helpers
function setupSectionAccordions(root) {
  const sections = root.querySelectorAll(".m2-section");
  sections.forEach(sec => {
    const header = sec.querySelector(".m2-section-header");
    const body = sec.querySelector(".m2-section-body");
    if (!header || !body) return;

    header.onclick = () => {
      const isOpen = header.classList.contains("open");
      if (isOpen) {
        header.classList.remove("open");
        body.style.maxHeight = null;
      } else {
        header.classList.add("open");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    };
  });
}

function bindInput(id, obj, field, onChange, state) {
  const el = document.getElementById(id);
  if (!el) return;
  el.value = obj[field] || "";
  el.oninput = () => {
    obj[field] = el.value;
    onChange(state);
  };
}

function bindSelect(id, obj, field, onChange, state) {
  const el = document.getElementById(id);
  if (!el) return;
  el.value = obj[field] || "";
  el.onchange = () => {
    obj[field] = el.value;
    onChange(state);
  };
}

