import joi from "joi" 
import STATUS_CODE from "../enums/statusCode.enum.js"

const schemaCategorieName = joi.object({
    name: joi.string().empty().trim().required()
})


async function categorieCreateValidation (req, res, next) {

    const {name} = req.body

    const {error} = schemaCategorieName.validate(name, {abortEarly: false})

    if (error) {
        const errors = error.details.map(value => value.message) 
        return res.status(STATUS_CODE.UNPROCESSABLE).send(errors)
    }
    res.locals.categorieName = name
    next()
    
}

export {categorieCreateValidation}