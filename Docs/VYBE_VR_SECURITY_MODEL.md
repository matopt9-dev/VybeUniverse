# Vybe VR Security Model

_Updated 2026-07-15 from `CURSOR_HANDOFF_AUTHENTICATION.md`_

## Principles

1. **No secrets in APK** — no server API keys, Meta upload tokens, or admin credentials embedded in client builds.
2. **No fake authenticated success** — login fails closed when API unconfigured or server rejects.
3. **No fake social identity** — never fabricate online users, friends lists, or “live” counts.
4. **Least privilege** — client only holds user-scoped bearer session tokens.

## Token handling

| Item | Implementation |
|------|----------------|
| Session token | UUID from `POST /api/auth/login` → `token` field |
| Storage | `PlayerPrefsTokenStore` + `SecureTokenCodec` (XOR obfuscation keyed by install ID) |
| TTL | 30 days (client-side expiry mirror; server enforces on `requireAuth`) |
| Refresh | **None** — no `/api/auth/refresh`; re-login on 401 |
| Transmission | `Authorization: Bearer <token>` over HTTPS |
| Revocation | `POST /api/auth/logout` + local clear; 401 auto-clears |

## Storage

- Obfuscated PlayerPrefs until platform keystore binding exists.
- Clear all tokens on sign-out and on 401 responses.
- Do not log tokens, passwords, or full Authorization headers.

## Transport

- Base URL from `VybeIntegrationConfig` asset only (`https://vybesocial.net` production).
- Reject non-HTTPS outside Editor/`localhost`.
- Timeout (default 15s) + cancellation.
- Certificate pinning: not implemented (document for future hardening).

## Rate limiting

- Auth routes: 10 attempts / 15 minutes per IP (server-side).
- Unity must surface 429 honestly — no retry storm.

## Offline mode

- Offline catalog is **local content**, labeled as Offline Explorer — not a security boundary violation if never claimed as live network data.
- When `apiBaseUrl` set, offline catalog paths must not masquerade as server data.

## Meta / Unity linking (future)

- `META_APP_ID` / `META_APP_SECRET` — required before Meta linking endpoint can be implemented server-side.
- `UNITY_PROJECT_ID` — required for Unity Gaming Services verification.
- Both linking endpoints are **NOT IMPLEMENTED** on backend per handoff.

## Threat notes

| Threat | Residual risk |
|--------|---------------|
| Stolen device + deobfuscated Prefs token | Medium — 30-day session; logout revokes server-side |
| MITM on non-HTTPS misconfig | High if user sets `http://` outside localhost — guarded in client |
| Malicious API host | User-controlled URL — treat as trusted env only for known hosts |
| Social backend compromise | Out of Unity scope |

## Files Cursor must NOT modify (handoff)

- `server/routes.ts` — production API
- `shared/schema.ts` — requires DB migration
- Signing keys (`*.p8`, `*.p12`, `*.pem`)
