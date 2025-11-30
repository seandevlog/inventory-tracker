import User from "../models/Users.js";

export const usersController = async (req, res) => {
    const users = await User.find({});

    res.render('users', {
        title: 'Users',
        users: users,
        layout: 'layouts/manage'
    });
}