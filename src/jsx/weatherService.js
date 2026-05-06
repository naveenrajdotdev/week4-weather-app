import axios from "axios";
import { BASE_URL, API_KEY } from "./config";

export const fetchWeather = (city) => {
  return axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric"
    }
  });
};

export const fetchForecast = (city) => {
  return axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric"
    }
  });
};
