(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var navPanel = document.getElementById("nav-panel");

  if (navToggle && navPanel) {
    navToggle.addEventListener("click", function () {
      var willOpen = navPanel.classList.contains("hidden");
      navPanel.classList.toggle("hidden");
      navToggle.setAttribute("aria-expanded", String(willOpen));
    });

    navPanel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth < 1024) {
          navPanel.classList.add("hidden");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* ---------- Lead form: client-side validation + Web3Forms submission ---------- */
  var form = document.getElementById("lead-form");
  var status = document.getElementById("form-status");

  function setInvalid(field, invalid) {
    var row = field.closest(".form-row");
    if (!row) return;
    row.classList.toggle("invalid", invalid);
    field.classList.toggle("border-[#B23A2E]", invalid);
    var err = row.querySelector(".field-error");
    if (err) err.classList.toggle("hidden", !invalid);
  }

  function validateField(field) {
    var valid = field.checkValidity();
    setInvalid(field, !valid);
    return valid;
  }

  if (form) {
    var fields = form.querySelectorAll("input[required], select[required], textarea[required]");

    fields.forEach(function (field) {
      field.addEventListener("blur", function () { validateField(field); });
      field.addEventListener("input", function () {
        if (field.checkValidity()) setInvalid(field, false);
      });
      field.addEventListener("change", function () {
        if (field.checkValidity()) setInvalid(field, false);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var allValid = true;

      fields.forEach(function (field) {
        if (!validateField(field)) allValid = false;
      });

      if (!allValid) {
        if (status) {
          status.textContent = "Please fill in the required fields above.";
          status.className = "text-[0.85rem] text-center text-[#B23A2E] mt-3.5 min-h-[1.2em]";
        }
        var firstInvalid = form.querySelector(".form-row.invalid input, .form-row.invalid select, .form-row.invalid textarea");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var submitBtn = form.querySelector("button[type=submit]");
      var originalLabel = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
        submitBtn.classList.add("opacity-70", "cursor-not-allowed");
      }
      if (status) {
        status.textContent = "";
        status.className = "text-[0.85rem] text-center text-inksoft mt-3.5 min-h-[1.2em]";
      }

      var payload = Object.fromEntries(new FormData(form).entries());

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json(); })
        .then(function (result) {
          if (result.success) {
            if (status) {
              status.textContent = "Thank you! Our technical sourcing team will review your specs and respond within 24 hours.";
              status.className = "text-[0.85rem] text-center text-[#2E7D45] font-semibold mt-3.5 min-h-[1.2em]";
            }
            form.reset();
          } else {
            throw new Error(result.message || "Submission failed");
          }
        })
        .catch(function () {
          if (status) {
            status.textContent = "Something went wrong sending your request — please try again, or email us directly at primecraftpartners@gmail.com.";
            status.className = "text-[0.85rem] text-center text-[#B23A2E] mt-3.5 min-h-[1.2em]";
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
            submitBtn.classList.remove("opacity-70", "cursor-not-allowed");
          }
        });
    });
  }

  /* ---------- Featured products (homepage preview) ---------- */
  var grid = document.getElementById("featured-products");
  var catTiles = document.querySelectorAll(".cat-tile");

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

  if (grid) {
    fetch("assets/catalogue.json")
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var byCategory = {};
        data.forEach(function (p) {
          if (!byCategory[p.category]) byCategory[p.category] = [];
          byCategory[p.category].push(p);
        });

        var order = ["Men's Vest", "Men's Jacket", "Women's Vest", "Women's Jacket", "Gloves", "Leather Pants", "Protector"];
        var featured = [];
        order.forEach(function (cat) {
          var items = byCategory[cat];
          if (items && items.length) {
            var pick = items[Math.min(2, items.length - 1)];
            featured.push(pick);
          }
        });

        grid.innerHTML = featured.map(productCardHTML).join("");

        catTiles.forEach(function (tile) {
          tile.addEventListener("click", function () {
            window.location.href = "catalogue.html?category=" + encodeURIComponent(tile.dataset.cat);
          });
        });
      })
      .catch(function () {
        grid.innerHTML = '<p class="col-span-full text-inksoft">Catalogue is loading — browse the full range on the <a href="catalogue.html" class="underline">catalogue page</a>.</p>';
      });
  }
})();
