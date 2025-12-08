import User from '../users/user.model.js';
import services from './auth.services.js';
// TODO - compile login and register routes into one if possible
// TODO - differentiate server-side validation and authentication, and authorization
// ! Do not return server-side validation to the user
export const login =  async (req, res) => {
    res.render('login', {
        title: 'Login',
        layout: 'layouts/auth',
        username: {
            value: "",
        },
        password: {
            value: "",
        },
        redirect: '/'
    });
}

export const loginSubmit = async (req, res) => {
    try {
        var res = await services.login({ ...req.body });
    } catch (err) {
        var error = err.message;
        res.status(500).json({ error: err.message });
    }
}

export const register = (req, res) => {
    let username, password, givenName, familyName, contact, address;
    const data = req.flash('registerValidationData');

    if (typeof data != 'undefined') {
        username = data.username;
        password = data.password;
        givenName = data.givenName;
        familyName = data.familyName;
        contact = data.contact;
        address = data.address;
    }

    res.render('register', {
        title: 'Register',
        layout: 'layouts/auth',
        username: {
            value: username,
            error: req.flash('usernameRegisterValidationError')
        },
        password: {
            value: password,
            error: req.flash('passwordRegisterValidationError')
        },
        givenName: {
            value: givenName,
            error: req.flash('givenNameRegisterValidationError')
        },
        familyName: {
            value: familyName,
            error: req.flash('familyNameRegisterValidationError')
        },
        contact: {
            value: contact,
            error: req.flash('contactRegisterValidationError')
        },
        address: {
            value: address,
            error: req.flash('addressRegisterValidationError')
        },
    });
}

export const registerSubmit = async (req, res) => {
    try {
        await User.create({
            ...req.body,
            status: 'active'
        })
        res.redirect('/login');
    } catch (error) {
        if (error.errors) {
            if (error.errors.username && error.errors.username.message) req.flash('usernameRegisterValidationError', error.errors.username.message);
            if (error.errors.password && error.errors.password.message) req.flash('passwordRegisterValidationError', error.errors.password.message)
            if (error.errors.givenName && error.errors.givenName.message) req.flash('givenNameRegisterValidationError', error.errors.givenName.message)
            if (error.errors.familyName && error.errors.familyName.message) req.flash('familyNameRegisterValidationError', error.errors.familyName.message)
            if (error.errors.contact && error.errors.contact.message) req.flash('contactRegisterValidationError', error.errors.contact.message)
            if (error.errors.address && error.errors.address.message) req.flash('addressRegisterValidationError', error.errors.address.message)
        }
        req.flash('registerValidationData', req.body);
        res.redirect('/register');
    } 
}

export default {
    login,
    loginSubmit,
    register,
    registerSubmit
}