import { Component, PropTypes, CodeBlockEvents, Player, Vec3, AudioGizmo, ParticleGizmo } from 'horizon/core';

export class JumpPad extends Component<typeof JumpPad> {
  static propsDefinition = {
    launchForce: { type: PropTypes.Number, default: 10 },
    soundEffect: { type: PropTypes.Entity },
    particleEffect: { type: PropTypes.Entity },
  };

  override start() {
    // Connect to the trigger event that fires when a player enters the trigger volume.
    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerEnterTrigger,
      (player: Player) => {
        this.launchPlayer(player);
      }
    );
  }

  private launchPlayer(player: Player) {
    if (!player) {
      return;
    }

    // Apply an upward force to the player.
    player.applyForce(new Vec3(0, this.props.launchForce, 0));

    // Play the sound effect if it's provided.
    const sound = this.props.soundEffect?.as(AudioGizmo);
    if (sound) {
      sound.play();
    }

    // Play the particle effect if it's provided.
    const particles = this.props.particleEffect?.as(ParticleGizmo);
    if (particles) {
      particles.play({ fromStart: true });
    }
  }
}

Component.register(JumpPad);