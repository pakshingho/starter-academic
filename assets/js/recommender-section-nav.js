document.addEventListener("DOMContentLoaded", function () {
  function normalizePath(pathname) {
    if (!pathname) {
      return "/";
    }

    return pathname.replace(/\/+$/, "") + "/";
  }

  function buildNav(prev, next) {
    if (!prev && !next) {
      return null;
    }

    var wrapper = document.createElement("div");
    wrapper.className = "article-widget article-section-nav";

    var nav = document.createElement("div");
    nav.className = "post-nav section-nav";
    wrapper.appendChild(nav);

    function addItem(direction, item) {
      if (!item) {
        return;
      }

      var navItem = document.createElement("div");
      navItem.className = "post-nav-item";

      var meta = document.createElement("div");
      meta.className = "meta-nav";
      meta.textContent = direction;
      navItem.appendChild(meta);

      var link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label;
      navItem.appendChild(link);

      nav.appendChild(navItem);
    }

    addItem("Previous", prev);
    addItem("Next", next);

    return wrapper;
  }

  function toNavItem(link) {
    var url = new URL(link.getAttribute("href"), window.location.origin);
    return {
      href: url.pathname + url.hash,
      path: normalizePath(url.pathname),
      hash: url.hash,
      label: link.textContent.trim(),
    };
  }

  function getSectionLinks(docsNav) {
    var items = [];

    Array.prototype.forEach.call(
      docsNav.querySelectorAll(".docs-toc-item"),
      function (tocItem) {
        var chapterLink = tocItem.querySelector(":scope > .docs-toc-link");
        var childLinks = tocItem.querySelectorAll(":scope > .docs-sidenav a");

        if (childLinks.length) {
          Array.prototype.forEach.call(childLinks, function (childLink) {
            items.push(toNavItem(childLink));
          });
          return;
        }

        if (chapterLink && normalizePath(new URL(chapterLink.getAttribute("href"), window.location.origin).pathname) !== "/recommender-systems/") {
          items.push(toNavItem(chapterLink));
        }
      }
    );

    return items;
  }

  function getInsertionPoint(sectionList, index, endMarker) {
    var nextSection = sectionList[index + 1];
    if (nextSection && nextSection.anchor && nextSection.anchor.parentNode) {
      return nextSection.anchor;
    }

    return endMarker || null;
  }

  function getSectionAnchor(section) {
    if (!section.hash) {
      return null;
    }

    return document.getElementById(section.hash.slice(1));
  }

  function getSectionList(currentSections) {
    return currentSections.map(function (section) {
      return {
        data: section,
        anchor: getSectionAnchor(section),
      };
    });
  }

  function insertNav(nav, insertionPoint, articleStyle) {
    if (insertionPoint && insertionPoint.parentNode) {
      insertionPoint.parentNode.insertBefore(nav, insertionPoint);
      return;
    }

    articleStyle.appendChild(nav);
  }

  function sectionHasAnchor(section) {
    return !!section.anchor;
  }

  function removeExistingSectionNavs(scope) {
    Array.prototype.forEach.call(
      scope.querySelectorAll(".article-section-nav"),
      function (nav) {
        nav.remove();
      }
    );
  }

  var currentPath = normalizePath(window.location.pathname);
  if (!currentPath.startsWith("/recommender-systems/")) {
    return;
  }

  var docsNav = document.getElementById("docs-nav");
  var articleContainer = document.querySelector(".docs-article-container");
  var articleStyle = articleContainer && articleContainer.querySelector(".article-style");
  if (!docsNav || !articleContainer || !articleStyle) {
    return;
  }

  removeExistingSectionNavs(articleContainer);

  var allSections = getSectionLinks(docsNav);
  if (!allSections.length) {
    return;
  }

  if (currentPath === "/recommender-systems/") {
    var overviewNav = buildNav(null, allSections[0]);
    if (overviewNav) {
      articleStyle.appendChild(overviewNav);
    }
    return;
  }

  var currentSections = allSections.filter(function (section) {
    return section.path === currentPath;
  });

  if (!currentSections.length) {
    return;
  }

  var sectionList = getSectionList(currentSections);
  var endMarker = articleContainer.querySelector(".article-widget:not(.article-section-nav)") ||
    articleContainer.querySelector(".body-footer") ||
    null;

  if (!sectionList.length) {
    return;
  }

  sectionList.forEach(function (section, index) {
    var globalIndex = allSections.findIndex(function (item) {
      return item.href === section.data.href;
    });

    var prev = null;
    if (globalIndex === 0) {
      prev = {
        href: "/recommender-systems/",
        label: "Overview",
      };
    } else if (globalIndex > 0) {
      prev = allSections[globalIndex - 1];
    }

    var next = globalIndex < allSections.length - 1 ? allSections[globalIndex + 1] : null;
    var nav = buildNav(prev, next);
    if (!nav) {
      return;
    }

    if (!sectionHasAnchor(section) && index === 0) {
      insertNav(nav, endMarker, articleStyle);
      return;
    }

    insertNav(nav, getInsertionPoint(sectionList, index, endMarker), articleStyle);
  });
});
