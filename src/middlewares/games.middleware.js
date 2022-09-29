import joi from "joi" 
import STATUS_CODE from "../enums/statusCode.enum.js"
import connection from "../database/database.js"

const schemaGameName = joi.object({
    name: joi.string().empty().trim().required(),
    image: joi.string().uri().optional(),
    stockTotal: joi.number().empty().min(1).required(),
    pricePerDay: joi.number().empty().min(1).required(),
    categoryId: joi.number().empty().required()
})


async function gameCreateValidation (req, res, next) {

    const {name, categoryId} = req.body
    const {error} = schemaGameName.validate(req.body, {abortEarly: false})

    if (error) {
        const errors = error.details.map(value => value.message) 
        return res.status(STATUS_CODE.BAD_REQUEST).send(errors)
    }

    const categories = await connection.query(`SELECT * FROM categories WHERE id = $1;`, [categoryId])
    const games = await connection.query(`SELECT * FROM games WHERE name = $1;`, [name])

        if (categories.rows.length === 0) {
            return res.sendStatus(STATUS_CODE.BAD_REQUEST)
        }
        if (games.rows.length > 0) {
            return res.sendStatus(STATUS_CODE.CONFLICT)
        }

    res.locals.gameData = req.body
    next()
    
}

export {gameCreateValidation}