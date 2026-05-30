import { createSlice } from "@reduxjs/toolkit";

import { Project } from "../../types/project";

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "projects",

  initialState,

  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },

    addProject: (state, action) => {
      state.projects.unshift(action.payload);
    },

    removeProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload,
      );
    },

    setProjectLoading: (state, action) => {
      state.loading = action.payload;
    },

    setProjectError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProjects,
  addProject,
  removeProject,
  setProjectLoading,
  setProjectError,
} = projectSlice.actions;

export default projectSlice.reducer;
