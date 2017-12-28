class ApiError extends Error {
  constructor(code, message) {
    super();
    this.code = code;
    this.message = message;
  }
}

const errorHandler = (err, req, res, next) => {
  if (!(err instanceof ApiError)) {
    console.error(err);
    if (process.env.NODE_ENV === 'production') {
      err = new ApiError(500, 'internal server error');
    } else {
      err = new ApiError(500, err.stack || 'internal server error');
    }
  }
  const error = {
    code: err.code,
    message: err.message,
  }
  res.status(err.code).send(error);
};

exports.ApiError = ApiError;
exports.errorHandler = errorHandler;
