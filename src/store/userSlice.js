import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { email:'', isAuthenticated: false, isAdmin: false, users: [] },
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.isAdmin;
    },
    logout: (state) => {
      state.email = '';
      state.isAuthenticated = false;
      state.isAdmin = false;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { login, logout, setUsers } = userSlice.actions;
export default userSlice.reducer;
