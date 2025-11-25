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
