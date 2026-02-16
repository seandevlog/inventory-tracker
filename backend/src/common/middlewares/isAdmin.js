import { ForbiddenError } from '#errors/index.js';

const isAdmin = async (req, res, next) => {
  const { role } = req.payload ?? {};
  if (role && role === 'admin') return next();
  throw new ForbiddenError("Admin privileges required. ( You can press the demo button to enjoy the app )");
}

export default isAdmin;