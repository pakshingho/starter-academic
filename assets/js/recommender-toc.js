document.addEventListener("DOMContentLoaded", function () {
  var sourceToc = document.querySelector("#page-contents");
  var sourceList = document.querySelector("#page-contents .recommender-toc__list");
  var floatingToc = document.querySelector(".recommender-float-toc");
  var toggle = document.querySelector(".recommender-float-toc__toggle");
  var panel = document.querySelector(".recommender-float-toc__panel");
  var body = document.querySelector(".recommender-float-toc__body");
  var mobileQuery = window.matchMedia("(max-width: 767.98px)");

  if (!sourceToc || !sourceList || !floatingToc || !toggle || !panel || !body) {
    return;
  }

  body.replaceChildren(sourceList.cloneNode(true));

  var closePanel = function () {
    floatingToc.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    if (mobileQuery.matches) {
      panel.hidden = true;
    }
  };

  var openPanel = function () {
    floatingToc.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    panel.hidden = false;
  };

  var syncLayout = function () {
    var threshold = Math.max(320, sourceToc.offsetTop + sourceToc.offsetHeight);
    var shouldShow = window.scrollY > threshold;

    floatingToc.classList.toggle("is-visible", shouldShow);

    if (!shouldShow) {
      closePanel();
      return;
    }

    if (mobileQuery.matches) {
      panel.hidden = !floatingToc.classList.contains("is-open");
      return;
    }

    panel.hidden = false;
    floatingToc.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", function (event) {
    event.preventDefault();

    if (!floatingToc.classList.contains("is-visible")) {
      return;
    }

    if (floatingToc.classList.contains("is-open")) {
      closePanel();
      return;
    }

    openPanel();
  });

  body.addEventListener("click", function (event) {
    if (mobileQuery.matches && event.target.closest("a")) {
      closePanel();
    }
  });

  document.addEventListener("click", function (event) {
    if (!mobileQuery.matches) {
      return;
    }

    if (floatingToc.classList.contains("is-open") && !floatingToc.contains(event.target)) {
      closePanel();
    }
  });

  window.addEventListener("scroll", syncLayout, { passive: true });
  window.addEventListener("resize", syncLayout);

  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener("change", syncLayout);
  } else if (mobileQuery.addListener) {
    mobileQuery.addListener(syncLayout);
  }

  syncLayout();
});
