# VoyaDeal

VoyaDeal is a global AI trip-negotiator frontend built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, GSAP ScrollTrigger, Lucide, and Zustand. The interface supports regional preferences, locale-aware prices and dates, fictional vendor conversations, and a Deep Space glass theme.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For a production build, run `npm run build` and `npm start`.

## Frontend structure

- `app/` contains the App Router layout, landing page, and global responsive styles.
- `components/space-background.tsx` provides the persisted Deep Space, Nebula, and Aurora modes, layered canvas starfield, nebula clouds, orbital planet, and shooting stars.
- `components/cosmic-particles.tsx` provides the cursor-responsive particle field and click supernova effect.
- `components/ui.tsx` exports `GlassCard`, `GlowButton`, `GradientText`, `Chip`, `AnimatedNumber`, and `Toast`.
- `components/site-nav.tsx` provides the floating navigation, orbital space-mode picker, and `RegionSwitcher`.
- `components/negotiation-arena.tsx` shows region-driven negotiation style, tactic chips, etiquette, vendor-local time, and demo chat.
- `components/global-trip-tools.tsx` contains the destination globe, multi-stop planner, indicative tax/FX preview, filters, entry hint, local time, and seasonal price calendar.
- `components/consent-banner.tsx` and `app/privacy/` provide consent and privacy UI; `app/how-it-works/` explains the negotiation prototype.
- `lib/locale.ts`, `lib/format.ts`, and `lib/fx.ts` contain locale detection, formatting, and mock currency conversion.
- `hooks/use-locale.ts` exposes `useLocale()` and persists the selected country, language, currency, units, date format, and time cycle in local storage.
- `regions/` contains typed country/region packs; `messages/` contains English, Hindi, Hinglish, Spanish, and shared key scaffolding for additional languages.
- `store/` holds the Zustand stores for persisted space mode, locale preferences, and toast notifications.
- `tailwind.config.ts` contains Deep Space palette, glass glows, blur, and twinkle/drift/orbit/shoot/pulse animation tokens.

## Locales, currencies, and region packs

Preferences are inferred from `navigator.languages`/`navigator.language` and the browser time zone; `lookupCountryByIp()` is an intentionally empty, swappable geolocation hook. `RegionSwitcher` lets travelers override country, language, currency, metric/imperial units, date format, and 12/24-hour time. Preferences are stored locally in this prototype.

Currency formatting uses `Intl.NumberFormat`; `lib/fx.ts` provides typed mock FX rates for 34 currencies and can be replaced by a live rate provider. The conversion and tax previews are indicative, not vendor quotes. Formatter examples are in `lib/format.examples.ts`.

English, Hindi, Hinglish, and Spanish currently have translated message values. French, German, Portuguese, Arabic, Japanese, Korean, Simplified Chinese, Indonesian, Turkish, and Russian each reference the shared key scaffold; missing values intentionally fall back to English until translated. Arabic sets RTL document direction and mirrored layout rules.

The example packs are `in`, `us`, `uk`, `eu`, `ae`, `sg`, `au`, `jp`, `br`, `latam`, and `sea`. To add a country to an existing market, add its country code and local data to that pack file. To add a distinct market, create `regions/{code}.ts` using `RegionPack`, then register it in `regions/index.ts`. Packs cover currencies, destinations/routes, transport, payment options, seasonal events, negotiation etiquette, tactics, tax hints, and vendor tone.

The trip search and negotiation chat are frontend prototypes. No real vendor is contacted, vendor names are fictional, and final booking must happen with the vendor. Visa, tax, payment, seasonal, and FX information is illustrative and should be checked against an official source or provider.
