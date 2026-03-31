import express from "express"
import dotenv from "dotenv"
import { errorHandle } from "./errors/appError.js"
import routes from "./http/routes/index.js"

dotenv.config()

const app = express()

app.use(express.json({ limit: '10mb' }))
app.use(process.env.BASE_PATH!, routes)
app.use(errorHandle)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})