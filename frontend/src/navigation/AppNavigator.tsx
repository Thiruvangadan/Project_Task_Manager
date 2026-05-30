import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { View, Text, TouchableOpacity } from "react-native";

import { useDispatch } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { logout } from "../redux/slices/authSlice";

import ProjectScreen from "../screens/project/ProjectsScreen";

import TaskScreen from "../screens/task/TasksScreen";

const Stack = createNativeStackNavigator();

// function ProjectScreen() {
//   const dispatch = useDispatch();

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem("token");
//     dispatch(logout());
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Logged In</Text>

//       <TouchableOpacity onPress={handleLogout}>
//         <Text
//           style={{
//             marginTop: 20,
//             color: "red",
//           }}
//         >
//           Logout
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Projects" component={ProjectScreen} />
      <Stack.Screen name="Tasks" component={TaskScreen} />
    </Stack.Navigator>
  );
}
