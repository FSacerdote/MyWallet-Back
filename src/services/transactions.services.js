import { transactionsRepository } from '../repositories/transactions.repository.js';
import { userRepository } from '../repositories/users.repository.js';

async function createTransaction(userId, transaction) {
  const user = await userRepository.findUserById(userId);
  if (!user) throw { name: 'NOT FOUND', message: 'Usuário não encontrado' };
  await transactionsRepository.insertTransaction(userId, transaction);
}

async function getTransactions(userId) {
  const user = await userRepository.findUserById(userId);
  if (!user) throw { name: 'NOT FOUND', message: 'Usuário não encontrado' };
  const transactions = await transactionsRepository.getTransactionsByUserId(userId);
  delete user.password;
  return { user, transactions };
}

export const transactionsServices = {
  createTransaction,
  getTransactions,
};
