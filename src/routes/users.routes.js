import { Router } from "express"
import { signin, signup } from "../controllers/users.controller.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { signInSchema, signUpSchema } from "../schemas/users.schemas.js"

const usersRouter = Router()
usersRouter.post("/sign-up", validateSchema(signUpSchema), signup)
usersRouter.post("/sign-in", validateSchema(signInSchema), signin)

export default usersRouter