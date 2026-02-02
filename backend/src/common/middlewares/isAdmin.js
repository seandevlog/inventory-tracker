import { ForbiddenError } from '#errors/index.js';

const isAdmin = async (req, res, next) => {
  const { role } = req.payload ?? {};
  if (role && role === 'admin') return next();
  throw new ForbiddenError("Request requires an admin role");
}

export default isAdmin;