//
// MAIN INITIALIZER — GLOBAL NAMESPACE VERSION
// This replaces all ES module imports and
// makes the app fully compatible with GitHub Pages.
//

window.App = {
    init() {
        console.log("🔥 Trading SOP Journal — Global Init Running");

        // Accordion UI
        if (window.UIAccordion && typeof UIAccordion.init === "function") {
            UIAccordion.init();
        }

        // Storage system
        if (window.StorageManager && typeof StorageManager.loadAll === "function") {
            StorageManager.loadAll();
        }

        // Modules (M1–M4)
        if (window.Module1 && typeof Module1.init === "function") Module1.init();
        if (window.Module2 && typeof Module2.init === "function") Module2.init();
        if (window.Module3 && typeof Module3.init === "function") Module3.init();
        if (window.Module4 && typeof Module4.init === "function") Module4.init();

        // Components
        if (window.ScenarioEngine && typeof ScenarioEngine.init === "function")
            ScenarioEngine.init();

        if (window.SurgeWatcher && typeof SurgeWatcher.init === "function")
            SurgeWatcher.init();

        if (window.AdaptationEngine && typeof AdaptationEngine.init === "function")
            AdaptationEngine.init();

        if (window.WatchEntries && typeof WatchEntries.init === "function")
            WatchEntries.init();

        console.log("🔥 ALL SYSTEMS LOADED SUCCESSFULLY");
    }
};

window.addEventListener("DOMContentLoaded", () => {
    window.App.init();
});
