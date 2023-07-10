import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import router from "./routes/index.routes.js"

dotenv.config()
const port = process.env.PORT || 5000

// conectando a api

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)

// ligando o servidor 

app.listen(port, ()=> console.log(`O servidor está rodando na porta: ${port}`))