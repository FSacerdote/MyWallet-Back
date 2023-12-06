import httpStatus from "http-status"
import { transactionsServices } from "../services/transactions.services.js"

export async function newTransaction(req, res){
    const {userId} = res.locals
    try {
        await transactionsServices.createTransaction(userId, req.body)
        res.send()
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}

export async function getTransactions(req, res){
    const {userId} = res.locals
    try {
        const info = await transactionsServices.getTransactions(userId)
        res.send(info)
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}