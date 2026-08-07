/**
 * Vybe Social Horizon Edition — Player lifecycle observer (Phase 3).
 * World ID: 1192248460643536
 *
 * Responsibility: track join/leave and broadcast a serializable NetworkEvent
 * so other systems can late-join without inventing multiplayer stacks.
 *
 * Dependencies: horizon/core only.
 * Authority: server/world script on the entity that owns this component.
 * Reset: clears local map on start; exit removes player.
 *
 * Setup:
 * 1. Empty entity VybePlayerLifecycle; attach VybePlayerLifecycle.
 * 2. Optional debugLogs=true for Preview.
 *
 * Test: Preview multiplayer — two joins/leaves; console shows ids when debug on.
 * Limitations: does not teleport; spawn handled by VybeSpawnRecovery.
 */
import {
  Component,
  PropTypes,
  CodeBlockEvents,
  Player,
  NetworkEvent,
} from 'horizon/core';

type PlayerLifecyclePayload = {
  playerId: number;
  action: string;
  name: string;
};

const PlayerLifecycleEvent = new NetworkEvent<PlayerLifecyclePayload>('vybe_player_lifecycle');

class VybePlayerLifecycle extends Component<typeof VybePlayerLifecycle> {
  static propsDefinition = {
    showWelcomePopup: { type: PropTypes.Boolean, default: true },
    debugLogs: { type: PropTypes.Boolean, default: false },
  };

  private active: { [id: number]: boolean } = {};

  start() {
    this.log('start — lifecycle observer ready');

    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerEnterWorld,
      (player: Player) => this.onEnter(player)
    );

    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerExitWorld,
      (player: Player) => this.onExit(player)
    );
  }

  private onEnter(player: Player): void {
    if (player == null) {
      return;
    }
    this.active[player.id] = true;
    const name = this.safeName(player);
    this.log(`join id=${player.id} name=${name}`);
    this.sendNetworkBroadcastEvent(PlayerLifecycleEvent, {
      playerId: player.id,
      action: 'join',
      name: name,
    });
    if (this.props.showWelcomePopup) {
      this.world.ui.showPopupForPlayer(player, `Welcome to Vybe — ${name}`, 2.5);
    }
  }

  private onExit(player: Player): void {
    if (player == null) {
      return;
    }
    delete this.active[player.id];
    const name = this.safeName(player);
    this.log(`leave id=${player.id} name=${name}`);
    this.sendNetworkBroadcastEvent(PlayerLifecycleEvent, {
      playerId: player.id,
      action: 'leave',
      name: name,
    });
  }

  private safeName(player: Player): string {
    try {
      return player.name.get();
    } catch (_e) {
      return 'Player';
    }
  }

  private log(msg: string): void {
    if (this.props.debugLogs) {
      console.log(`[VybePlayerLifecycle] ${msg}`);
    }
  }
}

Component.register(VybePlayerLifecycle, 'VybePlayerLifecycle');
