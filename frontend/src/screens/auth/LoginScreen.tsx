import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../redux/thunks/authThunk";

export default function LoginScreen({ navigation }: any) {
  const dispatch = useDispatch();

  const { loading } = useSelector((state: any) => state.auth);

  const { error } = useSelector((state: any) => state.auth);

  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    if (!email.trim()) return;

    const success = await dispatch<any>(
      loginUser({
        email,
      }),
    );

    if (success) {
      navigation.navigate("VerifyOtp", { email });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      {error && (
        <Text
          style={{
            color: "red",
            marginBottom: 10,
          }}
        >
          {error}
        </Text>
      )}

      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Login
      </Text>

      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#4F46E5",
          padding: 14,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text
          style={{
            color: "#4F46E5",
            textAlign: "center",
          }}
        >
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}
