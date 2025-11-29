export const loginController = (req, res) => {
    res.render('login', {
        title: 'Login',
        layout: 'layouts/auth'
    });
}