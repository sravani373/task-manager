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

export const register = createAsyncThunk('auth/register', async (credentials) => {
  const res = await axios.post('http://localhost:5000/api/auth/register', credentials);
  return res.data.token;
});


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   
    setToken(state, action) {
    state.token = action.payload;
  },
  clearToken: (state) => {
      state.token = null;
    },
     logout(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
 extraReducers: (builder) => {
    builder
.addCase(login.fulfilled, (state, action) => {
  state.token = action.payload; // action.payload IS the token string
  localStorage.setItem('token', action.payload);
})
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.error = 'Login failed';
      })
      .addCase(register.rejected, (state, action) => {
        state.error = 'Registration failed';
      });
  
  },


});

export default authSlice.reducer;
export const { setToken, clearToken, logout } = authSlice.actions;
