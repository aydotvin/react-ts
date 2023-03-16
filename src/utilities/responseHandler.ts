export const handleResponse = (response): void => {
  if (response.status === 404) {
    console.log("error sir.", response);
    throw new Error({ response });
  }
};
