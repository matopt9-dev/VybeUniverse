import { Component, PropTypes, Entity, Color, World, DynamicLightGizmo } from 'horizon/core';

export class DayNightCycle extends Component<typeof DayNightCycle> {
  static propsDefinition = {
    targetLight: { type: PropTypes.Entity },
    cycleDurationSeconds: { type: PropTypes.Number, default: 120 },
    dayColor: { type: PropTypes.Color, default: new Color(1, 0.9, 0.8) },
    nightColor: { type: PropTypes.Color, default: new Color(0.4, 0.6, 1) },
    dayIntensity: { type: PropTypes.Number, default: 1.5 },
    nightIntensity: { type: PropTypes.Number, default: 0.2 },
  };

  private lightGizmo?: DynamicLightGizmo;
  private cycleTime: number = 0;

  override start() {
    if (!this.props.targetLight) {
      console.error('DayNightCycle: targetLight property is not set.');
      return;
    }

    this.lightGizmo = this.props.targetLight.as(DynamicLightGizmo);

    if (!this.lightGizmo) {
      console.error('DayNightCycle: targetLight is not a DynamicLightGizmo.');
      return;
    }

    this.connectLocalBroadcastEvent(World.onUpdate, (data) => {
      this.updateCycle(data.deltaTime);
    });
  }

  private updateCycle(deltaTime: number) {
    if (!this.lightGizmo) return;

    this.cycleTime += deltaTime;
    const duration = this.props.cycleDurationSeconds > 0 ? this.props.cycleDurationSeconds : 120;
    const cycleProgress = (this.cycleTime % duration) / duration;

    // Use a sine wave for smooth transition from day (1) to night (-1) and back.
    const sineWave = Math.sin(cycleProgress * 2 * Math.PI - Math.PI / 2);

    // Map the sine wave from [-1, 1] to [0, 1] for interpolation.
    const lerpFactor = (sineWave + 1) / 2;

    // Interpolate color by blending the RGB components.
    const r = this.props.nightColor.r + (this.props.dayColor.r - this.props.nightColor.r) * lerpFactor;
    const g = this.props.nightColor.g + (this.props.dayColor.g - this.props.nightColor.g) * lerpFactor;
    const b = this.props.nightColor.b + (this.props.dayColor.b - this.props.nightColor.b) * lerpFactor;
    this.lightGizmo.color.set(new Color(r, g, b));

    // Interpolate intensity.
    const currentIntensity = this.props.nightIntensity + (this.props.dayIntensity - this.props.nightIntensity) * lerpFactor;
    this.lightGizmo.intensity.set(currentIntensity);
  }
}

Component.register(DayNightCycle);