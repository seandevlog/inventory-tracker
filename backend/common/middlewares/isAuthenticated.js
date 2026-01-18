import jwt from 'jsonwebtoken';
import config from '../../config/index.js';

const isAuthenticated = (req, res, next) => {
  const auth = req.headers.authorization ?? null;
  if (!auth?.startsWith('Bearer ')) {
    throw new Error('No Bearer Token found');
  }

  const accessToken = auth.split(' ')[1];
  if (!accessToken) throw new Error('No Access Token');

  try {
    jwt.verify(accessToken, config.access.key)
    return next();
  } catch (err) {
    return res.status(401).json({ error: err.message })
  }
}

export default isAuthenticated;