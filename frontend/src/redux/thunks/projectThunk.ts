import API from "../../api/axios";

import {
  setProjects,
  addProject,
  removeProject,
  setProjectLoading,
  setProjectError,
} from "../slices/projectSlice";

export const fetchProjects = () => async (dispatch: any) => {
  try {
    dispatch(setProjectLoading(true));

    const res = await API.get("/projects");

    dispatch(setProjects(res.data.projects));

    dispatch(setProjectLoading(false));
  } catch (error: any) {
    dispatch(setProjectLoading(false));
    dispatch(setProjectError(error.response?.data?.message));
  }
};
export const createProject = (data: any) => async (dispatch: any) => {
  try {
    dispatch(setProjectLoading(true));

    const res = await API.post("/projects", data);

    dispatch(addProject(res.data.project));

    dispatch(setProjectLoading(false));
    return true;
  } catch (error: any) {
    dispatch(setProjectLoading(false));
    dispatch(setProjectError(error.response?.data?.message));
    return false;
  }
};
export const deleteProject = (projectId: any) => async (dispatch: any) => {
  try {
    dispatch(setProjectLoading(true));

    await API.delete(`/projects/${projectId}`);

    dispatch(removeProject(projectId));

    dispatch(setProjectLoading(false));
  } catch (error: any) {
    dispatch(setProjectLoading(false));
    dispatch(setProjectError(error.response?.data?.message));
    console.log(error);
  }
};
