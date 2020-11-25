import Phaser from "../lib/phaser.js";

const ASSET = {
  IMAGE: {
    BACKGROUND: {
      KEY: "background",
      ASSET: "assets/bg_layer1.png",
      X: 240,
      Y: 320,
    },
    PLATFORM: {
      KEY: "platform",
      ASSET: "assets/ground_grass.png",
    },
    PLAYER: {
      KEY: "bunny-stand",
      ASSET: "assets/bunny1_stand.png",
      X: 240,
      Y: 320,
    },
  },
};

// A "Scene" is used to group related logic and GameObjects
export default class Game extends Phaser.Scene {
  /** @type {Phaser.Physics.Arcade.Sprite} */
  player;
  /** @type {Phaser.Physics.Arcade.StaticGroup} */
  platforms;

  constructor() {
    super({ key: "game" });
  }

  // Load all necessary assets, assets MUST be loaded here
  preload() {
    const images = Object.keys(ASSET.IMAGE).map(
      (imgKey) => ASSET.IMAGE[imgKey]
    );
    for (let image of images) {
      this.load.image(image.KEY, image.ASSET);
    }
  }

  // Runs once after preload, assets loaded in preload can be used here
  create() {
    const { BACKGROUND } = ASSET.IMAGE;
    this.add.image(BACKGROUND.X, BACKGROUND.Y, BACKGROUND.KEY);

    this.platforms = this.generatePlatforms();
    this.player = this.addPlayer();

    // Add collisions between physics objects
    this.physics.add.collider(this.player, this.platforms);

    // Track the player
    this.cameras.main.startFollow(this.player);
  }

  // Runs over and over and over and ...
  update() {
    this.platforms.children.iterate((child) => {
      const platform = child;
      const scrolly = this.cameras.main.scrollY;
      if (platform.y >= scrollY) {
      }
    });

    const touchingDown = this.player.body.touching.down;
    if (touchingDown) {
      this.player.setVelocityY(-300);
    }
  }

  generatePlatforms() {
    const { PLATFORM } = ASSET.IMAGE;
    const platforms = this.physics.add.staticGroup();
    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(80, 400);
      const y = 150 * i;

      // JSDoc annotation to provide auto complete on platform variable
      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = platforms.create(x, y, PLATFORM.KEY);
      platform.setScale(0.5);

      // Necessary if changes are done to the GameObject
      platform.body.updateFromGameObject();
    }
    return platforms;
  }

  addPlayer() {
    const { PLAYER } = ASSET.IMAGE;
    const player = this.physics.add
      .sprite(PLAYER.X, PLAYER.Y, PLAYER.KEY)
      .setScale(0.5);

    // Only have collision on the 'down' side of the player
    player.body.checkCollision.up = false;
    player.body.checkCollision.left = false;
    player.body.checkCollision.right = false;
    return player;
  }
}
