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

## Deployment

The production image uses the Next.js standalone output:

```bash
docker build --build-arg NEXT_PUBLIC_BASE_URL=https://api.airlipay.com -t airlipay-dashboard .
```

Authentication hardening and server-side route protection are tracked for
launch readiness; the current guard is client-side only.
