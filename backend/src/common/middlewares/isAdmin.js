import { ForbiddenError } from '#errors/index.js';

const isAdmin = async (req, res, next) => {
  const { role } = req.payload ?? {};
  if (role && role === 'admin') return next();
  throw new ForbiddenError("Admin privileges required. Level up or consult your system wizard.");
}

export default isAdmin;