class LoginConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default LoginConflictError;