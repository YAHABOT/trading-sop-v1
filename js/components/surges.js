// components/surges.js — Emotional Surges

export function renderSurges(container, state, onChange) {
  container.innerHTML = "";

  const addBtn = document.createElement("button");
  addBtn.textContent = "+ Add Surge";
  addBtn.className = "btn-small orange";
  addBtn.style.float = "right";
  addBtn.onclick = () => {
    state.module2.emotionalSurges.push({
      time: "",
      type: "",
      trigger: "",
      notes: "",
      open: false
    });
    onChange(state);
    renderSurges(container, state, onChange);
  };

  container.appendChild(addBtn);

  state.module2.emotionalSurges.forEach((entry, index) => {
    const card = document.createElement("div");
    card.className = "surge-card";

    // Header
    const header = document.createElement("div");
    header.className = "surge-header";
    header.textContent = entry.time ? `${entry.time} — Surge` : "Surge";

    const controls = document.createElement("div");
    controls.className = "surge-controls";

    const expandBtn = document.createElement("button");
    expandBtn.textContent = entry.open ? "Collapse" : "Expand";
    expandBtn.className = "btn-xsmall secondary";
    expandBtn.onclick = () => {
      entry.open = !entry.open;
      onChange(state);
      renderSurges(container, state, onChange);
    };
    controls.appendChild(expandBtn);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "btn-xsmall danger";
    delBtn.onclick = () => {
      state.module2.emotionalSurges.splice(index, 1);
      onChange(state);
      renderSurges(container, state, onChange);
    };
    controls.appendChild(delBtn);

    header.appendChild(controls);
    card.appendChild(header);

    // Body
    const body = document.createElement("div");
    body.className = "surge-body";
    if (!entry.open) body.style.display = "none";

    // Time
    const timeInput = document.createElement("input");
    timeInput.type = "text";
    timeInput.placeholder = "Time (e.g. 09:45)";
    timeInput.className = "input-field";
    timeInput.value = entry.time;
    timeInput.oninput = () => {
      entry.time = timeInput.value;
      onChang

