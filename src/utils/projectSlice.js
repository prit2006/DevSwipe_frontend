// utils/projectSlice.js
import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: null,
  reducers: {
    addProjects: (state, action) => {
      return action.payload;
    },
    removeProjects: () => {
      return null;
    },
    addProject: (state, action) => {
      if (!state) return [action.payload];
      return [action.payload, ...state];
    },
    updateProject: (state, action) => {
      if (!state) return state;
      return state.map((project) =>
        project._id === action.payload._id ? action.payload : project
      );
    },
    deleteProject: (state, action) => {
      if (!state) return state;
      return state.filter((project) => project._id !== action.payload);
    },
  },
});

export const { addProjects, removeProjects, addProject, updateProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;