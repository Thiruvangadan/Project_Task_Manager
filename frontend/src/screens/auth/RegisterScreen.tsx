import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/thunks/authThunk";
import { useState } from "react";

export default function RegisterScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const { error } = useSelector((state: any) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Register
      </Text>

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
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 12,
          borderRadius: 10,
        }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 20,
          borderRadius: 10,
        }}
      />

      <TouchableOpacity
        style={{ backgroundColor: "#4F46E5", padding: 14, borderRadius: 10 }}
        onPress={async () => {
          const success = await dispatch<any>(
            registerUser({
              name,
              email,
            }),
          );

          if (success) {
            navigation.navigate("VerifyOtp", { email });
          }
        }}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
        >
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}
