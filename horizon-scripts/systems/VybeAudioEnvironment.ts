/**
 * Vybe Social Horizon Edition — Audio / environment (Phases 3 + 6).
 * World ID: 1192248460643536
 *
 * Proven in THIS world's horizon_core.d.ts:
 * - AudioGizmo.play() / pause() / stop()
 * - CodeBlockEvents.OnPlayerEnterTrigger / OnPlayerExitTrigger
 * - CodeBlockEvents.OnPlayerEnterWorld / OnPlayerExitWorld
 *
 * Optional ambience + optional audio ZONE (enter play / exit stop when empty).
 * Wire only when AudioGizmo entities exist. No streaming music APIs.
 *
 * Setup:
 * 1. Place AudioGizmo with assigned sound in editor.
 * 2. Attach VybeAudioEnvironment; wire ambienceAudio.
 * 3. Optional: audioZoneTrigger for plaza zone enter/exit.
 * 4. playOnStart=true to start ambience when world script starts.
 */
import {
  Component,
  PropTypes,
  CodeBlockEvents,
  Player,
  AudioGizmo,
  Entity,
} from 'horizon/core';

class VybeAudioEnvironment extends Component<typeof VybeAudioEnvironment> {
  static propsDefinition = {
    ambienceAudio: { type: PropTypes.Entity },
    audioZoneTrigger: { type: PropTypes.Entity },
    playOnStart: { type: PropTypes.Boolean, default: true },
    stopOnEmptyWorld: { type: PropTypes.Boolean, default: false },
    stopOnEmptyZone: { type: PropTypes.Boolean, default: true },
    debugLogs: { type: PropTypes.Boolean, default: false },
  };

  private playerCount = 0;
  private zoneOccupants: { [id: number]: boolean } = {};
  private readonly maxZoneOccupants = 32;

  start() {
    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerEnterWorld,
      (_player: Player) => {
        this.playerCount += 1;
        if (this.props.playOnStart && this.playerCount === 1 && this.props.audioZoneTrigger == null) {
          this.playAmbience();
        }
      }
    );
    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerExitWorld,
      (player: Player) => {
        this.playerCount = Math.max(0, this.playerCount - 1);
        if (player != null) {
          delete this.zoneOccupants[player.id];
        }
        if (this.props.stopOnEmptyWorld && this.playerCount === 0) {
          this.stopAmbience();
        } else if (
          this.props.stopOnEmptyZone &&
          this.zoneOccupantCount() === 0 &&
          this.props.audioZoneTrigger != null
        ) {
          this.stopAmbience();
        }
      }
    );

    this.wireZone(this.props.audioZoneTrigger);

    if (this.props.playOnStart && this.props.audioZoneTrigger == null) {
      this.playAmbience();
    }
    this.log('audio environment ready');
  }

  private wireZone(trigger: Entity | undefined | null): void {
    if (trigger == null || !trigger.exists()) {
      return;
    }
    this.connectCodeBlockEvent(
      trigger,
      CodeBlockEvents.OnPlayerEnterTrigger,
      (player: Player) => this.onZoneEnter(player)
    );
    this.connectCodeBlockEvent(
      trigger,
      CodeBlockEvents.OnPlayerExitTrigger,
      (player: Player) => this.onZoneExit(player)
    );
    this.log('audio zone armed');
  }

  private onZoneEnter(player: Player): void {
    if (player == null) {
      return;
    }
    if (this.zoneOccupantCount() >= this.maxZoneOccupants) {
      this.log('zone occupant cap reached');
      return;
    }
    const wasEmpty = this.zoneOccupantCount() === 0;
    this.zoneOccupants[player.id] = true;
    if (wasEmpty) {
      this.playAmbience();
    }
    this.log(`zone enter id=${player.id}`);
  }

  private onZoneExit(player: Player): void {
    if (player == null) {
      return;
    }
    delete this.zoneOccupants[player.id];
    if (this.props.stopOnEmptyZone && this.zoneOccupantCount() === 0) {
      this.stopAmbience();
    }
    this.log(`zone exit id=${player.id}`);
  }

  private zoneOccupantCount(): number {
    let n = 0;
    for (const key in this.zoneOccupants) {
      if (this.zoneOccupants[key]) {
        n += 1;
      }
    }
    return n;
  }

  private playAmbience(): void {
    const entity = this.props.ambienceAudio;
    if (entity == null || !entity.exists()) {
      this.log('ambienceAudio missing — skip');
      return;
    }
    const audio = entity.as(AudioGizmo);
    if (audio == null) {
      this.log('ambienceAudio not AudioGizmo');
      return;
    }
    audio.play();
    this.log('ambience play');
  }

  private stopAmbience(): void {
    const entity = this.props.ambienceAudio;
    if (entity == null || !entity.exists()) {
      return;
    }
    const audio = entity.as(AudioGizmo);
    if (audio != null) {
      audio.stop();
      this.log('ambience stop');
    }
  }

  private log(msg: string): void {
    if (this.props.debugLogs) {
      console.log(`[VybeAudioEnvironment] ${msg}`);
    }
  }
}

Component.register(VybeAudioEnvironment, 'VybeAudioEnvironment');
