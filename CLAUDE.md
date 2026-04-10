# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager: **pnpm** (see `pnpm-lock.yaml`).

- `pnpm dev` — start Vite dev server with HMR
- `pnpm build` — typecheck (`tsc -b`) then Vite production build
- `pnpm lint` — run ESLint over the repo
- `pnpm preview` — preview the built `dist/`

No test runner and no code formatter (Prettier/Biome) are configured — ESLint is the only lint/style gate. Run `pnpm build` to catch type errors; `tsc -b` in build mode runs before Vite bundles.

## Stack

- React 19 + TypeScript, bundled with Vite 8 (`@vitejs/plugin-react`)
- Routing via `react-router-dom` v7
- Styling via CSS Modules (`*.module.css`) — no CSS framework
- ESLint flat config (`eslint.config.js`) with `typescript-eslint`, `react-hooks`, `react-refresh`
- TypeScript project references: `tsconfig.app.json` (app code) + `tsconfig.node.json` (Vite config). `tsconfig.app.json` enables `noUnusedLocals` / `noUnusedParameters`, so dead bindings fail the build.
- `vite.config.ts` is intentionally minimal (only `@vitejs/plugin-react`) — no path aliases, no custom build tweaks.

## Architecture

The app is a small client-only pet store SPA. All product data is hard-coded; there is no backend, no API, no persistence, and no env vars.

- **Routing** (`src/App.tsx`) — `BrowserRouter` wraps a single `Layout` route with children:
  - `/` → `HomePage`
  - `/productos` and `/productos/:category` → `ProductsPage` (category is a URL param, one of `perros | gatos | aves | peces`)
  - `/producto/:id` → `ProductDetailPage`
  - `/carrito` → `CartPage`
- **Cart state** (`src/context/CartContext.tsx`) — single global store via `useReducer` + Context. The reducer recomputes `totalItems` / `totalPrice` after every mutation through `computeTotals`, so consumers should never derive totals themselves. `UPDATE_QUANTITY` with `quantity <= 0` removes the item. Access via the `useCart()` hook (throws outside `CartProvider`). Cart state is in-memory only — refresh clears it.
- **Domain types** (`src/types/index.ts`) — `Category` is a string-literal union; adding a new pet category requires updating this union, `src/data/categories.ts`, and `src/data/products.ts` together.
- **Static data** (`src/data/`) — `products.ts` and `categories.ts` are the source of truth for catalog content. Products are filtered client-side by category param in `ProductsPage`.
- **Components** are grouped by domain under `src/components/{cart,layout,product,ui}`, each component paired with its own CSS Module. `ui/` holds generic primitives (e.g. `Button`); `layout/` holds the shared `Layout` / `Header` / `Footer`.

## Conventions

- The app is fully Spanish-localized (`<html lang="es">` in `index.html`). UI copy and route paths are in Spanish (`/productos`, `/carrito`). Keep new user-facing strings and routes in Spanish to match.
- Prices are formatted via `src/utils/formatPrice.ts` — use it instead of inline formatting.
- Each component owns a sibling `*.module.css` file; follow the same pattern for new components rather than adding global styles to `index.css`.
