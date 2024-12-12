import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    user: null,
    upload: []
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.user = action.payload;
    },
    addUpload: (state, action) => {
      state.value.upload.push(action.payload);
    },
    removeUpload: (state, action) => {
      state.value.upload = state.value.upload.filter((data) => data !== action.payload);
    },
  },
});

export const { login, logout, addUpload, removeUpload } = userSlice.actions;
export default userSlice.reducer;
