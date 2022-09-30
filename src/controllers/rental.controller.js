import STATUS_CODE from "../enums/statusCode.enum.js";
import dayjs from "dayjs"
import connection from "../database/database.js"

async function listRentals (req, res) {

    const {customerId} = req.query
    const {gameId} = req.query
    let query = `SELECT * FROM rentals;`

    if (customerId) {
        query = `SELECT * FROM rentals WHERE "customerId" = ${customerId};`
    }
    if (gameId) {
        query = `SELECT * FROM rentals WHERE "gameId" = ${gameId};`
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
        console.error(error)
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

async function createRental (req, res) {

    const rentalData = res.locals.Data.rentalData
    const game = res.locals.Data.gameData
    const {gameId, daysRented, customerId} = rentalData
    
    try {
        const originalPrice = daysRented * game[0].pricePerDay
        const rentDate = dayjs().format("DD/MM/YY")
        const returnDate = "05/05/05"
        const delayFee = 1000

        await connection.query(`INSERT INTO rentals 
        ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES 
        (${customerId},${gameId}, '${rentDate}', ${daysRented}, '05/08/22' , ${originalPrice}, null);`)

        res.sendStatus(STATUS_CODE.CREATED)

    } catch (error) {
        console.error(error)
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
        const finishRental = await connection.query(`SELECT * FROM rentals WHERE id = $1 AND "returnDate" IS NOT null`, [id])
        const rental = queryRental.rows[0]
        const date = dayjs().format("DD/MM/YY") 
        
        if (queryRental.rows.length === 0) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND)
        }
        if (finishRental.rows.length > 0) {
            return res.sendStatus(STATUS_CODE.BAD_REQUEST)
        }

        const delayFee = (rental.rentDate - date) * rental.pricePerDay //TA ERRADO, É SO A IDEIA// parei aqui
        await connection.query(`UPDATE rentals SET "returnDate" = '${date}', "delayFee" = ${150} WHERE id = $1`, [id])
        res.sendStatus(STATUS_CODE.OK)

    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }

}

async function deleteRental (req, res) {

    const {id} = req.params

    if (!id || isNaN(id)) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED)
    }

    try {
        const rental = await connection.query(`SELECT * FROM rentals WHERE id = $1 AND "returnDate" IS NOT null;`, [id])
        
        if (rental.rows.length === 0) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND) //decidir entre 404 e 400//
        }

        await connection.query(`DELETE FROM rentals WHERE id = $1`, [id])
        res.sendStatus(STATUS_CODE.OK)

    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}


export {listRentals, createRental, endsRental, deleteRental }