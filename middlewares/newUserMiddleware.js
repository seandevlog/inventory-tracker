import User from "../models/Users.js";

export const newUserMiddleware = async (req, res, next) => {
    try {
        await User.create({
            ...req.body,
            status: 'active'
        })
        req.session.newUserErrored = false;
    } catch (error) {
        console.log(error.message)
        if (error.errors) {
            if (error.errors.username && error.errors.username.message) req.flash('usernameRegisterValidationError', error.errors.username.message);
            if (error.errors.password && error.errors.password.message) req.flash('passwordRegisterValidationError', error.errors.password.message)
            if (error.errors.givenName && error.errors.givenName.message) req.flash('givenNameRegisterValidationError', error.errors.givenName.message)
            if (error.errors.familyName && error.errors.familyName.message) req.flash('familyNameRegisterValidationError', error.errors.familyName.message)
            if (error.errors.contact && error.errors.contact.message) req.flash('contactRegisterValidationError', error.errors.contact.message)
            if (error.errors.address && error.errors.address.message) req.flash('addressRegisterValidationError', error.errors.address.message)
        }
        req.flash('registerValidationData', req.body);
        req.session.newUserErrored = true;
    } 
    next();
}