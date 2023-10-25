import { API_ENDPOINT } from "../config/constants";
type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

export const request = async (
  endpoint: string,
  method: RequestMethod,
  data = {},
) => {
  let url;
  let payload: string;
  if (method === "GET") {
    const requestParams = new URLSearchParams(data);
    url =API_ENDPOINT + endpoint + "?" + requestParams.toString();
    payload = "";
  } else {
    url = API_ENDPOINT + endpoint;
    payload = data ? JSON.stringify(data) : "";
  }
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const auth = token ? "Token " + token : "";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: method !== "GET" ? payload : null,
  });
  if (response.status === 204) {
    return {};
  } else if (response.ok) {
    return await response.json();
  } else {
    const errorJson = await response.json();
    throw Error(errorJson);
  }
};