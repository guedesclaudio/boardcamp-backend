import STATUS_CODE from "../enums/statusCode.enum.js";
import dayjs from "dayjs"

async function listRentals (req, res) {

    const {customerId} = req.query
    const {gameId} = req.query

    res.send("lista de alugueis")
}

async function createRental (req, res) {

    const rentalData = res.locals.rentalData
    
    res.sendStatus(STATUS_CODE.CREATED)
}

async function endsRental (req, res) {

    const {id} = req.params

    if (!id) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED)
    }

}

async function deleteRental (req, res) {

    const {id} = req.params

    if (!id) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED)
    }

}


export {listRentals, createRental, endsRental, deleteRental }