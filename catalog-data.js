/**
 * catalog-data.js
 * -----------------------------------------------------------------------
 * Shared data layer for the product catalog + detail modal.
 *
 * Real product data comes from assets/catalogue.json (275 rows) via
 * catalogue.js / script.js. That JSON currently only carries the basics
 * (name/title, sku, category, img). enrichProduct() below normalizes each
 * raw row into the full schema the modal needs:
 *
 *   { id, title, category, material, hardware, lining, leadTime,
 *     description, image }
 *
 * If a raw row ALREADY has its own material/hardware/lining/leadTime/
 * description (e.g. once you add those columns to your CSV/JSON export),
 * those values win — enrichProduct() only fills in what's missing. Until
 * then, every product gets differentiated specs based on its category
 * (7 distinct spec sets below), so nothing shows identical copy across
 * unrelated garments.
 *
 * catalogData itself is NOT one giant static array in this file — with
 * 275 SKUs that would be unmaintainable by hand. Instead each page builds
 * its own catalogData array at runtime from the fetched JSON, enriches it
 * through this module, and registers it in the shared window.PCCatalog
 * lookup so openProductModal(productId) can find any product by id.
 * -----------------------------------------------------------------------
 */
(function () {
  "use strict";

  // Per-category fallback specs — used whenever a raw product row doesn't
  // already define its own material/hardware/lining/leadTime/description.
  var CATEGORY_SPECS = {
    "Men's Vest": {
      material: "1.1mm\u20131.3mm Heavy-Duty Full-Grain Cowhide",
      hardware: "Heavy-Duty Steel Carabiner & Antique Brass YKK Zippers",
      lining: "Breathable Polyester Mesh",
      leadTime: "10\u201314 Days for Fit Sample",
      description: "Cut for a structured, close-to-body fit with double-stitched panel seams and bar-tacked stress points at the pocket corners and armholes. Built for daily wear and repeated on/off use, with reinforced seam allowances that hold their shape over time."
    },
    "Men's Jacket": {
      material: "1.1mm\u20131.3mm Heavy-Duty Full-Grain Cowhide",
      hardware: "Antique Brass YKK Zippers & Debossed Metal Snaps",
      lining: "Thermal Quilted Lining",
      leadTime: "10\u201314 Days for Fit Sample",
      description: "Constructed with reinforced shoulder and sleeve seams for structured outerwear performance, double-needle topstitching throughout, and a tailored block pattern that holds its shape through repeated wear."
    },
    "Women's Vest": {
      material: "0.6mm\u20130.8mm Ultra-Soft Top-Grain Sheepskin",
      hardware: "Nickel-Free Zip Pulls & Snap Closures",
      lining: "Custom Printed Satin",
      leadTime: "10\u201314 Days for Fit Sample",
      description: "Fitted through the waist with princess seams for a tailored silhouette, finished with clean edge-stitching and a soft-hand drape suited to fashion outerwear rather than protective gear."
    },
    "Women's Jacket": {
      material: "0.6mm\u20130.8mm Ultra-Soft Top-Grain Sheepskin",
      hardware: "Nickel-Free YKK Zippers & Decorative Snaps",
      lining: "Custom Printed Satin",
      leadTime: "10\u201314 Days for Fit Sample",
      description: "Softly structured with a fitted waist and set-in sleeves, finished with fine edge-stitching and a supple drape built for fashion-forward outerwear rather than heavy-duty use."
    },
    "Gloves": {
      material: "0.6mm\u20130.8mm Top-Grain Goat or Lambskin",
      hardware: "Elastic Wrist Gusset & Velcro Strap Closure",
      lining: "Breathable Mesh or Unlined",
      leadTime: "10\u201314 Days for Fit Sample",
      description: "Pattern-cut with articulated finger panels for a close, low-bulk fit, finished with reinforced palm seams and a stretch gusset at the wrist for secure, comfortable wear."
    },
    "Leather Pants": {
      material: "1.1mm\u20131.3mm Heavy-Duty Full-Grain Cowhide",
      hardware: "Heavy-Duty YKK Zip Fly & Riveted Pocket Bar-Tacks",
      lining: "Breathable Polyester Mesh",
      leadTime: "10\u201314 Days for Fit Sample",
      description: "Built with reinforced inner-leg and seat seams for durability under movement, double-stitched throughout, with a gusseted construction that supports a full range of motion."
    },
    "Protector": {
      material: "1.1mm\u20131.3mm CE-Rated Full-Grain Cowhide with Impact Padding",
      hardware: "Heavy-Duty Steel Buckles & Adjustable Straps",
      lining: "Breathable Mesh with CE-Rated Foam Inserts",
      leadTime: "10\u201314 Days for Fit Sample",
      description: "Engineered around CE-rated impact zones with reinforced boxed seams at every stress point, designed to hold protective inserts securely in place through repeated wear and movement."
    }
  };

  var DEFAULT_SPECS = {
    material: "1.1mm\u20131.3mm Full-Grain Cowhide or 0.6mm\u20130.8mm Top-Grain Sheepskin (by style)",
    hardware: "Heavy-Duty Antique Brass YKK Zippers & Debossed Metal Snaps",
    lining: "Premium Satin, Thermal Quilted, or Breathable Mesh (by style)",
    leadTime: "10\u201314 Days for Fit Sample",
    description: "Manufactured to OEM spec with reinforced seams, double-needle topstitching, and hardware selected to match the style's intended use. Full technical spec confirmed at tech-pack review."
  };

  function specsFor(category) {
    return CATEGORY_SPECS[category] || DEFAULT_SPECS;
  }

  /**
   * Normalizes a raw catalogue.json row (or any partial product object)
   * into the full schema the modal expects. Any field already present on
   * `raw` is kept as-is — this only fills gaps.
   */
  function enrichProduct(raw) {
    var fallback = specsFor(raw.category);
    return {
      id: raw.id || raw.sku || raw.slug,
      title: raw.title || raw.name || "Untitled Style",
      category: raw.category || "Custom Style",
      material: raw.material || fallback.material,
      hardware: raw.hardware || fallback.hardware,
      lining: raw.lining || fallback.lining,
      leadTime: raw.leadTime || fallback.leadTime,
      description: raw.description || fallback.description,
      image: raw.image || raw.img || ""
    };
  }

  // Global id -> product lookup that the modal reads from.
  window.PCCatalog = window.PCCatalog || {};

  function registerCatalog(items) {
    (items || []).forEach(function (p) {
      if (p && p.id) window.PCCatalog[p.id] = p;
    });
  }

  window.PCCatalogData = {
    enrichProduct: enrichProduct,
    registerCatalog: registerCatalog
  };
})();
