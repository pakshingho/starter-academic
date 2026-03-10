document.addEventListener("DOMContentLoaded", function () {
  var docsContainer = document.querySelector(".container-fluid.docs");
  var sidebar = docsContainer && docsContainer.querySelector(".docs-sidebar");
  if (!docsContainer || !sidebar) {
    return;
  }

  var storageKey = "docsSidebarCollapsed";
  var desktopMedia = window.matchMedia("(min-width: 768px)");
  var collapsedPreference = false;

  try {
    collapsedPreference = window.localStorage.getItem(storageKey) === "true";
  } catch (error) {
    collapsedPreference = false;
  }

  var button = document.createElement("button");
  button.id = "docs-sidebar-toggle";
  button.className = "docs-sidebar-toggle";
  button.type = "button";
  document.body.appendChild(button);

  function persistPreference() {
    try {
      window.localStorage.setItem(storageKey, collapsedPreference ? "true" : "false");
    } catch (error) {
      /* Ignore storage write failures. */
    }
  }

  function updateButtonText(isCollapsed) {
    button.innerHTML = isCollapsed ? "<span aria-hidden=\"true\">›</span>" : "<span aria-hidden=\"true\">‹</span>";
    button.setAttribute("aria-label", isCollapsed ? "Show sidebar" : "Hide sidebar");
    button.setAttribute("title", isCollapsed ? "Show sidebar" : "Hide sidebar");
  }

  function updateButtonPosition(isCollapsed) {
    if (!desktopMedia.matches) {
      button.classList.remove("is-visible");
      button.style.left = "";
      return;
    }

    button.classList.add("is-visible");

    if (isCollapsed) {
      button.style.left = "1rem";
      return;
    }

    var rect = sidebar.getBoundingClientRect();
    var left = Math.max(16, rect.right - button.offsetWidth / 2);
    button.style.left = left + "px";
  }

  function applyState() {
    var shouldCollapse = desktopMedia.matches && collapsedPreference;
    document.body.classList.toggle("docs-sidebar-collapsed", shouldCollapse);
    button.classList.toggle("is-collapsed", shouldCollapse);
    updateButtonText(shouldCollapse);
    updateButtonPosition(shouldCollapse);
  }

  button.addEventListener("click", function () {
    collapsedPreference = !collapsedPreference;
    persistPreference();
    applyState();
  });

  if (typeof desktopMedia.addEventListener === "function") {
    desktopMedia.addEventListener("change", applyState);
  } else if (typeof desktopMedia.addListener === "function") {
    desktopMedia.addListener(applyState);
  }

  window.addEventListener("resize", applyState, { passive: true });
  applyState();
});
