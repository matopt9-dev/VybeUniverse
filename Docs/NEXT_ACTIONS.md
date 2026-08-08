# NEXT ACTIONS — Runtime must be Scripts; builders stay Editor Scripts

**You said:** code has to be in Meta runtime or nothing works.

**Correct split:**
- **Gameplay** → Meta **Scripts** panel (`horizon/core`) — REQUIRED for Preview  
- **VybeBuildEverything** → Meta **Editor Scripts** only — Run once to wire the world  

Putting `VybeBuildEverything` into Scripts **breaks** compile (`horizon/editor` not available at runtime).

## Do this now

1. Scripts panel: confirm `VybeSpawnRecovery`, `VybePulseChallenge`, `VybeSocialCheckIn`, etc. compile green.  
2. Editor Scripts: **Run `VybeBuildEverything`**.  
3. Code and act paste:

```
Run Editor Script VybeBuildEverything then create visible plaza and hub
```

4. Save → Preview.

Details: `Docs/VYBE_RUNTIME_VS_EDITOR.md` · `meta-ai-prompts/26-TEN-WORD-BUILD-EVERYTHING.md`
