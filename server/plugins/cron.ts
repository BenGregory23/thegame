import { gameManager } from "../socket/managers/GameManager";

const ONE_HOUR = 3600000;

export default defineNitroPlugin(() => {
  setInterval(() => {
    gameManager.cleanupInactiveGames(ONE_HOUR);
  }, ONE_HOUR);
});
