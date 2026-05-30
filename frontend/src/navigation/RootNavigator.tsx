import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadUser } from "../redux/slices/authSlice";
import { useEffect } from "react";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

export default function RootNavigator() {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    const checkLogin = async () => {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        dispatch(
          loadUser({
            token: storedToken,
            user: null,
          }),
        );
      }
    };
    checkLogin();
  }, []);

  return (
    <NavigationContainer>
      {token ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
