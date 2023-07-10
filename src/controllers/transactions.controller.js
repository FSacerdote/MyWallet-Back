import dayjs from "dayjs"
import { db } from "../database/database.connection.js"

export async function newTransaction(req, res){
    const {authorization} = req.headers
    const {value, description, type}  = req.body
    const token = authorization?.replace("Bearer ", "")

    if(!token) return res.status(401).send("Não tem token")
    try {
        const session = await db.collection("sessions").findOne({token})
        if(!session) return res.status(401).send("Usuario não esta logado")
        const user = await db.collection("users").findOne({_id: session.userId})
        if(!user) return res.status(401).send("Usuario nao encontrado")
        await db.collection("transactions").insertOne({userId: user._id, type, value, description, date: dayjs().format("DD/MM")})
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function getTransactions(req, res){
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")
    if(!token) return res.status(401).send("Não tem token")
    try {
        const session = await db.collection("sessions").findOne({token})
        if(!session) return res.status(401).send("Usuario não esta logado")
        const user = await db.collection("users").findOne({_id: session.userId})
        if(!user) return res.status(401).send("Usuario nao encontrado")
        const transactions = await db.collection("transactions").find({userId: session.userId}).toArray()
        delete user.password
        res.send({user, transactions})
    } catch (error) {
        res.status(500).send(error)
    }
}