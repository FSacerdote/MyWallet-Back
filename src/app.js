import dotenv from "dotenv"
import { MongoClient } from "mongodb"
import express from "express"
import cors from "cors"
import joi from "joi"
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

const PORT = 5000

dotenv.config()

// conectando a api

const app = express()
app.use(express.json())
app.use(cors())

// conectando com o mongo

const mongoClient = new MongoClient(process.env.DATABASE_URL)
let db
try{    
    await mongoClient.connect()
    db = mongoClient.db()
}catch (err){
    console.log(err.message)
}

// schemas

const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required()
})

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

// endpoints

app.post("/sign-up", async(req, res)=>{
    const {name, email, password} = req.body
    const validation = signUpSchema.validate({name, email, password}, {abortEarly:false})
    if(validation.error){
        const err = validation.error.details.map((detail)=> detail.message)
        return res.status(422).send(err)
    }
    try {
        const user = await db.collection("users").findOne({email})
        if(user) return res.status(409).send("Este email já está cadastrado")
        await db.collection("users").insertOne({name, email, password: bcrypt.hashSync(password, 10)})
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post("/sign-in", async(req, res)=>{
    const {email, password} = req.body
    const validation = signInSchema.validate({email, password}, {abortEarly: false})
    if(validation.error){
        const err = validation.error.details.map((detail)=> detail.message)
        return res.status(422).send(err)
    }
    try {
        const user = await db.collection("users").findOne({email})
        if(!user) return res.sendStatus(404)
        const passwordValidation = bcrypt.compareSync(password, user.password)
        if(!passwordValidation) return res.sendStatus(401)
        const token = uuid()
        await db.collection("sessions").insertOne({userId: user._id, token})
        res.send(token)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// ligando o servidor 

app.listen(PORT, ()=> console.log(`O servidor está rodando na porta: ${PORT}`))