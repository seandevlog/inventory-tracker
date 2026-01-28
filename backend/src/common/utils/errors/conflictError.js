class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ConflictError;