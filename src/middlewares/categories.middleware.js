import {schemaCategoryName} from "../schemas/categories.schema.js"
import connection from "../database/database.js"
import STATUS_CODE from "../enums/statusCode.enum.js"


async function categoryCreateValidation (req, res, next) {

    const {name} = req.body
    const {error} = schemaCategoryName.validate({name}, {abortEarly: false})

    if (error) {
        const errors = error.details.map(value => value.message) 
        return res.status(STATUS_CODE.BAD_REQUEST).send(errors)
    }
    
    try {
        const categories = await connection.query(`SELECT * FROM categories WHERE name = $1;`, [name])

        if (categories.rows.length > 0) {
            return res.sendStatus(STATUS_CODE.CONFLICT)
        }

    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }

    res.locals.categoryName = name
    next()
}

export {categoryCreateValidation}