import STATUS_CODE from "../enums/statusCode.enum.js"
import connection from "../database/database.js"

async function listCategories (req, res) {

    const {offset, limit} = req.query
    const offSet = offset ? `OFFSET ${offset}` : ""
    const dataLimit = limit ? `LIMIT ${limit}` : ""

    try {
        const categories = await connection.query(`SELECT * FROM categories ${offSet} ${dataLimit};`)
        res.send(categories.rows)
    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
    
}

async function createCategorie (req, res) {

    const categoryName = res.locals.categoryName
    
    try {
        await connection.query(`INSERT INTO categories (name) VALUES ($1);`, [categoryName])
        res.sendStatus(STATUS_CODE.CREATED)

    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

export {listCategories, createCategorie}