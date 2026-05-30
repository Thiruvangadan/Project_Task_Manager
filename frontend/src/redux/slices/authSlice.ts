import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload.user;

      state.token = action.payload.token;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },

    loadUser: (state, action) => {
      state.token = action.payload.token;

      state.user = action.payload.user;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setUser, logout, loadUser, setError } =
  authSlice.actions;

export default authSlice.reducer;
