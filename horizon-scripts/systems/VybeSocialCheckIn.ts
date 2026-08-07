/**
 * Vybe Social Horizon Edition — Social check-in (Phase 4).
 * World ID: 1192248460643536
 *
 * Real player interaction only — no fake users/feeds. Check-in trigger greets
 * the player, increments a personal count (persistentStorage), and broadcasts
 * a NetworkEvent so others can see activity via popup/log.
 *
 * Setup:
 * 1. Trigger VybeCheckInTrigger
 * 2. Optional TextGizmo VybeCheckInSign
 * 3. Optional AudioGizmo VybeCheckInSfx
 * 4. Attach VybeSocialCheckIn; wire props
 */
import {
  Component,
  PropTypes,
  CodeBlockEvents,
  Player,
  TextGizmo,
  AudioGizmo,
  NetworkEvent,
} from 'horizon/core';

type CheckInPayload = {
  playerId: number;
  name: string;
  total: number;
};

const CheckInEvent = new NetworkEvent<CheckInPayload>('vybe_social_checkin');

class VybeSocialCheckIn extends Component<typeof VybeSocialCheckIn> {
  static propsDefinition = {
    checkInTrigger: { type: PropTypes.Entity },
    signText: { type: PropTypes.Entity },
    feedbackAudio: { type: PropTypes.Entity },
    cooldownSeconds: { type: PropTypes.Number, default: 8 },
    debugLogs: { type: PropTypes.Boolean, default: false },
  };

  private lastCheckInMs: { [id: number]: number } = {};
  private sessionCheckIns = 0;

  start() {
    this.connectNetworkBroadcastEvent(CheckInEvent, (payload: CheckInPayload) => {
      this.onRemoteCheckIn(payload);
    });

    const trigger = this.props.checkInTrigger;
    if (trigger == null || !trigger.exists()) {
      this.log('checkInTrigger missing');
      return;
    }
    this.connectCodeBlockEvent(
      trigger,
      CodeBlockEvents.OnPlayerEnterTrigger,
      (player: Player) => this.onCheckIn(player)
    );
    this.refreshSign();
    this.log('social check-in armed');
  }

  private onCheckIn(player: Player): void {
    if (player == null) {
      return;
    }
    const now = Date.now();
    const cooldownMs =
      (this.props.cooldownSeconds != null && this.props.cooldownSeconds > 0
        ? this.props.cooldownSeconds
        : 8) * 1000;
    const last = this.lastCheckInMs[player.id];
    if (last != null && now - last < cooldownMs) {
      this.world.ui.showPopupForPlayer(player, 'Already checked in — take a breath', 2);
      return;
    }

    this.lastCheckInMs[player.id] = now;
    this.sessionCheckIns += 1;
    const name = this.safeName(player);
    const personal = this.readPersonalCount(player) + 1;
    this.writePersonalCount(player, personal);

    this.world.ui.showPopupForPlayer(
      player,
      `Check-in complete, ${name}\nYour visits: ${personal}\nSession check-ins: ${this.sessionCheckIns}`,
      3.5
    );

    const audioEntity = this.props.feedbackAudio;
    if (audioEntity != null && audioEntity.exists()) {
      const audio = audioEntity.as(AudioGizmo);
      if (audio != null) {
        audio.play();
      }
    }

    this.sendNetworkBroadcastEvent(CheckInEvent, {
      playerId: player.id,
      name: name,
      total: this.sessionCheckIns,
    });
    this.refreshSign();
    this.log(`check-in id=${player.id} personal=${personal}`);
  }

  private onRemoteCheckIn(payload: CheckInPayload): void {
    if (payload == null) {
      return;
    }
    // Keep session counter at least as high as broadcast (late join awareness).
    if (payload.total > this.sessionCheckIns) {
      this.sessionCheckIns = payload.total;
    }
    this.refreshSign();
    this.log(`remote check-in ${payload.name} total=${payload.total}`);
  }

  private refreshSign(): void {
    const sign = this.props.signText;
    if (sign == null || !sign.exists()) {
      return;
    }
    const text = sign.as(TextGizmo);
    if (text == null) {
      return;
    }
    text.text.set(`SOCIAL CHECK-IN\nSession visits: ${this.sessionCheckIns}\nStep in to say hi`);
  }

  private readPersonalCount(player: Player): number {
    try {
      const value = this.world.persistentStorage.getPlayerVariable(
        player,
        'vybe_checkin_count'
      ) as number;
      if (typeof value === 'number' && value >= 0) {
        return value;
      }
    } catch (_e) {
      // ignore
    }
    return 0;
  }

  private writePersonalCount(player: Player, count: number): void {
    try {
      this.world.persistentStorage.setPlayerVariable(player, 'vybe_checkin_count', count);
    } catch (_e) {
      this.log('persistentStorage write failed');
    }
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
      console.log(`[VybeSocialCheckIn] ${msg}`);
    }
  }
}

Component.register(VybeSocialCheckIn, 'VybeSocialCheckIn');
