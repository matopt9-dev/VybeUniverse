/**
 * Vybe Social Horizon Edition — Bootstrap compile/smoke component.
 * World ID: 1192248460643536
 *
 * Purpose: prove this world's generated horizon/core typings compile and that
 * player join can be observed via console. Does NOT show UI popups (welcome
 * belongs to VybePlayerLifecycle only — avoids duplicate join spam).
 *
 * Setup (Desktop Editor):
 * 1. Attach to empty entity named VybeBootstrap (optional in production).
 * 2. Enter Preview; expect console log on start and each player enter.
 * 3. For production vertical slice you may leave this entity detached.
 *
 * Do not change: API imports beyond horizon/core; no Unity/Node packages.
 */
import { Component, PropTypes, CodeBlockEvents, Player } from 'horizon/core';

class VybeBootstrapSmoke extends Component<typeof VybeBootstrapSmoke> {
  static propsDefinition = {
    debugLogs: { type: PropTypes.Boolean, default: true },
  };

  start() {
    this.log('start — world 1192248460643536 typings OK');

    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerEnterWorld,
      (player: Player) => {
        if (player == null) {
          return;
        }
        this.log(`player enter: ${this.safeName(player)}`);
      }
    );
  }

  private safeName(player: Player): string {
    try {
      return player.name.get();
    } catch (_e) {
      return '(name unavailable)';
    }
  }

  private log(message: string): void {
    if (this.props.debugLogs) {
      console.log(`[VybeBootstrapSmoke] ${message}`);
    }
  }
}

Component.register(VybeBootstrapSmoke, 'VybeBootstrapSmoke');
