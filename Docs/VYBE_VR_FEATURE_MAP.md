# Vybe VR Feature Map

_Updated 2026-07-15 · Real API paths from handoff_

| Feature | Offline (Path A) | Live API | Notes |
|---------|------------------|----------|-------|
| Sign in | Blocked (needs URL) | `POST /api/auth/login` | Phase 1 done |
| Session validation | N/A | `GET /api/me` | No refresh endpoint |
| Sign out | Local clear | `POST /api/auth/logout` | Phase 1 done |
| Profile kiosk | Offline display name | `GET /api/me` | Phase 2 wired |
| Feed wall | Curated offline posts | `GET /api/feed?type=for-you` | Phase 2 wired, offset pagination |
| Notifications badge | N/A | Socket `notification` + `GET /api/notifications/unread-count` | Phase 2 |
| Like post | N/A | `POST /api/posts/{id}/like` | Feed wall uses Integration client |
| Stories | Offline catalog | TBD in OpenAPI | |
| Messages | N/A | `/api/threads/*` | Phase 4+ |
| Unity link | N/A | `POST /api/auth/unity-link` | **NOT IMPLEMENTED** |
| Meta link | N/A | `POST /api/auth/meta-link` | **NOT IMPLEMENTED** |
| Achievements | N/A | `GET /api/achievements` | **NOT IMPLEMENTED** |
| Game invitations | N/A | `POST /api/games/invitations` | **NOT IMPLEMENTED** |
| Real-time | N/A | Socket.io `wss://vybesocial.net` | Phase 2 done |

## Known backend defects (from handoff)

- Feed uses offset pagination (not cursor) — drift at high volume
- VybeWorld saves to AsyncStorage only — no cross-device progress
- Push delivery requires valid Expo token — mobile-only
