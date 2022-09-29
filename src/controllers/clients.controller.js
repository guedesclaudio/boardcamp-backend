import STATUS_CODE from "../enums/statusCode.enum.js";
import connection from "../database/database.js"

async function listClients (req, res) {

    const {cpf} = req.query

    try {
        const clients = await connection.query('SELECT * FROM customers;')
        res.send(clients.rows)
    } catch (error) {
        console.error(error)
    }
}

async function listClientsById (req, res) {

    const {id} = req.params

    if (!id) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED)
    }

    res.send("cliente filtrado pelo id")
}

async function createClient (req, res) {

    const clientData = res.locals.clientData
    
    res.sendStatus(STATUS_CODE.CREATED)
}

async function updateClient (req, res) {

    const {id} = req.params
    
    if(!id) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED)
    }

    const clientData = res.locals.clientData
    console.log(clientData)
    res.sendStatus(STATUS_CODE.OK)
}


export {listClients, listClientsById, createClient, updateClient}