import {v2 as cloudinary} from 'cloudinary';
import Users from './user.model.js';
import Passwords from '#utils/passwords.js';
import Sessions from '#features/session/session.services.js';
import { userSchema } from '@my-org/shared/validators';
import { BadRequestError } from '#errors/index.js';

export const getUser = async ({ userId }) => {
  if (!userId) throw new BadRequestError('User ID is required');

  const user = await Users.findOne({ _id: userId }).lean();
  if (!user) throw new Error('Failed to find user');

  const { password, ...rest } = user; 

  return rest;
}

export const getAllUser = async () => {
  const users = await Users.find({}).lean();
  if (!users) throw new Error('Failed to find users');

  const usersWithoutPW = users.map(({ password, ...rest }) => rest);

  return usersWithoutPW;
}

export const storeUser = async ({ data }) => {
  if (!data) throw new BadRequestError('Data is required');

  const { value, error } = userSchema.validate(data);
  if (typeof error !== 'undefined' && error) {
    throw new BadRequestError(error);    
  } 
  
  const { password } = data;
  const hashedPassword = password && await Passwords.hash(password);
  if (!hashedPassword) throw new BadRequestError('Password is required');

  const user = await Users.create({ ...value, password: hashedPassword});
  return user;
}

export const updateUser = async ({ userId, data }) => {
  if (!userId) throw new BadRequestError('User ID is required');
  if (!data) throw new BadRequestError('Data is required');

  const { password } = data;
  const hashedPassword = password && await Passwords.hash(password);

  const keys = userSchema._ids._byKey.keys().toArray();
  const optionalUsersSchema = userSchema.fork(keys, (field) => field.optional().allow(null, ''));

  const { value, error } = optionalUsersSchema.validate(data);
  if (typeof error !== 'undefined' && error) {
    throw new BadRequestError(error);    
  } 

  const user = await Users.findOneAndUpdate({ _id: userId }, {...data, password: hashedPassword});
  if (!user) throw new Error('Failed to find user');

  const isActive = data.isActive ?? 'active';
  try {
    if (isActive === 'inactive') {
      await Sessions.destroyAll({ userId });
    }
  } catch (err) {
    console.log('No existing sessions'); // Do nothing if no existing sessions
  }

  return user;
}

export const deleteUser = async ({ userId }) => {
  if (!userId) throw new BadRequestError('User ID is required');

  const oldUser = await Users.findOneAndDelete({ _id: userId });
  if (!oldUser) throw new Error('Failed to find and delete user');

  if (oldUser.feature?.public_id) {
    const cloudinaryRes = await cloudinary.uploader.destroy( 
      oldUser.feature.public_id
    );
    if (cloudinaryRes.result !== 'ok') throw new Error(`Cloudinary Error: Failed to destroy ${oldUser.feature.public_id} from cloud`);
  }

  return oldUser;
}

