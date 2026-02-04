import { ForbiddenError } from '#errors/index.js';

const isManager = async (req, res, next) => {
  const { role } = req.payload ?? {};
  if (role && (role === 'manager' || role === 'admin')) return next();
  throw new ForbiddenError("This action needs a manager (or someone who looks important)");
}

export default isManager;