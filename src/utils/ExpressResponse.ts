// ! This is a class to handle the response of the API in a consistent way
export default class ExpresResponse {
  statusCode: number;
  message: string;
  data: any;
  constructor(statusCode: number, message: string, data: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
