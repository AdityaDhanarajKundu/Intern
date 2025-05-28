import axios from "axios";

export const api = axios.create({
  baseURL: "https://job-backend-it83.onrender.com/api/jobs",
});