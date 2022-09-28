import express from "express"
import { listCategories, createCategorie } from "../controllers/categories.controller.js"
import {categoryCreateValidation} from "../middlewares/categories.middleware.js"

const router = express.Router()

router.get("/categories", listCategories)
router.post("/categories", categoryCreateValidation, createCategorie)

export default router