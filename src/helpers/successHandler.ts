export const successHandler = (
  success: boolean,
  code: number,
  message: string,
  data?: {} | [],
): {} => {
  return {
    success: success,
    statusCode: code,
    message: message,
    data: data,
  };
};
