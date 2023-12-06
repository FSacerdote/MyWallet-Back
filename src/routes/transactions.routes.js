import { Router } from "express"
import { getTransactions, newTransaction } from "../controllers/transactions.controller.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { transactionSchema } from "../schemas/transactions.schemas.js"
import { validateAuth } from "../middlewares/validateAuth.js"

const transactionRouter = Router()

transactionRouter.post("/transactions", validateAuth, validateSchema(transactionSchema), newTransaction)
transactionRouter.get("/transactions", validateAuth, getTransactions)

export default transactionRouter