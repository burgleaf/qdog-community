# QDog — Web Gallery

A Next.js static site that serves as the public gallery for community Codex pets.

## Development

```bash
cd web
npm install
npm run dev
```

The dev server runs `prepare-site` automatically to generate data from the repository.

If preview assets are missing locally, run `npm run previews` in the repo root first so `web/public/assets/previews/` can be bundled.

## Build

```bash
npm run build
```

Output is in `web/out/` (static HTML export).

Pull-request CI uses `npm run build:pr` because a clean contributor checkout does not contain the ignored full preview tree. The production `npm run build` additionally verifies that every catalog preview is present and that QA-only GIF/contact-sheet files are absent from the Pages bundle.

## Deployment (Cloudflare Pages)

The site deploys automatically after commits land on `main`. The `Pet previews` workflow regenerates previews/README data, commits those generated files, then builds and deploys the web gallery from the latest `main` state.

There is also a separate manual/tag-based deploy workflow available as a fallback (`v*`, `web-v*`, or manual dispatch).

Complete GIF, WebP, and contact-sheet previews are generated for the CI artifact. The Pages bundle only includes thumbnails and animated WebP files referenced by the gallery and README, rather than every QA output under `assets/previews/`.

This means README preview links can point at the deployed site while the repository stays leaner over time.

### Setup (one-time)

