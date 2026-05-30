import { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../../redux/slices/authSlice";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchProjects,
  createProject,
  deleteProject,
} from "../../redux/thunks/projectThunk";

export default function ProjectsScreen({ navigation }: any) {
  const dispatch = useDispatch();

  const { projects, loading } = useSelector((state: any) => state.projects);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch<any>(fetchProjects());
  }, []);

  const handleCreate = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Missing Fields", "Please enter both title and description.");

      return;
    }

    const success = await dispatch<any>(
      createProject({
        title,
        description,
      }),
    );

    if (success) {
      setTitle("");
      setDescription("");
      Alert.alert("Success", "Project created successfully.");
    } else {
      Alert.alert("Error", "Failed to create project.");
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");

    dispatch(logout());
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          onPress={() =>
            Alert.alert("Logout", "Are you sure you want to logout?", [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Logout",
                style: "destructive",
                onPress: handleLogout,
              },
            ])
          }
          style={{
            color: "red",
            fontWeight: "bold",
          }}
        >
          Logout
        </Text>
      ),
    });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
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
        Projects
      </Text>

      <TextInput
        placeholder="Project title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 12,
          marginBottom: 12,
        }}
      />

      <TextInput
        placeholder="Project description"
        value={description}
        onChangeText={setDescription}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 12,
          marginBottom: 12,
        }}
      />

      <TouchableOpacity
        onPress={handleCreate}
        style={{
          backgroundColor: "#4F46E5",
          padding: 14,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Create Project
        </Text>
      </TouchableOpacity>

      {projects.length === 0 && !loading && (
        <Text
          style={{
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          No Projects Yet
        </Text>
      )}

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Tasks", {
                  projectId: item.id,
                  projectTitle: item.title,
                })
              }
            >
              <View
                style={{
                  padding: 16,
                  borderWidth: 1,
                  borderRadius: 10,
                  marginBottom: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {item.title}
                </Text>

                <Text
                  style={{
                    marginTop: 8,
                  }}
                >
                  {item.description}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Delete Project",
                      "Are you sure you want to delete this project?",
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                        {
                          text: "Delete",
                          style: "destructive",
                          onPress: () => dispatch<any>(deleteProject(item.id)),
                        },
                      ],
                    )
                  }
                >
                  <Text
                    style={{
                      color: "red",
                      marginTop: 10,
                    }}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
