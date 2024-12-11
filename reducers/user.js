import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: "",
    nickname: "",
    likes: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.nickname = action.payload.nickname;
    },
    likeAnEvent: (state, action) => {
      state.value.likes.push(action.payload);
    },
    dislikeAnEvent: (state, action) => {
      state.value.likes = state.value.likes.filter(
        (like) => like !== action.payload
      );
    },
  },
});

export const { login, likeAnEvent, dislikeAnEvent } = userSlice.actions;
export default userSlice.reducer;
