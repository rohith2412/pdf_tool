# pdftools

A minimal, private PDF utilities site. All PDF processing runs in your browser. MongoDB stores only your Google login profile and a global visitor count.

## Stack

- Next.js 15 (App Router, TypeScript, React 19)
- Tailwind CSS (hand-rolled minimal design system)
- NextAuth v5 (Google provider, JWT sessions)
- MongoDB (users + visitor stats only)
- `pdf-lib` + `pdfjs-dist` for client-side PDF work

## Setup

```bash
cp .env.example .env.local
# fill in NEXTAUTH_SECRET, GOOGLE_CLIENT_ID/SECRET, MONGODB_URI
npm install
npm run dev
```

Generate a `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

Google OAuth: create credentials at https://console.cloud.google.com - add `http://localhost:3000/api/auth/callback/google` (and your production URL) as an authorized redirect URI.

## Scripts

```bash
npm run dev        # start dev server
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

## Adding a new tool

1. Append an entry to `content/tools.ts`.
2. Create `app/<slug>/page.tsx` using `<ToolLayout>` and the tool's client component.
3. Optionally create `app/how-to-<slug>/page.tsx` for the long-form variant, then add it to `HOW_TO_PAGES`.
4. `sitemap.ts` and internal links pick it up automatically.

## What ships in this scaffold

- Home tool index with visitor count
- Merge PDF tool + `how-to-merge-pdf` long-form page (both fully SEO-instrumented)
- Nine placeholder tool entries in `content/tools.ts` (add pages next)
- MongoDB visitor counter (`/api/visits`, session-debounced ping)
- Google sign-in + account page
- `sitemap.xml`, `robots.txt`
- JSON-LD: Organization, WebSite, BreadcrumbList, SoftwareApplication, HowTo, FAQPage
- Privacy + About + 404

## Privacy

Your PDFs are processed entirely in your browser. Files are never uploaded, stored, or transmitted anywhere.
# pdf_tool
