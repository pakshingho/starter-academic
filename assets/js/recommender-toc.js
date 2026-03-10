document.addEventListener("DOMContentLoaded", function () {
  var jumpLink = document.querySelector(".recommender-toc-jump");
  var toc = document.querySelector(".recommender-toc");

  if (!jumpLink || !toc) {
    return;
  }

  jumpLink.addEventListener("click", function (event) {
    event.preventDefault();
    toc.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
  });

  var updateVisibility = function () {
    var threshold = Math.max(320, toc.offsetTop + toc.offsetHeight);
    var shouldShow = window.scrollY > threshold;
    jumpLink.classList.toggle("is-visible", shouldShow);
  };

  updateVisibility();
  window.addEventListener("scroll", updateVisibility, { passive: true });
  window.addEventListener("resize", updateVisibility);
});
