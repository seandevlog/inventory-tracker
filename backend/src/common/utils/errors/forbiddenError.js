class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ForbiddenError;