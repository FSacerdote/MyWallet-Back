import { userRepository } from "../repositories/users.repository.js"

export async function validateAuth(req, res, next){
  const {authorization} = req.headers
  const token = authorization?.replace("Bearer ", "")
  if(!token) throw {name: "UNAUTHORIZED", message: "Requisição não autorizada, por favor informe o token de acesso da seção conforme a documentação da API!"}
  const session = await userRepository.findSessionByToken(token)
  if(!session) throw {name: "UNAUTHORIZED", message: "Requisição não autorizada, por favor verifique a validade do token de acesso da seção!"}
  res.locals.userId = session.userId
  next()
}
