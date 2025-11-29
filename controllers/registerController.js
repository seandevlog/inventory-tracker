export const registerController = (req, res) => {
    res.render('register', {
        title: 'Register',
        layout: 'layouts/auth'
    });
}