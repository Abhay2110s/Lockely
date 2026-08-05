// Standardized success response shape used across all controllers.
// The `success` field is derived from the HTTP status code.
class ApiResponse {
  constructor(statusCode, message = "Success", data = null) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  // Serialize and send the response.
  send(res) {
    return res.status(this.statusCode).json(this);
  }
}

export default ApiResponse;
