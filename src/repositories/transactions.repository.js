import dayjs from 'dayjs';
import { db } from '../database/database.connection.js';

async function insertTransaction(userId, transaction) {
  return await db.collection('transactions').insertOne({
    userId,
    type: transaction.type,
    value: transaction.value,
    description: transaction.description,
    date: dayjs().format('DD/MM'),
  });
}

async function getTransactionsByUserId(userId) {
  return await db.collection('transactions').find({ userId }).toArray();
}

export const transactionsRepository = {
  insertTransaction,
  getTransactionsByUserId,
};
