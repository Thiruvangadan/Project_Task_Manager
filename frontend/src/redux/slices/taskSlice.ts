import { createSlice } from "@reduxjs/toolkit";

import { Task } from "../../types/task";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}
const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },

    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },

    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    toggleTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task,
      );
    },

    setTaskLoading: (state, action) => {
      state.loading = action.payload;
    },

    setTaskError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  removeTask,
  toggleTask,
  setTaskLoading,
  setTaskError,
} = taskSlice.actions;

export default taskSlice.reducer;
