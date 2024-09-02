class ApiResponse {
  statusCode: number = 0;
  data: any;
  message: string = "Success";
  success: boolean = false;

  constructor(statusCode: number, data: any, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
