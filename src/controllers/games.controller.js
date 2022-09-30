import STATUS_CODE from "../enums/statusCode.enum.js";
import connection from "../database/database.js"

async function listGames (req, res) {

    const {name} = req.query
    const query1 = `SELECT * FROM games WHERE name LIKE '${name}%';`
    const query2 = "SELECT * FROM games;"
    const query = name ? query1 : query2

    try {
        const games = await connection.query(query)
        const categories = await connection.query("SELECT * FROM categories;")

        //IMPLEMENTAR JOIN AQUI//
        games.rows.forEach(value => {
            const categoryName = categories.rows.find(element => {
                if (value.categoryId === element.id) return element.name
            })
            value.categoryName = categoryName.name
        })
        res.send(games.rows)

    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

async function createGame (req, res) {

    const gameData = res.locals.gameData
    const {name, image, stockTotal, categoryId, pricePerDay} = gameData

    try {
        await connection.query(`INSERT INTO games 
        ("name", "image", "stockTotal", "categoryId", "pricePerDay") 
        VALUES ('${name}', '${image}', ${stockTotal}, ${categoryId}, ${pricePerDay});`)
        res.sendStatus(STATUS_CODE.CREATED)

    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}


export {listGames, createGame}