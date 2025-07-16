// import { createSlice } from '@reduxjs/toolkit';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     token: null,
//     user: null,
//   },
//   reducers: {
//     setCredentials: (state, action) => {
//       state.token = action.payload.token;
//       state.user = action.payload.user;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.user = null;
//     },
//   },
// });

// export const { setCredentials, logout } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');
const initialState = {
  token: token || null,
  status: 'idle',
};

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const res = await axios.post('http://localhost:5000/api/auth/login', credentials);
  return res.data.token;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;