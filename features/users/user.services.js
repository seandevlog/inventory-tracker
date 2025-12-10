import Users from './user.model.js';
import bcrypt from '../../common/utils/bcrypt.api.js';

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
    let { password } = data;
    password = await bcrypt.hashPassword(password);

    const user = await Users.create({...data, password});
    if (!user) throw new Error('Failed to create user');
    return user;
}

export const updateUser = async (filter, data) => {
    let { password } = data;
    password = await bcrypt.hashPassword(password);

    const user = await Users.findOneAndUpdate(filter, {...data, password});
    if (!user) throw new Error('Failed to find user');

    return user;
}

export const deleteUser = async (filter) => {
    const oldUser = await Users.findOneAndDelete(filter);
    if (!oldUser) throw new Error('Failed to find user');
    return oldUser;
}