1. Create a Cloudflare account at [dash.cloudflare.com](https://dash.cloudflare.com)

2. Create an API Token:
   - Go to My Profile → API Tokens → Create Token
   - Use the "Edit Cloudflare Workers" template
   - Or create custom token with permissions: `Account > Cloudflare Pages > Edit`

3. Find your Account ID:
   - Go to any domain in your Cloudflare dashboard
   - Account ID is in the right sidebar under "API"

4. Add GitHub Secrets to your repository:
   - `CLOUDFLARE_API_TOKEN` — the API token from step 2
   - `CLOUDFLARE_ACCOUNT_ID` — your account ID from step 3

5. Merge or push to `main` once — the `Pet previews` workflow will create the Pages project on first run and deploy automatically. If needed, you can also push a release tag (for the fallback deploy workflow) or trigger a deploy manually from the Actions tab.

### Custom Domain

The production site uses [q.dog](https://q.dog). After the first deploy:

1. Go to Cloudflare Dashboard → Workers & Pages → qdog-community
2. Custom domains → Add a custom domain
3. Add `q.dog`. If the domain is already on Cloudflare DNS, Pages configures the required record automatically. Otherwise, update the DNS records shown by Cloudflare.
4. Configure a permanent redirect from `www.q.dog/*` to `https://q.dog/$1`, preserving the path and query string.
5. In the account-level **Bulk Redirects** settings, add `www.q.dog/` and `qdog-community.pages.dev/` as source URLs with `https://q.dog/` as the target URL. Enable subpath matching, preserve path suffix, and preserve query strings.
6. Set `NEXT_PUBLIC_SITE_URL=https://q.dog` for production builds so canonical, OpenGraph, sitemap, and share URLs use the custom domain.

Keep this Pages project static. Do not add `_worker.js` only to perform canonical-host redirects: Pages Advanced Mode would invoke a billable Function for every HTML, JavaScript, stylesheet, and preview image request. Account-level redirects run before Pages without turning static assets into Function invocations.

### Manual Deploy (optional)

```bash
cd web
npm run build
npx wrangler pages deploy out --project-name=qdog-community
```

## Architecture

- **Framework**: Next.js 15 with static export (`output: "export"`)
- **Styling**: Tailwind CSS v4
- **i18n**: Client-side locale detection (zh/en) with React Context; visible browser-tab titles follow the active locale while static route metadata remains crawlable
- **Data**: Generated at build time from `pets.json`, `requests.json`, and individual pet metadata
- **Collection visibility**: Series and themes are published after they contain at least three pets
- **Community pages**: Static contributor profiles, rankings, `/requests`, and `/requests/<issue-number>` request details are generated at build time
- **Hosting**: Cloudflare Pages (global CDN, free tier)
- **Stats reads**: deployment-time `public/stats.json`, served as a free Pages static asset; rankings do not poll the Worker
- **Stats writes and requests**: a separate Worker at `https://resource.q.dog` records explicit installs, IP-limited pet likes, creator follows, and request support. The no-account request form accepts a checked PNG/JPEG/WebP upload or a public image link; uploads are stored in a private R2 bucket and served through a read-only content-hash URL. Rankings reuse total and 7-day like counts instead of introducing another popularity action. Ordinary page views never invoke the Worker. See `worker/README.md`.
- **Preview delivery**: cards load a static thumbnail first and fetch animation on hover or keyboard focus; the top three pet rankings animate automatically while lower pet rows and contributor/collection mosaics animate on interaction; detail pages keep the complete action set
- **Caching**: Next.js hashed assets are immutable, preview assets use a seven-day browser cache, and the deployment-time statistics snapshot uses a ten-minute cache

## Environment variables

| Variable                               | Default                  | Used in                            |
| -------------------------------------- | ------------------------ | ---------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                 | `https://q.dog`          | `app/layout.tsx` metadata base     |
| `NEXT_PUBLIC_STATS_WRITE_API`          | `https://resource.q.dog` | `lib/stats.ts`                     |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | _unset_                  | Google Search Console verification |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION`   | _unset_                  | Bing Webmaster verification        |

Production is built in GitHub Actions before upload to Cloudflare Pages. Store the verification values as GitHub Actions secrets named `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION`; the deployment workflows expose them to Next.js at build time. Runtime-only Cloudflare Pages variables do not affect the prebuilt metadata.

## SEO checklist

The site is configured for indexing out of the box: per-page titles, descriptions, bounded bilingual keyword sets, canonical URLs, OpenGraph + Twitter cards, JSON-LD (`WebSite`, `CollectionPage`, `ItemList`, `HowTo`, `FAQPage`, `CreativeWork`, `BreadcrumbList`), `sitemap.xml`, and `robots.txt`. Pet pages expand creator-provided tag identifiers into English and curated Chinese search terms. Export post-processing sets `lang="zh-CN"` on the dedicated Chinese pages, and the SEO check rejects missing titles, sparse or unbounded keyword sets, and incorrect document languages. Dedicated server-rendered answers cover one-step installation at `/install` and `/zh/install`, plus free community character requests at `/request` and `/zh/request`.

To actually surface in search results, do this once after the first deploy:

1. **Google Search Console** — [search.google.com/search-console](https://search.google.com/search-console). Add the property, choose the HTML tag method, store the verification token as the GitHub Actions secret `GOOGLE_SITE_VERIFICATION`, redeploy, then submit `https://q.dog/sitemap.xml`.
2. **Bing Webmaster Tools** — [bing.com/webmasters](https://www.bing.com/webmasters). Store its token as the GitHub Actions secret `BING_SITE_VERIFICATION`. The deployment workflows inject both secrets into the corresponding `NEXT_PUBLIC_*` variables at build time.
3. **Canonical domain** — keep `NEXT_PUBLIC_SITE_URL` set to `https://q.dog`. Use account-level Bulk Redirects for `www` and the default Pages hostname; do not use a Pages `_worker.js` for host redirects.
4. **Automatic discovery** — every production deployment submits the canonical sitemap URLs to IndexNow. This helps participating search engines such as Bing discover changes without a manual submission.
5. **AI search access** — deployment verifies that `OAI-SearchBot` can retrieve the Chinese installation answer, `llms.txt`, and `robots.txt` from the production domain.
6. **External links** — once a few real sites link to the gallery (X, Reddit, GitHub topic pages, awesome-\* lists), Google will pick the site up much faster.

## GEO positioning

Search pages and model-facing resources should describe QDog consistently:

- It is primarily a free community gallery for browsing, previewing, downloading, and installing Codex pets.
- It works like a pet store or library, but it is not a paid marketplace or an official OpenAI product.
- Anyone can submit a character request for free. Community contributors may volunteer to make it, but requests are not delivery promises.
- Crafting and contribution documentation is a secondary contributor path, not the main visitor value proposition.

`npm run build` enforces these claims in the home page, Chinese entry, request pages, sitemap, JSON-LD, and generated `llms.txt`.
