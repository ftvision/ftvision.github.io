/**
 * Cloudflare Web Analytics beacon.
 *
 * Cookieless, GDPR-friendly, ~1 KB. The token in `data-cf-beacon` is
 * the site identifier — public by design, not a secret. It's safe to
 * commit; the dashboard is protected by Cloudflare account auth, not
 * by the token itself.
 *
 * Gated on `NODE_ENV === 'production'` so that `pnpm dev` doesn't
 * report localhost traffic to the live dashboard.
 */

const CF_BEACON_TOKEN = '4188bb0ef7414a7680ae773778307d2c';

const beaconConfig = JSON.stringify({ token: CF_BEACON_TOKEN });

export function CloudflareAnalytics() {
  if (process.env.NODE_ENV !== 'production') return null;

  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={beaconConfig}
    />
  );
}
