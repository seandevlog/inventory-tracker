import * as service from './transaction.services.js';

export const getTransaction = async (req, res) => {
  const transaction = await service.getTransaction({ transactionId: req.params.id });

  return res.status(200).json({ transaction });
}

export const getAllTransaction = async (req, res) => {
  const transactions = await service.getAllTransaction();

  return res.status(200).json({ transactions });
}

export const storeTransaction = async (req, res) => {
  await service.storeTransaction({ data: req.body });

  res.status(200).json({ success: true });
}

export const updateTransaction = async (req, res) => {
  await service.updateTransaction({ 
    transactionId: req.params.id,
    data: req.body
  });
  
  res.status(200).json({ success: true })
}

export const deleteTransaction = async (req, res) => {
  await service.deleteTransaction({ transactionId: req.params.id });
  
  res.status(200).json({ success: true });
}