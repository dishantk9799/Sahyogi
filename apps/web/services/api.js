import axios from "axios";
export const api = axios.create({
  baseURL: "",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export function getApiErrorMessage(error, fallback = "Something went wrong") {
  return error?.response?.data?.message || fallback;
}
