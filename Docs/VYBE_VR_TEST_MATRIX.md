# Vybe VR Test Matrix

_Updated 2026-07-15 · Phase 1_

| ID | Test | Expected | Automated |
|----|------|----------|-----------|
| T-INT-01 | ApiClient builds `/api/auth/login` URL | Path join correct | Yes (EditMode) |
| T-INT-02 | ApiClient does not double-prefix `/api` | Single prefix | Yes |
| T-INT-03 | Unconfigured client fails honestly | "not configured" error | Yes |
| T-INT-04 | Token store obfuscation round-trip | Token survives reload | Yes |
| T-INT-05 | Token clear on expiry flag | `IsExpired` true | Yes |
| T-INT-06 | Login against production | 200 + token | Manual (needs creds) |
| T-INT-07 | GET /api/me with valid token | User profile | Manual |
| T-INT-08 | 401 clears local session | Token empty after 401 | Manual |
| T-INT-09 | Logout invalidates server session | Subsequent /me → 401 | Manual |
| T-INT-10 | Feed returns real posts or empty | No invented posts | Manual |
| T-INT-11 | unity-link returns 404/honest fail | No fake link success | Manual |
| T-INT-12 | Quest device sign-in flow | VR Main Menu panel | Device QA |

## Production smoke (from handoff)

```bash
curl https://vybesocial.net/health
curl -X POST https://vybesocial.net/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'
```

Requires owner-supplied test account — do not commit credentials.
