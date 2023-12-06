import { userRepository } from "../repositories/users.repository.js"
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

async function signup(name, email, password){
  const user = await userRepository.findUserByEmail(email)
  if(user) return res.status(409).send("Este email já está cadastrado")
  return await userRepository.insertUser(name, email, password)
}

async function signin(email, password){
  const user = await userRepository.findUserByEmail(email)
  if(!user) return res.sendStatus(404)
  const passwordValidation = bcrypt.compareSync(password, user.password)
  if(!passwordValidation) return res.sendStatus(401)
  const token = uuid()
  await userRepository.insertSession(user._id, token)
  return token
}

export const userServices = {
  signup,
  signin
}