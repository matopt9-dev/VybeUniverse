/**
 * Vybe Social Horizon Edition — Social District foundation (Phase 8).
 * World ID: 1192248460643536
 *
 * First district only — functional directory / portal / check-in / gather loop
 * using proven horizon/core. No fake users, feeds, or messages.
 * Hides locked district placeholders (Creator / Game / Event / Marketplace).
 *
 * Setup:
 * 1. Build Social District graybox near Arrival Plaza (see Docs/PHASE_8_SOCIAL_DISTRICT.md).
 * 2. Entities: directory trigger/sign, gather trigger/sign, inbound+return portals.
 * 3. Optional locked district root entities → visible=false on start.
 * 4. Attach VybeSocialDistrict; wire props. Keep plaza scripts intact.
 */
import {
  Component,
  PropTypes,
  CodeBlockEvents,
  Player,
  TextGizmo,
  AudioGizmo,
  SpawnPointGizmo,
  NetworkEvent,
  Entity,
  Color,
} from 'horizon/core';

type DistrictCheckInPayload = {
  playerId: number;
  name: string;
  sessionTotal: number;
};

const DistrictCheckInEvent = new NetworkEvent<DistrictCheckInPayload>('vybe_social_district_checkin');

const DISTRICT_DIRECTORY =
  'SOCIAL DISTRICT\n1 Gather / Check-In\n2 Meet real players here\n3 Return portal → Arrival Plaza\nLocked elsewhere: Creator / Game / Event / Market';

class VybeSocialDistrict extends Component<typeof VybeSocialDistrict> {
  static propsDefinition = {
    directoryTrigger: { type: PropTypes.Entity },
    directoryText: { type: PropTypes.Entity },
    gatherTrigger: { type: PropTypes.Entity },
    gatherSign: { type: PropTypes.Entity },
    gatherAudio: { type: PropTypes.Entity },
    gatherMesh: { type: PropTypes.Entity },
    toDistrictTrigger: { type: PropTypes.Entity },
    districtSpawn: { type: PropTypes.Entity },
    returnTrigger: { type: PropTypes.Entity },
    returnSpawn: { type: PropTypes.Entity },
    lockedCreatorRoot: { type: PropTypes.Entity },
    lockedGameRoot: { type: PropTypes.Entity },
    lockedEventRoot: { type: PropTypes.Entity },
    lockedMarketplaceRoot: { type: PropTypes.Entity },
    checkInCooldownSeconds: { type: PropTypes.Number, default: 8 },
    portalCooldownSeconds: { type: PropTypes.Number, default: 1.5 },
    debugLogs: { type: PropTypes.Boolean, default: false },
  };

  private sessionCheckIns = 0;
  private lastCheckInMs: { [id: number]: number } = {};
  private lastPortalMs: { [id: number]: number } = {};
  private readonly maxMapEntries = 64;

  start() {
    this.diagnoseMissingProps();
    this.hideLockedDistricts();
    this.applyDirectorySign();
    this.refreshGatherSign();

    this.connectNetworkBroadcastEvent(DistrictCheckInEvent, (payload: DistrictCheckInPayload) => {
      this.onRemoteCheckIn(payload);
    });

    this.wireTrigger(this.props.directoryTrigger, (p) => this.onDirectory(p));
    this.wireTrigger(this.props.gatherTrigger, (p) => this.onGatherCheckIn(p));
    this.wireTrigger(this.props.toDistrictTrigger, (p) =>
      this.onPortal(p, this.props.districtSpawn, 'Social District')
    );
    this.wireTrigger(this.props.returnTrigger, (p) =>
      this.onPortal(p, this.props.returnSpawn, 'Arrival Plaza')
    );

    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerExitWorld,
      (player: Player) => {
        if (player != null) {
          delete this.lastCheckInMs[player.id];
          delete this.lastPortalMs[player.id];
        }
      }
    );

