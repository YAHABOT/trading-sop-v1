// ===========================
// GLOBAL LOAD ON START
// ===========================
window.onload = function () {
    loadModule1();
    loadScenarios();
};

// ===========================
// MODULE 1 — SAVE FUNCTION
// ===========================
function saveModule1() {
    const data = {
        levelsMarked: {
            checked: document.getElementById("levelsMarkedCheckbox").checked,
            obs: document.getElementById("levelsMarkedObservation").value,
            tags: document.getElementById("levelsMarkedTags").value
        },
        newsChecked: {
            checked: document.getElementById("newsCheckedCheckbox").checked,
            obs: document.getElementById("newsCheckedObservation").value,
            tags: document.getElementById("newsCheckedTags").value
        },
        htfCheck: {
            checked: document.getElementById("htfCheckedCheckbox").checked,
            obs: document.getElementById("htfObservation").value,
            tags: document.getElementById("htfTags").value
        },
        ltfAlignment: {
            state: document.getElementById("ltfAlignment").value,
            obs: document.getElementById("ltfObservation").value,
            tags: document.getElementById("ltfTags").value
        },
        nyImpulse: document.getElementById("nyImpulse").value,

        emotionBaseline: {
            emotion: document.getElementById("emotionBaseline").value,
            notes: document.getElementById("emotionBaselineNotes").value
        }
    };

    localStorage.setItem("module1", JSON.stringify(data));
}

// ===========================
// MODULE 1 — LOAD FUNCTION
// ===========================
function loadModule1() {
    const data = JSON.parse(localStorage.getItem("module1"));
    if (!data) return;

    document.getElementById("levelsMarkedCheckbox").checked = data.levelsMarked.checked;
    document.getElementById("levelsMarkedObservation").value = data.levelsMarked.obs;
    document.getElementById("levelsMarkedTags").value = data.levelsMarked.tags;

    document.getElementById("newsCheckedCheckbox").checked = data.newsChecked.checked;
    document.getElementById("newsCheckedObservation").value = data.newsChecked.obs;
    document.getElementById("newsCheckedTags").value = data.newsChecked.tags;

    document.getElementById("htfCheckedCheckbox").checked = data.htfCheck.checked;
    document.getElementById("htfObservation").value = data.htfCheck.obs;
    document.getElementById("htfTags").value = data.htfCheck.tags;

    document.getElementById("ltfAlignment").value = data.ltfAlignment.state;
    document.getElementById("ltfObservation").value = data.ltfAlignment.obs;
    document.getElementById("ltfTags").value = data.ltfAlignment.tags;

    document.getElementById("nyImpulse").value = data.nyImpulse;

    document.getElementById("emotionBaseline").value = data.emotionBaseline.emotion;
    document.getElementById("emotionBaselineNotes").value = data.emotionBaseline.notes;
}

// ===========================
// MODULE 1 — CLEAR UI
// ===========================
function clearModule1UI() {
    document.getElementById("levelsMarkedCheckbox").checked = false;
    document.getElementById("levelsMarkedObservation").value = "";
    document.getElementById("levelsMarkedTags").value = "";

    document.getElementById("newsCheckedCheckbox").checked = false;
    document.getElementById("newsCheckedObservation").value = "";
    document.getElementById("newsCheckedTags").value = "";

    document.getElementById("htfCheckedCheckbox").checked = false;
    document.getElementById("htfObservation").value = "";
    document.getElementById("htfTags").value = "";

    document.getElementById("ltfAlignment").value = "";
    document.getElementById("ltfObservation").value = "";
    document.getElementById("ltfTags").value = "";

    document.getElementById("nyImpulse").value = "";

    document.getElementById("emotionBaseline").value = "";
    document.getElementById("emotionBaselineNotes").value = "";
}

// ===========================
// RESET DAY
// ===========================
function resetDay() {
    localStorage.removeItem("module1");
    localStorage.removeItem("scenarios");

    clearModule1UI();
    renderScenarioList();
}

// ===========================
// IF–THEN SCENARIO ENGINE (existing logic preserved)
// ===========================
function getAllScenarios() {
    return JSON.parse(localStorage.getItem("scenarios")) || [];
}

function saveScenarios(scenarios) {
    localStorage.setItem("scenarios", JSON.stringify(scenarios));
}

function addScenario() {
    const scenarios = getAllScenarios();
    const newScenario = {
        id: "S" + (scenarios.length + 1),
        title: "",
        ifBlock: "",
        thenBlock: ""
    };
    scenarios.push(newScenario);
    saveScenarios(scenarios);
    renderScenarioList();
}

function deleteScenario(id) {
    let scenarios = getAllScenarios();
    scenarios = scenarios.filter(s => s.id !== id);
    saveScenarios(scenarios);
    renderScenarioList();
}

function updateScenarioField(id, field, value) {
    const scenarios = getAllScenarios();
    const scenario = scenarios.find(s => s.id === id);
    if (!scenario) return;
    scenario[field] = value;
    saveScenarios(scenarios);
}

function renderScenarioList() {
    const container = document.getElementById("scenarioList");
    const scenarios = getAllScenarios();

    container.innerHTML = "";

    scenarios.forEach(s => {
        const div = document.createElement("div");
        div.className = "scenario-card";

        div.innerHTML = `
            <input 
                type="text" 
                placeholder="Scenario Title" 
                value="${s.title}" 
                onchange="updateScenarioField('${s.id}', 'title', this.value)"
            />

            <textarea 
                placeholder="IF..." 
                onchange="updateScenarioField('${s.id}', 'ifBlock', this.value)"
            >${s.ifBlock}</textarea>

            <textarea 
                placeholder="THEN..." 
                onchange="updateScenarioField('${s.id}', 'thenBlock', this.value)"
            >${s.thenBlock}</textarea>

            <button onclick="deleteScenario('${s.id}')">Delete</button>
        `;

        container.appendChild(div);
    });
}

function loadScenarios() {
    renderScenarioList();
}

// ===========================
// AUTO-SAVE MODULE 1 LISTENERS
// ===========================
document.addEventListener("input", function () {
    saveModule1();
});
