import { signinApi, signupApi, validateTokenApi } from "@apis/authApi";
import { ErrorObject } from "@types";
import { handleError } from "@utils/customError";

export const validateTokenService = async (data = {}) => {
  console.log("validateToken service called");

  try {
    const response = await validateTokenApi();
    if (!response.success) {
      return handleError(response);
    }
    return response;
  } catch (error) {
    return handleError(error as ErrorObject);
  }
};

export const signupService = async (data) => {
  console.log("signup service called");

  try {
    //validate here
    const response = await signupApi(data);
    console.log("signup service response", response);
    if (!response.success) {
      return handleError(response);
    }
    return response;
  } catch (error) {
    return handleError(error as ErrorObject);
  }
};

export const signinService = async (data) => {
  console.log("signin service called");
};
