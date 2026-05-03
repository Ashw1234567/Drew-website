# All Style Cabinets — Website

Static lead-generation site for All Style Cabinets, in partnership with Tru Spec.

## Stack
- HTML5, CSS3, vanilla JavaScript — zero build step.
- Hosted on Vercel.

## Local preview
Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
python -m http.server 8000
```

## Deploying to Vercel
1. `npm i -g vercel` (one-time)
2. `vercel` from this folder, accept defaults.
3. `vercel --prod` to publish.

`vercel.json` is already set up with:
- `cleanUrls: true` (so `/quote` works as well as `/quote.html`)
- Long-lived caching for `/assets/*`
- Reasonable security headers

## Where to swap the official All Style brand kit
All branding tokens live as CSS custom properties at the top of [`assets/css/styles.css`](assets/css/styles.css):

```css
--brand-ink:        #1a1f24;   /* primary text / dark UI */
--brand-charcoal:   #2b3036;
--brand-graphite:   #4a5159;
--brand-mist:       #e8eaec;
--brand-fog:        #f4f5f6;
--brand-accent:     var(--truspec-red);
--brand-accent-2:   var(--truspec-navy);
--font-display:     "Inter", ...;
--font-body:        "Inter", ...;
```

Replace those values with the official All Style palette and typography when the brand kit lands — every component on the site will inherit the change.

The Tru Spec partner palette (`--truspec-navy: #313d45`, `--truspec-red: #ee3042`) is fixed per the provided brand kit.

## Connecting the quote form to a backend
The form in `quote.html` currently captures the payload, logs it, and shows the success state. To wire it up, edit the submit handler in [`assets/js/script.js`](assets/js/script.js) and `fetch()` your endpoint of choice — Formspree, Netlify Forms (if you migrate), Vercel Function, Resend, etc.

## Structure
```
.
├── index.html            # Home — hero, 5 product sections, Plein, partnership, CTA
├── quote.html            # Lead-gen form
├── vercel.json           # Vercel config (clean URLs, headers, caching)
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/styles.css
    ├── js/script.js
    └── images/           # All product/inspiration imagery
```
