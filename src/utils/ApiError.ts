/**
 * Refer NodeJs Error class to get more information
 */

class ApiError extends Error {
  statusCode: number = 0;
  data: object = {};
  message: string = "Success";
  success: boolean = false;
  errors = [];
  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = { data: null };
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
