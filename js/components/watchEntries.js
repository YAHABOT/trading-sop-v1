// components/watchEntries.js — Watching price entries component

export function renderWatchingEntries(container, state, onChange) {
  container.innerHTML = "";

  const addBtn = document.createElement("button");
  addBtn.textContent = "+ Add Watching Entry";
  addBtn.className = "btn-small primary";
  addBtn.style.float = "right";
  addBtn.onclick = () => {
    state.module2.watchingEntries.push({
      time: "",
      emotion: "",
      tags: "",
      notes: "",
      open: false
    });
    onChange(state);
    renderWatchingEntries(container, state, onChange);
  };

  container.appendChild(addBtn);

  state.module2.watchingEntries.forEach((entry, index) => {
    const card = document.createElement("div");
    card.className = "watch-card";

    // Header
    const header = document.createElement("div");
    header.className = "watch-header";
    header.textContent = entry.time ? `${entry.time} — Watching` : "Watching Entry";

    const controls = document.createElement("div");
    controls.className = "watch-controls";

    const expandBtn = document.createElement("button");
    expandBtn.textContent = entry.open ? "Collapse" : "Expand";
    expandBtn.className = "btn-xsmall secondary";
    expandBtn.onclick = () => {
      entry.open = !entry.open;
      onChange(state);
      renderWatchingEntries(container, state, onChange);
    };
    controls.appendChild(expandBtn);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "btn-xsmall danger";
    delBtn.onclick = () => {
      state.module2.watchingEntries.splice(index, 1);
      onChange(state);
      renderWatchingEntries(container, state, onChange);
    };
    controls.appendChild(delBtn);

    header.appendChild(controls);
    card.appendChild(header);

    // Body
    const body = document.createElement("div");
    body.className = "watch-body";
    if (!entry.open) body.style.display = "none";

    // Time
    const timeInput = document.createElement("input");
    timeInput.type = "text";
    timeInput.placeholder = "Time (e.g. 09:32)";
    timeInput.value = entry.time;
    timeInput.className = "input-field";
    timeInput.oninput = () => {
      entry.time = timeInput.value;
      onChange(state);
    };
    body.appendChild(timeInput);

    // Emotion
    const emotionSelect = document.createElement("select");
    emotionSelect.className = "input-field";
    emotionSelect.innerHTML = `
      <option value="">Emotion</option>
      <option value="calm">Calm</option>
      <option value="focused">Focused</option>
      <option value="hesitant">Hesitant</option>
      <option value="anxious">Anxious</option>
      <option value="impatient">Impatient</option>
      <option value="overconfident">Overconfident</option>
    `;
    emotionSelect.value = entry.emotion;
    emotionSelect.onchange = () => {
      entry.emotion = emotionSelect.value;
      onChange(state);
    };
    body.appendChild(emotionSelect);

    // Tags
    const tagInput = document.createElement("input");
    tagInput.type = "text";
    tagInput.placeholder = "Tags (comma separated)";
    tagInput.className = "input-field";
    tagInput.value = entry.tags;
    tagInput.oninput = () => {
      let v = tagInput.value.replace(/,\s*/g, ", ");
      entry.tags = v;
      tagInput.value = v;
      onChange(state);
    };
    body.appendChild(tagInput);

    // Notes
    const notesArea = document.createElement("textarea");
    notesArea.placeholder = "Notes";
    notesArea.className = "input-textarea";
    notesArea.value = entry.notes;
    notesArea.oninput = () => {
      entry.notes = notesArea.value;
      onChange(state);
    };
    body.appendChild(notesArea);

    card.appendChild(body);
    container.appendChild(card);
  });
}

