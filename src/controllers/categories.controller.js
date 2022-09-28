import STATUS_CODE from "../enums/statusCode.enum"

async function listCategories (req, res) {
    
    res.send("lista de categorias")
}

async function createCategorie (req, res) {

    res.sendStatus(STATUS_CODE.CREATED)
}

export {listCategories, createCategorie}