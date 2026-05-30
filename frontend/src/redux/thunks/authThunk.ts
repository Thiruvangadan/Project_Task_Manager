import AsyncStorage from "@react-native-async-storage/async-storage";

import API from "../../api/axios";

import { setLoading, setUser, logout, setError } from "../slices/authSlice";

export const registerUser = (data: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));

    await API.post("/auth/register", data);

    dispatch(setLoading(false));

    return true;
  } catch (error: any) {
    dispatch(setLoading(false));

    dispatch(setError(error.response?.data?.message));

    return false;
  }
};

export const loginUser = (data: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));

    await API.post("/auth/login", data);

    dispatch(setLoading(false));

    return true;
  } catch (error: any) {
    dispatch(setLoading(false));

    dispatch(setError(error.response?.data?.message));

    return false;
  }
};

export const verifyOtp = (data: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));

    const response = await API.post("/auth/verify-otp", data);

    const { token, user } = response.data;

    await AsyncStorage.setItem("token", token);

    dispatch(
      setUser({
        token,
        user,
      }),
    );

    dispatch(setLoading(false));

    return true;
  } catch (error: any) {
    dispatch(setLoading(false));

    dispatch(setError(error.response?.data?.message));

    return false;
  }
};
