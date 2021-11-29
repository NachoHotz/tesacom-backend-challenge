export const successHandler = (
  success: boolean,
  code: number,
  message: string,
  data?: object | [],
): object => {
  return {
    success: success,
    statusCode: code,
    message: message,
    data: data,
  };
};
