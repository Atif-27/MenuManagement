// ! Custom error class for consistent error response
export default class ExpressError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
