/**
 * Vybe Social Horizon Edition — Spawn + recovery (Phase 2 slice).
 * World ID: 1192248460643536
 *
 * Purpose: teleport players to a SpawnPointGizmo on world enter, and teleport
 * them back when they enter a recovery trigger volume. Spawn-only subsystem —
 * not plaza, DJ, or social feed.
 *
 * APIs verified against this world's scripts/types/horizon_core.d.ts:
 * - SpawnPointGizmo.teleportPlayer(player)
 * - Entity.exists(), Entity.as(SpawnPointGizmo)
 * - CodeBlockEvents.OnPlayerEnterWorld / OnPlayerExitWorld
 * - CodeBlockEvents.OnPlayerEnterTrigger
 * - PropTypes.Entity / Boolean; Component.register
 * Imports: horizon/core only (+ HorizonGlobal ambient).
 *
 * Setup (Desktop Editor):
 * 1. Place a Spawn Point gizmo; name it e.g. VybeSpawnPoint.
 * 2. Place a Trigger volume below/around fall-out areas; name it e.g. VybeRecoveryVolume.
 * 3. Create empty entity VybeSpawnSystem; attach script VybeSpawnRecovery.
 * 4. Wire props: spawnPoint → Spawn Point entity; recoveryTrigger → Trigger entity.
 * 5. Optional: teleportOnJoin=true, enableRecovery=true, debugLogs=false.
 * 6. Keep VybeBootstrapSmoke on VybeBootstrap for join smoke (separate).
 *
 * Test procedure:
 * 1. Preview / multiplayer test.
 * 2. On join: player should appear at spawn (if teleportOnJoin).
 * 3. Walk/fall into recovery trigger: player teleports back to spawn.
 * 4. Leave world: no errors; exit log only if debugLogs.
 *
 * Known limitations:
 * - Editor Preview attach is owner-gated; local tsc ≠ in-world authority.
 * - Unwired/null props skip teleport (logged when debugLogs).
 * - Entity.as(SpawnPointGizmo) returns null if prop is not a spawn gizmo.
 * - No multi-spawn / team spawn / checkpoint progression in this script.
 * - Player has no exists() in typings — guard with null + id only.
 */
import {
  Component,
  PropTypes,
  CodeBlockEvents,
  Player,
  Entity,
  SpawnPointGizmo,
} from 'horizon/core';

class VybeSpawnRecovery extends Component<typeof VybeSpawnRecovery> {
  static propsDefinition = {
    spawnPoint: { type: PropTypes.Entity },
    recoveryTrigger: { type: PropTypes.Entity },
    teleportOnJoin: { type: PropTypes.Boolean, default: true },
    enableRecovery: { type: PropTypes.Boolean, default: true },
    debugLogs: { type: PropTypes.Boolean, default: false },
  };

  private activePlayerIds: { [id: number]: boolean } = {};

  start() {
    this.log('start — spawn/recovery ready (world 1192248460643536)');

    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerEnterWorld,
      (player: Player) => {
        this.onPlayerEnterWorld(player);
      }
    );

    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerExitWorld,
      (player: Player) => {
        this.onPlayerExitWorld(player);
      }
    );

    const recovery = this.props.recoveryTrigger;
    if (this.props.enableRecovery && recovery != null && recovery.exists()) {
      this.connectCodeBlockEvent(
        recovery,
        CodeBlockEvents.OnPlayerEnterTrigger,
        (enteredBy: Player) => {
          this.onRecoveryEnter(enteredBy);
        }
      );
      this.log('recovery trigger wired');
    } else if (this.props.enableRecovery) {
      this.log('recovery skipped — recoveryTrigger missing or enableRecovery off');
    }
  }

  private onPlayerEnterWorld(player: Player): void {
    if (player == null) {
      this.log('enter ignored — null player');
      return;
    }

    this.activePlayerIds[player.id] = true;
    this.log(`player enter id=${player.id} name=${this.safePlayerName(player)}`);

    if (!this.props.teleportOnJoin) {
      this.log('teleportOnJoin=false — skip join teleport');
      return;
    }

    this.teleportToSpawn(player, 'join');
  }

  private onPlayerExitWorld(player: Player): void {
    if (player == null) {
      this.log('exit ignored — null player');
      return;
    }

    delete this.activePlayerIds[player.id];
    this.log(`player exit id=${player.id} name=${this.safePlayerName(player)}`);
  }

  private onRecoveryEnter(player: Player): void {
    if (!this.props.enableRecovery) {
      return;
    }
    if (player == null) {
      this.log('recovery ignored — null player');
      return;
    }
    if (!this.activePlayerIds[player.id]) {
      // Join/leave race: ignore trigger for players we never saw enter.
      this.log(`recovery ignored — player id=${player.id} not tracked`);
      return;
    }

    this.teleportToSpawn(player, 'recovery');
  }

  private teleportToSpawn(player: Player, reason: string): void {
    const spawnEntity = this.props.spawnPoint;
    if (spawnEntity == null || !spawnEntity.exists()) {
      this.log(`teleport skipped (${reason}) — spawnPoint missing`);
      return;
    }

    const spawnGizmo = spawnEntity.as(SpawnPointGizmo);
    if (spawnGizmo == null) {
      this.log(`teleport skipped (${reason}) — spawnPoint is not SpawnPointGizmo`);
      return;
    }

    spawnGizmo.teleportPlayer(player);
    this.log(`teleport OK (${reason}) player id=${player.id}`);
  }

  private safePlayerName(player: Player): string {
    try {
      return player.name.get();
    } catch (_err) {
      return '(name unavailable)';
    }
  }

  private log(message: string): void {
    if (this.props.debugLogs) {
      console.log(`[VybeSpawnRecovery] ${message}`);
    }
  }
}

Component.register(VybeSpawnRecovery, 'VybeSpawnRecovery');
