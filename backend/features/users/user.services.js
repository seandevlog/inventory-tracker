import Users from './user.model.js';
import Passwords from '../auth/services/password.services.js';
import { userSchema } from '../../../shared/validators/index.js';

export const getUser = async (filter) => {
  const user = await Users.findOne(filter)

  if (!user) throw new Error('Failed to find user');
  return user;
}

export const getAllUser = async () => {
  const users = await Users.find({});
  if (!users) throw new Error('Failed to find users');

  return users;
}

export const storeUser = async (data) => {
  const { value, error } = userSchema.validate(data);
  if (typeof error !== 'undefined') {
    throw new Error(error);    
  } 
  
  let { password } = data;
  if (password) {
    password = await Passwords.hash(password);
  } else {
    throw new Error('User Services Errored: Password is required');  
  }

  const user = await Users.create({...value, password});
  if (!user) throw new Error('Failed to create user');
  return user;
}

export const updateUser = async (filter, data) => {
  let { password } = data;
  password &&= await Passwords.hash(password);

  const user = await Users.findOneAndUpdate(filter, {...data, password});
  if (!user) throw new Error('Failed to find user');

  return user;
}

export const deleteUser = async (filter) => {
  const oldUser = await Users.findOneAndDelete(filter);
  if (!oldUser) throw new Error('Failed to find user');
  return oldUser;
}

