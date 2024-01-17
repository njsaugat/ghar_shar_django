import Axios from "axios";

export const axios = Axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

const getCsrfTokenFromCookie = () => {
  const csrfCookie = document.cookie
    .split(";")
    .find((cookie) => cookie.startsWith("csrftoken="));
  return csrfCookie ? csrfCookie.split("=")[1] : null;
};

axios.interceptors.request.use((config) => {
  const csrfToken = getCsrfTokenFromCookie();

  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});
