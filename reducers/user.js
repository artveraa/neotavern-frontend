import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { 
    token: '',
    nickname: '' },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.nickname = action.payload.nickname;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;