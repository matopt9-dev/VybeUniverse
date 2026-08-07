# 10 — Social District foundation setup

**World:** Vybe Social Horizon Edition (`1192248460643536`)

## Prompt

```
Build the first district only: Social District, adjacent to Arrival Plaza. Graybox a small gathering plaza (not empty dead room): floor, 2–4 seating props, directory sign, gather trigger volume, district spawn point, return portal pad back to Arrival Plaza. On Arrival Plaza add a portal trigger to Social District. Name entities exactly:
VybeSocialDistrict, VybeSocialDistrictDirectoryTrigger, VybeSocialDistrictDirectorySign, VybeSocialDistrictGatherTrigger, VybeSocialDistrictGatherSign, VybeSocialDistrictSpawn, VybeToSocialDistrictTrigger, VybeSocialDistrictReturnTrigger, VybeSocialDistrictReturnSpawn.
Create empty locked roots VybeLockedCreatorRoot, VybeLockedGameRoot, VybeLockedEventRoot, VybeLockedMarketplaceRoot and keep them hidden/noninteractive.
Attach script VybeSocialDistrict and leave prop wiring for the owner. Do not fake users, feeds, shops, or other districts.
```

## Owner wiring after AI

1. Attach `VybeSocialDistrict` to `VybeSocialDistrict`.  
2. Wire all triggers/spawns/signs per `Docs/PHASE_8_SOCIAL_DISTRICT.md`.  
3. Preview: plaza → district → gather check-in → return.  
4. Confirm locked roots stay hidden.  
