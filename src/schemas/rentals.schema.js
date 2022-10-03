import joi from "joi" 

const schemaRental = joi.object({
    customerId: joi.number().empty().required(),
    gameId: joi.number().empty().required(),
    daysRented: joi.number().empty().greater(0).required()
})

export {schemaRental}