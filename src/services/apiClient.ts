import axios from "axios";
import { authToken } from "../features/constants";

const AUTHORIZATION_TOKEN = authToken;

const apiClient = axios.create({
  headers: {
    Authorization: AUTHORIZATION_TOKEN,
    "Content-Type": "application/json",
  },
});

export const getData = async (
  endpoint: string,
  queryParams?: { [key: string]: any }
) => {
  try {
    const response = await apiClient.get(endpoint, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
