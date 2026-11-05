# Kaarigiri

Premium artisan-inspired progressive commerce storefront for Pakistan and international customers.

## Included
- Responsive storefront, product detail pages, PKR/USD product display, browser shopping bag, PWA manifest and offline fallback.
- Customer registration/login with bcrypt password hashing, signed HttpOnly sessions, account order history and guest order lookup.
- Server-validated order creation with database-backed price and stock checks in a serializable transaction.
- Role-protected admin dashboard for store metrics, product creation/activation/stock and order status updates.
- Prisma/PostgreSQL schema, repeatable sample catalogue seed, Vitest unit tests and GitHub Actions CI.

## Local setup
1. Node.js 20.9+ and PostgreSQL are required.
2. `npm install`
3. Copy `.env.example` to `.env`.
4. Set `DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET` (random secret, minimum 32 characters) and `NEXT_PUBLIC_STORE_URL`.
5. `npm run db:generate`
6. `npm run db:push`
7. `npm run db:seed`
8. `npm run dev`

## Create the first administrator
1. Register your own account at `/account`.
2. On a trusted local shell, set `ADMIN_EMAIL` to the exact email address of that account and run `npm run db:make-admin`.
3. Sign in again and visit `/admin`.
Never expose the database URL or session secret in chat or source control.

## Payment and shipping status
Checkout creates pending orders and a manual-pending payment record. It does not collect money or store card data. Admins can mark a payment as manually verified only after independently confirming the funds. No card gateway, payment webhook, refund processing, carrier booking, live shipping rates or shipment tracking provider is connected yet. Shipping prices in the checkout API are development placeholders and must be replaced before launch.

## Production prerequisites
Provision PostgreSQL, configure secrets in the hosting dashboard, run schema setup and seed, test on a preview deployment, and only then release. Add email verification/password reset, rate limiting, automated security and end-to-end tests, operational logging, legal policies and verified product content before public commercial launch. Do not accept real payments until an approved payment provider and signed webhook flow are implemented.
