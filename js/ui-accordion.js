// ui-accordion.js — handles all accordion open/close logic

export function initAccordion() {
  const triggers = document.querySelectorAll("[data-accordion]");

  triggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const panel = trigger.nextElementSibling;

      const isOpen = trigger.classList.contains("open");

      if (isOpen) {
        // closing
        trigger.classList.remove("open");
        panel.style.maxHeight = null;
      } else {
        // opening
        trigger.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
}

