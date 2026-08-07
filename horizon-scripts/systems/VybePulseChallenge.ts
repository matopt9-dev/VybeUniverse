/**
 * Vybe Social Horizon Edition — Plaza Pulse Challenge (Phases 4 + 7 harden).
 * World ID: 1192248460643536
 *
 * Cooperative activity using ONLY proven horizon/core:
 * - Instructions via popup + optional TextGizmo
 * - Join by entering startTrigger (late join allowed while active)
 * - Leave via leaveTrigger or world exit
 * - Authority: world/server owner of this entity (getServerPlayer / entity.owner)
 * - Players light 3 pads; all lit → success score + bounded auto-reset
 * - Optional AudioGizmo / ParticleGizmo / Color flash on pad meshes
 * - Rapid-trigger dedupe, bounded participant/cooldown maps, ownership transfer
 *
 * Setup:
 * 1. Triggers: Start, Leave, Reset, PadA, PadB, PadC
 * 2. Optional TextGizmo scoreboard; AudioGizmo successSfx; ParticleGizmo successFx
 * 3. Optional pad mesh Entities for color feedback
 * 4. Attach VybePulseChallenge; wire all props; debugLogs for QA
 */
import {
  Component,
  PropTypes,
  CodeBlockEvents,
  Player,
  TextGizmo,
  AudioGizmo,
  ParticleGizmo,
  NetworkEvent,
  Color,
  Entity,
} from 'horizon/core';

type PulseSyncPayload = {
  generation: number;
  active: boolean;
  padA: boolean;
  padB: boolean;
  padC: boolean;
  score: number;
  message: string;
};

type PulseOwnedState = {
  generation: number;
  active: boolean;
  padA: boolean;
  padB: boolean;
  padC: boolean;
  score: number;
};

const PulseSyncEvent = new NetworkEvent<PulseSyncPayload>('vybe_pulse_sync');

class VybePulseChallenge extends Component<typeof VybePulseChallenge, PulseOwnedState> {
  static propsDefinition = {
    startTrigger: { type: PropTypes.Entity },
    leaveTrigger: { type: PropTypes.Entity },
    resetTrigger: { type: PropTypes.Entity },
    padATrigger: { type: PropTypes.Entity },
    padBTrigger: { type: PropTypes.Entity },
    padCTrigger: { type: PropTypes.Entity },
    padAMesh: { type: PropTypes.Entity },
    padBMesh: { type: PropTypes.Entity },
    padCMesh: { type: PropTypes.Entity },
    scoreboardText: { type: PropTypes.Entity },
    successAudio: { type: PropTypes.Entity },
    successFx: { type: PropTypes.Entity },
    successTimeoutSeconds: { type: PropTypes.Number, default: 8 },
    instructionsSeconds: { type: PropTypes.Number, default: 5 },
    padCooldownSeconds: { type: PropTypes.Number, default: 0.35 },
    maxParticipants: { type: PropTypes.Number, default: 32 },
    debugLogs: { type: PropTypes.Boolean, default: false },
  };

  private generation = 0;
  private active = false;
  private padA = false;
  private padB = false;
  private padC = false;
  private score = 0;
  private participants: { [id: number]: boolean } = {};
  private lastPadMs: { [id: number]: number } = {};
  private resetTimerId: number | null = null;
  private successLatch = false;

  start() {
    this.connectNetworkBroadcastEvent(PulseSyncEvent, (payload: PulseSyncPayload) => {
      this.applyRemoteSync(payload);
    });

    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerExitWorld,
      (player: Player) => this.onPlayerExit(player)
    );

    this.wireTrigger(this.props.startTrigger, (p) => this.onStart(p));
    this.wireTrigger(this.props.leaveTrigger, (p) => this.onLeave(p));
    this.wireTrigger(this.props.resetTrigger, (p) => this.onResetRequest(p));
    this.wireTrigger(this.props.padATrigger, (p) => this.onPad(p, 'A'));
    this.wireTrigger(this.props.padBTrigger, (p) => this.onPad(p, 'B'));
    this.wireTrigger(this.props.padCTrigger, (p) => this.onPad(p, 'C'));

