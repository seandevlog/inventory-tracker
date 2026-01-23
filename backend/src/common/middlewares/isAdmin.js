import { ForbiddenError } from '#errors/index.js';

const isAdmin = async (req, res, next) => {
  const { user } = req;

  const { role } = user;

  if (role === 'admin') return next();

  throw new ForbiddenError("Request requires an admin role");
}

export default isAdmin;