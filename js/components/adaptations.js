// components/adaptations.js — Adaptation Windows (V1.1 corrected)

export function renderAdaptations(container, state, onChange) {
  container.innerHTML = "";

  const addBtn = document.createElement("button");
  addBtn.textContent = "+ Add Adaptation";
  addBtn.className = "btn-small purple";
  addBtn.style.float = "right";
  addBtn.onclick = () => {
    state.module2.adaptations.push({
      startTime: "",
      whatChanged: "",
      notes: "",
      response: "",
      open: false
    });
    onChange(state);
    renderAdaptations(container, state, onChange);
  };

  container.appendChild(addBtn);

  state.module2.adaptations.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "adapt-card";

    // Header
    const header = document.createElement("div");
    header.className = "adapt-header";
    header.textContent = item.startTime
      ? `${item.startTime} — Adaptation`
      : "Adaptation Window";

    const controls = document.createElement("div");
    controls.className = "adapt-controls";

    const expandBtn = document.createElement("button");
    expandBtn.textContent = item.open ? "Collapse" : "Expand";
    expandBtn.className = "btn-xsmall secondary";
    expandBtn.onclick = () => {
      item.open = !item.open;
      onChange(state);
      renderAdaptations(container, state, onChange);
    };
    controls.appendChild(expandBtn);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "btn-xsmall danger";
    delBtn.onclick = () => {
      state.module2.adaptations.splice(index, 1);
      onChange(state);
      renderAdaptations(container, state, onChange);
    };
    controls.appendChild(delBtn);

    header.appendChild(controls);
    card.appendChild(header);

    // Body
    const body = document.createElement("div");
    body.className = "adapt-body";
    if (!item.open) body.style.display = "none";

    // Start time
    const timeInput = document.createElement("input");
    timeInput.type = "text";
    timeInput.placeholder = "Start Time (e.g. 10:05)";
    timeInput.className = "input-field";
    timeInput.value = item.startTime;
    timeInput.oninput = () => {
      item.startTime = timeInput.value;
      onChange(state);
    };
    body.appendChild(timeInput);

    // What changed
    const changeInput = document.createElement("input");
    changeInput.type = "text";
    changeInput.placeholder = "What changed? (tags)";
    changeInput.className = "input-field";
    changeInput.value = item.whatChanged;
    changeInput.oninput = () => {
      let v = changeInput.value.replace(/,\s*/g, ", ");
      item.whatChanged = v;
      changeInput.value = v;
      onChange(state);
    };
    body.appendChild(changeInput);

    // Notes
    const notesArea = document.createElement("textarea");
    notesArea.placeholder = "Market behavior notes…";
    notesArea.className = "input-textarea";
    notesArea.value = item.notes;
    notesArea.oninput = () => {
      item.notes = notesArea.value;
      onChange(state);
    };
    body.appendChild(notesArea);

    // Response
    const respArea = document.createElement("textarea");
    respArea.placeholder = "Your adaptation response…";
    respArea.className = "input-textarea";
    respArea.value = item.response;
    respArea.oninput = () => {
      item.response = respArea.value;
      onChange(state);
    };
    body.appendChild(respArea);

    card.appendChild(body);
    container.appendChild(card);
  });
}

