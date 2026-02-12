import {v2 as cloudinary} from 'cloudinary';
import Items from './item.model.js';
import Users from '#features/users/user.model.js';
import { itemSchema } from '@my-org/shared/validators';
import { BadRequestError } from '#errors/index.js';

export const getItem = async ({ itemId }) => {
  if (!itemId) throw new BadRequestError('Item ID is required');

  const item = await Items.findByIdWithRelations(itemId).lean();
  if (!item) throw new Error('Failed to find item');

  const flatItem = { 
    ...item,
    createdBy: item.createdBy?.username ?? undefined
  }

  delete item.createdBy;

  return flatItem;
}

export const getAllItem = async () => {
  const items = await Items.findAllWithRelations().lean();
  if (!items) throw new Error('Failed to find items');

  const flatItems = items.map(item => {
    const flatItem = {
      ...item,
      createdBy: item.createdBy?.username ?? undefined
    }

    delete item.createdBy;
    return flatItem;
  })

  return flatItems;
}

export const storeItem = async ({ data }) => {
  if (!data) throw new BadRequestError('Data is required');

  const { value, error } = itemSchema.validate(data);
  if (typeof error !== 'undefined' && error) {
    throw new BadRequestError(error);    
  } 

  const { createdBy } = value;

  const user = await Users.findOne({ username: createdBy }).lean();
  if (!user) throw new BadRequestError('User not found');

  const item = await Items.create({ 
    ...value,
    username: undefined,
    createdBy: user
  });

  return item;
}

export const updateItem = async ({ itemId, data }) => {
  if (!itemId) throw new BadRequestError('Item ID is required');
  if (!data) throw new BadRequestError('Data is required');

  const keys = itemSchema._ids._byKey.keys().toArray();
  const optionalItemsSchema = itemSchema.fork(keys, (field) => field.optional());

  const { value, error } = optionalItemsSchema.validate(data);
  if (typeof error !== 'undefined' && error) {
    throw new BadRequestError(error);    
  }

  const item = await Items.findOneAndUpdate({ _id: itemId }, 
    { ...value, createdBy: undefined });
  if (!item) throw new Error('Failed to find item');

  return item;
}

export const deleteItem = async ({ itemId }) => {
  if (!itemId) throw new BadRequestError('Item ID is required');

  const oldItem = await Items.findOneAndDelete({ _id: itemId });
  if (!oldItem) throw new Error('Failed to find and delete item');

  if (oldItem.feature?.public_id) {
    const cloudinaryRes = await cloudinary.uploader.destroy( 
      oldItem.feature.public_id
    );
    if (cloudinaryRes.result !== 'ok') throw new Error(`Cloudinary Error: Failed to destroy ${oldItem.feature.public_id} from cloud`);
  }

  return oldItem;
}

