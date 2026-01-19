import jwt from 'jsonwebtoken';
import config from '../../config/index.js';

const isAuthenticated = (req, res, next) => {
  const auth = req.headers.authorization ?? null;
  if (!auth?.startsWith('Bearer ')) {
    return res.redirect(`/auth/refresh`);
  }

  const accessToken = auth.split(' ')[1];
  if (!accessToken) {
    return res.redirect(`/auth/refresh`);
  }

  try {
    jwt.verify(accessToken, config.access.key)
    return next();
  } catch (err) {
    return res.redirect(`/auth/refresh`);
  }
}

export default isAuthenticated;