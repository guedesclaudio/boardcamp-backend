import joi from "joi" 
import STATUS_CODE from "../enums/statusCode.enum.js"

const schemaClientName = joi.object({
    name: joi.string().empty().trim().required(),
    phone: joi.string().empty().trim().min(10).max(11).required(),
    cpf: joi.string().empty().trim().length(11).required(),
    birthday: joi.string().empty().trim().required()
})


async function schemaClientValidation (req, res, next) {

    const {phone, cpf} = req.body
    const {error} = schemaClientName.validate(req.body, {abortEarly: false})

    if (isNaN(phone) || isNaN(cpf)) {
        return res.sendStatus(STATUS_CODE.BAD_REQUEST)
    }

    if (error) {
        const errors = error.details.map(value => value.message) 
        return res.status(STATUS_CODE.BAD_REQUEST).send(errors)
    }

    //verificar se existe um cliente com o cpf => 409

    res.locals.clientData = req.body
    next()
    
}


export {schemaClientValidation}