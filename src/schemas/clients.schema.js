import joi from "joi"

const schemaClientName = joi.object({
    name: joi.string().empty().trim().required(),
    phone: joi.string().empty().trim().min(10).max(11).required(),
    cpf: joi.string().empty().trim().length(11).required(),
    birthday: joi.date().iso().empty().required()
})

const schemaUpdateClientName = joi.object({
    name: joi.string().empty().trim().required(),
    phone: joi.string().empty().trim().min(10).max(11),
    cpf: joi.string().empty().trim().length(11),
    birthday: joi.date().iso().empty().required()
})

export {schemaClientName, schemaUpdateClientName}