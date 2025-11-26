// components/scenarios.js — Scenario Engine for Module 1 (V1.1)

export function renderScenarios(container, state, onChange) {
  container.innerHTML = "";

  const addBtn = document.createElement("button");
  addBtn.textContent = "+ Add Scenario";
  addBtn.className = "btn-small primary";
  addBtn.style.float = "right";
  addBtn.onclick = () => {
    const newScenario = {
      id: "S" + (state.module1.scenarios.length + 1),
      title: "",
      ifBlock: "",
      thenBlock: "",
      open: false
    };
    state.module1.scenarios.push(newScenario);
    onChange(state);
    renderScenarios(container, state, onChange);
  };

  container.appendChild(addBtn);

  // Scenario list
  state.module1.scenarios.forEach((sc, index) => {
    const wrap = document.createElement("div");
    wrap.className = "scenario-card";

    // Header
    const header = document.createElement("div");
    header.className = "scenario-header";
    header.textContent = sc.id + (sc.title ? " — " + sc.title : " (no title)");
    wrap.appendChild(header);

    const controls = document.createElement("div");
    controls.className = "scenario-controls";

    const expandBtn = document.createElement("button");
    expandBtn.textContent = sc.open ? "Collapse" : "Expand";
    expandBtn.className = "btn-xsmall secondary";
    expandBtn.onclick = () => {
      sc.open = !sc.open;
      onChange(state);
      renderScenarios(container, state, onChange);
    };
    controls.appendChild(expandBtn);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "btn-xsmall danger";
    delBtn.onclick = () => {
      state.module1.scenarios.splice(index, 1);
      renumberScenarios(state.module1.scenarios);
      onChange(state);
      renderScenarios(container, state, onChange);
    };
    controls.appendChild(delBtn);

    header.appendChild(controls);

    // Body
    const body = document.createElement("div");
    body.className = "scenario-body";
    if (!sc.open) body.style.display = "none";

    // Title
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Scenario title…";
    titleInput.value = sc.title;
    titleInput.className = "input-field";

    titleInput.oninput = () => {
      sc.title = titleInput.value;
      onChange(state);
    };
    body.appendChild(titleInput);

    // IF
    const ifLabel = document.createElement("div");
    ifLabel.className = "scenario-subtitle";
    ifLabel.textContent = "IF:";
    body.appendChild(ifLabel);

    const ifArea = document.createElement("textarea");
    ifArea.placeholder = "Condition (price behavior, level interaction, time window, etc.)";
    ifArea.value = sc.ifBlock;
    ifArea.className = "input-textarea";

    ifArea.oninput = () => {
      sc.ifBlock = ifArea.value;
      onChange(state);
    };
    body.appendChild(ifArea);

    // THEN
    const thenLabel = document.createElement("div");
    thenLabel.className = "scenario-subtitle";
    thenLabel.textContent = "THEN:";
    body.appendChild(thenLabel);

    const thenArea = document.createElement("textarea");
    thenArea.placeholder = "Execution expectation (direction, entry model, TP/SL behavior, etc.)";
    thenArea.value = sc.thenBlock;
    thenArea.className = "input-textarea";

    thenArea.oninput = () => {
      sc.thenBlock = thenArea.value;
      onChange(state);
    };
    body.appendChild(thenArea);

    wrap.appendChild(body);
    container.appendChild(wrap);
  });
}

// Helper: renumber IDs so they stay S1, S2, S3…
function renumberScenarios(list) {
  list.forEach((s, i) => {
    s.id = "S" + (i + 1);
  });
}
