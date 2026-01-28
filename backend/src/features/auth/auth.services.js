import Users from '#features/users/user.model.js';
import Sessions from '#features/session/session.services.js';
import Passwords from '#utils/passwords.js';
import Tokens from '#utils/tokens.js';

import { 
  ForbiddenError, 
  SuccessError, 
  ConflictError, 
  UnauthenticatedError
} from '#errors/index.js';

const login = async ({ data }) => {
  const {  
    username, 
    password
  } = data;

  if (!username || !password) throw new Error('Missing credentials');
  
  const user = await Users.findOne({ username }).lean();
  if (!user) throw new ConflictError('User not found'); 
  
  const result = await Passwords.compare(password, user.password);
  if (!result) throw new ConflictError('Password incorrect');

  const { isActive } = user;
  if (isActive === 'inactive') throw new ConflictError('Account is disabled');

  const { _id: userId } = user;
  const { accessToken, refreshToken, hashedToken } = Tokens.generate(userId);

  const session = await Sessions.create({ userId, hashedToken });

  return { accessToken, refreshToken, session };
} 

const register = async ({ data }) => {
  const { password } = data; 
  const hashedPassword = await Passwords.hash(password);

  await Users.create({ 
      ...data, 
      password: hashedPassword, 
      role: 'staff', 
      isActive: 'inactive' 
  });
}

const refresh = async ({ refreshToken }) => {
  if (!refreshToken) throw new UnauthenticatedError('Refresh Token is required');

  const hashedToken = refreshToken && Tokens.hash(refreshToken);

  let session;
  try {
    session = hashedToken ? await Sessions.get({ hashedToken }) : {};
  } catch (err) {
    throw new ForbiddenError('Invalid Refresh Token');
  }

  await Sessions.destroy({ hashedToken });

  const { userId } = session;
  const { 
    accessToken, 
    refreshToken: newRefreshToken, 
    hashedToken: newHashedToken 
  } = Tokens.generate(userId);

  const newSession = await Sessions.create({ userId, hashedToken: newHashedToken });

  return { accessToken, newRefreshToken, newSession };
}

const logout = async ({ refreshToken }) => {
  if (!refreshToken) {
    ; // Do nothing 
  } 

  const hashedToken = refreshToken && Tokens.hash(refreshToken);

  try {
    if (hashedToken) await Sessions.destroy({ hashedToken });
  } catch (err) {
    // Client is still logged out even without refresh token
    throw new SuccessError('Invalid Token'); 
  }
}

export default {
  login,
  register,
  refresh,
  logout
}