import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"
import { db } from "../database/database.connection.js"

export async function signup(req, res){
    const {name, email, password} = req.body
    try {
        const user = await db.collection("users").findOne({email})
        if(user) return res.status(409).send("Este email já está cadastrado")
        await db.collection("users").insertOne({name, email, password: bcrypt.hashSync(password, 10)})
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function signin(req, res){
    const {email, password} = req.body
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
}