# Vybe VR × Social Integration Audit

_2026-07-15 · Handoff applied · Phase 1 auth complete_

## Executive verdict

**Phase 1 (Authenticate) is implemented** in `Assets/VybeIntegration/` against real Social contracts from `vybe-cursor-handoff.zip`. End-to-end live validation still requires owner-supplied test credentials and Quest device QA. Social **source repo is not cloned** — contracts + docs only.

## Audit of both sides

| Area | Unity (`VybeUniverse`) | Vybe Social (handoff) |
|------|------------------------|------------------------|
| Repo root | `C:\Users\djtwi\VybeUniverse` | **Not cloned** — GitHub URL is placeholder |
| Handoff pack | Applied from `C:\Users\djtwi\vybe-cursor-handoff\` | `CURSOR_START_HERE.md` + contracts |
| Auth | `POST /api/auth/login` → Bearer session token (30d) | Custom session UUID, not JWT |
| Feed / profile | `/api/me`, `/api/feed?type=for-you` | Verified in OpenAPI |
| OpenAPI | **Real SoT** at `contracts/vybe-api/openapi.yaml` | Production `https://vybesocial.net` |
| Replit deploy | N/A | Live at `https://vybesocial.net` |
| Meta App ID | Empty / blocked upload | Linking endpoint **not implemented** |

## Conflicts resolved (this session)

1. **Path prefix:** Changed from DRAFT `/api/v1` → real `/api` per handoff.
2. **Token refresh:** Removed fake `/auth/refresh` — Vybe uses 30-day session tokens; validate via `GET /api/me`; re-login on 401.
3. **Login DTO:** Now `{ user, token }` not JWT access/refresh pair.
4. **Token storage:** `SecureTokenCodec` obfuscates session token in PlayerPrefs; clears on 401/sign-out.

## Remaining debt

1. **Offline catalog vs “no fake social”:** Path A curated content is honest local exploration. When API configured, UI must not invent friends/posts.
2. **LoginScene constant** points at missing scene; real login is VR Main Menu panel.
3. **Identity linking:** `POST /api/auth/unity-link` and `/api/auth/meta-link` do not exist on backend yet.
4. **UNITY_INTEGRATION_PROMPT_FOR_CURSOR.md** was **not included** in the handoff zip.

## Compile / runtime

- Batch compile pending Unity Editor 6000.3.0f1 availability check.
- Live profile load requires `apiBaseUrl` + test user — owner must supply.

## Missing credentials / config

| Item | Status |
|------|--------|
| Production API URL | Documented: `https://vybesocial.net` |
| Staging URL | **Not documented** — no separate staging env in handoff |
| Test user email/password | Owner must supply |
| Meta Quest App ID | Empty — `META_APP_ID` required |
| Unity Project ID | Owner must supply for future unity-link |
| GitHub clone URL | Placeholder only: `github.com/[owner]/vybe-social` |

## SoT ownership

| Concern | Owner |
|---------|-------|
| OpenAPI | `contracts/vybe-api/` (from handoff) |
| Runtime API client | `Assets/VybeIntegration/` |
| Legacy services | `Assets/Scripts/Services/` (bridge via VybeIntegrationRuntime) |
| Backend routes | **Do not modify** `server/routes.ts` per handoff |

## Next phase ready

**Phase 2 — Read user profile + real-time:** `GET /api/me` wired; next: Socket.io at `wss://vybesocial.net`, feed UI wiring, social graph.
