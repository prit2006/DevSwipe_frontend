import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
    toggleSavedPost: (state, action) => {
      if (!state) return;
      const postId = action.payload;
      if (!state.savedPosts) state.savedPosts = [];

      const index = state.savedPosts.indexOf(postId);
      if (index === -1) {
        state.savedPosts.push(postId);
      } else {
        state.savedPosts.splice(index, 1);
      }
    },
    toggleSavedProject: (state, action) => {
      if (!state) return;
      const projectId = action.payload;
      if (!state.savedProjects) state.savedProjects = [];

      const index = state.savedProjects.indexOf(projectId);
      if (index === -1) {
        state.savedProjects.push(projectId);
      } else {
        state.savedProjects.splice(index, 1);
      }
    },
  },
});

export const { addUser, removeUser, toggleSavedPost, toggleSavedProject } = userSlice.actions;
export default userSlice.reducer;