import Phaser from "./lib/phaser.js";
import Game from "./scenes/game.js";

const CONFIG = {
  WIDTH: 480,
  HEIGHT: 640,
};
export default new Phaser.Game({
  type: Phaser.AUTO,
  width: CONFIG.WIDTH,
  height: CONFIG.HEIGHT,
  scene: [Game],
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 200,
      },
      debug: true,
    },
  },
});
