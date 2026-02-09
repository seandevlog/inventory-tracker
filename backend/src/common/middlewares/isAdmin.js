import { ForbiddenError } from '#errors/index.js';

const isAdmin = async (req, res, next) => {
  const { role } = req.payload ?? {};
  if (role && role === 'admin') return next();
  throw new ForbiddenError("Admin privileges required. Hiring managers: Test / !Password123. If you can log in, you've passed the interview. I'll start Monday.");
}

export default isAdmin;