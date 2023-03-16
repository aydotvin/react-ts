import { ErrorObject } from "@types";

export const handleError = (response: ErrorObject) => {
  return Promise.reject(response || { statusCode: 500, success: false, message: "Something went wrong." });
};
