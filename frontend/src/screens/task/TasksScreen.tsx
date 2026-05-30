import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

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
  fetchTasks,
  createTask,
  deleteTask,
  toggleTaskStatus,
} from "../../redux/thunks/taskThunk";

export default function TasksScreen({ route }: any) {
  const { projectId, projectTitle } = route.params;

  const dispatch = useDispatch();

  const { tasks, loading } = useSelector((state: any) => state.tasks);

  const [title, setTitle] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [dueDate, setDueDate] = useState<Date | null>(null);

  useEffect(() => {
    dispatch<any>(fetchTasks(projectId));
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert("Missing Field", "Please enter the title.");

      return;
    }

    const success = await dispatch<any>(
      createTask({
        title,
        due_date: dueDate,
        projectId,
      }),
    );

    if (success) {
      setTitle("");
      setDueDate(null);
      Alert.alert("Success", "Task created successfully.");
    } else {
      Alert.alert("Error", "Failed to create task.");
    }
  };

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
        {projectTitle}
      </Text>

      <TextInput
        placeholder="Task title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 12,
          marginBottom: 12,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          setShowPicker(true);
        }}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 12,
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            color: dueDate ? "#000" : "#999",
          }}
        >
          {dueDate ? dueDate.toLocaleDateString() : "Select Due Date"}
        </Text>
        {showPicker && (
          <DateTimePicker
            value={dueDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPicker(false);

              if (selectedDate) {
                setDueDate(selectedDate);
              }
            }}
          />
        )}
      </TouchableOpacity>

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
          Create Task
        </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }: any) => (
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

                  textDecorationLine: item.completed ? "line-through" : "none",
                }}
              >
                {item.title}
              </Text>

              <TouchableOpacity
                onPress={() => dispatch<any>(toggleTaskStatus(item.id))}
              >
                <Text
                  style={{
                    color: "green",
                    marginTop: 10,
                  }}
                >
                  Toggle Complete
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 11,
                }}
              >
                Due date : {item.due_date?.split("T")[0]}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Delete task",
                    "Are you sure you want to delete this task?",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => dispatch<any>(deleteTask(item.id)),
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
          )}
        />
      )}
    </View>
  );
}
