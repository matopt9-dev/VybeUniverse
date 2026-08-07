# Path B — Staging API Setup (Social Connected)

Enable live Vybe Social features in the same APK used for Path A.

## 1. Configure API URL

Edit **`Assets/Resources/VybeSocialConfig.asset`** in Unity:

| Field | Value |
|-------|-------|
| `apiBaseUrl` | Your staging base URL, e.g. `https://staging-api.vybesocial.com` |
| `timeoutSeconds` | `15` (default) |
| `useFirebase` | `false` until Firebase sync is implemented |

**Path A (offline):** leave `apiBaseUrl` **empty** — default ship mode.

## 2. Rebuild APK

```powershell
cd C:\Users\djtwi\VybeUniverse
.\Builds\build_quest_release.ps1
```

## 3. Test auth flow

1. Launch app → VR Main Menu shows login when API configured
2. Sign in with staging credentials
3. Enter city → Social Hub feed wall loads `GET /posts`
4. Verify: stories rail, messaging pod, marketplace board, event RSVP

## 4. Endpoint contract

Full list: **`Docs/VYBE_BACKEND_INTEGRATION_REPORT.md`**

Minimum for Path B smoke:

- `POST /auth/login`
- `GET /posts`
- `GET /stories`
- `GET /profile`
- `GET /marketplace/products`
- `GET /events`
- `POST /posts/{id}/like`
- `POST /creator/publish` (one-time quest)

## 5. Runtime verification (logcat)

```
adb logcat -s Unity | findstr "Vybe Social"
```

Expect no `[Vybe Social] API offline` after config. Boards should show data or honest API error strings — not auth overlays when signed in.

## 6. Switch back to Path A

Clear `apiBaseUrl` in `VybeSocialConfig.asset` and rebuild.  
`VybeProductProfile.IsOfflineExplorer` becomes true; auth gates disabled; boards show offline empty states.
