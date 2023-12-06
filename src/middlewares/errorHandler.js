import httpStatus from 'http-status';

export function errorHandler(err, req, res, next) {
  if (err.name === 'CONFLICT') {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err.name === 'UNAUTHORIZED') {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err.name === 'NOT FOUND') {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  console.log(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: 'InternalServerError',
    message: 'Internal Server Error',
  });
}
