// module1.js — Module 1 (Pre-Market) logic + nested accordions

import { renderScenarios } from "./components/scenarios.js";

export function initModule1(state, onChange) {
  const root = document.getElementById("module1");
  if (!root) return;

  // Refresh UI
  renderSectionAccordions(root);

  // Levels Marked
  bindCheckbox("m1-levels-checked", state.module1.levelsMarked, "checked", onChange, state);
  bindInput("m1-levels-observation", state.module1.levelsMarked, "observation", onChange, state);
  bindTags("m1-levels-tags", state.module1.levelsMarked, "tags", onChange, state);

  // News
  bindCheckbox("m1-news-checked", state.module1.newsChecked, "checked", onChange, state);
  bindInput("m1-news-observation", state.module1.newsChecked, "observation", onChange, state);
  bindTags("m1-news-tags", state.module1.newsChecked, "tags", onChange, state);

  // HTF
  bindCheckbox("m1-htf-checked", state.module1.htfCheck, "checked", onChange, state);
  bindInput("m1-htf-observation", state.module1.htfCheck, "observation", onChange, state);
  bindTags("m1-htf-tags", state.module1.htfCheck, "tags", onChange, state);

  // LTF
  bindSelect("m1-ltf-select", state.module1.ltfAlignment, "yesno", onChange, state);
  bindInput("m1-ltf-observation", state.module1.ltfAlignment, "observation", onChange, state);
  bindTags("m1-ltf-tags", state.module1.ltfAlignment, "tags", onChange, state);

  // NY Impulse
  bindInput("m1-ny-impulse", state.module1, "nyImpulse", onChange, state);

  // Emotion Coming Into Session
  bindSelect("m1-emotion-coming-in", state.module1, "emotionComingIn", onChange, state);

  // Scenarios
  const scenContainer = document.getElementById("m1-scenarios-container");
  if (scenContainer) {
    renderScenarios(scenContainer, state, onChange);
  }
}

// Convert all sections into accordions
function renderSectionAccordions(root) {
  const sections = root.querySelectorAll(".m1-section");

  sections.forEach(sec => {
    const trigger = sec.querySelector(".m1-section-header");
    const body = sec.querySelector(".m1-section-body");

    if (!trigger || !body) return;

    trigger.onclick = () => {
      const isOpen = trigger.classList.contains("open");
      if (isOpen) {
        trigger.classList.remove("open");
        body.style.maxHeight = null;
      } else {
        trigger.classList.add("open");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    };
  });
}

// Helpers
function bindInput(id, obj, field, onChange, state) {
  const el = document.getElementById(id);
  if (!el) return;
  el.value = obj[field] || "";
  el.oninput = () => {
    obj[field] = el.value;
    onChange(state);
  };
}

function bindTags(id, obj, field, onChange, state) {
  const el = document.getElementById(id);
  if (!el) return;

  el.value = obj[field] || "";
  el.oninput = () => {
    let v = el.value.replace(/,\s*/g, ", ");
    obj[field] = v;
    el.value = v;
    onChange(state);
  };
}

function bindCheckbox(id, obj, field, onChange, state) {
  const el = document.getElementById(id);
  if (!el) return;
  el.checked = obj[field] || false;
  el.onchange = () => {
    obj[field] = el.checked;
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

