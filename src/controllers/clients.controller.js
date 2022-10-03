import STATUS_CODE from "../enums/statusCode.enum.js";
import connection from "../database/database.js"

async function listClients (req, res) {

    const {cpf, offset, limit} = req.query
    const offSet = offset ? `OFFSET ${offset}` : ""
    const dataLimit = limit ? `LIMIT ${limit}` : ""
    let query = `SELECT * FROM customers ${offSet} ${dataLimit};`

    if (cpf) {
        query = `SELECT * FROM customers WHERE cpf LIKE '${cpf}%' ${offSet} ${dataLimit};`
    }

    try {
        const clients = await connection.query(query)
        res.send(clients.rows)
    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

async function listClientsById (req, res) {

    const {id} = req.params

    if (!id || isNaN(id)) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED)
    }

    try {
        const client = await connection.query(`SELECT * FROM customers WHERE id = $1;`, [id])

        if (client.rows.length === 0) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND)
        }
        res.send(client.rows[0])

    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

async function createClient (req, res) {

    const clientData = res.locals.clientData
    const {name, phone, cpf, birthday} = clientData

    try {
        await connection.query(`INSERT INTO customers 
        (name, phone, cpf, birthday) 
        VALUES ('${name}', '${phone}', '${cpf}', '${birthday}');`)

        res.sendStatus(STATUS_CODE.CREATED)

    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

async function updateClient (req, res) {

    const {id} = req.params
    const clientData = req.body
    let setString = ''
    
    for (let i in clientData) {
        if (clientData[i].length > 0) {
            setString += `${i} = '${clientData[i]}', `
        }
    }

    let query = `UPDATE customers SET ${setString} WHERE id = $1;`
    query = query.replace(",  W", " W")

    try {
        await connection.query(query, [id])
        res.sendStatus(STATUS_CODE.OK)
        
    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}


export {listClients, listClientsById, createClient, updateClient}