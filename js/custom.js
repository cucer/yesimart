(function () {
  "use strict";

  // Footer year
  var copyYear = document.getElementById("copyYear");
  if (copyYear) {
    copyYear.textContent = new Date().getFullYear();
  }

  // Reveal-on-scroll animations
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Portfolio "load more"
  var loadMoreBtn = document.getElementById("loadMoreBtn");
  var grid = document.getElementById("portfolioGrid");
  if (loadMoreBtn && grid) {
    var totalBatches = parseInt(loadMoreBtn.getAttribute("data-batch-total"), 10) || 0;
    var shown = 0;

    var updateButton = function () {
      if (shown >= totalBatches) {
        loadMoreBtn.style.display = "none";
      } else {
        loadMoreBtn.textContent = "Daha Fazla Göster";
      }
    };

    loadMoreBtn.addEventListener("click", function () {
      shown += 1;
      var items = grid.querySelectorAll('.portfolio-box[data-batch="' + shown + '"]');
      items.forEach(function (item) {
        item.classList.remove("gallery-hidden");
      });
      updateButton();
    });

    updateButton();
  }

  // Back-to-top visibility
  var backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    var toggleBackToTop = function () {
      if (window.pageYOffset > 400) {
        backToTop.classList.add("is-visible");
      } else {
        backToTop.classList.remove("is-visible");
      }
    };
    toggleBackToTop();
    window.addEventListener("scroll", toggleBackToTop);
  }
})();
