# Vybe Release Checklist

**World:** Vybe Social `1192248460643536`  
**Do not publish until every blocker is checked.**

## Compile / scripts

- [ ] Zero TypeScript errors in Scripts panel  
- [ ] Zero runtime files import `horizon/editor`  
- [ ] Editor construction scripts live only under Editor Scripts  
- [ ] Local/repo systems `tsc` Pass  

## Wiring

- [ ] Every required Entity prop assigned (see `VYBE_SCRIPT_PROPERTY_MAP.md`)  
- [ ] `VybeSocialDistrict` fully wired  
- [ ] Pulse uses `VybePulse*` only; legacy Pulse* quarantined/deleted  
- [ ] Persistent Variable `vybe_checkin_count` registered  

## Gameplay Preview

- [ ] T01–T15 Pass  
- [ ] T17–T18 Pass (multiplayer)  
- [ ] T19–T23 Pass  

## Player-facing polish

- [ ] No AI/Cursor/debug/dev text visible  
- [ ] `VybeBootstrapSmoke` debugLogs false or entity detached  
- [ ] Coherent Arrival Plaza + Hub + pathways  
- [ ] Readable signs; comfortable lighting  
- [ ] No fake buttons / unfinished shells presented as live features  

## Performance / publish

- [ ] T24 acceptable  
- [ ] T25 no critical publish validation errors  
- [ ] World display name set to **Vybe Social**  
- [ ] Capacity / platform toggles reviewed  

## Manual actions Meta Gen AI cannot do

1. Register Persistent Variables in Systems UI  
2. Import Kenney OBJs / custom audio assets  
3. Click Publish / complete Meta moderation  
4. Physical Quest headset soak test  
5. Paste/run Gen AI prompts (owner)  
6. Run Editor Scripts (owner click Run)  

## Status honesty

| Item | Status |
|------|--------|
| Disk runtime clean of `horizon/editor` | Verified |
| Social District wire script authored | Awaiting editor Run |
| Preview Pass | Not verified by Cursor |
| Publication-ready | **No** until checklist complete |
