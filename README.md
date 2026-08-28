# PrimeCraft Partners — Website (v2: SEO + Web3Forms)

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
  `8c761ceb-ecd7-4677-ae8b-3b911083c74e`. Submissions land straight in
  `primecraftpartners@gmail.com`. A honeypot field (`botcheck`) is included for spam protection.
- On submit, the page shows an inline success message ("Thank you! Our technical sourcing team
  will review your specs and respond within 24 hours.") without leaving the page.
- WhatsApp is now a **secondary** contact option only — a small link in the header, a labeled
  link in the footer, and the floating action button. It's no longer the form's submission method.
- Form fields now match your spec exactly: Full Name*, Business/Brand Name*, Work Email*, Phone/
  WhatsApp (optional), Product Category (Leather Jackets / Motorcycle Gear / Vests & Accessories /
  Custom Outerwear), Estimated Order Quantity (50 pcs / 100–250 pcs / 500+ pcs), Message/Tech-Pack
  Link*.

## What's in this folder
```
index.html            Homepage — hero, quality/QA, product range, services, process, contact
catalogue.html         Full 275-style product catalogue with search + category filter
custom.css             Small handwritten CSS for the few things Tailwind utilities can't express
                        (the spec-sheet hangtag, stitched-thread divider, spinning ring)
script.js               Nav toggle, Web3Forms submission handler, homepage product loader
catalogue.js            Catalogue search / filter / pagination logic
product-modal.js        Shared product detail modal (opens on card click, no dollar prices)
assets/catalogue.json   Your product data, converted from the CSV you uploaded (275 products)
assets/factory/         Real photos from your Sialkot floor, used in the Material & QA section
```

## Product cards & the detail modal (new)
- Every product card — on the homepage "Product Range" section and on the full
  `catalogue.html` — now shows a **`MOQ: 50 Pcs | Custom Quote`** badge instead of any dollar
  price.
- Clicking a card no longer jumps straight to WhatsApp. It opens an on-page **modal** with the
  product photo, name, style code, and standard tech specs (leather grade options, hardware,
  lining, 10–14 day turnaround).
- Inside the modal:
  - **"Request Price Quote & Tech Pack Review"** closes the modal, smooth-scrolls to the contact
    form, and pre-fills the message field with `Inquiry for Style [code] ([name]): Please provide
    custom pricing and spec evaluation.` (If someone opens the modal from `catalogue.html`, which
    has no contact form of its own, this button instead sends them to `index.html#contact` with
    the same message pre-filled.)
  - **"Chat on WhatsApp"** opens `wa.me/923719242006` with a message referencing that specific
    style code, kept as the optional direct line.
- All of this logic lives in `product-modal.js`, shared by both pages — `script.js` and
  `catalogue.js` just render cards with `data-*` attributes and hand the click off to it.

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
- **Update the domain**: `index.html` and `catalogue.html` both have `<link rel="canonical">` and
  Open Graph tags pointing at `https://www.primecraftpartners.com/` — a placeholder. Swap this for
  your real Netlify or custom domain once you know it (search-and-replace is enough).
- **Verify the Web3Forms key**: it's already in `index.html` as a hidden field. If you ever need to
  rotate it, get a new key at [web3forms.com](https://web3forms.com) and replace the value of
  `<input type="hidden" name="access_key" ...>`.
- The homepage "Product Range" section features one representative style per category — edit the
  `order` list in `script.js` if you'd rather feature specific SKUs.
