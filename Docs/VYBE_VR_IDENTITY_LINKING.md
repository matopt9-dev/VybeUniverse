# Vybe VR Identity Linking

_Updated 2026-07-15 from `CURSOR_HANDOFF_IDENTITY_LINKING.md`_

## Status

| Endpoint | Status |
|----------|--------|
| `POST /api/auth/unity-link` | **NOT IMPLEMENTED** on backend |
| `POST /api/auth/meta-link` | **NOT IMPLEMENTED** on backend |

Unity client (`VybeIdentityClient`) calls these routes and fails honestly until Social team adds them.

## Recommended flow (when implemented)

1. User signs in via `POST /api/auth/login` → Bearer session token.
2. Store token in obfuscated PlayerPrefs (`PlayerPrefsTokenStore`).
3. **Unity link:** `POST /api/auth/unity-link` with Unity player ID + Unity auth token; server verifies via Unity Gaming Services.
4. **Meta link:** `POST /api/auth/meta-link` with Meta user access token; server verifies via Meta Graph API.

## Required owner credentials

| Variable | Purpose |
|----------|---------|
| `UNITY_PROJECT_ID` | Unity Gaming Services verification |
| `META_APP_ID` | Meta Graph API verification |
| `META_APP_SECRET` | Server-side Meta token validation |

## Current Unity implementation

- `VybeIdentityClient.LinkUnityPlayerAsync(unityPlayerId, unityAuthToken)`
- `VybeIdentityClient.LinkMetaQuestAsync(metaAccessToken)`

Both require an active Vybe session (Bearer token). No fake linking success.

## Database changes needed (Social team)

- Add `unity_player_id` column to `users` table
- Add `meta_user_id` column to `users` table

**Do not modify `shared/schema.ts` from Unity workspace** — Social team owns migrations.
