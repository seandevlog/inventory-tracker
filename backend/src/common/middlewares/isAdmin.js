import Sessions from '#features/session/session.model.js';
import Users from '#features/users/user.model.js';
import Tokens from '#utils/tokens.js';
import { ForbiddenError } from '#errors/index.js';

const isAdmin = async (req, res, next) => {
  let user;

  if (!req.user) {
    const { refreshToken } = req.cookies;
    const hashedToken = refreshToken && Tokens.hash(refreshToken);
  
    const session = hashedToken ? await Sessions.findOne({ hashedToken }) : {};
    const { userId } = session;
  
    user = userId ? await Users.findOne({ _id: userId }): {};
    req.user = user;
  } else {
    user = req.user;
  }

  if (user.role === 'admin') return next();
  throw new ForbiddenError("Request requires an admin role");
}

export default isAdmin;