import STATUS_CODE from "../enums/statusCode.enum.js"

async function listCategories (req, res) {
    
    res.send("lista de categorias")
}

async function createCategorie (req, res) {

    const categoryName = res.locals.categoryName
    
    res.sendStatus(STATUS_CODE.CREATED)
}

export {listCategories, createCategorie}