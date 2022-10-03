import joi from "joi" 

const schemaCategoryName = joi.object({
    name: joi.string().empty().trim().required()
})

export {schemaCategoryName}