// Define a middleware function for error handling
export const errorHandler = (
  err: any,
  request: any,
  response: any,
  next: any
) => {
  console.error("Error occurred:", err);
  let statusCode = 500;
  let message = err;
  let errorCode = err.errorCode ?? "INTERNAL_SERVER_ERROR";
  // Check if the error has a specific status code and message
  if (err.statusCode) {
    statusCode = err.statusCode;
    if (err.statusCode == 400 && !err.errorCode) {
      errorCode = "BAD_REQUEST";
    }
    if (err.statusCode == 401 || err.statusCode == 403)
      errorCode = "UNAUTHORIZED";
    message = err.message || "Error";
  } else if (err.name === "SequelizeDatabaseError") {
    statusCode = 500;
    message = "Database error";
  } else if (err.name === "Unauthorized") {
    statusCode = 403;
    message = "Unauthorized";
  } else if (err.code === "LIMIT_FILE_SIZE") {
    statusCode = 400;
    message = "File with maximum 5 MB can be uploaded";
  }
  return response.status(statusCode).send({
    success: false,
    data: null,
    message: message,
    errorCode,
  });
};
