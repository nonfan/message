export function ExceptionMiddleHandler(err, req, res, next) {
  if (err.statusCode) {
    return res.status(err.statusCode).send({
      error: err.message,
      statusCode: err.statusCode,
    });
  }

  if (err.status === 401) {
    return res.status(err.status).send({
      error: '无权限访问，登陆过期',
      statusCode: err.status,
    });
  }

  res.send(err.message);
}
