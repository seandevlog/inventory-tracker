const withMiddleware = (middleware, handler) => 
  async (args) => {
    return middleware(args, () => handler(args));
  };

export default withMiddleware;