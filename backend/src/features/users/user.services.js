import {v2 as cloudinary} from 'cloudinary';
import Users from './user.model.js';
import Passwords from '#utils/passwords.js';
import Sessions from '#features/session/session.services.js';
import { userSchema } from '@my-org/shared/validators';
import { BadRequestError, ConflictError } from '#errors/index.js';
import config from '#config';

export const getUser = async ({ userId }) => {
  if (!userId) throw new BadRequestError('User ID is required');

  const user = await Users.findByIdWithRelations(userId).lean();
  if (!user) throw new Error('Failed to find user');

  const { password, ...rest } = user; 

  const flatUser = { 
    ...rest,
    createdBy: user.createdBy?.username ?? undefined
  }

  delete user.createdBy;

  return flatUser;
}

export const getAllUser = async () => {
  const users = await Users.findAllWithRelations().lean();
  if (!users) throw new Error('Failed to find users');

  const usersWithoutPW = users.map(({ password, ...rest }) => rest);

  const flatUsers = usersWithoutPW.map(user => {
    const flatUser = {
      ...user,
      createdBy: user.createdBy?.username ?? undefined
    }

    delete user.createdBy;
    return flatUser;
  })

  return flatUsers;
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

  const { createdBy } = value;
  
  let admin = await Users.findOne({ username: createdBy }).lean();

  const user = await Users.create({ 
    ...value,
    password: hashedPassword,
    createdBy: admin ?? undefined
  });

  return user;
}

export const updateUser = async ({ userId, data }) => {
  if (!userId) throw new BadRequestError('User ID is required');

  // Demo Account
  if (userId === config.demo) throw new ConflictError('Demo Account cannot be edited');

  if (!data) throw new BadRequestError('Data is required');

   const keys = userSchema._ids._byKey.keys().toArray();

  const optionalUsersSchema = userSchema.fork(keys, (field) => field.optional().allow(null, ''));

  const { value, error } = optionalUsersSchema.validate(data);

  if (error) throw new BadRequestError(error);

  const update = { ...value };

  if (typeof update.password === 'string' && update.password.trim() === '') {
    delete update.password;
  } else if (update.password != null) {
    update.password = await Passwords.hash(update.password);
  }

  const user = await Users.findOneAndUpdate(
    { _id: userId },
    update,
    { new: true }
  );

  if (!user) throw new Error("Failed to find user");

  const isActive = value.isActive ?? "active";

  if (isActive === "inactive") {
    try {
      await Sessions.destroyAll({ userId });
    } catch {
      console.log("No existing sessions");
    }
  }

  return user;
};

export const deleteUser = async ({ userId }) => {
  if (!userId) throw new BadRequestError('User ID is required');

  // Demo Account
  if (userId === config.demo) throw new ConflictError('Demo Account cannot be deleted');

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

