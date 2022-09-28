import joi from "joi" 
import STATUS_CODE from "../enums/statusCode.enum.js"

const schemaGameName = joi.object({
    name: joi.string().empty().trim().required(),
    image: joi.string().uri().optional(),
    stockTotal: joi.number().empty().min(1).required(),
    pricePerDay: joi.number().empty().min(1).required(),
    categoryId: joi.number().empty().required()
})


async function gameCreateValidation (req, res, next) {

    const {error} = schemaGameName.validate(req.body, {abortEarly: false})

    if (error) {
        const errors = error.details.map(value => value.message) 
        return res.status(STATUS_CODE.BAD_REQUEST).send(errors)
    }

    //verificar se existe uma categoria com o categoryId => 400

    res.locals.gameData = req.body
    next()
    
}

export {gameCreateValidation}