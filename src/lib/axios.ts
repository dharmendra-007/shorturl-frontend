import axios from "axios";

const API = axios.create({
  baseURL: "https://short-url-backend-nine.vercel.app/",
  withCredentials: true,
});

export default API;
