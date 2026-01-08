import consola from "consola";
import { gameManager } from "../socket/managers/GameManager"

export default defineEventHandler((event) => {
    consola.info("requesting list of games - ", gameManager.getAllGames().length)
    return gameManager.getAllGames();
})