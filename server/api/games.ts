import consola from "consola";
import { gameManager } from "../socket/managers/GameManager"

export default defineEventHandler((event) => {
    // consola.info("requesting list of games - ", gameManager.getAllGames())

    const games = gameManager.getAllGames();
    if (games) {
        return games.map((game) => ({ ...game, players: Array.from(game.players.values()) }))
    }

})