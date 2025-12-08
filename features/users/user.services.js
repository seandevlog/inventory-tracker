import Users from './user.model.js';

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
    const user = await Users.create(data);
    if (!user) throw new Error('Failed to create user');
    return user;
}

export const updateUser = async (filter, update) => {
    const user = await Users.findOneAndUpdate(filter, update);
    if (!user) throw new Error('Failed to find user');

    return user;
}

export const deleteUser = async (filter) => {
    const oldUser = await Users.findOneAndDelete(filter);
    if (!oldUser) throw new Error('Failed to find user');
    return oldUser;
}

