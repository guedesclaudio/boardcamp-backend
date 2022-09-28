import express from "express"
import { listRentals, createRental, endsRental, deleteRental } from "../controllers/rental.controller.js"
import { rentalCreateValidation } from "../middlewares/rental.middleware.js"

const router = express.Router()

router.get("/rentals", listRentals)
router.post("/rentals", rentalCreateValidation, createRental)
router.post("/rentals/:id/return", endsRental)
router.delete("/rentals/:id",deleteRental)

export default router