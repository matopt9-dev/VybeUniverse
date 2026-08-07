/**
 * Vybe Social Horizon Edition — Same-world portal pad (Phase 4).
 * World ID: 1192248460643536
 *
 * Responsibility: OnPlayerEnterTrigger → SpawnPointGizmo.teleportPlayer.
 *
 * Setup:
 * 1. Trigger VybePortalPadTrigger (pad volume)
 * 2. Spawn Point VybePortalDestination
 * 3. Empty VybePortalPad; attach VybePortalPad; wire props
 * 4. Optional feedbackAudio AudioGizmo, feedbackFx ParticleGizmo, padMesh Entity for color flash
 *
 * Test: walk onto pad → teleport to destination spawn.
 */
import {
  Component,
  PropTypes,
  CodeBlockEvents,
  Player,
  SpawnPointGizmo,
  AudioGizmo,
  ParticleGizmo,
  Color,
  Entity,
} from 'horizon/core';

class VybePortalPad extends Component<typeof VybePortalPad> {
  static propsDefinition = {
    padTrigger: { type: PropTypes.Entity },
    destinationSpawn: { type: PropTypes.Entity },
    feedbackAudio: { type: PropTypes.Entity },
    feedbackFx: { type: PropTypes.Entity },
    padMesh: { type: PropTypes.Entity },
    cooldownSeconds: { type: PropTypes.Number, default: 1.5 },
    debugLogs: { type: PropTypes.Boolean, default: false },
  };

  private lastTeleportMs: { [id: number]: number } = {};

  start() {
    const pad = this.props.padTrigger;
    if (pad == null || !pad.exists()) {
      this.log('padTrigger missing');
      return;
    }
    this.connectCodeBlockEvent(
      pad,
      CodeBlockEvents.OnPlayerEnterTrigger,
      (player: Player) => this.onPad(player)
    );
    this.log('portal pad armed');
  }

  private onPad(player: Player): void {
    if (player == null) {
      return;
    }
    const now = Date.now();
    const cooldownMs =
      (this.props.cooldownSeconds != null && this.props.cooldownSeconds > 0
        ? this.props.cooldownSeconds
        : 1.5) * 1000;
    const last = this.lastTeleportMs[player.id];
    if (last != null && now - last < cooldownMs) {
      this.log(`cooldown id=${player.id}`);
      return;
    }

    const destEntity = this.props.destinationSpawn;
    if (destEntity == null || !destEntity.exists()) {
      this.world.ui.showPopupForPlayer(player, 'Portal offline — destination missing', 2);
      this.log('destination missing');
      return;
    }
    const spawn = destEntity.as(SpawnPointGizmo);
    if (spawn == null) {
      this.world.ui.showPopupForPlayer(player, 'Portal offline — bad destination', 2);
      this.log('destination not SpawnPointGizmo');
      return;
    }

    spawn.teleportPlayer(player);
    this.lastTeleportMs[player.id] = now;
    this.playFeedback();
    this.flashPad();
    this.world.ui.showPopupForPlayer(player, 'Portal — arrived', 1.5);
    this.log(`teleported id=${player.id}`);
  }

  private playFeedback(): void {
    const audioEntity = this.props.feedbackAudio;
    if (audioEntity != null && audioEntity.exists()) {
      const audio = audioEntity.as(AudioGizmo);
      if (audio != null) {
        audio.play();
      }
    }
    const fxEntity = this.props.feedbackFx;
    if (fxEntity != null && fxEntity.exists()) {
      const fx = fxEntity.as(ParticleGizmo);
      if (fx != null) {
        fx.play({ fromStart: true });
      }
    }
  }

  private flashPad(): void {
    const mesh = this.props.padMesh;
    if (mesh == null || !mesh.exists()) {
      return;
    }
    try {
      mesh.color.set(new Color(0.2, 0.9, 1));
      this.async.setTimeout(() => {
        if (mesh.exists()) {
          mesh.color.set(new Color(0.15, 0.15, 0.2));
        }
      }, 400);
    } catch (_e) {
      this.log('pad color flash failed');
    }
  }

  private log(msg: string): void {
    if (this.props.debugLogs) {
      console.log(`[VybePortalPad] ${msg}`);
    }
  }
}

Component.register(VybePortalPad, 'VybePortalPad');
