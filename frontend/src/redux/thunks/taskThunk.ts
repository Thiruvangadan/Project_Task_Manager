import API from "../../api/axios";

import {
  setTasks,
  addTask,
  removeTask,
  toggleTask,
  setTaskLoading,
  setTaskError,
} from "../slices/taskSlice";

export const fetchTasks = (projectId: any) => async (dispatch: any) => {
  try {
    dispatch(setTaskLoading(true));

    const response = await API.get(`/tasks/${projectId}`);

    dispatch(setTasks(response.data.tasks));

    dispatch(setTaskLoading(false));
  } catch (error: any) {
    dispatch(setTaskLoading(false));

    dispatch(setTaskError(error.response?.data?.message));
  }
};

export const createTask = (data: any) => async (dispatch: any) => {
  try {
    const response = await API.post("/tasks", data);

    dispatch(addTask(response.data.task));

    return true;
  } catch (error) {
    return false;
  }
};

export const deleteTask = (taskId: any) => async (dispatch: any) => {
  try {
    await API.delete(`/tasks/${taskId}`);

    dispatch(removeTask(taskId));
  } catch (error) {
    console.log(error);
  }
};

export const toggleTaskStatus = (taskId: any) => async (dispatch: any) => {
  try {
    await API.patch(`/tasks/${taskId}`);

    dispatch(toggleTask(taskId));
  } catch (error) {
    console.log(error);
  }
};
