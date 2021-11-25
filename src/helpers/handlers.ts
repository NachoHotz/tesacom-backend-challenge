export const errorHandler = (success: boolean, code: number, error: string): {} => {
  return {
    success: success,
    statusCode: code,
    error: error
  }
}

export const successHandler = (success: boolean, code: number, message: string, data?: {} | []): {} => {
  return {
    success: success,
    statusCode: code,
    message: message,
    data: data
  }
}
