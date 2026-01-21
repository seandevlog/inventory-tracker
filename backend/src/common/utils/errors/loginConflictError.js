class LoginConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
    this.code = 'login';
    Error.captureStackTrace(this, this.constructor);
  }
}

export default LoginConflictError;