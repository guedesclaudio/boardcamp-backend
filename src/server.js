import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import CategoriesRouter from "./routers/categories.router.js"
dotenv.config()

const server = express()
const PORT = process.env.PORT

server
    .use(cors())
    .use(express.json())
    .use(CategoriesRouter)

server.get("/status", (req, res) => {
    res.send("server it's on")
})

server.listen(PORT, () => console.log(`Server listen on port ${PORT}`))