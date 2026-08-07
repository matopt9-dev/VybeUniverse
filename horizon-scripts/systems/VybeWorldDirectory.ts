/**
 * Vybe Social Horizon Edition — World directory (Phases 4 + 6/8).
 * World ID: 1192248460643536
 *
 * Responsibility: directory trigger shows navigation via popup + optional
 * TextGizmo. Optional landmark mesh color flash (Entity.color proven).
 * No horizon/ui. No fake district CTAs for locked areas.
 *
 * Setup:
 * 1. Trigger VybeDirectoryTrigger
 * 2. Optional TextGizmo VybeDirectorySign
 * 3. Optional landmark mesh for visual feedback
 * 4. Empty entity VybeDirectory; attach VybeWorldDirectory
 */
import {
  Component,
  PropTypes,
  CodeBlockEvents,
  Player,
  TextGizmo,
  Color,
} from 'horizon/core';

const DIRECTORY_COPY =
  'VYBE DIRECTORY\n1 YOU / Spawn (landmark)\n2 Social Check-In\n3 Pulse Challenge\n4 Portal Pad\n5 Social District (gate)\nLocked: Creator / Game / Event / Market';

class VybeWorldDirectory extends Component<typeof VybeWorldDirectory> {
  static propsDefinition = {
    directoryTrigger: { type: PropTypes.Entity },
    directoryText: { type: PropTypes.Entity },
    landmarkMesh: { type: PropTypes.Entity },
    popupSeconds: { type: PropTypes.Number, default: 4 },
    debugLogs: { type: PropTypes.Boolean, default: false },
  };

  start() {
    this.applySignText();
    const trigger = this.props.directoryTrigger;
    if (trigger == null || !trigger.exists()) {
      this.log('directoryTrigger missing — idle');
      return;
    }

    this.connectCodeBlockEvent(
      trigger,
      CodeBlockEvents.OnPlayerEnterTrigger,
      (player: Player) => this.onEnter(player)
    );
    this.log('directory armed');
  }

  private onEnter(player: Player): void {
    if (player == null) {
      return;
    }
    this.applySignText();
    this.flashLandmark();
    const seconds =
      this.props.popupSeconds != null && this.props.popupSeconds > 0
        ? this.props.popupSeconds
        : 4;
    this.world.ui.showPopupForPlayer(player, DIRECTORY_COPY, seconds);
    this.log(`directory shown to id=${player.id}`);
  }

  private applySignText(): void {
    const textEntity = this.props.directoryText;
    if (textEntity == null || !textEntity.exists()) {
      return;
    }
    const gizmo = textEntity.as(TextGizmo);
    if (gizmo == null) {
      this.log('directoryText is not TextGizmo — skip');
      return;
    }
    gizmo.text.set(DIRECTORY_COPY);
  }

  private flashLandmark(): void {
    const mesh = this.props.landmarkMesh;
    if (mesh == null || !mesh.exists()) {
      return;
    }
    try {
      mesh.color.set(new Color(0.95, 0.55, 0.15));
      this.async.setTimeout(() => {
        if (mesh.exists()) {
          mesh.color.set(new Color(0.85, 0.85, 0.9));
        }
      }, 500);
    } catch (_e) {
      this.log('landmark color flash failed');
    }
  }

  private log(msg: string): void {
    if (this.props.debugLogs) {
      console.log(`[VybeWorldDirectory] ${msg}`);
    }
  }
}

Component.register(VybeWorldDirectory, 'VybeWorldDirectory');