    this.log('social district armed');
  }

  /** Required entity refs for a playable district. Optional refs warn only when debugLogs. */
  private diagnoseMissingProps(): void {
    const required: Array<{ key: string; entity: Entity | null | undefined }> = [
      { key: 'directoryTrigger', entity: this.props.directoryTrigger },
      { key: 'gatherTrigger', entity: this.props.gatherTrigger },
      { key: 'toDistrictTrigger', entity: this.props.toDistrictTrigger },
      { key: 'districtSpawn', entity: this.props.districtSpawn },
      { key: 'returnTrigger', entity: this.props.returnTrigger },
      { key: 'returnSpawn', entity: this.props.returnSpawn },
    ];
    for (let i = 0; i < required.length; i++) {
      const item = required[i];
      if (item.entity == null || !item.entity.exists()) {
        console.warn(
          `[VybeSocialDistrict] REQUIRED prop missing or invalid: ${item.key} — wire in Desktop Editor`
        );
      }
    }
    const optional: Array<{ key: string; entity: Entity | null | undefined }> = [
      { key: 'directoryText', entity: this.props.directoryText },
      { key: 'gatherSign', entity: this.props.gatherSign },
      { key: 'gatherAudio', entity: this.props.gatherAudio },
      { key: 'gatherMesh', entity: this.props.gatherMesh },
      { key: 'lockedCreatorRoot', entity: this.props.lockedCreatorRoot },
      { key: 'lockedGameRoot', entity: this.props.lockedGameRoot },
      { key: 'lockedEventRoot', entity: this.props.lockedEventRoot },
      { key: 'lockedMarketplaceRoot', entity: this.props.lockedMarketplaceRoot },
    ];
    for (let j = 0; j < optional.length; j++) {
      const item = optional[j];
      if ((item.entity == null || !item.entity.exists()) && this.props.debugLogs) {
        console.log(`[VybeSocialDistrict] optional prop unset: ${item.key}`);
      }
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

  private hideLockedDistricts(): void {
    this.hideRoot(this.props.lockedCreatorRoot, 'Creator');
    this.hideRoot(this.props.lockedGameRoot, 'Game');
    this.hideRoot(this.props.lockedEventRoot, 'Event');
    this.hideRoot(this.props.lockedMarketplaceRoot, 'Marketplace');
  }

  private hideRoot(root: Entity | undefined | null, label: string): void {
    if (root == null || !root.exists()) {
      return;
    }
    try {
      root.visible.set(false);
      this.log(`locked ${label} hidden`);
    } catch (_e) {
      this.log(`failed to hide ${label}`);
    }
  }

  private onDirectory(player: Player): void {
    this.applyDirectorySign();
    this.world.ui.showPopupForPlayer(player, DISTRICT_DIRECTORY, 4);
    this.log(`district directory id=${player.id}`);
  }

  private onGatherCheckIn(player: Player): void {
    const now = Date.now();
    const cooldownMs =
      (this.props.checkInCooldownSeconds != null && this.props.checkInCooldownSeconds > 0
        ? this.props.checkInCooldownSeconds
        : 8) * 1000;
    const last = this.lastCheckInMs[player.id];
    if (last != null && now - last < cooldownMs) {
      this.world.ui.showPopupForPlayer(player, 'Already gathered — say hi nearby', 2);
      return;
    }

    this.lastCheckInMs[player.id] = now;
    this.pruneMap(this.lastCheckInMs, now, cooldownMs * 8);
    this.sessionCheckIns += 1;
    const name = this.safeName(player);
    const playersHere = this.world.getPlayers().length;

    this.world.ui.showPopupForPlayer(
      player,
      `Social District check-in\nHi ${name}\nPlayers in instance: ${playersHere}\nSession gathers: ${this.sessionCheckIns}`,
      3.5
    );

    const audioEntity = this.props.gatherAudio;
    if (audioEntity != null && audioEntity.exists()) {
      const audio = audioEntity.as(AudioGizmo);
      if (audio != null) {
        audio.play();
      }
    }
    this.flashGatherMesh();

    this.sendNetworkBroadcastEvent(DistrictCheckInEvent, {
      playerId: player.id,
      name: name,
      sessionTotal: this.sessionCheckIns,
    });
    this.refreshGatherSign();
    this.log(`gather check-in id=${player.id}`);
  }

  private onRemoteCheckIn(payload: DistrictCheckInPayload): void {
    if (payload == null) {
      return;
    }
    if (payload.sessionTotal > this.sessionCheckIns) {
      this.sessionCheckIns = payload.sessionTotal;
    }
    this.refreshGatherSign();
  }

  private onPortal(
    player: Player,
    destination: Entity | undefined | null,
    label: string
  ): void {
    const now = Date.now();
    const cooldownMs =
      (this.props.portalCooldownSeconds != null && this.props.portalCooldownSeconds > 0
        ? this.props.portalCooldownSeconds
        : 1.5) * 1000;
    const last = this.lastPortalMs[player.id];
    if (last != null && now - last < cooldownMs) {
      this.log(`portal cooldown id=${player.id}`);
      return;
    }
    if (destination == null || !destination.exists()) {
      this.world.ui.showPopupForPlayer(player, `${label} portal offline`, 2);
      return;
    }
    const spawn = destination.as(SpawnPointGizmo);
    if (spawn == null) {
      this.world.ui.showPopupForPlayer(player, `${label} portal miswired`, 2);
      return;
    }
    spawn.teleportPlayer(player);
    this.lastPortalMs[player.id] = now;
    this.pruneMap(this.lastPortalMs, now, cooldownMs * 8);
    this.world.ui.showPopupForPlayer(player, `Arrived — ${label}`, 1.5);
    this.log(`portal → ${label} id=${player.id}`);
  }

  private applyDirectorySign(): void {
    const textEntity = this.props.directoryText;
    if (textEntity == null || !textEntity.exists()) {
      return;
    }
    const gizmo = textEntity.as(TextGizmo);
    if (gizmo != null) {
      gizmo.text.set(DISTRICT_DIRECTORY);
    }
  }

  private refreshGatherSign(): void {
    const sign = this.props.gatherSign;
    if (sign == null || !sign.exists()) {
      return;
    }
    const text = sign.as(TextGizmo);
    if (text == null) {
      return;
    }
    text.text.set(
      `SOCIAL GATHER\nSession check-ins: ${this.sessionCheckIns}\nReal players only — step in`
    );
  }

  private flashGatherMesh(): void {
    const mesh = this.props.gatherMesh;
    if (mesh == null || !mesh.exists()) {
      return;
    }
    try {
      mesh.color.set(new Color(0.2, 0.75, 1));
      this.async.setTimeout(() => {
        if (mesh.exists()) {
          mesh.color.set(new Color(0.25, 0.3, 0.4));
        }
      }, 400);
    } catch (_e) {
      this.log('gather mesh flash failed');
    }
  }

  private pruneMap(map: { [id: number]: number }, now: number, maxAgeMs: number): void {
    const keys: string[] = [];
    for (const key in map) {
      keys.push(key);
    }
    if (keys.length > this.maxMapEntries) {
      for (let i = 0; i < keys.length; i++) {
        delete map[Number(keys[i])];
      }
      return;
    }
    for (let i = 0; i < keys.length; i++) {
      const id = Number(keys[i]);
      if (now - map[id] > maxAgeMs) {
        delete map[id];
      }
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
      console.log(`[VybeSocialDistrict] ${msg}`);
    }
  }
}

Component.register(VybeSocialDistrict, 'VybeSocialDistrict');
