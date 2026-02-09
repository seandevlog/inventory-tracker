import {v2 as cloudinary} from 'cloudinary';
import Transactions from './transaction.model.js';
import Locations from '#features/locations/location.model.js';
import Items from '#features/items/item.model.js';
import Users from '#features/users/user.model.js';
import { transactionSchema } from '@my-org/shared/validators';
import { BadRequestError } from '#errors/index.js';

export const getTransaction = async ({ transactionId }) => {
  if (!transactionId) throw new BadRequestError('Transaction ID is required');

  const transaction = await Transactions.findByIdWithRelations(transactionId).lean();

  if (!transaction) throw new Error('Failed to find transaction');

  const flatTransaction = { 
    ...transaction,
    sku: transaction.item.sku ?? undefined,
    fromLocationCode: transaction.fromLocation?.code ?? undefined,
    toLocationCode: transaction.toLocation?.code ?? undefined,
    createdBy: transaction.createdBy?.username ?? undefined
  }

  delete transaction.item;
  delete transaction.fromLocation;
  delete transaction.toLocation;
  delete transaction.createdBy;

  return flatTransaction;
}

export const getAllTransaction = async () => {
  const transactions = await Transactions.findAllWithRelations().lean();

  if (!transactions) throw new Error('Failed to find transactions');

  const flatTransactions = transactions.map(transaction => {
    const flatTransaction = { 
      ...transaction,
      sku: transaction.item?.sku ?? undefined,
      fromLocationCode: transaction.fromLocation?.code ?? undefined,
      toLocationCode: transaction.toLocation?.code ?? undefined,
      createdBy: transaction.createdBy?.username ?? undefined
    }

    delete transaction.item;
    delete transaction.fromLocation;
    delete transaction.toLocation;
    delete transaction.createdBy;
    return flatTransaction;
  })

  return flatTransactions;
}

export const storeTransaction = async ({ data }) => {
  if (!data) throw new BadRequestError('Data is required');

  const { value, error } = transactionSchema.validate(data);
  if (typeof error !== 'undefined' && error) {
    throw new BadRequestError(error);    
  } 

  const { createdBy, sku, fromLocationCode, toLocationCode } = value;

  const [item, fromLocation, toLocation, user] = await Promise.all([
    Items.findOne({ sku }).lean(),
    fromLocationCode ? Locations.findOne({ code: fromLocationCode }).lean(): Promise.resolve(null),
    Locations.findOne({ code: toLocationCode }).lean(),
    Users.findOne({ username: createdBy }).lean(),
  ]);
  
  if (!fromLocation && fromLocationCode) throw new BadRequestError('From location not found');
  if (!toLocation && toLocationCode) throw new BadRequestError('To location not found');
  if (!user) throw new BadRequestError('User not found');
  if (!item) throw new BadRequestError('Item not found');

  const transaction = await Transactions.create({ 
    ...value, 
    sku: undefined,
    username: undefined,
    fromLocationCode: undefined,
    toLocationCode: undefined,
    item,
    fromLocation,
    toLocation,
    createdBy: user
  });
  return transaction;
}

export const updateTransaction = async ({ transactionId, data }) => {
  if (!transactionId) throw new BadRequestError('Transaction ID is required');
  if (!data) throw new BadRequestError('Data is required');

  const { createdBy, sku, fromLocationCode, toLocationCode } = data;

  const keys = transactionSchema._ids._byKey.keys().toArray();
  const optionalTransactionsSchema = transactionSchema.fork(keys, (field) => field.optional());

  const { value, error } = optionalTransactionsSchema.validate(data);
  if (typeof error !== 'undefined' && error) {
    throw new BadRequestError(error);    
  } 

  const [item, fromLocation, toLocation, user] = await Promise.all([
    sku 
      ? Items.findOne({ sku }).lean() 
      : Promise.resolve(undefined),
    fromLocationCode 
      ? Locations.findOne({ code: fromLocationCode }).lean() 
      : Promise.resolve(undefined),
    toLocationCode 
      ? Locations.findOne({ code: toLocationCode }).lean() 
      : Promise.resolve(undefined),
    createdBy 
      ? Users.findOne({ username: createdBy }).lean() 
      : Promise.resolve(undefined),
  ]);
  
  if (fromLocation === null) throw new BadRequestError('From location not found');
  if (toLocation === null) throw new BadRequestError('To location not found');
  if (user === null) throw new BadRequestError('User not found');
  if (item === null) throw new BadRequestError('Item not found');

  const transaction = await Transactions.findOneAndUpdate({ _id: transactionId }, {
    ...value,
    sku: undefined,
    username: undefined,
    fromLocationCode: undefined,
    toLocationCode: undefined,
    item,
    fromLocation,
    toLocation,
    createdBy: user
  });
  
  if (!transaction) throw new Error('Failed to find transaction');

  return transaction;
}

export const deleteTransaction = async ({ transactionId }) => {
  if (!transactionId) throw new BadRequestError('Transaction ID is required');

  const oldTransaction = await Transactions.findOneAndDelete({ _id: transactionId });
  if (!oldTransaction) throw new Error('Failed to find and delete transaction');

  if (oldTransaction.feature?.public_id) {
    const cloudinaryRes = await cloudinary.uploader.destroy( 
      oldTransaction.feature.public_id
    );
    if (cloudinaryRes.result !== 'ok') throw new Error(`Cloudinary Error: Failed to destroy ${oldTransaction.feature.public_id} from cloud`);
  }

  return oldTransaction;
}

