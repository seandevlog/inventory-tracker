import Users from '#features/users/user.model.js';
import Sessions from '#features/session/session.services.js';
import Passwords from '#utils/passwords.js';
import Tokens from '#utils/tokens.js';

import { 
  ForbiddenError, 
  SuccessError, 
  ConflictError, 
  UnauthenticatedError,
  BadRequestError
} from '#errors/index.js';

const login = async ({ data }) => {
  const {  
    username, 
    password
  } = data;

  if (!username || !password) throw new BadRequestError('Missing credentials');
  
  const user = await Users.findOne({ username }).lean();
  if (!user) throw new ConflictError('User not found'); 
  
  const result = await Passwords.compare(password, user.password);
  if (!result) throw new ConflictError('Password incorrect');

  const { isActive } = user;
  if (isActive === 'inactive') throw new ConflictError("Account disabled. An admin must press the magic button. Hiring managers: Test / !Password123. If you can log in, you've passed the interview. I'll start Monday.");

  const { 
    _id: userId,
    role,
    givenName
  } = user;

  const { accessToken, refreshToken, hashedToken } = Tokens.generate({
    userId,
    givenName,
    role,
    isActive
  });

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

export const refresh = async ({ refreshToken }) => {
  if (!refreshToken) throw new UnauthenticatedError('Refresh Token is required');

  const hashedToken = refreshToken && Tokens.hash(refreshToken);

  let session;
  try {
    session = hashedToken ? await Sessions.get({ hashedToken }) : {};
  } catch (err) {
    throw new ForbiddenError('Invalid Refresh Token');
  }

  const { userId } = session;
  const user = userId ? await Users.findOne({ _id: userId }).lean() : null;
  if (!user) throw new ForbiddenError('User not found');

  const { _id: id, username, givenName, role, isActive } = user;

  if (session.expiresIn.getTime() < Date.now()) {
    await Sessions.destroy({ hashedToken });

    const { 
      accessToken, 
      refreshToken: newRefreshToken, 
      hashedToken: newHashedToken 
    } = Tokens.generate({ userId: id, username, givenName, role, isActive });

    const newSession = await Sessions.create({ userId, hashedToken: newHashedToken });

    return { accessToken, newRefreshToken, newSession };
  } else {
    return Tokens.generateAccess({ userId: id, username, givenName, role, isActive });
  }
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