import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import { useDispatch } from "react-redux";

import { verifyOtp } from "../../redux/thunks/authThunk";

import { useState } from "react";

export default function VerifyOtpScreen({ route }: any) {
  const { email } = route.params;

  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Verify OTP
      </Text>

      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#4F46E5",
          padding: 14,
          borderRadius: 10,
        }}
        onPress={async () => {
          const success = await dispatch<any>(
            verifyOtp({
              email,
              otp,
            }),
          );

          if (success) {
            Alert.alert("Verified");
          } else {
            Alert.alert("Invalid OTP!!!!", "Try again!!");
          }
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Verify OTP
        </Text>
      </TouchableOpacity>
    </View>
  );
}
