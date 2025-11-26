// main.js — Main entry point for Trading SOP Journal V1.1

import { loadState, saveState, resetState } from "./storage.js";
import { initAccordion } from "./ui-accordion.js";
import { initModule1 } from "./module1.js";
import { initModule2 } from "./module2.js";

let state = loadState();

document.addEventListener("DOMContentLoaded", () => {
  initAccordion(); // enable all accordions on page

  // Initialize module UIs
  initModule1(state, onStateChange);
  initModule2(state, onStateChange);

  // Reset Day button
  const resetBtn = document.getElementById("resetDayBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset Day (Module 1 + Module 2)?")) {
        state = resetState();

        initModule1(state, onStateChange);
        initModule2(state, onStateChange);
      }
    });
  }
});

function onStateChange(newState) {
  state = newState;
  saveState(newState);
}

