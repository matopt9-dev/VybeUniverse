# Smoke compile — VybeBootstrapSmoke

**Date:** 2026-07-17  
**World ID:** 1192248460643536  
**Result:** PASS (exit 0)

## Toolchain

- Node: Cursor helper `...\Cursor\...\helpers\node.exe` v22.22.1
- TypeScript: 4.7.4 (downloaded tgz → `horizon-scripts/node_modules/typescript`)
- Config: `horizon-scripts/tsconfig.smoke.json` (`skipLibCheck`, includes `horizon_core` + `HorizonGlobal` only)
- npm/npx: not on PATH

## Notes

- First attempt failed: `connectCodeBlockEvent(this.world, ...)` — World not assignable to Entity | Player. Fixed to `this.entity`.
- Without `skipLibCheck`, Meta `.d.ts` nested `export declare` yields TS1038; with skipLibCheck smoke passes.
- Desktop Editor Preview attach still pending owner.
