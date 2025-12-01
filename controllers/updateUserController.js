import User from '../models/Users.js';

export const updateUserController = async (req, res) => {
    try {
        await User.findOneAndUpdate({ username: req.params.username }, {
            username: req.body.username,
            password: req.body.password,
            givenName: req.body.givenName,
            familyName: req.body.familyName,
            contact: req.body.contact,
            address: req.body.address,
            status: req.body.status
        });
        // did not use res.redirect since it's not commonly used with patch request and doesn't work
        res.send({ redirect: '/users'});
    } catch (err) {
        const errors = {}
        Object.keys(err.errors).map(key => errors[err.errors[key].path] = err.errors[key].message);
        res.send({
            errors: errors
        })
    }
}