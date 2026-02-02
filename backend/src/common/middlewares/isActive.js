import { ForbiddenError } from '#errors/index.js';

const isActive = async (req, res, next) => {
  const { isActive } = req.payload ?? {};
  if (isActive && isActive === 'active') return next();
  throw new ForbiddenError("Account is disabled");
}

export default isActive;