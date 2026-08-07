import { Component, PropTypes, CodeBlockEvents, Player, ParticleGizmo, AudioGizmo } from 'horizon/core';

export class CelebrationButton extends Component<typeof CelebrationButton> {
  static propsDefinition = {
    particleEffect: { type: PropTypes.Entity },
    soundEffect: { type: PropTypes.Entity },
    cooldownSeconds: { type: PropTypes.Number, default: 5 },
  };

  private isOnCooldown: boolean = false;

  override start() {
    // Connect to the event that fires when a player enters the trigger volume.
    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerEnterTrigger,
      (player: Player) => {
        this.onPlayerEnter(player);
      }
    );
  }

  private onPlayerEnter(player: Player) {
    // Check if the trigger is on cooldown.
    if (this.isOnCooldown) {
      return;
    }

    // Activate the effects.
    this.playEffects();

    // Start the cooldown.
    this.startCooldown();
  }

  private playEffects() {
    // Play the particle effect if it's assigned.
    const particles = this.props.particleEffect?.as(ParticleGizmo);
    if (particles) {
      particles.play({ fromStart: true });
    }

    // Play the sound effect if it's assigned.
    const sound = this.props.soundEffect?.as(AudioGizmo);
    if (sound) {
      sound.play();
    }
  }

  private startCooldown() {
    this.isOnCooldown = true;

    // Set a timer to end the cooldown period.
    this.async.setTimeout(() => {
      this.isOnCooldown = false;
    }, this.props.cooldownSeconds * 1000);
  }
}

Component.register(CelebrationButton);