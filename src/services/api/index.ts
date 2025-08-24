import axios from "axios";

export const api = axios.create({
  baseURL: "https://kingsman-tryon.ru/api",
});