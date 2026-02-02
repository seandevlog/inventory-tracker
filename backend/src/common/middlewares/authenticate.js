import jwt from 'jsonwebtoken';
import config from '#config';
import { refresh } from '#features/auth/auth.services.js';
import { ForbiddenError } from '#errors/index.js';

const authenticate = async (req, res, next) => {
  try {
    const auth = req.headers?.authorization ?? null;
    const oldAccessToken = auth ? auth?.split(' ')[1] : '';
    const payload = jwt.verify(oldAccessToken, config.access.key)
    req.payload = payload;
  } catch (err) {
    const {
      accessToken,
      newRefreshToken,
      newSession
    } = await refresh({ refreshToken: req.cookies?.refreshToken ?? '' });

    if (accessToken) {
      const payload = jwt.verify(accessToken, config.access.key)
      req.payload = payload;
      req.accessToken = accessToken;
    }

    if (newRefreshToken && newSession) {
      res.cookie('refreshToken', newRefreshToken, {
        expires: newSession?.expiresIn,
        httpOnly: true,
        secure: config.nodeEnv === 'production',
        sameSite: config.nodeEnv === 'production' ? 'none': 'lax'
      })
    }
    
    if (!(accessToken || (newRefreshToken && newSession))) throw new ForbiddenError('Access has expired. Try logging in again.');
  }

  return next();
}

export default authenticate;