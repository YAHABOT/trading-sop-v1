//
// MODULE 1 — PRE-MARKET
//

window.Module1 = (function () {

    function init() {
        console.log("Module 1 ready");

        // All M1 inputs auto-save
        const fields = document.querySelectorAll("#module1 [id]");

        fields.forEach(el => {
            el.addEventListener("input", () => {
                StorageManager.save(el.id, el.type === "checkbox" ? el.checked : el.value);
            });
        });
    }

    return { init };
})();
