# AirliPay Back Office Generator (Figma plugin)

A local Figma development plugin that generates a complete, static back-office redesign for AirliPay staff. The visual direction is an Expo-EAS-style operations shell, built entirely from the mobile app's light and dark theme tokens.

The plugin creates one review page with:

- **27 desktop screens per theme** (54 frames at 1440 × 960 when generating both)
- **Light and dark theme bands**, stacked for full-theme review
- **Two foundations plates** covering colour, type, spacing, shell anatomy, controls and data display
- **A cover / reading guide**
- **A 30-row route coverage and handoff matrix** with data-contract notes
- Explicit **fixture, concept, UI-gap and proposed** labels wherever the backend cannot yet support the screen

This is a design review artifact. It does not modify the Next.js dashboard, create prototype links, or write Figma variables, components or styles.

## What is designed

The shell borrows EAS's dense desktop grammar — dark rail, command bar, breadcrumbs, tabs, compact tables, inspectors — without copying its identity. AirliPay's navy, cobalt, mint, canvas, status colours and Inter ramp come from `AiliPayApp/src/theme/tokens.js`.

| Group | Screens |
|---|---|
| Access | Sign in, Operations overview, My profile |
| Employees | Roster, new employee, employee profile (Transactions default tab), mobile money accounts, activity feed, bank accounts, debit cards, edit employee |
| Clients | Portfolio, new client, client profile (Transactions default tab), workforce roster, funding accounts, payment history, client payouts, edit client |
| Team | Admins, invite admin, admin profile, edit admin |
| Finance | Transactions ledger, invoices, invoice detail, payout runs |

Route coverage: **29 live routes + 1 excluded root redirect**, represented by 27 screens. `/dashboard/users/[id]/transactions` and `/dashboard/clients/[id]/transactions` are consolidated into the default Transactions tab of their detail screens. The plugin's matrix records this.

### Truthful surfaces

The following are not shipped capabilities and are labelled accordingly:

| Screen / route | Status |
|---|---|
| Activity feed (`/users/[id]/activity-feed`) | **Fixture**. The current page generates sample data; a real audit endpoint is required. |
| Employee bank accounts (`/users/[id]/bank-accounts`) | **Fixture UI**. The current page is random data; `list-banks` exists. |
| Debit cards (`/users/[id]/debit-cards`) | **Concept**. No card product or backend. |
| Client funding accounts (`/clients/[id]/bank-accounts`) | **Fixture**. A client-bank model and funding webhook are required. |
| Client payouts (`/clients/payment`) | **Legacy fixture**. Retained as a payment-schedule view. |
| Admin profile (`/admins/[id]`) | **UI gap**. The current page body is blank even though `GET /admin/:id` exists. |
| Payout runs (`/payments`) | **Proposed orchestration**. The current page duplicates the invoice table; no payout-run object exists. |

Other deliberate handoff decisions:

- Login uses the current `username` field.
- New client and invite-admin forms use secure email invitations instead of administrator-created passwords. This requires a backend change.
- Admin role labels and 2FA state are proposed until the API exposes them.
- Invoice status writes stay on the invoice resource; roster status writes stay on the employee resource.
- Invoice line items are validated against `totalAmount`. Overview “paid / unpaid” metrics are not treated as invoice statuses.

## Requirements

- Figma Desktop
- Node.js 20+
- Inter available in Figma (it ships with Figma)

## One-time plugin ID

The manifest contains a development placeholder:

```json
"id": "airlipay-backoffice-dev"
```

If Figma asks for a real ID, create a development plugin in Figma Desktop (Plugins → Development → New plugin) and copy the assigned ID into `manifest.json`. Keep the rest of the manifest unchanged. The plugin never reuses the mobile redesign plugin's ID.

## Build and check

```bash
npm install
npm run typecheck
npm run build
npm run validate
npm run smoke
node --check plugin.js
# everything:
npm run check
```

`plugin.js` is committed and directly importable. `validate.mjs` is generated and ignored.

What the checks prove:

