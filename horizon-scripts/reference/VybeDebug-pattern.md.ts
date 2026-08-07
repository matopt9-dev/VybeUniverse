/**
 * Vybe Social Horizon Edition — Debug logging helper pattern.
 * World ID: 1192248460643536
 *
 * NOT a Component. Horizon scripts are self-contained; copy the log helper
 * pattern into each system (or keep debugLogs prop). This file documents the
 * contract only — do not attach it in the editor.
 *
 * Proven: console.log from HorizonGlobal.d.ts
 * Imports: none required at runtime (ambient console).
 *
 * Contract:
 * - Every interactive system exposes `debugLogs: boolean` (default false).
 * - Logs must be gated; never spam production Preview.
 * - Prefix: [VybeSystemName]
 */
export const VYBE_DEBUG_PREFIX = '[Vybe]';

export function vybeLog(enabled: boolean, system: string, message: string): void {
  if (enabled) {
    console.log(`[${system}] ${message}`);
  }
}
