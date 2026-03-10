document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("back-to-top")) {
    return;
  }

  var button = document.createElement("button");
  button.id = "back-to-top";
  button.className = "back-to-top";
  button.type = "button";
  button.setAttribute("aria-label", "Back to top");
  button.setAttribute("title", "Back to top");
  button.innerHTML = "<span aria-hidden=\"true\">↑</span>";

  function toggleVisibility() {
    if (window.scrollY > 320) {
      button.classList.add("is-visible");
      return;
    }

    button.classList.remove("is-visible");
  }

  button.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  document.body.appendChild(button);
  toggleVisibility();
  window.addEventListener("scroll", toggleVisibility, { passive: true });
});
