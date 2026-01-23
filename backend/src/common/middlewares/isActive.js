import Sessions from '#features/session/session.model.js';
import Users from '#features/users/user.model.js';
import Tokens from '#utils/tokens.js';
import { ForbiddenError } from '#errors/index.js';

const isActive = async (req, res, next) => {
  const { refreshToken } = req.cookies;

  const hashedToken = refreshToken && Tokens.hash(refreshToken);

  const session = hashedToken ? await Sessions.findOne({ hashedToken }) : {};

  const { userId } = session;

  const user = userId ? await Users.findOne({ _id: userId }): {};
  req.user = user;

  const { isActive } = user;

  if (isActive) return next();

  throw new ForbiddenError("Account is disabled");
}

export default isActive;