- **Route scan:** all 30 page routes under `../src/app` match the canonical catalog.
- **Coverage:** 29 live routes mapped, 1 excluded redirect, exactly two default-tab consolidations.
- **Registry:** 27 unique screens and builders, group counts 3 / 8 / 8 / 4 / 4.
- **Data:** schema enums only; unique IDs and valid relationships; invoice line-item totals; realistic roster and invoice data.
- **Contrast:** body text and every status-pill pair pass 4.5:1 in both themes.
- **Geometry:** 3 columns, 4656px board, 1440×960 frames, nine rows, marker isolation from the mobile plugin.
- **Mock Figma run:** first generation, collision-safe naming, replacement, cancellation, light-only scope and a node budget. The current build creates about 20.2k nodes for a full 54-screen board.

## Import and run

1. Open a disposable Figma file with at least one unrelated page.
2. Plugins → Development → Import plugin from manifest…
3. Select `design/figma-plugin/manifest.json`.
4. Run **AirliPay Back Office Generator**.
5. Choose **Both themes**, **Light only**, or **Dark only**.
6. Keep **Replace previous generated board** checked when iterating.
7. Generate and follow the progress log.

On first run the plugin adds a page named `AirliPay · Back Office Redesign (v1)`. If that name is already used by an unmarked page, it creates a suffixed page instead of overwriting. If a marked board already exists, generation stops unless replacement is enabled.

Generation is staged on a separate working page and committed only after structural assertions pass. Cancelling removes the staging page and leaves the existing board untouched.

## What to verify in Figma

- One board page with 5 sections, 54 app frames, 2 foundation plates and 30 route rows.
- Every app frame is exactly 1440 × 960 with its caption outside the frame.
- No clipped headers, overflowing table cells or inspector content.
- Light and dark bands use the mobile palette and remain legible.
- B03 and C03 show the Transactions tab active; their matrix rows say **Default tab**.
- Fixture/concept screens are visibly labelled in captions and on-screen.
- Regeneration leaves exactly one board and no working page.
- Cancellation leaves the previous board intact.
- No network requests and no missing images.

Figma cannot run in CI. The smoke test exercises the committed bundle against a mocked Figma runtime, but the manual checklist above remains the visual acceptance gate.

## Design direction

- **Light:** navy rail `#0A2540`, canvas `#F5F7FA`, white surfaces, ink `#0B1220`, cobalt links `#245BFF`, mint primary `#6FE7C8`.
- **Dark:** canvas `#061322`, surfaces `#0B1E32`, sidebar `#061A2F`, ink `#F2F6FB`, light cobalt `#93ADFF`, same mint primary.
- **Type:** Inter only. The mobile ramp (display 44 / page title 28 / metric 30 / body 16) is extended with dense table and micro labels. Money is `XAF 1,248,500`; dates read `23 Oct 2026 · 09:42`.
- **Controls:** mint primary action, outlined secondary, cobalt reserved for links/selection; 8px control radius, 12–16px cards, pill status chips.
- **Data display:** 2px charts, quiet grids, sparklines, progress bars and compact status language. No decorative gradients or drop shadows.
- **Navigation:** dark rail + command bar + page header + URL-driven tabs; detail screens use a right inspector instead of duplicate tables.

## Structure

```text
design/figma-plugin/
  manifest.json        Figma development manifest, no network access
  ui.html              self-contained generator UI
  build.mjs            Rollup + TypeScript build
  plugin.js            committed importable bundle
  smoke-test.mjs       mocked Figma runtime
  src/main.ts          page safety, staging, assertions, commit/replace
  src/tokens.ts        mobile light/dark palette + desktop tokens
  src/primitives.ts    Figma node/font/text/stack helpers
  src/icons.ts         original inline SVG icons
  src/data.ts          typed mock data and formatters
  src/patterns.ts      buttons, fields, pills, tables, charts, feedback
  src/patterns/shell.ts sidebar, command bar, page header, app frame
  src/screens/         access, employees, clients, admins, finance, foundations
  src/spec/routes.ts   canonical 30-row route catalog
  src/spec/screens.ts  canonical 27-screen registry
  src/layout/board.ts  cover, theme bands, captions, coverage matrix
  src/validate.ts      route, data, contrast and geometry validation
```

## Limitations and non-goals

- Static review boards only; no prototype links.
- No generated Figma variables, shared styles or components.
- Payout runs, debit cards, granular roles and 2FA are proposals.
- The dashboard source is untouched; porting the design into Next.js is separate work.
- Additional empty/error/loading states are represented in Foundations rather than as extra app frames.
- Admin invitation flows and richer role state require backend work before implementation.
