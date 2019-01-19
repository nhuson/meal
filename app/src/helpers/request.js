import axios from "axios";
import { authHeader } from "./auth-header";
import { serviceConstants } from "../constants/service.constants";

const client = axios.create({
  baseURL: serviceConstants.API_URL,
  timeout: 30000, //30 seconds
  headers: authHeader()
});

const request = (method = "GET", url, data = null, params = null) => {
  const onSuccess = response => {
    console.debug("Request Successful!", response.data);
    return response.data;
  };

  const onError = error => {
    let message = "";
    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      message = error.response.data.message;
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      if (error.response.status === 401) {
        console.log("unauthorized, logging out ...");
      }
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error("Error Message:", error.message);
      message = error.message;
    }

    return Promise.reject(message);
  };

  return client({
    method: method,
    url: url,
    params: params,
    data: data
  })
    .then(onSuccess)
    .catch(onError);
};

export default request;
