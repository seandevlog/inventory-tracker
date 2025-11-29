export const loginController = (req, res) => {
    let username, password;
    const data = req.flash('loginValidationData');

    if (typeof data != 'undefined') {
        username = data.username;
        password = data.password;
    }

    res.render('login', {
        title: 'Login',
        layout: 'layouts/auth',
        username: {
            value: username,
            error: req.flash('usernameLoginValidationError')
        },
        password: {
            value: password,
            error: req.flash('passwordLoginValidationError')
        }
    });
}