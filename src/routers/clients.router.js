import express from "express"
import {listClients, listClientsById, createClient, updateClient} from "../controllers/clients.controller.js"
import { schemaClientValidation, updateClientValidation } from "../middlewares/clients.middleware.js"

const router = express.Router()

router.get("/customers", listClients)
router.get("/customers/:id", listClientsById)
router.post("/customers", schemaClientValidation, createClient)
router.put("/customers/:id", updateClientValidation, updateClient)

export default router