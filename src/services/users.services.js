import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { userRepository } from '../repositories/users.repository.js';

async function signUp(name, email, password) {
  const user = await userRepository.findUserByEmail(email);
  if (user) throw { name: 'CONFLICT', message: 'Este email já está cadastrado' };
  return await userRepository.insertUser(name, email, password);
}

async function signIn(email, password) {
  const user = await userRepository.findUserByEmail(email);
  if (!user) throw { name: 'NOT FOUND', message: 'Usuário não encontrado' };
  const passwordValidation = bcrypt.compareSync(password, user.password);
  if (!passwordValidation) throw { name: 'UNAUTHORIZED', message: 'Senha inválida' };
  const token = uuid();
  await userRepository.insertSession(user._id, token);
  return token;
}

export const userServices = {
  signUp,
  signIn,
};
