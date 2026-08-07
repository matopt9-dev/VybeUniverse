# Vybe VR Replit / Production Steps

_Updated 2026-07-15_

## Production (live)

- **Web + API:** `https://vybesocial.net`
- **WebSocket:** `wss://vybesocial.net`
- **Health:** `GET https://vybesocial.net/health`

No separate staging URL is documented in the handoff. For local dev: `http://localhost:5000`.

## Unity configuration

1. Create `Resources/VybeIntegrationConfig` asset (or set via code for testing).
2. Set `apiBaseUrl` = `https://vybesocial.net` (production) or `http://localhost:5000` (local Social dev).
3. Confirm `apiPrefix` = `/api` (default after this session).
4. Sign in from VR Main Menu — profile kiosk should load `GET /api/me` with no fake success.

## Local Social backend (if repo cloned)

```bash
NODE_ENV=development bun server/index.ts
# Serves API + web on port 5000
```

## What NOT to do

- Do **not** modify `server/routes.ts` from Unity integration work.
- Do **not** hardcode credentials in the APK.
- Do **not** use `/api/v1` prefix — routes are `/api/*` directly.

## Clone Social repo (blocked)

Handoff documents placeholder only:

```bash
git clone https://github.com/[owner]/vybe-social.git
```

Owner must supply the real GitHub organization/URL before clone is possible.
