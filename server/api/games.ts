import { gameManager } from "../socket/managers/GameManager";

export default defineEventHandler((event) => {
  const games = gameManager.getAllGames();
  if (games) {
    return games.map((game) => ({
      ...game,
      players: Array.from(game.players.values()),
    }));
  }
});
