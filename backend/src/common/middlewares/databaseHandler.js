import { BadGatewayError } from "#errors/index.js";
import isMongoActive from "#utils/database.js";

const databaseHandler = (req, res, next) => {
  if (isMongoActive()) return next();
  throw new BadGatewayError('Database unavailable');
}

export default databaseHandler;