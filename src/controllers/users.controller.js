import { userServices } from "../services/users.services.js"

export async function signup(req, res){
    const {name, email, password} = req.body
    try {
        const newUser = await userServices.signup(name, email, password)
        res.status(201).send(newUser)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function signin(req, res){
    const {email, password} = req.body
    try {
        const newSession = await userServices.signin(email, password)
        res.send(newSession)
    } catch (error) {
        res.status(500).send(error.message)
    }
}