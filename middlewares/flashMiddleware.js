export const flashMiddleware = (req, res, next) => {
    req.session.flash = {};
    
    req.flash = (type, message) => {
        if (message) {
            req.session.flash[type] = message;
        } else {
            const message = req.session.flash[type];
            delete req.session.flash[type];
            return message;
        }
    }

    next();
}