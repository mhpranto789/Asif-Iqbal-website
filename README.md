# Asif Iqbal – Personal Branding Website

A complete, production-grade personal branding platform for **Asif Iqbal** (Bengali: **আসিফ ইকবাল**), *The Polymath Builder*, where strategy meets soul, and profit serves purpose.

Built in React 19 + TypeScript with Tailwind CSS, supporting complete bilingual experiences (English and Bengali / বাংলা), accessible keyboard interactions, client-side routing, and zero-pill editorial typography.

---

## 1. Quick Architecture Overview

- **`src/data/siteContent.ts`**: Centralized single source of truth for all public facts, ventures, career milestones, music catalogue, book details, speaking topics, and the interactive manuscript framework.
- **`src/data/translations.ts`**: Complete English and Bengali translations for navigation, button copy, labels, states, and error messages.
- **`src/data/assetConfig.ts`**: Configuration file for portrait images, official domain, social media links, venture outbound URLs, and contact routing email.
- **`src/components/InteractiveFramework.tsx`**: The interactive "সাফল্যের পথ নক্সা" (A Path from Intention to Action) 8-step decision and effort engine, adhering strictly to the source manuscript.
- **`CONTENT_REVIEW.md`**: Internal fact-checking and editorial verification audit documenting all source claims, pending dates, and publication status.

---

## 2. Content & Asset Customization Guide

### A. Replacing Approved Portraits of Asif Iqbal
Per editorial guidelines, no synthetic or stock faces are generated. The site currently displays an intentional, refined editorial typography and architectural monogram frame. To provide approved high-resolution photography:
1. Place the official portrait image (e.g., `asif_iqbal_portrait.jpg`) in `/public/images/`.
2. Open `src/data/assetConfig.ts`.
3. Update `heroPortraitUrl` with the path: `"/images/asif_iqbal_portrait.jpg"`.
4. The system will automatically render the approved photograph with appropriate aspect ratio and fallbacks.

### B. Adding or Updating Songs
In `src/data/siteContent.ts`, locate `musicItems`. You can add new tracks following the schema:
```typescript
{
  id: "song-id",
  titleEn: "Song Title",
  titleBn: "গানের নাম",
  artistCredit: "Artist / Singer",
  roleEn: "Lyricist",
  roleBn: "গীতিকার",
  year: 2024,
  contextEn: "Historical or cultural context...",
  contextBn: "গানের পটভূমি...",
  recordingUrl: "https://approved-youtube-or-spotify-link.com"
}
```

### C. Updating Outbound Links & Social Media
In `src/data/assetConfig.ts`, update:
- `ventureLinks.achieveConsulting`
- `ventureLinks.acis`
- `ventureLinks.asix`
- `ventureLinks.gaanChill`
- `socialLinks.linkedin`, `socialLinks.youtube`, etc.

When an official URL is provided, the UI renders the live external link with accessible external indicators; when blank, it gracefully routes internally to the venture profile without broken dead links.

### D. Configuring Real Contact Form Delivery
The contact form currently operates in an honest, transparent **Preview Mode**:
- Visitors can select an enquiry category (Business, Speaking, Creative, Media, Other), write their message, and click **Create Enquiry Draft** to copy a cleanly formatted message to their clipboard or open a draft in their email client.
- To connect a production backend, set your endpoint URL in `src/data/assetConfig.ts` under `contactEndpointUrl` (e.g. `"/api/contact"`). When configured, the form seamlessly sends JSON payloads via POST.

### E. Production Domain & SEO Configuration
- In `src/data/assetConfig.ts`, update `productionDomain` (e.g. `"https://asifiqbal.com"`).
- `<title>`, `<meta>`, and Schema.org JSON-LD structured data in `index.html` automatically sync to the configured domain.

---

## 3. Running, Building & Deploying to Vercel

### A. Local Development & Verification
```bash
# Start development server on port 3000
npm run dev

# Run TypeScript lint verification
npm run lint

# Build production bundle
npm run build
```

### B. Deploying to Vercel (Fully Optimized)
This repository is configured and tuned for 1-click deployment on **Vercel**:

1. **Vercel Routing Configuration (`vercel.json`)**:
   - Single Page Application (SPA) rewrite rules ensuring all routes (`/story`, `/work`, `/music`, `/ideas`, `/speaking`, `/contact`) resolve to `/index.html` without 404 errors on direct browser refresh.
   - 1-year immutable caching headers for `/assets/*` assets.
   - Modern HTTP security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).

2. **Serverless Contact Function (`/api/contact.ts`)**:
   - A Node.js serverless endpoint ready to process inquiry POST requests natively on Vercel.

3. **Vite Bundle Optimizations (`vite.config.ts`)**:
   - Manual chunk splitting separating `vendor-react`, `vendor-icons` (Lucide), and `vendor-motion` to keep page weight minimal and ensure sub-second First Contentful Paint.
   - Target set to `es2022` with CSS minification.

4. **SEO & Static Assets**:
   - Monogram SVG favicon (`/public/favicon.svg`), search engine rules (`/public/robots.txt`), and full bilingual XML sitemap (`/public/sitemap.xml`).

#### Deployment Steps:
1. Push your project to a GitHub, GitLab, or Bitbucket repository.
2. In your [Vercel Dashboard](https://vercel.com/new), select **Import Project** and connect your repository.
3. Vercel will automatically detect:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Your site will be live on an edge network with instant global CDN caching and SSL.

---

## 4. Editorial Integrity
All public claims in this build strictly observe source documentation from February 2026. Numbers are presented as historical milestones without fabricated live counters or unsubstantiated superlatives. See `CONTENT_REVIEW.md` for complete verification notes.
