import STATUS_CODE from "../enums/statusCode.enum.js";

async function listGames (req, res) {

    const {gameName} = req.query

    res.send("lista de jogos")
}

async function createGame (req, res) {

    const gameData = res.locals.gameData
    console.log(gameData)
    res.sendStatus(STATUS_CODE.CREATED)
}


export {listGames, createGame}