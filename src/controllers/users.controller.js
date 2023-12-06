import httpStatus from "http-status"
import { userServices } from "../services/users.services.js"

export async function signUp(req, res){
    const {name, email, password} = req.body
    try {
        const newUser = await userServices.signUp(name, email, password)
        res.status(httpStatus.CREATED).send(newUser)
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
}

export async function signIn(req, res){
    const {email, password} = req.body
    try {
        const newSession = await userServices.signIn(email, password)
        res.send(newSession)
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
}