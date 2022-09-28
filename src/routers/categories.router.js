import express from "express"
import { listCategories, createCategorie } from "../controllers/categories.controller.js"
import {categorieCreateValidation} from "../middlewares/categories.middleware.js"

const router = express.Router()

router.get("/categories", listCategories)
router.post("/categories", categorieCreateValidation, createCategorie)

export default router