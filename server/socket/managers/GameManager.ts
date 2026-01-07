import { Game } from "../models/Game";

export class GameManager {
    private games: Map<string, Game> = new Map();


    createGame(roomId: string, hostId: string): Game {
        if (!roomId || !hostId) {
            throw new Error("Missing roomId or hostId");
        }

        if (this.games.has(roomId)) {
            throw new Error("Game already exists");
        }

        const game = new Game(roomId, hostId);
        this.games.set(roomId, game);
        return game;
    }

    getGame(roomId: string): Game | undefined {
        return this.games.get(roomId);
    }

    getAllGames(): Game[] {
        return Array.from(this.games.values());
    }

    deleteGame(roomId: string) {
        if (this.games.has(roomId)) {
            this.games.delete(roomId);
        }
    }

    cleanupInactiveGames(maxAgeMs: number = 3600000) {
        const now = Date.now();
        for (const [roomId, game] of this.games) {
            if (now - game.lastActivity > maxAgeMs) {
                this.deleteGame(roomId);
            }
        }
    }
}


export const gameManager = new GameManager();