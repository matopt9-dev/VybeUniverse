# Vybe VR Failure Map

_Updated 2026-07-15 — Phase 1 production audit_

| Failure | Symptom | Mitigation |
|---------|---------|------------|
| API not configured | "Vybe Social API not configured" | Set `VybeIntegrationConfig.apiBaseUrl` / `VybeSocialConfig` |
| Invalid credentials | 401 on login | Surface server error; no fake success |
| Session expired | 401 on `/api/me` | Clear token; re-prompt login |
| Rate limited | 429 on auth | Back off; show message |
| Wrong API prefix | 404 / SPA HTML | Social routes under `/api`; platform under `/api/v1` only after Deploy |
| Legacy client hit `/api/v1` for social | Messaging/boards fail with HTML body | Prefer Integration clients; legacy `VybeSocialApiClient` prefixes `/api` (not `/api/v1`) |
| Fake refresh call | 404 `/auth/refresh` | **Removed** — session is 30-day UUID |
| Identity link 404 / SPA | unity-link / meta-link | Honest **Coming after server deploy** — endpoints not on prod |
| Invitations / achievements SPA | `/api/v1/game-invitations`, achievements | Blocked UI copy until Replit Deploy |
| Offline catalog as live | Misleading posts/DMs | Path A only + Offline Explorer label; Path B never fills from catalog |
| Stolen PlayerPrefs token | Unauthorized API use | Logout revokes; future: platform keystore |
| Meta App ID empty | Quest upload blocked | Owner supplies `META_APP_ID` |
| GitHub Social disconnected | Cannot sync Deploy branch | Owner connects GitHub |
| Staging URL unknown | No separate env documented | Use production or localhost:5000 |
| Release gate § | Store / §25 incomplete | Deploy + secrets + headset QA |

## Current release blockers (owner)

1. Replit **Deploy** → production `/api/v1/*`
2. Secrets: `UNITY_PROJECT_ID`, `META_APP_ID`, `META_APP_SECRET`
3. Meta Quest App ID for store upload
4. Headset QA Path B social hub

## Backend failures (Social handoff)

See `C:\Users\djtwi\vybe-cursor-handoff\docs\CURSOR_HANDOFF_FAILURE_MAP.md` when available.
