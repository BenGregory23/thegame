import { gameManager } from "../socket/managers/GameManager";

export default defineEventHandler((event) => {
  const params = getQuery(event);
  const config = useRuntimeConfig();

  if (params.key !== config.admin_key) {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
    });
  }

  const games = gameManager.getAllGames();

  return (games ?? []).map((game) => ({
    ...game,
    players: Array.from(game.players.values()),
  }));
});