    this.refreshVisuals('Pulse Challenge ready — enter START');
    if (this.isAuthority()) {
      this.broadcast('Pulse Challenge idle');
    }
    this.log(`pulse challenge armed authority=${this.isAuthority()}`);
  }

  receiveOwnership(
    serializableState: PulseOwnedState | null,
    _oldOwner: Player,
    _newOwner: Player
  ): void {
    if (serializableState == null) {
      this.log('receiveOwnership — null state');
      return;
    }
    this.generation = serializableState.generation;
    this.active = serializableState.active;
    this.padA = serializableState.padA;
    this.padB = serializableState.padB;
    this.padC = serializableState.padC;
    this.score = serializableState.score;
    this.successLatch = false;
    this.flashMesh(this.props.padAMesh, this.padA);
    this.flashMesh(this.props.padBMesh, this.padB);
    this.flashMesh(this.props.padCMesh, this.padC);
    this.refreshVisuals(
      this.active ? 'Pulse ACTIVE — ownership recovered' : 'Pulse ready — ownership recovered'
    );
    this.log(`receiveOwnership gen=${this.generation} active=${this.active}`);
  }

  transferOwnership(_oldOwner: Player, _newOwner: Player): PulseOwnedState {
    this.clearResetTimer();
    this.log(`transferOwnership gen=${this.generation}`);
    return {
      generation: this.generation,
      active: this.active,
      padA: this.padA,
      padB: this.padB,
      padC: this.padC,
      score: this.score,
    };
  }

  private isAuthority(): boolean {
    try {
      const server = this.world.getServerPlayer();
      if (server == null) {
        return true;
      }
      const owner = this.entity.owner.get();
      if (owner != null) {
        return owner.id === server.id;
      }
      const local = this.world.getLocalPlayer();
      return local != null && local.id === server.id;
    } catch (_e) {
      return true;
    }
  }

  private wireTrigger(
    entity: Entity | undefined | null,
    handler: (player: Player) => void
  ): void {
    if (entity == null || !entity.exists()) {
      return;
    }
    this.connectCodeBlockEvent(
      entity,
      CodeBlockEvents.OnPlayerEnterTrigger,
      (player: Player) => {
        if (player != null) {
          handler(player);
        }
      }
    );
  }

  private onStart(player: Player): void {
    if (!this.isAuthority()) {
      return;
    }
    if (!this.active) {
      this.generation += 1;
      this.active = true;
      this.padA = false;
      this.padB = false;
      this.padC = false;
      this.successLatch = false;
      this.clearResetTimer();
      this.log(`race gen=${this.generation} started by id=${player.id}`);
    } else {
      this.log(`late join id=${player.id} gen=${this.generation}`);
    }

    if (!this.addParticipant(player)) {
      this.world.ui.showPopupForPlayer(player, 'Pulse full — try again later', 2);
      return;
    }

    const seconds =
      this.props.instructionsSeconds != null && this.props.instructionsSeconds > 0
        ? this.props.instructionsSeconds
        : 5;
    this.world.ui.showPopupForPlayer(
      player,
      'PULSE CHALLENGE\n1 Enter pads A B C (any order)\n2 Light all three together\n3 Success = team score +1\nLate join OK. Leave pad exits you.',
      seconds
    );
    this.refreshVisuals('Pulse ACTIVE — light pads A B C');
    this.broadcast('Pulse active');
  }

  private onLeave(player: Player): void {
    if (!this.isAuthority()) {
      return;
    }
    delete this.participants[player.id];
    delete this.lastPadMs[player.id];
    this.world.ui.showPopupForPlayer(player, 'Left Pulse Challenge', 2);
    this.log(`leave id=${player.id}`);
    if (this.active && this.participantCount() === 0) {
      this.resetRound('No players left — reset');
    } else {
      this.refreshVisuals(
        this.active
          ? `Pulse ACTIVE — pads lit ${this.litCount()}/3`
          : `Pulse ready — score ${this.score}`
      );
      this.broadcast('Player left');
    }
  }

  private onPlayerExit(player: Player): void {
    if (player == null || !this.isAuthority()) {
      return;
    }
    delete this.participants[player.id];
    delete this.lastPadMs[player.id];
    if (this.active && this.participantCount() === 0) {
      this.resetRound('All players left world — reset');
    }
  }

  private onResetRequest(player: Player): void {
    if (!this.isAuthority()) {
      return;
    }
    this.resetRound(`Reset by player ${player.id}`);
    this.world.ui.showPopupForPlayer(player, 'Pulse Challenge reset', 2);
  }

  private onPad(player: Player, pad: string): void {
    if (!this.isAuthority()) {
      return;
    }
    if (!this.active) {
      this.world.ui.showPopupForPlayer(player, 'Enter START first', 2);
      return;
    }
    if (this.successLatch) {
      return;
    }
    if (!this.participants[player.id]) {
      if (!this.addParticipant(player)) {
        this.world.ui.showPopupForPlayer(player, 'Pulse full — enter START later', 2);
        return;
      }
      this.log(`auto late-join via pad ${pad} id=${player.id}`);
    }
    if (!this.allowPadInteraction(player)) {
      this.log(`pad cooldown id=${player.id}`);
      return;
    }

    let changed = false;
    if (pad === 'A' && !this.padA) {
      this.padA = true;
      this.flashMesh(this.props.padAMesh, true);
      changed = true;
    } else if (pad === 'B' && !this.padB) {
      this.padB = true;
      this.flashMesh(this.props.padBMesh, true);
      changed = true;
    } else if (pad === 'C' && !this.padC) {
      this.padC = true;
      this.flashMesh(this.props.padCMesh, true);
      changed = true;
    }

    if (!changed) {
      return;
    }

    const lit = this.litCount();
    this.refreshVisuals(`Pulse ACTIVE — pads lit ${lit}/3`);
    this.broadcast(`Pads ${lit}/3`);
    this.log(`pad ${pad} by id=${player.id} lit=${lit}`);

    if (this.padA && this.padB && this.padC) {
      this.onSuccess();
    }
  }

  private onSuccess(): void {
    if (this.successLatch) {
      return;
    }
    this.successLatch = true;
    this.score += 1;
    this.playSuccessFeedback();
    this.refreshVisuals(`SUCCESS — score ${this.score}. Resetting…`);
    this.broadcast('Success');
    this.popupAllParticipants(`Team pulse complete! Score: ${this.score}`);
    this.log(`success score=${this.score}`);

    const timeoutSec = this.boundedTimeoutSeconds();
    this.clearResetTimer();
    this.resetTimerId = this.async.setTimeout(() => {
      this.resetRound('Auto reset after success');
    }, timeoutSec * 1000);
  }

  private resetRound(reason: string): void {
    this.clearResetTimer();
    this.active = false;
    this.padA = false;
    this.padB = false;
    this.padC = false;
    this.successLatch = false;
    this.participants = {};
    this.lastPadMs = {};
    this.flashMesh(this.props.padAMesh, false);
    this.flashMesh(this.props.padBMesh, false);
    this.flashMesh(this.props.padCMesh, false);
    this.refreshVisuals(`Pulse ready — score ${this.score}. Enter START`);
    this.broadcast(reason);
    this.log(`reset: ${reason}`);
  }

  private playSuccessFeedback(): void {
    const audioEntity = this.props.successAudio;
    if (audioEntity != null && audioEntity.exists()) {
      const audio = audioEntity.as(AudioGizmo);
      if (audio != null) {
        audio.play();
      }
    }
    const fxEntity = this.props.successFx;
    if (fxEntity != null && fxEntity.exists()) {
      const fx = fxEntity.as(ParticleGizmo);
      if (fx != null) {
        fx.play({ fromStart: true });
      }
    }
  }

  private flashMesh(mesh: Entity | undefined | null, lit: boolean): void {
    if (mesh == null || !mesh.exists()) {
      return;
    }
    try {
      if (lit) {
        mesh.color.set(new Color(0.15, 0.95, 0.45));
      } else {
        mesh.color.set(new Color(0.2, 0.2, 0.25));
      }
    } catch (_e) {
      this.log('mesh color set failed');
    }
  }

  private refreshVisuals(status: string): void {
    const board = this.props.scoreboardText;
    if (board == null || !board.exists()) {
      return;
    }
    const text = board.as(TextGizmo);
    if (text == null) {
      return;
    }
    const a = this.padA ? 'ON' : 'off';
    const b = this.padB ? 'ON' : 'off';
    const c = this.padC ? 'ON' : 'off';
    text.text.set(
      `PULSE CHALLENGE\nScore: ${this.score}\nA:${a} B:${b} C:${c}\nPlayers: ${this.participantCount()}\n${status}`
    );
  }

  private broadcast(message: string): void {
    if (!this.isAuthority()) {
      return;
    }
    this.sendNetworkBroadcastEvent(PulseSyncEvent, {
      generation: this.generation,
      active: this.active,
      padA: this.padA,
      padB: this.padB,
      padC: this.padC,
      score: this.score,
      message: message,
    });
  }

  private applyRemoteSync(payload: PulseSyncPayload): void {
    if (payload == null || this.isAuthority()) {
      return;
    }
    if (payload.generation >= this.generation) {
      this.generation = payload.generation;
      this.active = payload.active;
      this.padA = payload.padA;
      this.padB = payload.padB;
      this.padC = payload.padC;
      if (payload.score > this.score) {
        this.score = payload.score;
      }
      this.flashMesh(this.props.padAMesh, this.padA);
      this.flashMesh(this.props.padBMesh, this.padB);
      this.flashMesh(this.props.padCMesh, this.padC);
      this.refreshVisuals(payload.message);
    }
  }

  private popupAllParticipants(msg: string): void {
    const players = this.world.getPlayers();
    for (let i = 0; i < players.length; i++) {
      const p = players[i];
      if (p != null && this.participants[p.id]) {
        this.world.ui.showPopupForPlayer(p, msg, 3);
      }
    }
  }

  private addParticipant(player: Player): boolean {
    if (this.participants[player.id]) {
      return true;
    }
    if (this.participantCount() >= this.maxParticipantCap()) {
      return false;
    }
    this.participants[player.id] = true;
    return true;
  }

  private maxParticipantCap(): number {
    const n = this.props.maxParticipants;
    if (n == null || n < 1) {
      return 32;
    }
    if (n > 64) {
      return 64;
    }
    return Math.floor(n);
  }

  private allowPadInteraction(player: Player): boolean {
    const now = Date.now();
    const cooldownMs =
      (this.props.padCooldownSeconds != null && this.props.padCooldownSeconds > 0
        ? this.props.padCooldownSeconds
        : 0.35) * 1000;
    const last = this.lastPadMs[player.id];
    if (last != null && now - last < cooldownMs) {
      return false;
    }
    this.lastPadMs[player.id] = now;
    this.pruneCooldownMap(now, cooldownMs * 8);
    return true;
  }

  private pruneCooldownMap(now: number, maxAgeMs: number): void {
    const keys: string[] = [];
    for (const key in this.lastPadMs) {
      keys.push(key);
    }
    if (keys.length <= 64) {
      for (let i = 0; i < keys.length; i++) {
        const id = Number(keys[i]);
        if (now - this.lastPadMs[id] > maxAgeMs) {
          delete this.lastPadMs[id];
        }
      }
      return;
    }
    this.lastPadMs = {};
  }

  private litCount(): number {
    return (this.padA ? 1 : 0) + (this.padB ? 1 : 0) + (this.padC ? 1 : 0);
  }

  private participantCount(): number {
    let n = 0;
    for (const key in this.participants) {
      if (this.participants[key]) {
        n += 1;
      }
    }
    return n;
  }

  private boundedTimeoutSeconds(): number {
    const timeoutSec =
      this.props.successTimeoutSeconds != null && this.props.successTimeoutSeconds > 0
        ? this.props.successTimeoutSeconds
        : 8;
    if (timeoutSec > 60) {
      return 60;
    }
    return timeoutSec;
  }

  private clearResetTimer(): void {
    if (this.resetTimerId != null) {
      this.async.clearTimeout(this.resetTimerId);
      this.resetTimerId = null;
    }
  }

  private log(msg: string): void {
    if (this.props.debugLogs) {
      console.log(`[VybePulseChallenge] ${msg}`);
    }
  }
}

Component.register(VybePulseChallenge, 'VybePulseChallenge');
