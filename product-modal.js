/**
 * product-modal.js
 * -----------------------------------------------------------------------
 * Renders the product detail modal from live catalogData (see
 * catalog-data.js). Call window.PCProductModal.open(productId) — the id
 * is looked up in the shared window.PCCatalog registry and every field
 * (image, title, category, material, hardware, lining, lead time,
 * description) is populated from that specific product's own data.
 * -----------------------------------------------------------------------
 */
(function () {
  "use strict";

  var modal = document.getElementById("product-modal");
  if (!modal) return;

  var closeBtn = document.getElementById("pm-close");
  var imgEl = document.getElementById("pm-image");
  var categoryEl = document.getElementById("pm-category");
  var titleEl = document.getElementById("pm-title");
  var skuEl = document.getElementById("pm-sku");
  var materialEl = document.getElementById("pm-material");
  var hardwareEl = document.getElementById("pm-hardware");
  var liningEl = document.getElementById("pm-lining");
  var leadTimeEl = document.getElementById("pm-lead-time");
  var descriptionEl = document.getElementById("pm-description");
  var quoteBtn = document.getElementById("pm-quote-btn");
  var waBtn = document.getElementById("pm-whatsapp-btn");

  var currentProduct = null;
  var lastFocused = null;

  function buildQuoteMessage(product) {
    return "Inquiry for " + product.title + " (" + product.id + "): Please provide custom FOB pricing, material recommendations, and sample lead times.";
  }

  function buildWhatsAppUrl(product) {
    var text = encodeURIComponent(
      "Hi PrimeCraft, I am interested in custom production for " + product.title + " (" + product.id + ")."
    );
    return "https://wa.me/923719242006?text=" + text;
  }

  /**
   * Opens the modal for a given product id, pulling that product's own
   * data out of window.PCCatalog — this is the fix for the "every modal
   * shows the same specs" bug: nothing here is hardcoded per-open.
   */
  function openModal(productId) {
    var product = window.PCCatalog && window.PCCatalog[productId];
    if (!product) {
      console.warn("PCProductModal: no catalog entry for id", productId);
      return;
    }
    currentProduct = product;
    lastFocused = document.activeElement;

    if (imgEl) {
      if (product.image) {
        imgEl.style.display = "";
        imgEl.src = product.image;
        imgEl.alt = product.title || "";
        imgEl.onerror = function () {
          imgEl.style.display = "none";
        };
      } else {
        imgEl.removeAttribute("src");
        imgEl.style.display = "none";
      }
    }

    if (categoryEl) categoryEl.textContent = product.category || "";
    if (titleEl) titleEl.textContent = product.title || "";
    if (skuEl) skuEl.textContent = "Style " + (product.id || "\u2014");
    if (materialEl) materialEl.textContent = product.material || "\u2014";
    if (hardwareEl) hardwareEl.textContent = product.hardware || "\u2014";
    if (liningEl) liningEl.textContent = product.lining || "\u2014";
    if (leadTimeEl) leadTimeEl.textContent = product.leadTime || "\u2014";
    if (descriptionEl) descriptionEl.textContent = product.description || "";
    if (waBtn) waBtn.href = buildWhatsAppUrl(product);

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden");

    document.addEventListener("keydown", onKeydown);
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overflow-hidden");
    document.removeEventListener("keydown", onKeydown);
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function onKeydown(e) {
    if (e.key === "Escape") closeModal();
  }

  function requestQuote() {
    if (!currentProduct) {
      closeModal();
      return;
    }
    var product = currentProduct;
    var messageText = buildQuoteMessage(product);
    var messageField = document.getElementById("message");
    var contactSection = document.getElementById("contact");

    closeModal();

    // Contact form + section live on this page (index.html)
    if (messageField && contactSection) {
      messageField.value = messageText;
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(function () { messageField.focus(); }, 450);
      return;
    }

    // No contact form on this page (e.g. catalogue.html) — hand off to the homepage
    window.location.href = "index.html?prefill=" + encodeURIComponent(messageText) + "#contact";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    // Click on the dark overlay itself (not the modal card) closes it
    if (e.target === modal) closeModal();
  });
  if (quoteBtn) quoteBtn.addEventListener("click", requestQuote);

  // Exposed so catalogue.js / script.js can open the modal from a card click
  window.PCProductModal = { open: openModal, close: closeModal };

  // Pick up a prefilled message handed off from another page (e.g. catalogue.html)
  var params = new URLSearchParams(window.location.search);
  var prefill = params.get("prefill");
  if (prefill) {
    var messageField = document.getElementById("message");
    var contactSection = document.getElementById("contact");
    if (messageField) messageField.value = prefill;
    if (contactSection) {
      window.setTimeout(function () {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
        if (messageField) messageField.focus();
      }, 300);
    }
  }
})();
