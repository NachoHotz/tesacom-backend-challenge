/**
 * Returns an object when a request is successfull.
 *
 * @param success boolean - true by default.
 *
 * @param code number - 200 when it is successfull, 201 when an item is stored in a database.
 *
 * @param message string - A string saying if something is found, created, updated or deleted. Example:
 * - message: User created successfully
 *
 * @param data object or array - an optional property which can be a single object or an array of objects.
 *
 * @returns object - an object containing the after mentioned properties.
 */

export default class SuccessHandler {
  constructor(
    success: boolean,
    code: number,
    message: string,
    data?: object | [],
  ) {
    return {
      success: success,
      code: code,
      message: message,
      data: data,
    };
  }
}
