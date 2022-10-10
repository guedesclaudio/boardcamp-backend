import STATUS_CODE from "../enums/statusCode.enum.js";
import dayjs from "dayjs"
import connection from "../database/database.js"

async function listRentals (req, res) {

    const {customerId,gameId, offset, limit} = req.query
    const offSet = offset ? `OFFSET ${offset}` : ""
    const dataLimit = limit ? `LIMIT ${limit}` : ""
    let query = `SELECT * FROM rentals ${offSet} ${dataLimit};`

    if (customerId) {
        query = `SELECT * FROM rentals WHERE "customerId" = ${customerId} ${offSet} ${dataLimit};`
    }
    if (gameId) {
        query = `SELECT * FROM rentals WHERE "gameId" = ${gameId} ${offSet} ${dataLimit};`
    }

    try {
        const rentals = await connection.query(query)
        const customers = await connection.query(`SELECT * FROM customers;`)
        const games = await connection.query(`SELECT * FROM games;`)
        const categories = await connection.query("SELECT * FROM categories;")
        
        //IMPLEMENTAR JOIN AQUI//
        rentals.rows.forEach(value => {
            const customer = customers.rows.find(element => {
                if (value.customerId === element.id) return element
            })
            const game = games.rows.find(element => {
                if (value.gameId === element.id) return element
            })
            value.customer = {id: customer.id, name: customer.name}
            value.game = {id: game.id, name: game.name, categoryId: game.categoryId}
            value.game = {...value.game, categoryName: categories.rows.find(element => element.id === value.game.categoryId).name}
        })

        res.send(rentals.rows)

    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

async function createRental (req, res) {

    const game = res.locals.Data.gameData
    const {gameId, daysRented, customerId} = res.locals.Data.rentalData
   
    try {
        const originalPrice = daysRented * game[0].pricePerDay
        const rentDate = dayjs().format("DD/MM/YY")
        const games = await connection.query(`SELECT * FROM games WHERE id = ${gameId};`)
        const gameStock = games?.rows[0].stockTotal
        const openRentals = await connection.query(`SELECT * FROM rentals WHERE "gameId" = 3 AND "returnDate" IS NULL;`)
        
        if (openRentals.rows.length === gameStock) {
            return res.sendStatus(STATUS_CODE.BAD_REQUEST)
        }

        await connection.query(`INSERT INTO rentals 
        ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES 
        (${customerId}, ${gameId}, '${rentDate}', ${daysRented}, null , ${originalPrice}, null);`)

        res.sendStatus(STATUS_CODE.CREATED)

    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

async function endsRental (req, res) {

    const {id} = req.params
    
    if (!id || isNaN(id)) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED)
    }

    try {
        const queryRental = await connection.query(`SELECT * FROM rentals WHERE id = $1`, [id])

        if (queryRental.rows.length === 0) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND)
        }

        const finishRental = await connection.query(`SELECT * FROM rentals WHERE id = $1 AND "returnDate" IS NOT null`, [id])
        const rental = queryRental.rows[0]
        const pricePerDay = rental.originalPrice / rental.daysRented;
        const returnDate = dayjs();
        const returnDateFormat = dayjs(returnDate)
        const rentDateFormat = dayjs(rental.rentDate)
        const dateToReturn = rentDateFormat.add(rental.daysRented, 'day')
        const delayDays = returnDateFormat.diff(dateToReturn,'day')
        const delayFee = delayDays > 0 ? delayDays * pricePerDay : 0
        
        if (finishRental.rows.length > 0) {
            return res.sendStatus(STATUS_CODE.BAD_REQUEST)
        }

        await connection.query(`UPDATE rentals SET "returnDate" = '${returnDate}', "delayFee" = ${delayFee} WHERE id = $1`, [id])
        res.sendStatus(STATUS_CODE.OK)

    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }

}

async function deleteRental (req, res) {

    const {id} = req.params

    if (!id || isNaN(id)) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED)
    }

    try {
        const rental = await connection.query(`SELECT * FROM rentals WHERE id = $1;`, [id])
        
        if (rental.rows.length === 0) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND) 
        }
        if (!rental.rows[0].returnDate) {
            return res.sendStatus(STATUS_CODE.BAD_REQUEST)
        } 

        await connection.query(`DELETE FROM rentals WHERE id = $1`, [id])
        res.sendStatus(STATUS_CODE.OK)

    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}


export {listRentals, createRental, endsRental, deleteRental }