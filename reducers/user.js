import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    user: {token: null, nickname: null, email: null, role: null, id: null, likedEvents: null},
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.user.token = action.payload.token;
      state.value.user.email = action.payload.email;
      state.value.user.role = action.payload.role;
      state.value.user.nickname = action.payload.nickname;
      state.value.user.id = action.payload.id;
      state.value.user.badges = action.payload.badges;
      state.value.user.likedEvents = action.payload.likedEvents;
    },
    likeEvent: (state, action) => {
      state.value.user.likedEvents.push(action.payload.likedEvent)
    }
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
