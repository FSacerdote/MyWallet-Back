import httpStatus from 'http-status';
import { userServices } from '../services/users.services.js';

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  const newUser = await userServices.signUp(name, email, password);
  res.status(httpStatus.CREATED).send(newUser);
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  const newSession = await userServices.signIn(email, password);
  res.send(newSession);
}
