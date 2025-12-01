import User from "../models/Users.js"

export const getUserController = async (req, res) => {
    let user, errors;
    try {
        user = await User.findOne({ username: req.params.username })
    } catch (err) {
        errors = Object.keys(err.errors).map(key => errors[err.errors[key].path] = err.errors[key].message); 
    }
    res.send({
        currentUser: user,
        errors: errors
    });
}