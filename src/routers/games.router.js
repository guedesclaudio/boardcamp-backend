import express from "express"
import { createGame, listGames } from "../controllers/games.controller.js"
import { gameCreateValidation } from "../middlewares/games.middleware.js"

const router = express.Router()

router.get("/games", listGames)
router.post("/games", gameCreateValidation, createGame)

export default router