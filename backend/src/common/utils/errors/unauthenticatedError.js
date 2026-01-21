class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default UnauthenticatedError;