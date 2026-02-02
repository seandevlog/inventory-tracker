import crypto from 'crypto';
import jwt from 'jsonwebtoken'
import config from '#config';

const generate = ({ userId, username, givenName, role, isActive }) => { 
  if (!userId) throw new Error('Missing userId');

  const { accessToken } = generateAccess({ userId, username, givenName, role, isActive });
  const refreshToken = generateRefresh();
  const hashedToken = hash(refreshToken);

  if (!accessToken || !refreshToken || !hashedToken) throw new Error('Invalid token configuration');
  return { accessToken, refreshToken, hashedToken };
}

const generateAccess = ({ userId, username, givenName, role, isActive }) => {
  if (!userId) throw new Error('Missing userId');

  return userId 
    ? { accessToken: 
      jwt.sign(
        { userId, username, givenName, role, isActive }, 
        config.access.key, 
        { expiresIn: config.access.expiresIn }
      )}
    : {};
}

const generateRefresh = () => {
  return crypto.randomBytes(40).toString('hex');
}

const hash = (token) => {
  if (!token) throw new Error('Missing token');
  
  return token && crypto.createHash('sha256').update(token).digest('hex');
}

export default {
  generate,
  generateAccess,
  generateRefresh,
  hash
}