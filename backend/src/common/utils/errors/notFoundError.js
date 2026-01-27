class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default NotFoundError;