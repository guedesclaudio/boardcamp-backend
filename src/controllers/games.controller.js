import STATUS_CODE from "../enums/statusCode.enum.js";
import connection from "../database/database.js"

async function listGames (req, res) {

    const {name} = req.query
    let query = `SELECT games.*, categories.name AS "categoryName" 
    FROM games JOIN categories ON games."categoryId" = categories.id;`
    if (name) {
        const formatName = name.toLowerCase()
        query = `SELECT games.*, categories.name AS "categoryName" 
        FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.name LIKE '${formatName}%';`
    }

    try {
        const games = await connection.query(query)
        //IMPLEMENTAR JOIN AQUI//
        games.rows.forEach(value => {value.name = value.name[0].toUpperCase() + value.name.substring(1)})
        res.send(games.rows)

    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

async function createGame (req, res) {

    const gameData = res.locals.gameData
    const {name, image, stockTotal, categoryId, pricePerDay} = gameData
    const formatName = name.toLowerCase()

    try {
        await connection.query(`INSERT INTO games 
        ("name", "image", "stockTotal", "categoryId", "pricePerDay") 
        VALUES ('${formatName}', '${image}', ${stockTotal}, ${categoryId}, ${pricePerDay});`)
        res.sendStatus(STATUS_CODE.CREATED)

    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}


export {listGames, createGame}