# AirliPay Dashboard

Next.js 13 admin dashboard for AirliPay staff.

## Setup

```bash
cp .env.development.sample .env.local
npm install
npm run dev
```

`NEXT_PUBLIC_BASE_URL` is required and is baked into the client bundle at build
time; rebuild after changing it. Do not put secrets in `NEXT_PUBLIC_*` values.

## Quality checks

```bash
npm run lint
npm run build
```

CI runs both on pull requests and pushes to `main`.

## Session policy

- Idle timeout: 30 minutes without pointer, keyboard, touch or scroll activity.
- Warning: 60 seconds before sign-out. Activity or **Stay signed in** resets the timer.
- Sign-out is server-backed: the console calls `POST /auth/logout`, which bumps the
  account token version and revokes issued tokens.
- Token lifetime: 24 hours by default, 30 days when **Remember this device** is
  selected. Remembered sessions still follow the inactivity rule.
- Idle and expired-session redirects return the user to the page they were viewing
  after the next sign-in.

## Role access

- Employees (`USER`) see only their own overview, transaction ledger, profile and
  pay-period earnings statements. The Employees page, company aggregates, Needs
  attention and admin sections are hidden **and** denied by the API.
- Company admins (`CLIENT`) see their own workforce, invoices and service charge.
- Operations admins (`ADMIN`) additionally see clients, team access and the audit
  log. Invoice and account status overrides are audit-logged.

## Deployment

The production image uses the Next.js standalone output:

```bash
docker build --build-arg NEXT_PUBLIC_BASE_URL=https://api.airlipay.com -t airlipay-dashboard .
```

Pushing to the `deploy` branch (or running the manual workflow) publishes
`ghcr.io/techarcgram-org/airlipay-dashboard:sha-<short-sha>` via
`.github/workflows/ghcr.yaml`. Set the repository variable
`NEXT_PUBLIC_API_BASE_URL` to the production API origin; it must match the
Ansible `airlipay_api_domain`. The separate `techarcgram/infra` repository
(`../infra` in the workspace) deploys this tag with
`ansible/playbooks/deploy-dashboard.yml`.

Console routes remain guarded client-side; every console action is still
authorised by the API's role and ownership checks.
