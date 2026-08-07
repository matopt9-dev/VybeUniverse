# Vybe VR UI/UX Report — Phase 7

Target: Quest-readable world-space UI with honest async states and high-contrast board rows.

## Scale profile (`VybeVRUIScaleProfile`)

| Constant | Editor / PC VR | Quest (`UNITY_ANDROID && !UNITY_EDITOR`) |
|----------|----------------|------------------------------------------|
| `PlayerHudCanvasScale` | 0.0014 | 0.0015 |
| `WristCanvasScale` | 0.001 | 0.00108 |
| `WorldBoardCanvasScale` | 0.0022 | 0.0024 |
| `MinVRButtonHeight` | 52 px | 52 px |
| `MinVRButtonWidth` | 148 px | 148 px |
| `BoardRowHeight` | 80 px | 80 px |
| `PanelCloseButtonWidth` | 180 px | 180 px |

Applied via `VybeUIBuilder.CreateVRPlayerCanvas`, `CreateVRWristCanvas`, and `CreateWorldCanvas`.

## Contrast rules (`VybeUITheme`)

| Token | Purpose |
|-------|---------|
| `RowBackground` | Lighter than panel glass — readable list rows |
| `RowBorder` | Subtle cyan edge (reserved for future row outlines) |
| `ErrorText` | API / sign-in failures — use `StyleError(TMP_Text)` |
| `TextPrimary` | All board row text via `StyleBoardRow` |

Board rows: `VybeUIBuilder.CreateBoardRow` + `StyleBoardRow(Image, TMP_Text[])`.

## Loading pattern (`VybeUILoadingState`)

Honest overlay during network fetch — not fake data.

```csharp
var loadParent = listRoot != null ? listRoot.parent : transform;
VybeUILoadingState.Show(loadParent, "Loading posts...");
try
{
    var result = await service.FetchPostsAsync();
    // handle result — empty or error on failure
}
finally
{
    VybeUILoadingState.Hide(loadParent);
}
```

Used on: `SocialBoard`, `SocialFeedWall`, `VybeStoriesRail`, `VybeMessagingPod`, `VybeProfileKiosk`, `MarketplaceBoard`, `EventBoard`, `VybePostCommentsPanel`.

## VR HUD / wrist sizing

- HUD side buttons (when `includeHudButtons` + VR comfort): **148×52** minimum.
- Wrist menu buttons: **240×52**.
- Panel close buttons on world-space canvases: **180×52**.
- VR button label font: **24** on Quest world-space canvases.

## Toast (`VybeToast`)

On Quest: font **26**, display **3.5 s**, higher camera-local Y, dark panel behind text for contrast.

## Login feedback

`VybeLoginController` shows **"Signing in..."** on error line and button label; re-enables button after complete; errors use `StyleError`.

## Quest QA checklist — UI

- [ ] City HUD XP/name readable at arm's length (player canvas scale).
- [ ] Wrist menu (Y / pinch) buttons easy to hit — 52 px height minimum.
- [ ] Social hub feed wall text readable at ~2 m — world board scale 0.0024 on Quest.
- [ ] Board rows: light background, white primary text (no dark-on-dark).
- [ ] Open feed / marketplace / events: **"Loading..."** overlay appears until API returns.
- [ ] API failure: red error text or empty-state message — no placeholder posts.
- [ ] Sign in on VR Main Menu: **Signing in...** visible during request.
- [ ] Toast (badge/quest XP): readable with background panel, stays ~3.5 s on Quest.
- [ ] Auth gate overlay on boards when logged out: title + message use `TextPrimary`.
- [ ] Panel Close buttons on wrist panels: 180×52, ray-selectable.

See also: `KNOWN_LIMITATIONS.md` (Phase 7), `VYBE_SOCIAL_VR_MASTER_AUDIT.md` §8.
