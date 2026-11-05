# Kaarigiri

Premium artisan-inspired commerce storefront for Pakistan and international customers.

## Implemented

- Responsive storefront with product search, category filters, PKR/USD display and individual product pages.
- Browser-persisted shopping bag shared between product pages and checkout.
- Progressive Web App manifest, service worker, install support and offline fallback.
- Customer registration and sign-in using bcrypt password hashing and signed, HttpOnly session cookies.
- Customer account order history and guest order lookup by reference plus checkout email.
- Checkout form and server-side order creation. Product prices and stock are loaded and checked on the server inside a serializable database transaction.
- Pending/manual payment record only. No card data is collected or processed.
- Prisma/PostgreSQL schema and seed data for the sample catalogue.
- Vitest cart utility tests and GitHub Actions checks.

## Stack

Next.js 15, React 19, TypeScript, Tailwind CSS 4, Prisma 6, PostgreSQL, Zod, bcryptjs, jose, Vitest and Playwright.

## Local setup

1. Install Node.js 20.9+.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Set `DATABASE_URL` and `DIRECT_URL` to your PostgreSQL database.
5. Set `AUTH_SECRET` to a cryptographically random secret of at least 32 characters. For example, generate one locally with `openssl rand -base64 48`.
6. Run `npm run db:generate`.
7. Run `npm run db:push` to create/update database tables.
8. Run `npm run db:seed` to add the sample products.
9. Run `npm run dev` and open http://localhost:3000.

## Order and payment behavior

Checkout currently creates an order with PENDING status and a MANUAL_PENDING payment record. The customer sees a clear notice that payment has not been collected. The current shipping fee schedule is a development placeholder (Pakistan: PKR 350 / USD 5; international: PKR 2,500 / USD 15) and must be replaced with actual carrier quotes and merchant-approved rules before accepting live orders. Product stock is decremented transactionally when the pending order is created; add reservation expiry/cancellation handling before launch.

No card number, CVV or bank credentials are stored. Do not claim a payment is complete based on order creation.

## Deployment configuration

Configure these server-side environment variables in the hosting provider:
- `DATABASE_URL`
- `DIRECT_URL`
- `AUTH_SECRET`
- `NEXT_PUBLIC_STORE_URL`

Run `npm run db:push` and `npm run db:seed` against the production database as a controlled deployment step. Do not put secrets in source control or send them in chat.

## Not yet production-ready

- No live payment gateway, signed payment webhooks, refunds or payment reconciliation.
- No carrier integration, live international shipping rates, duties/tax calculation or shipment tracking.
- No email verification, password reset, email order confirmation or delivery notifications.
- No admin dashboard or server-side admin management endpoints yet.
- No rate limiter, durable cart, stock reservation expiry, comprehensive audit log or full browser/security test suite.
- Sample products, product photography, prices and shipping rates need merchant verification.
- Add privacy, terms, shipping, returns and cancellation policies before launch.

Do not accept real payments or represent sample data as a live commercial catalogue until the remaining launch controls and integrations are complete.
