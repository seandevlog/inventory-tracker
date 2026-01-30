import mongoose from "mongoose";

const errorHandler = (err, req, res, next) => {
  if (err instanceof mongoose.Error) {
    if (err.cause?.code === 11000) {
      err.status = 409;
    }
  }

  const stack = err.stack || "";
  console.log(stack);

  const status = err.status ?? 500;
  const message = err.message || 'Unknown Server Error';
  return res.status(status).json({ error: message });
}

export default errorHandler;