import { Router } from "express"
import { signIn, signUp } from "../controllers/users.controller.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { signInSchema, signUpSchema } from "../schemas/users.schemas.js"

const usersRouter = Router()
usersRouter.post("/sign-up", validateSchema(signUpSchema), signUp)
usersRouter.post("/sign-in", validateSchema(signInSchema), signIn)

export default usersRouter