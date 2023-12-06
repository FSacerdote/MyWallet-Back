import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"

async function findUserByEmail(email){
  return await db.collection("users").findOne({email})
}

async function insertUser(name, email, password){
  return await db.collection("users").insertOne({name, email, password: bcrypt.hashSync(password, 10)})
}

async function insertSession(userId, token){
  return await db.collection("sessions").insertOne({userId, token})
}

export const userRepository = {
  findUserByEmail,
  insertUser,
  insertSession
}