import User from "../models/Users.js";

export const storeUserController = async (req, res) => {
    try {
        try {
            await User.create({
                ...req.body
            })
        } catch (err) {
            return res.status(500).json({ error: 'Failed to create user' });
        }

        // I did not use res.redirect since redirecting directly to /users would return a json response that has html 
        // since we render html in /users, and the client needs to get the response data to receive the errors
        res.send({ redirect: '/users' });
    } catch (err) {
        const errors = {}
        Object.keys(err.errors).map(key => errors[err.errors[key].path] = err.errors[key].message);
        res.json({
            body: req.body,
            errors: errors
        });
    }
}