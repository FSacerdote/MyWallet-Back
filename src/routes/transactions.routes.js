import { Router } from "express"
import { getTransactions, newTransaction } from "../controllers/transactions.controller.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { transactionSchema } from "../schemas/transactions.schemas.js"

const transactionRouter = Router()

transactionRouter.post("/transactions", validateSchema(transactionSchema), newTransaction)
transactionRouter.get("/transactions", getTransactions)

export default transactionRouter