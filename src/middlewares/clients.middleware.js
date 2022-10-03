import { schemaClientName, schemaUpdateClientName } from "../schemas/clients.schema.js"
import STATUS_CODE from "../enums/statusCode.enum.js"
import connection from "../database/database.js"


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

    try {
        const client = await connection.query(`SELECT * FROM customers WHERE cpf = '${cpf}';`)

        if (client.rows.length > 0) {
            return res.sendStatus(STATUS_CODE.CONFLICT)
        }
        res.locals.clientData = req.body
        next()

    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

async function updateClientValidation (req, res, next) {

    const {phone, cpf} = req.body
    const {id} = req.params
    const {error} = schemaUpdateClientName.validate(req.body, {abortEarly: false})

    if(!id || isNaN(id)) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED)
    }
    if ((phone && isNaN(phone)) || (cpf && isNaN(cpf))) {
        return res.sendStatus(STATUS_CODE.BAD_REQUEST)
    }
    if (error) {
        const errors = error.details.map(value => value.message) 
        return res.status(STATUS_CODE.BAD_REQUEST).send(errors)
    }

    const client = await connection.query(`SELECT * FROM customers WHERE id = $1;`, [id])

    if (client.rows.length === 0) {
        return res.sendStatus(STATUS_CODE.NOT_FOUND)
    }
    if (cpf) {
        const cpfClient = await connection.query(`SELECT * FROM customers WHERE id <> $1 AND cpf = $2;`, [id, cpf])

        if (cpfClient.rows.length > 0) {
            return res.sendStatus(STATUS_CODE.CONFLICT)
        }
    }

    next()
}

export {schemaClientValidation, updateClientValidation}