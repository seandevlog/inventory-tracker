const errorHandler = (err, req, res, next) => {
  const status = err.status ?? 500;
  const message = err.message || 'Unknown Server Error';
  res.status(status).json({ error: message });
}

export default errorHandler;