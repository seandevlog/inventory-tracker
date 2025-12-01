import User from '../models/Users.js';

export const deleteUserController = async (req, res) => {
    await User.findOneAndDelete({ username: req.params.username });
    // did not use res.redirect since it's not commonly used with delete request and doesn't work
    res.send({ redirect: '/users'});
}