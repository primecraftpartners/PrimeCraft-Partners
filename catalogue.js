(function () {
  "use strict";

  var grid = document.getElementById("catalogue-grid");
  if (!grid) return;

  var searchInput = document.getElementById("search-input");
  var categorySelect = document.getElementById("category-select");
  var loadMoreBtn = document.getElementById("load-more");
  var loadMoreWrap = document.getElementById("load-more-wrap");
  var resultCount = document.getElementById("result-count");

  // catalogData: the enriched, modal-ready product objects for this page,
  // built at runtime from assets/catalogue.json (see catalog-data.js).
  var catalogData = [];
  var filtered = [];
  var PAGE_SIZE = 24;
  var shown = 0;

  function escapeHtml(str) {
    return String(str || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function productCardHTML(p) {
    var img = p.image
      ? '<img src="' + p.image + '" alt="' + escapeHtml(p.title) + '" loading="lazy" width="400" height="400" class="w-full h-full object-cover" onerror="this.parentElement.innerHTML=\'<div class=&quot;product-thumb-fallback w-full h-full flex items-center justify-center text-gold-light font-mono text-[0.7rem] text-center p-2&quot;>' + escapeHtml(p.id) + '</div>\'">'
      : '<div class="product-thumb-fallback w-full h-full flex items-center justify-center text-gold-light font-mono text-[0.7rem] text-center p-2">' + escapeHtml(p.id) + "</div>";

    return (
      '<button type="button" class="product-card group bg-white border border-greyline rounded overflow-hidden flex flex-col w-full text-left hover:shadow-[0_10px_30px_-14px_rgba(26,26,26,0.25)] hover:-translate-y-0.5 transition-all" ' +
        'data-id="' + escapeHtml(p.id) + '">' +
        '<div class="w-full aspect-square bg-greybg overflow-hidden">' + img + "</div>" +
        '<div class="p-3.5 sm:p-4 flex flex-col gap-1.5 flex-1">' +
          '<span class="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-brown">' + escapeHtml(p.category) + "</span>" +
          '<span class="text-[0.92rem] font-bold text-charcoal leading-snug">' + escapeHtml(p.title) + "</span>" +
          '<div class="flex justify-between items-center mt-auto pt-2">' +
            '<span class="font-mono font-semibold text-[0.75rem] text-charcoal">MOQ: 30 Pcs</span>' +
            '<span class="text-[0.72rem] font-semibold text-brown">Custom OEM Quote</span>' +
          "</div>" +
        "</div>" +
      "</button>"
    );
  }

  function handleCardClick(e) {
    var card = e.target.closest(".product-card");
    if (!card) return;
    if (window.PCProductModal) {
      window.PCProductModal.open(card.dataset.id);
    }
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

    filtered = catalogData.filter(function (p) {
      var matchesCat = !cat || p.category === cat;
      var matchesQ = !q || (p.title + " " + p.id).toLowerCase().indexOf(q) !== -1;
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
      // Normalize each raw row (name/sku/category/img[/price/moq]) into the
      // full modal-ready schema, preferring any material/hardware/lining/
      // leadTime/description fields already present on the row itself.
      catalogData = data.map(window.PCCatalogData.enrichProduct);
      window.PCCatalogData.registerCatalog(catalogData);

      var preselect = getQueryCategory();
      if (preselect && categorySelect) categorySelect.value = preselect;

      filtered = catalogData.slice();
      applyFilters();
    })
    .catch(function () {
      grid.innerHTML = '<div class="col-span-full text-center py-16 px-5 text-inksoft">Couldn\'t load the catalogue right now. Please <a href="index.html#contact" class="text-brown font-semibold underline">contact us directly</a> for the full product list.</div>';
    });

  searchInput.addEventListener("input", debounce(applyFilters, 200));
  categorySelect.addEventListener("change", applyFilters);
  loadMoreBtn.addEventListener("click", function () { renderPage(false); });
  grid.addEventListener("click", handleCardClick);
})();
