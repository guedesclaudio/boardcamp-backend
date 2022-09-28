import joi from "joi" 
import STATUS_CODE from "../enums/statusCode.enum.js"

const schemaCategoryName = joi.object({
    name: joi.string().empty().trim().required()
})


async function categoryCreateValidation (req, res, next) {

    const {name} = req.body
    const {error} = schemaCategoryName.validate({name}, {abortEarly: false})

    if (error) {
        const errors = error.details.map(value => value.message) 
        return res.status(STATUS_CODE.BAD_REQUEST).send(errors)
    }

    //verificar se existe um jogo com o categoryName => 409

    res.locals.categoryName = name
    next()
    
}

export {categoryCreateValidation}