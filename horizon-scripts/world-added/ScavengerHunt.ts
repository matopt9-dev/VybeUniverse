import { Component, PropTypes, Player, Entity, CodeBlockEvents, TextGizmo, ParticleGizmo } from 'horizon/core';

// Define the structure for player progress
interface PlayerProgress {
  item1Found: boolean;
  item2Found: boolean;
  item3Found: boolean;
  questActive: boolean;
}

class ScavengerHunt extends Component<typeof ScavengerHunt> {
  static propsDefinition = {
    startTrigger: { type: PropTypes.Entity },
    item1Trigger: { type: PropTypes.Entity },
    item2Trigger: { type: PropTypes.Entity },
    item3Trigger: { type: PropTypes.Entity },
    scoreboard: { type: PropTypes.Entity },
    rewardEffect: { type: PropTypes.Entity },
  };

  // A map to hold the progress of each player in the world
  private playerProgress = new Map<number, PlayerProgress>();

  override start() {
    // Connect the start trigger
    if (this.props.startTrigger) {
      this.connectCodeBlockEvent(this.props.startTrigger, CodeBlockEvents.OnPlayerEnterTrigger, (player: Player) => {
        this.startQuest(player);
      });
    }

    // Connect the item triggers
    if (this.props.item1Trigger) {
      this.connectCodeBlockEvent(this.props.item1Trigger, CodeBlockEvents.OnPlayerEnterTrigger, (player: Player) => {
        this.findItem(player, 'item1');
      });
    }
    if (this.props.item2Trigger) {
      this.connectCodeBlockEvent(this.props.item2Trigger, CodeBlockEvents.OnPlayerEnterTrigger, (player: Player) => {
        this.findItem(player, 'item2');
      });
    }
    if (this.props.item3Trigger) {
      this.connectCodeBlockEvent(this.props.item3Trigger, CodeBlockEvents.OnPlayerEnterTrigger, (player: Player) => {
        this.findItem(player, 'item3');
      });
    }

    // Handle players leaving
    this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnPlayerExitWorld, (player: Player) => {
      if (this.playerProgress.has(player.id)) {
        this.playerProgress.delete(player.id);
      }
    });
  }

  private startQuest(player: Player) {
    let progress = this.getProgress(player);
    if (progress.questActive) {
      this.world.ui.showPopupForPlayer(player, "You're already on the quest!", 3);
      return;
    }

    // Start the quest for the player
    progress.questActive = true;
    this.world.persistentStorage.setPlayerVariable(player, 'scavengerQuestActive', true);
    this.playerProgress.set(player.id, progress);

    this.updateScoreboard(player, "Quest Started! Find 3 items.");
  }

  private findItem(player: Player, item: 'item1' | 'item2' | 'item3') {
    let progress = this.getProgress(player);
    if (!progress.questActive) {
      this.world.ui.showPopupForPlayer(player, "Start the quest first!", 3);
      return;
    }

    let itemFound = false;
    if (item === 'item1' && !progress.item1Found) {
      progress.item1Found = true;
      this.world.persistentStorage.setPlayerVariable(player, 'scavengerItem1', true);
      itemFound = true;
    } else if (item === 'item2' && !progress.item2Found) {
      progress.item2Found = true;
      this.world.persistentStorage.setPlayerVariable(player, 'scavengerItem2', true);
      itemFound = true;
    } else if (item === 'item3' && !progress.item3Found) {
      progress.item3Found = true;
      this.world.persistentStorage.setPlayerVariable(player, 'scavengerItem3', true);
      itemFound = true;
    }

    if (itemFound) {
      this.playerProgress.set(player.id, progress);
      this.checkCompletion(player);
    }
  }

  private checkCompletion(player: Player) {
    const progress = this.getProgress(player);
    const itemsFound = (progress.item1Found ? 1 : 0) + (progress.item2Found ? 1 : 0) + (progress.item3Found ? 1 : 0);

    if (itemsFound === 3) {
      // Quest complete
      this.updateScoreboard(player, "Congratulations! You found all items!");
      this.props.rewardEffect?.as(ParticleGizmo)?.play({ fromStart: true });

      // Reset after a delay
      this.async.setTimeout(() => {
        this.resetQuest(player);
        this.updateScoreboard(player, "Quest complete! Ready for another round.");
      }, 5000);
    } else {
      // Update progress
      this.updateScoreboard(player, `Items found: ${itemsFound} / 3`);
    }
  }

  private getProgress(player: Player): PlayerProgress {
    if (this.playerProgress.has(player.id)) {
      return this.playerProgress.get(player.id)!;
    }

    // Load from persistent storage if not in memory
    const progress: PlayerProgress = {
      questActive: this.world.persistentStorage.getPlayerVariable(player, 'scavengerQuestActive') || false,
      item1Found: this.world.persistentStorage.getPlayerVariable(player, 'scavengerItem1') || false,
      item2Found: this.world.persistentStorage.getPlayerVariable(player, 'scavengerItem2') || false,
      item3Found: this.world.persistentStorage.getPlayerVariable(player, 'scavengerItem3') || false,
    };

    this.playerProgress.set(player.id, progress);
    return progress;
  }

  private resetQuest(player: Player) {
    const progress: PlayerProgress = {
      questActive: false,
      item1Found: false,
      item2Found: false,
      item3Found: false,
    };
    this.playerProgress.set(player.id, progress);

    // Clear persistent variables
    this.world.persistentStorage.setPlayerVariable(player, 'scavengerQuestActive', false);
    this.world.persistentStorage.setPlayerVariable(player, 'scavengerItem1', false);
    this.world.persistentStorage.setPlayerVariable(player, 'scavengerItem2', false);
    this.world.persistentStorage.setPlayerVariable(player, 'scavengerItem3', false);
  }

  private updateScoreboard(player: Player, message: string) {
    const scoreboardGizmo = this.props.scoreboard?.as(TextGizmo);
    if (scoreboardGizmo) {
      scoreboardGizmo.text.set(`${player.name.get()}: ${message}`);
    }
  }
}

Component.register(ScavengerHunt);