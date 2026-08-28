(function () {
  "use strict";

  var modal = document.getElementById("product-modal");
  if (!modal) return;

  var overlay = document.getElementById("pm-overlay");
  var closeBtn = document.getElementById("pm-close");
  var imgEl = document.getElementById("pm-image");
  var titleEl = document.getElementById("pm-title");
  var skuEl = document.getElementById("pm-sku");
  var categoryEl = document.getElementById("pm-category");
  var quoteBtn = document.getElementById("pm-quote-btn");
  var waBtn = document.getElementById("pm-whatsapp-btn");

  var currentProduct = null;
  var lastFocused = null;

  function buildQuoteMessage(product) {
    return "Inquiry for Style " + product.sku + " (" + product.name + "): Please provide custom pricing and spec evaluation.";
  }

  function buildWhatsAppUrl(product) {
    var text = encodeURIComponent(
      "Hi PrimeCraft Partners, I'm interested in Style " + product.sku + ": " + product.name + ". Could you share pricing and MOQ details?"
    );
    return "https://wa.me/923719242006?text=" + text;
  }

  function openModal(product) {
    if (!product) return;
    currentProduct = product;
    lastFocused = document.activeElement;

    if (imgEl) {
      if (product.img) {
        imgEl.style.display = "";
        imgEl.src = product.img;
        imgEl.alt = product.name || "";
        imgEl.onerror = function () {
          imgEl.style.display = "none";
        };
      } else {
        imgEl.removeAttribute("src");
        imgEl.style.display = "none";
      }
    }

    if (titleEl) titleEl.textContent = product.name || "";
    if (skuEl) skuEl.textContent = "Style " + (product.sku || "—");
    if (categoryEl) categoryEl.textContent = product.category || "";
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
  if (overlay) overlay.addEventListener("click", closeModal);
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
