//
// GLOBAL STORAGE MANAGER
//

window.StorageManager = (function () {

    function save(id, value) {
        localStorage.setItem(id, value);
    }

    function load(id) {
        return localStorage.getItem(id) || "";
    }

    function loadAll() {
        document.querySelectorAll("[id]").forEach(el => {
            if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
                const saved = load(el.id);
                if (saved !== "") {
                    if (el.type === "checkbox") {
                        el.checked = saved === "true";
                    } else {
                        el.value = saved;
                    }
                }
            }
        });
    }

    return { save, load, loadAll };
})();
