# Kaarigiri

Premium artisan-inspired commerce storefront for Pakistan and international customers.

## Current implementation status

This repository contains the initial storefront foundation: responsive brand homepage, sample catalogue, PKR/USD display switcher, client-side shopping bag, products API, Prisma data model and project scripts. **Checkout, customer authentication, admin authorization, payment processing, shipping integrations and production database provisioning are not yet complete.** Do not accept real orders or payments using this starter.

## Stack
Next.js 15, React 19, TypeScript, Tailwind CSS 4, Prisma 6, PostgreSQL, Vitest and Playwright.

## Local setup
1. Install Node.js 20.9+.
2. `npm install`
3. Copy `.env.example` to `.env` and configure a PostgreSQL database.
4. `npm run db:generate`
5. `npm run dev`
6. Open http://localhost:3000

## Database
After configuring DATABASE_URL and DIRECT_URL: `npm run db:migrate`. The schema currently models users, products, orders, order items and payments. Add migrations and reviewed seed data before use.

## Deployment
Import this repository into Vercel, set the Root Directory to `.` and add DATABASE_URL and DIRECT_URL in Project Settings. Configure payment credentials only after merchant approval. A successful Git connection triggers preview/production builds according to branch settings.

## Payments and compliance
Payment provider integrations are intentionally not activated. Merchant eligibility, settlement, webhook signing, refunds, tax and shipping rules must be validated with each provider. Never store card numbers or CVV. Never commit `.env` or secrets.

## Security checklist before launch
- Add registration/login with Argon2id or bcrypt and secure HttpOnly session cookies.
- Add server-side authorization for every admin endpoint.
- Recalculate prices, stock, shipping and discounts on the server.
- Add signed, replay-protected, idempotent payment webhooks.
- Add rate limiting, CSRF protections for cookie-authenticated mutations, schema validation and audit logs.
- Add privacy, returns, shipping and terms pages.
- Run unit, integration, browser, dependency and security tests.
