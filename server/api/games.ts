import { gameManager } from "../socket/managers/GameManager";
import { IGameAdminDTO } from "../../shared/types/types";
import { Game } from "../socket/models/Game";

export default defineEventHandler((event) => {
  const games = gameManager.getAllGames();

  return (games ?? []).map(
    (game: Game): IGameAdminDTO => ({
      roomId: game.roomId,
      hostId: game.hostId,
      status: game.status,
      players: Array.from(game.players.values()).map((p) => ({
        id: p.id,
        username: p.username,
        handSize: p.hand?.length,
        isHost: p.isHost,
      })),
      lastActivity: game.lastActivity,
      settings: game.settings,
      deckSize: game.deck.length,
      stacks: Array.from(game.stacks.entries()).map(([id, stack]) => ({
        id,
        ...stack,
      })),
      currentTurn: game.currentTurn,
    }),
  );
});
