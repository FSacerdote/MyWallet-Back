import httpStatus from "http-status"
import { transactionsServices } from "../services/transactions.services.js"

export async function newTransaction(req, res){
    const {userId} = res.locals
    await transactionsServices.createTransaction(userId, req.body)
    res.send()
}

export async function getTransactions(req, res){
    const {userId} = res.locals
    const info = await transactionsServices.getTransactions(userId)
    res.send(info)
}