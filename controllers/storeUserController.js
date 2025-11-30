export const storeUserController = async (req, res) => {
    if (req.newUserErrored) return res.redirect('/register');
    res.redirect('/login');
}