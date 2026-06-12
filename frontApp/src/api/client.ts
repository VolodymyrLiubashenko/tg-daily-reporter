import { VITE_API_URL } from "@/config";
import axios from "axios";

export const httpClient = axios.create({
   baseURL: VITE_API_URL,
   withCredentials: true,
});
