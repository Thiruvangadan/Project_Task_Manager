import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
  baseURL: "https://project-task-manager-1hfd.onrender.com/api/v1",
});

API.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

export default API;
