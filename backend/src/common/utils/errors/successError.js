class SuccessError extends Error {
  constructor(message) {
    super(message);
    this.status = 200;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default SuccessError;