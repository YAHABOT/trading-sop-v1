//
// ACCORDION UI HANDLER (GLOBAL VERSION)
//

window.UIAccordion = (function () {
    function init() {
        console.log("UIAccordion loaded");

        const headers = document.querySelectorAll("[data-accordion]");

        headers.forEach(header => {
            header.addEventListener("click", () => {
                const section = header.parentElement;
                section.classList.toggle("open");
            });
        });
    }

    return { init };
})();
