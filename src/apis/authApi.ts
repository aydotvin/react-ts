import { BACKEND_URL } from "@configs/backend";
import axios from "axios";

const url = `${BACKEND_URL}/<module>`;

export const validateTokenApi = async () => {
  console.log("calling validate token.");

  const options = {};

  try {
    const response = await axios.get(`${url}/endpoint`, options);

    return response.data;
  } catch (error: unknown) {
    console.log("error", error);
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    } else {
      console.log(error);
    }
  }
};

export const signupApi = async (data = {}) => {
  console.log("calling signup.");

  const options = {};

  try {
    const response = await axios.post(`${url}/endpoint`, data, options);
    return response.data;
  } catch (error: unknown) {
    console.log("error", error);
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    } else {
      console.log(error);
    }
  }
};

export const signinApi = async (data = {}) => {
  console.log("calling signin.");
};

export const signoutApi = async (data = {}) => {
  console.log("calling signout.");
};
