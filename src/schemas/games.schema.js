import joi from "joi" 

const schemaGameName = joi.object({
    name: joi.string().empty().trim().required(),
    image: joi.string().uri().optional(),
    stockTotal: joi.number().empty().min(1).required(),
    pricePerDay: joi.number().empty().min(1).required(),
    categoryId: joi.number().empty().required()
})

export {schemaGameName}