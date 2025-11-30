export const registerUserController = async (req, res) => {
    if (!req.newUserErrored) res.redirect('/users');
}