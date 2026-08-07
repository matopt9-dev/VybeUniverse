# Vybe VR — Phase 3 Final Contract Alignment

_2026-07-16_

## Social Phase 3 final (owner/Replit)

| Item | Value |
|------|-------|
| API base | `https://vybesocial.net/api` |
| Social prefix | `/api/` (auth, feed, me, threads, users) |
| Platform prefix | `/api/v1/` for health aliases, unity/meta link, invitations, achievements |
| Socket.IO | `wss://vybesocial.net` path `/socket.io/` (default) |
| Commit (Social main) | `2d62eb98` |
| GitHub | **Not connected** |
| Production Deploy | **Behind** — Phase 3 live on Replit/dev only until Deploy |

## Unity client mapping (shipped)

| Contract | Unity |
|----------|-------|
| `GET /health` | `VybeHealthClient` (site root) |
| `GET /api/v1/health` | `VybeHealthClient` (preferred when deployed) |
| `GET /api/v1/version` | `VybeHealthClient.GetVersionAsync` |
| `POST /api/v1/auth/unity-link` `{accessToken}` | `VybeIdentityClient.LinkUnityAsync` |
| `POST /api/v1/auth/meta-link` `{accessToken}` | `VybeIdentityClient.LinkMetaAsync` |
| `GET/POST /api/v1/game-invitations…` | `VybeGameClient` |
| Achievements `/api/v1/games/…` + `/users/me/achievements` | `VybeGameClient` |

## Production probe (this machine, 2026-07-16)

| Endpoint | Status |
|----------|--------|
| `GET /health` | ✅ JSON ok |
| `GET /api/health` | ✅ JSON ok |
| `GET /api/v1/health` | ❌ SPA HTML (not deployed) |
| `GET /api/v1/game-invitations` | ❌ SPA HTML |
| `POST /api/v1/auth/unity-link` | ❌ SPA HTML |
| `POST /api/auth/login` | ✅ works |

**Action required:** Click **Deploy** in Replit so production matches the 28/28-tested dev server.

## Remaining owner secrets

- `UNITY_PROJECT_ID` (+ optional `UNITY_SERVICE_ACCOUNT_KEY`)
- `META_APP_ID` + `META_APP_SECRET`
- GitHub connect + branch `vybe-cursor-phase3-handoff`
