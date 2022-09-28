import joi from "joi" 
import STATUS_CODE from "../enums/statusCode.enum.js"

const schemaRental = joi.object({
    customerId: joi.number().empty().required(),
    gameId: joi.number().empty().required(),
    daysRented: joi.number().empty().greater(0).required()
})


async function rentalCreateValidation (req, res, next) {

    const {error} = schemaRental.validate(req.body, {abortEarly: false})

    if (error) {
        const errors = error.details.map(value => value.message) 
        return res.status(STATUS_CODE.BAD_REQUEST).send(errors)
    }

    //verificar se customerId se refere a um cliente existente => 400
    //verificar se existem alugueis disponiveis => 400

    res.locals.rentalData = req.body
    next()
    
}

export {rentalCreateValidation}