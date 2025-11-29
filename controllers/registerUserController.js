import userModel from "../models/Users.js";

export const registerUserController = async (req, res) => {

    // TODO - add flash middleware
    try {
        const User = userModel;
        await User.create({
            ...req.body,
            status: 'active'
        })
        res.redirect('/login')
    } catch (error) {
        console.log(error);
        res.redirect('/register')
    } 
}