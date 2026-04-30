import axios from "axios";

const API = axios.create({
  baseURL: "",
  withCredentials: true,
});

export default API;
