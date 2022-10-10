import STATUS_CODE from "../enums/statusCode.enum.js";
import connection from "../database/database.js"

async function listGames (req, res) {

    const {name, offset, limit} = req.query
    const offSet = offset ? `OFFSET ${offset}` : ""
    const dataLimit = limit ? `LIMIT ${limit}` : ""
    let query = `SELECT games.*, categories.name AS "categoryName" 
    FROM games JOIN categories ON games."categoryId" = categories.id ${offSet} ${dataLimit};`

    if (name) {
        const formatName = name.toLowerCase()
        query = `SELECT games.*, categories.name AS "categoryName" 
        FROM games JOIN categories ON games."categoryId" = 
        categories.id WHERE games.name LIKE '${formatName}%' ${offSet};`
    }

    try {
        const games = await connection.query(query)
        games.rows.forEach(value => {value.name = value.name[0].toUpperCase() + value.name.substring(1)})
        res.send(games.rows)

    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

async function createGame (req, res) {

    const {name, image, stockTotal, categoryId, pricePerDay} = res.locals.gameData
    const formatName = name.toLowerCase()

    try {
        await connection.query(`INSERT INTO games 
        ("name", "image", "stockTotal", "categoryId", "pricePerDay") 
        VALUES ('${formatName}', '${image}', ${stockTotal}, ${categoryId}, ${pricePerDay});`)
        res.sendStatus(STATUS_CODE.CREATED)

    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

export {listGames, createGame}