# Vybe Backend Integration Report

_Last updated: Option C implementation — Vybe Social VR scaffold_

## Connected Systems (Client-Side)

| System | Service | Status |
|--------|---------|--------|
| Authentication | `VybeAuthService` → `IAuthService` | Scaffold — calls `POST /auth/login`, stores token in PlayerPrefs |
| Social feed | `VybeSocialPostService` → `ISocialPostService` | Scaffold — calls `GET /posts`, `POST /posts/{id}/like` |
| Stories | `VybeStoriesService` | Scaffold — calls `GET /stories` |
| Comments | `VybeCommentsService` | Scaffold — calls `GET /posts/{id}/comments` |
| Messaging | `VybeMessagingService` | Scaffold — conversations + send |
| Profile | `VybeProfileService` | Scaffold — `GET /profile`, wired to kiosk + HUD profile |
| Follow | `VybeFollowService` | Scaffold — `POST /users/{id}/follow` |
| Marketplace | `VybeMarketplaceService` → `IMarketplaceService` | Scaffold — calls `GET /marketplace/products` |
| Events | `VybeEventService` → `IEventService` | Scaffold — calls `GET /events` |
| Creator publish | `CreatorPublishBoard` | Gated — no fake upload; awaits backend endpoint |
| Local progression | `SaveManager` | Active — offline name, XP, quests, likes/favorites/RSVP |

Services register at startup via `VybeServiceLocator.Register()` from `VybeGameBootstrap`.

## Configuration

- **Asset:** `Assets/Resources/VybeSocialConfig.asset` (optional ScriptableObject)
- **Runtime fallback:** empty `apiBaseUrl` = offline mode
- **Code override:** `VybeSocialConfig.SetApiBaseUrlForTesting("https://your-api")`

When `apiBaseUrl` is empty, all API calls return: **"Vybe Social API not configured"**.

## Expected API Contract (Mobile Backend Team)

Base URL should have no trailing slash. Client uses `HttpClient` + `JsonUtility`.

### `POST /auth/login`
```json
{ "email": "user@example.com", "password": "..." }
```
Response:
```json
{ "token": "jwt...", "userId": "uid", "displayName": "Nova" }
```

### `GET /posts`
Response:
```json
{ "posts": [{ "id": "p1", "author": "Nova", "body": "...", "likes": 42 }] }
```

### `GET /marketplace/products`
Response:
```json
{ "products": [{ "id": "prod1", "name": "...", "description": "...", "category": "Apparel", "pricePoints": 500 }] }
```

### `GET /events`
Response:
```json
{ "events": [{ "id": "evt1", "title": "...", "description": "...", "date": "Sat 7PM", "xpReward": 25 }] }
```

### `GET /profile`
Headers: `Authorization: Bearer <token>`
Response:
```json
{ "userId": "uid", "displayName": "Nova", "email": "user@example.com" }
```

### `GET /stories`
Response:
```json
{ "stories": [{ "id": "s1", "author": "Nova", "thumbnailUrl": "https://...", "expiresAt": "2026-06-27T00:00:00Z" }] }
```

### `GET /posts/{postId}/comments`
Response:
```json
{ "comments": [{ "id": "c1", "author": "Nova", "body": "Nice!", "createdAt": "2026-06-26T12:00:00Z" }] }
```

### `POST /posts/{postId}/like`
Headers: `Authorization: Bearer <token>`
Response:
```json
{ "liked": true, "likes": 43 }
```

### `GET /messages/conversations`
Response:
```json
{ "conversations": [{ "id": "conv1", "participantUserId": "u2", "participantName": "Alex", "lastMessage": "Hey", "lastMessageAt": "2026-06-26T11:00:00Z" }] }
```

### `GET /messages/conversations/{id}`
Response:
```json
{ "messages": [{ "id": "m1", "senderId": "u1", "senderName": "Nova", "body": "Hello", "sentAt": "2026-06-26T10:00:00Z" }] }
```

### `POST /messages/conversations/{userId}`
Body:
```json
{ "message": "Hello there" }
```
Response:
```json
{ "conversationId": "conv1", "messageId": "m2" }
```

### `GET /users/{userId}`
Response:
```json
{ "userId": "u2", "displayName": "Alex", "bio": "...", "followerCount": 10, "followingCount": 5, "isFollowing": false }
```

### `POST /users/{userId}/follow`
Response:
```json
{ "following": true, "followerCount": 11 }
```

### Missing Endpoints (Not Yet Implemented on Client)
- `POST /creator/publish` — creator board shows honest "pending backend" message
- Friend invites, live multiplayer
- Wallet / payments

## Firebase Requirements

`VybeSocialConfig.useFirebase` is reserved for future Firebase Auth / Firestore sync. **Not active in this build.**

If the mobile team uses Firebase:
1. Provide REST gateway or Cloud Functions matching the JSON shapes above, **or**
2. Implement a `FirebaseAuthService` implementing `IAuthService` and register it in `VybeServiceLocator`

## What Works Now

- Boot → Loading → VR Main Menu (Quest + Editor)
- Login gate on VR Main Menu when API URL is configured
- Offline play with local profile name when API not configured
- Social/Marketplace/Event boards + **Social Hub** (feed wall, stories, messaging, profile kiosk) show empty states (no hardcoded fake posts when API configured)
- Auth overlay on district boards when not signed in
- VR UI ray interactor wiring for all rays under XR Origin
- Quest fog density reduced via `VybeQuestRuntime.ApplyFogTweak`

## What Needs Mobile Backend Team

1. Deploy API with endpoints above + CORS if testing from Editor
2. Provide staging `apiBaseUrl` for QA
3. Implement creator publish endpoint
4. Token refresh / expiry handling (client currently stores token until sign-out)
5. Optional: Firebase Auth integration flag and SDK wiring

## Testing API URL

See README or set in Editor:
1. Create `Assets/Resources/VybeSocialConfig.asset` via **Create → Vybe → Social Config**
2. Set **Api Base Url** to your staging server
3. Or at runtime: `VybeSocialConfig.SetApiBaseUrlForTesting("https://staging-api.example.com")`

Sign in from VR Main Menu login panel. Failed login shows the API error in the login panel (no fake success).
