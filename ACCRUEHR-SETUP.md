# AccrueHR marketing and website enquiry integration

Production product page: https://accruetechnologies.com/accruehr . The homepage, main navigation and footer promote AccrueHR. Product enquiries use /accruehr/contact/?request=registration (also support or feedback).

Requests are validated and stored in the website SQLite enquiry inbox, then signed server-to-server and delivered to AccrueHR. Platform administrators review them at /platform/website-enquiries. Status updates and internal notes do not create organizations, subscriptions, accounts or send emails. Registration is a human-reviewed enquiry.

## Production configuration

Keep secrets out of Git and client bundles. Website variables:

- DATABASE_PATH: persistent website SQLite file
- PUBLIC_SITE_URL: website HTTPS origin
- ACCRUEHR_ENQUIRY_URL: https://YOUR-PORTAL/api/public/website-enquiries
- ACCRUEHR_ENQUIRY_SECRET: a random secret of at least 32 characters
- Existing MAIL_SERVICE_URL and MAIL_SERVICE_KEY: optional acknowledgement email service

Backend: set app.website.enquiry-secret (or APP_WEBSITE_ENQUIRY_SECRET) to the same shared secret. Apply V39__website_enquiries.sql to public before releasing the backend. The dedicated ingress accepts HMAC-SHA256-signed POST requests with a five-minute timestamp tolerance; no browser-held integration key, public inbox reads or cross-origin browser API access is required. Reference and payload hash provide idempotency. Deliver only over HTTPS in production. Keep server clocks synchronized.

The `enquiry-sync` Compose service runs the retry worker every minute with the same private environment and database volume. The underlying command is:

    node --experimental-transform-types scripts/sync-accruehr.mjs

The worker processes up to 25 due product enquiries per invocation, with exponential backoff, a five-minute sending lease, and up to ten automatic attempts. Run the job from the project directory when invoking it manually. Website admins can also use “Retry AccrueHR delivery” to retry pending/exhausted deliveries. Product enquiry delivery status is visible in the website admin inbox. The normal website 90-day retention policy still applies; monitor pending deliveries and resolve them before expiry. The portal inbox requires its own operational retention policy before accepting real customer data.

## Local verification

    npm run test:enquiries
    npx tsc --noEmit
    npm run build

Local-only .env.local and backend .runtime/website-integration.properties contain the shared development signing configuration. The preview database is /private/tmp/accrue-website-preview.sqlite; it is disposable and must not be used for production. Local previews have no live email service configured.

Deployed on 4 November 2026 under `/opt/accrue-technologies/releases/20261104-0930`, with the production website database in the existing Docker volume. The signing key is shared privately with the AccrueHR portal; no key is shipped to browsers. A pre-deployment online SQLite backup is stored in `/opt/accrue-technologies/backups/pre-20261104-0930.sqlite`. The previous website image is tagged `accrue-technologies-website:pre-20261104` for rollback.
