export const errorHandler = (success: boolean, code: number, error: string) => {
  return {
    success: success,
    code: code,
    error: error
  }
}

export const successHandler = (success: boolean, code: number, message: string, data: {} | []) => {
  return {
    success: success,
    code: code,
    message: message,
    data: data
  }
}
