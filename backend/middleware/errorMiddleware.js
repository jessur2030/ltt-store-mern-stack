//404 Not Found
const notFound = (req, res, next) => {
  //define error
  const error = new Error(`Not Found - ${req.originalUrl}`);
  //sets the status to 404
  res.status(404);
  next(error);
};

//error handler
//overwrite  the default error handler
//with error middleware: we need to start our middleware with error
const errorHandler = (err, req, res, next) => {
  //first we the statusCode, and we make sure that is 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
