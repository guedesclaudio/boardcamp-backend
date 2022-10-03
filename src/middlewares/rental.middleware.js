import { schemaRental } from "../schemas/rentals.schema.js"
import connection from "../database/database.js"
import STATUS_CODE from "../enums/statusCode.enum.js"


async function rentalCreateValidation (req, res, next) {

    const {error} = schemaRental.validate(req.body, {abortEarly: false})
    const {customerId, gameId} = req.body

    if (error) {
        const errors = error.details.map(value => value.message) 
        return res.status(STATUS_CODE.BAD_REQUEST).send(errors)
    }
    
    try {
        const client = await connection.query(`SELECT * FROM customers WHERE id = $1`, [customerId])
        const game = await connection.query(`SELECT * FROM games WHERE id = $1`, [gameId])
        
        if (client.rows.length === 0) {
            return res.sendStatus(STATUS_CODE.BAD_REQUEST)
        }
        if (game.rows.length === 0) {
            return res.sendStatus(STATUS_CODE.BAD_REQUEST)
        }
        res.locals.Data = {rentalData : req.body, gameData: game.rows}
        next()

    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

export {rentalCreateValidation}