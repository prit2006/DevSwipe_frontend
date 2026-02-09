import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: [],
  reducers: {
    setPosts: (state, action) => {
      return action.payload;
    },

    addPost: (state, action) => {
      state.unshift(action.payload);
    },

    updatePost: (state, action) => {
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },

    deletePost: (state, action) => {
      return state.filter((post) => post._id !== action.payload);
    },
  },
});

export const { setPosts, addPost, updatePost, deletePost } =
  postSlice.actions;

export default postSlice.reducer;
