# Vybe VR Implementation Plan (Ordered)

_Updated 2026-07-15 · Handoff applied_

## Phase status

| Phase | Description | Status |
|-------|-------------|--------|
| **1** | Authenticate — login, session token, secure storage | **DONE** |
| **2** | Profile + real-time — `GET /api/me`, Socket.io | **Done** (2026-07-15) |
| **3** | Feed — `GET /api/feed?type=for-you` in VR UI | Client ready |
| **4** | Social graph — followers, online status | Blocked on UI |
| **5** | Game sessions | See `CURSOR_HANDOFF_GAME_API.md` |
| **6** | Achievements | Backend gap |
| **7** | Identity linking | Backend gap (`unity-link`, `meta-link`) |

## Phase 1 deliverables (this session)

- [x] Extract handoff to `C:\Users\djtwi\vybe-cursor-handoff\`
- [x] Replace DRAFT contracts with real OpenAPI + endpoints.json
- [x] Align `VybeIntegrationConfig.apiPrefix` → `/api`
- [x] `VybeAuthClient` — login, logout, session validation (no fake refresh)
- [x] `SecureTokenCodec` + obfuscated `PlayerPrefsTokenStore`
- [x] 401 auto-clear + 30-day session TTL
- [x] Update VYBE_VR_* audit docs

## Ordered follow-ups

| Step | Owner | Blocked on |
|------|-------|------------|
| Clone Social repo | User | Real GitHub URL (handoff has `[owner]` placeholder) |
| Live login QA on Quest | QA | Test user credentials |
| Set `apiBaseUrl` in Resources/VybeIntegrationConfig | User | Asset creation in Unity |
| Socket.io real-time (Phase 2) | Agent | Staging/prod URL confirmed |
| Meta App ID + ALPHA upload | User/Meta dash | Valid org/app |
| Backend unity-link / meta-link endpoints | Social team | Schema + env vars |

## Explicit non-goals

- Modify `server/routes.ts` (handoff forbids)
- Fake online users / friend presence
- WebView dump of website
- Claiming store §25 complete
