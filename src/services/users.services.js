import { userRepository } from "../repositories/users.repository.js"
import bcrypt from "bcrypt"
import httpStatus from "http-status"
import {v4 as uuid} from "uuid"

async function signup(name, email, password){
  const user = await userRepository.findUserByEmail(email)
  if(user) return res.status(httpStatus.CONFLICT).send("Este email já está cadastrado")
  return await userRepository.insertUser(name, email, password)
}

async function signin(email, password){
  const user = await userRepository.findUserByEmail(email)
  if(!user) return res.sendStatus(httpStatus.NOT_FOUND)
  const passwordValidation = bcrypt.compareSync(password, user.password)
  if(!passwordValidation) return res.sendStatus(httpStatus.UNAUTHORIZED)
  const token = uuid()
  await userRepository.insertSession(user._id, token)
  return token
}

export const userServices = {
  signup,
  signin
}