import { BASE_URL } from "@/constants";
import axios from "axios";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default API;
