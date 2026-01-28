import {v2 as cloudinary} from 'cloudinary';
import Items from './item.model.js';
import { itemSchema } from '@my-org/shared/validators';
import { BadRequestError } from '#errors/index.js';

export const getItem = async ({ itemId }) => {
  if (!itemId) throw new BadRequestError('Item ID is required');

  const item = await Items.findOne({ _id: itemId }).lean();
  if (!item) throw new Error('Failed to find item');

  return item;
}

export const getAllItem = async () => {
  const items = await Items.find({}).lean();
  if (!items) throw new Error('Failed to find items');

  return items;
}

export const storeItem = async ({ data }) => {
  if (!data) throw new BadRequestError('Data is required');

  const { value, error } = itemSchema.validate(data);
  if (typeof error !== 'undefined' && error) {
    throw new BadRequestError(error);    
  } 

  const item = await Items.create({ ...value});
  return item;
}

export const updateItem = async ({ itemId, data }) => {
  if (!itemId) throw new BadRequestError('Item ID is required');
  if (!data) throw new BadRequestError('Data is required');

  const item = await Items.findOneAndUpdate({ _id: itemId }, {...data });
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

