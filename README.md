# Importer Member UI (Next.js)

UI-only project built from the full **Member Registration User Guide** PDF.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Heroicons (`@heroicons/react`)
- `clsx` for conditional class composition

## Run

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Build Check

```bash
npm run lint
npm run build
```

## PDF Coverage

This project maps the guide chapters into route-based UI screens:

- `/apply-member` (Pages 2-6)
- `/forgot-password` (Pages 7-10)
- `/login` (Pages 11-12)
- `/dashboard` (Pages 12-13)
- `/search-hs` (Pages 13-14)
- `/profile` (Pages 14-15)
- `/member-extension` (Pages 16-17)
- `/change-password` (Page 17)
- `/recommendations` (Pages 17-18)
- `/sub-member/create` (Pages 18-20)
- `/sub-member/deactivate` (Pages 20-22)
- `/sub-member/activate` (Pages 22-24)
- `/payment-history` (dashboard user menu item)

## Design Direction

- Uses `index.html` style direction as base:
  - brand navy palette
  - rounded cards and panels
  - compact uppercase labels
  - data-list/table sections
- Built as reusable, API-ready UI modules (no backend wiring yet).

## Project Structure

- `src/app/*` route pages
- `src/components/site-shell.tsx` shared header/sidebar shell
- `src/components/guide-ui.tsx` reusable UI blocks (cards, tables, step timeline)
- `src/lib/guide-data.ts` chapter metadata
- `src/app/globals.css` design tokens and shared utility classes

## Notes

- This is a frontend-only implementation.
- Table data and actions are mocked to match guide behavior and layout.
