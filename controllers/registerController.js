export const registerController = (req, res) => {
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