(function () {
  "use strict";

  var grid = document.getElementById("catalogue-grid");
  if (!grid) return;

  var searchInput = document.getElementById("search-input");
  var categorySelect = document.getElementById("category-select");
  var loadMoreBtn = document.getElementById("load-more");
  var loadMoreWrap = document.getElementById("load-more-wrap");
  var resultCount = document.getElementById("result-count");

  var ALL_PRODUCTS = [];
  var filtered = [];
  var PAGE_SIZE = 24;
  var shown = 0;

  function escapeHtml(str) {
    return String(str || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function productCardHTML(p) {
    var img = p.img
      ? '<img src="' + p.img + '" alt="' + escapeHtml(p.name) + '" loading="lazy" width="400" height="400" class="w-full h-full object-cover" onerror="this.parentElement.innerHTML=\'<div class=&quot;product-thumb-fallback w-full h-full flex items-center justify-center text-gold-light font-mono text-[0.7rem] text-center p-2&quot;>' + escapeHtml(p.sku) + '</div>\'">'
      : '<div class="product-thumb-fallback w-full h-full flex items-center justify-center text-gold-light font-mono text-[0.7rem] text-center p-2">' + escapeHtml(p.sku) + "</div>";

    var waMsg = encodeURIComponent(
      "Hi PrimeCraft Partners, I'm interested in " + p.name + " (" + p.sku + "). Could you share pricing and MOQ details?"
    );

    return (
      '<a class="group bg-white border border-greyline rounded overflow-hidden flex flex-col hover:shadow-[0_10px_30px_-14px_rgba(26,26,26,0.25)] hover:-translate-y-0.5 transition-all" href="https://wa.me/923719242006?text=' + waMsg + '" target="_blank" rel="noopener">' +
        '<div class="w-full aspect-square bg-greybg overflow-hidden">' + img + "</div>" +
        '<div class="p-3.5 sm:p-4 flex flex-col gap-1.5 flex-1">' +
          '<span class="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-brown">' + escapeHtml(p.category) + "</span>" +
          '<span class="text-[0.92rem] font-bold text-charcoal leading-snug">' + escapeHtml(p.name) + "</span>" +
          '<div class="flex justify-between items-center mt-auto pt-2">' +
            '<span class="font-mono font-semibold text-[0.85rem] text-charcoal">' + (p.price ? escapeHtml(p.price) : "Quote on request") + "</span>" +
            '<span class="text-[0.72rem] text-inksoft">MOQ ' + escapeHtml(p.moq || "50") + "</span>" +
          "</div>" +
        "</div>" +
      "</a>"
    );
  }

  function renderPage(reset) {
    if (reset) {
      grid.innerHTML = "";
      shown = 0;
    }
    var next = filtered.slice(shown, shown + PAGE_SIZE);
    grid.insertAdjacentHTML("beforeend", next.map(productCardHTML).join(""));
    shown += next.length;

    if (resultCount) {
      resultCount.textContent = filtered.length
        ? "Showing " + shown + " of " + filtered.length + " styles"
        : "";
    }

    if (loadMoreWrap) {
      loadMoreWrap.classList.toggle("hidden", shown >= filtered.length);
    }

    if (!filtered.length) {
      grid.innerHTML = '<div class="col-span-full text-center py-16 px-5 text-inksoft">No styles match that search. Try a different keyword or category — or <a href="index.html#contact" class="text-brown font-semibold underline">send us your spec</a> directly.</div>';
    }
  }

  function applyFilters() {
    var q = (searchInput.value || "").trim().toLowerCase();
    var cat = categorySelect.value;

    filtered = ALL_PRODUCTS.filter(function (p) {
      var matchesCat = !cat || p.category === cat;
      var matchesQ = !q || (p.name + " " + p.sku).toLowerCase().indexOf(q) !== -1;
      return matchesCat && matchesQ;
    });

    renderPage(true);
  }

  function debounce(fn, wait) {
    var t;
    return function () {
      clearTimeout(t);
      var args = arguments;
      t = setTimeout(function () { fn.apply(null, args); }, wait);
    };
  }

  function getQueryCategory() {
    var params = new URLSearchParams(window.location.search);
    return params.get("category") || "";
  }

  fetch("assets/catalogue.json")
    .then(function (res) { return res.json(); })
    .then(function (data) {
      ALL_PRODUCTS = data;

      var preselect = getQueryCategory();
      if (preselect && categorySelect) categorySelect.value = preselect;

      filtered = ALL_PRODUCTS.slice();
      applyFilters();
    })
    .catch(function () {
      grid.innerHTML = '<div class="col-span-full text-center py-16 px-5 text-inksoft">Couldn\'t load the catalogue right now. Please <a href="index.html#contact" class="text-brown font-semibold underline">contact us directly</a> for the full product list.</div>';
    });

  searchInput.addEventListener("input", debounce(applyFilters, 200));
  categorySelect.addEventListener("change", applyFilters);
  loadMoreBtn.addEventListener("click", function () { renderPage(false); });
})();
