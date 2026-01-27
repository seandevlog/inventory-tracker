import Sessions from '#features/session/session.model.js';
import Users from '#features/users/user.model.js';
import Tokens from '#utils/tokens.js';
import { 
  NotFoundError, 
  ForbiddenError, 
  UnauthenticatedError 
} from '#errors/index.js';

const get = async ({ refreshToken }) => {
  if (!refreshToken) throw new UnauthenticatedError('Refresh Token is required');

  const hashedToken = refreshToken && Tokens.hash(refreshToken);

  let session;
  try {
      session = hashedToken ? await Sessions.get({ hashedToken }) : {};
  } catch (err) {
      throw new ForbiddenError('Invalid Refresh Token');
  }

  const { userId } = session;

  const user = await Users.findOne({ _id: userId }).lean();
  if (!user) throw new NotFoundError('No Profile Data');

  return { profile: user };
}

export default {
  get
}