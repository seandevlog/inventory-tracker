import { redirect } from "react-router-dom";
import { 
  get as getTransaction,
  getAll as getAllTransactions
} from "../services";

const path = 'transaction';

export const getAll = async ({ context }) => {
  const { accessToken } = context;
  const data = await getAllTransactions({ accessToken, path });
  const { transactions } = data;

  return transactions;
}

export const get = async ({ params, context }) => {
  const { accessToken } = context;
  const data = await getTransaction({ id: params.transactionId, accessToken, path });

  const { error, transaction } = data;
  
  if (error) return redirect('/');

  return transaction;
}