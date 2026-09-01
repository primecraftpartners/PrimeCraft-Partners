# PrimeCraft Partners — Website (v2: SEO + Web3Forms)

## Domain & contact migration (latest update) — action items before you deploy
The site now points at your official domain and business emails everywhere: canonical tags,
Open Graph/Twitter tags, JSON-LD, header/footer links, mailto: links, and the copyright line all
use `https://primecraftpartners.company/`, `haroon@primecraftpartners.company` (Founder & CEO),
`sales@primecraftpartners.company` (Sales & Quotations), and `info@primecraftpartners.company`
(General Information). `robots.txt` and `sitemap.xml` were added at the project root.

Two things I could **not** do for you and need your action before this is fully live:

1. **Get a new Web3Forms access key.** The form's hidden `access_key` field is still the one tied
   to your old `primecraftpartners@gmail.com` inbox — it will keep working, but submissions will
   land in Gmail, not your new domain email. Go to [web3forms.com](https://web3forms.com), verify
   `sales@primecraftpartners.company` (or `info@`), and swap the new key into the
   `<input type="hidden" name="access_key" ...>` field in `index.html` (there's a comment marking
   exactly where).
2. **Add two image files at your repo root**, since the new meta tags reference them:
   - `og-image.jpg` — 1200×630px social share preview, referenced by `og:image` / `twitter:image`.
   - `logo.png` — I pointed the JSON-LD `logo` field at your existing `assets/icon_logo.png`
     instead of a non-existent root `logo.png`, since a broken logo URL actively hurts structured
     data / rich snippets. Swap that back to a root `logo.png` if/when you add a dedicated one.

## What changed from v1
- Rebuilt with **Tailwind CSS via CDN** (no build step) instead of a hand-rolled stylesheet.
- Added **SEO meta tags** (title, description, canonical, Open Graph) and **Schema.org JSON-LD**
  structured data (`Organization` / `ManufacturingBusiness`) in `index.html`.
- Target keywords woven into real headers: H1 "Engineered OEM & Private Label Leather Apparel
  Manufacturing", H2 "Custom Leather Outerwear & Motorcycle Gear Sourcing", H2 "275+ Styles From
  a Low MOQ Leather Factory in Sialkot", H2 "Your OEM Leather Garment Manufacturing Partner", H3
  "Private Label Leather Apparel Manufacturing".
- **Contact form now submits by email via Web3Forms** (`https://api.web3forms.com/submit`) instead
  of opening WhatsApp. Your access key is already wired in:
  `8c761ceb-ecd7-4677-ae8b-3b911083c74e`. Submissions land straight in the Gmail inbox that key was
  issued to — see the domain-migration note above about rotating this. A honeypot field
  (`botcheck`) is included for spam protection.
- On submit, the page shows an inline success message ("Thank you! Our technical sourcing team
  will review your specs and respond within 24 hours.") without leaving the page.
- WhatsApp is now a **secondary** contact option only — a small link in the header, a labeled
  link in the footer, and the floating action button. It's no longer the form's submission method.
- Form fields now match your spec exactly: Full Name*, Business/Brand Name*, Work Email*, Phone/
  WhatsApp (optional), Product Category (Leather Jackets / Motorcycle Gear / Vests & Accessories /
  Custom Outerwear), Estimated Order Quantity (30 pcs / 100–250 pcs / 500+ pcs), Message/Tech-Pack
  Link*.

## What's in this folder
```
index.html            Homepage — hero, quality/QA, product range, services, process, contact
catalogue.html         Full 275-style product catalogue with search + category filter
robots.txt              Allows all crawlers, points to sitemap.xml
sitemap.xml             Lists index.html and catalogue.html for search engines
custom.css             Small handwritten CSS for the few things Tailwind utilities can't express
                        (the spec-sheet hangtag, stitched-thread divider, spinning ring)
catalog-data.js         Product data layer: normalizes raw catalogue.json rows into the full
                        modal schema and registers them in window.PCCatalog by id
script.js               Nav toggle, Web3Forms submission handler, homepage product loader
catalogue.js            Catalogue search / filter / pagination logic
product-modal.js        Shared product detail modal — looks products up by id, renders their
                        own material/hardware/lining/lead-time/description
assets/catalogue.json   Your product data, converted from the CSV you uploaded (275 products)
assets/factory/         Real photos from your Sialkot floor, used in the Material & QA section
```

## Product cards & the detail modal
- Every product card — on the homepage "Product Range" section and on the full
  `catalogue.html` — shows a **`MOQ: 30 Pcs | Custom OEM Quote`** badge instead of any dollar
  price.
- Clicking a card opens an on-page **modal** in a spacious two-column layout: photo on the left
  (full height on desktop, stacked on top on mobile), specs and actions on the right. The whole
  modal card is a single scroll container — no cramped inner scrollbox under the image.
- **The modal is fully data-driven, not hardcoded.** Each card only carries `data-id="<sku>"`.
  Clicking it calls `PCProductModal.open(id)`, which looks that id up in `window.PCCatalog` (built
  by `catalog-data.js` from `assets/catalogue.json`) and renders **that product's own** material,
  hardware, lining, lead time, and description — this is what fixes the old bug where every modal
  showed identical spec text.
- **Making specs truly unique per SKU:** right now `assets/catalogue.json` only has
  `name`/`sku`/`category`/`img`. `catalog-data.js` fills the gaps with well-differentiated
  *per-category* defaults (7 categories, each with its own material/hardware/lining/description)
  so nothing is identical across unrelated products. To get fully unique copy per individual SKU,
  add `material`, `hardware`, `lining`, `leadTime`, and `description` columns to your product
  CSV/JSON — any row that already has these fields will use them instead of the category default,
  no code changes needed.
- Inside the modal:
  - **"Request Price Quote for This Style"** closes the modal, smooth-scrolls to the contact
    form, and pre-fills the message field with `Inquiry for [Product Title] ([Style ID]): Please
    provide custom FOB pricing, material recommendations, and sample lead times.` (From
    `catalogue.html`, which has no contact form of its own, this instead sends the visitor to
    `index.html#contact` with the same message pre-filled.)
  - **"Chat on WhatsApp"** opens `wa.me/923719242006` with `Hi PrimeCraft, I am interested in
    custom production for [Product Title] ([Style ID]).`

There's no `style.css`/`catalogue.css` anymore — layout and color now come from Tailwind utility
classes directly in the HTML, loaded via `<script src="https://cdn.tailwindcss.com">`. That means
**this site needs an internet connection to fetch the Tailwind CDN script** — normal for any live
website, just flagging it in case you ever view the files with no network at all.

## Deploying to Netlify
1. Drag this whole folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or connect it
   as a Git repo with the publish directory set to the project root — no build step needed.
2. That's it — the Web3Forms key is already in the HTML, so submissions will start arriving at
   `primecraftpartners@gmail.com` as soon as the site is live. Check your inbox (and spam folder)
   for a one-time Web3Forms verification email the first time you deploy.

## Product images
`assets/catalogue.json` points at the GitHub-hosted image URLs from your CSV
(`raw.githubusercontent.com/primecraftpartners/...`). As long as that repo stays public, images
load directly. If a product has no image, the card shows a styled placeholder with its SKU instead
of a broken image.

## Before you go live
- **Domain is wired in**: `index.html` and `catalogue.html` canonical/Open Graph tags, JSON-LD, and
  all contact links now point at `https://primecraftpartners.company/`. If you ever change domains
  again, search-and-replace that string across the `.html` files, `robots.txt`, and `sitemap.xml`.
- **Rotate the Web3Forms key** so form submissions land at your new domain email — see the
  domain-migration note at the top of this file.
- **Add `og-image.jpg`** (1200×630px) at the repo root so social share previews render correctly —
  see the domain-migration note at the top of this file.
- The homepage "Product Range" section features one representative style per category — edit the
  `order` list in `script.js` if you'd rather feature specific SKUs.
