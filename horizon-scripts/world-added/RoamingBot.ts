import { Component, PropTypes, Entity, Vec3, World } from 'horizon/core';

export class RoamingBot extends Component<typeof RoamingBot> {
  static propsDefinition = {
    waypoint1: { type: PropTypes.Entity },
    waypoint2: { type: PropTypes.Entity },
    waypoint3: { type: PropTypes.Entity },
    waypoint4: { type: PropTypes.Entity },
    speed: { type: PropTypes.Number, default: 1.0 },
    waitTime: { type: PropTypes.Number, default: 2.0 },
  };

  private waypoints: Entity[] = [];
  private currentWaypointIndex = 0;
  private isWaiting = false;
  private lerpProgress = 0.0;
  private startPosition = new Vec3(0, 0, 0);
  private targetPosition = new Vec3(0, 0, 0);

  override start() {
    // Collect all valid waypoint props into an array
    const props = this.props;
    if (props.waypoint1) this.waypoints.push(props.waypoint1);
    if (props.waypoint2) this.waypoints.push(props.waypoint2);
    if (props.waypoint3) this.waypoints.push(props.waypoint3);
    if (props.waypoint4) this.waypoints.push(props.waypoint4);

    if (this.waypoints.length === 0) {
      console.log('RoamingBot: No waypoints configured.');
      return;
    }

    // Initialize the bot's starting position and first target
    this.startPosition = this.entity.position.get();
    this.targetPosition = this.waypoints[0].position.get();

    // Connect to the world update loop for smooth movement
    this.connectLocalBroadcastEvent(World.onUpdate, (data) => {
      this.updateMovement(data.deltaTime);
    });
  }

  private updateMovement(deltaTime: number) {
    if (this.isWaiting || this.waypoints.length === 0) {
      return;
    }

    // Calculate the distance to the target to determine the step size
    const distance = this.startPosition.distance(this.targetPosition);
    if (distance > 0) {
      this.lerpProgress += (this.props.speed * deltaTime) / distance;
    } else {
      this.lerpProgress = 1.0; // Instantly complete if distance is zero
    }

    // Clamp progress to ensure it doesn't overshoot
    this.lerpProgress = Math.min(this.lerpProgress, 1.0);

    // Interpolate the position
    const newPosition = Vec3.lerp(this.startPosition, this.targetPosition, this.lerpProgress);
    this.entity.position.set(newPosition);

    // Check if the waypoint has been reached
    if (this.lerpProgress >= 1.0) {
      this.isWaiting = true;
      this.async.setTimeout(() => {
        this.moveToNextWaypoint();
      }, this.props.waitTime * 1000);
    }
  }

  private moveToNextWaypoint() {
    this.isWaiting = false;
    this.lerpProgress = 0.0;

    // Cycle to the next waypoint, looping back to the start
    this.currentWaypointIndex = (this.currentWaypointIndex + 1) % this.waypoints.length;

    // Set the new start and target positions for the next leg of the journey
    this.startPosition = this.entity.position.get();
    this.targetPosition = this.waypoints[this.currentWaypointIndex].position.get();
  }
}

Component.register(RoamingBot);