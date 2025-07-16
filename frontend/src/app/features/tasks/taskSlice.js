import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  status: 'idle',
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { getState }) => {
  const token = getState().auth.token;
  const res = await axios.get('http://localhost:5000/api/tasks', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task, { getState }) => {
  const token = getState().auth.token;
  const res = await axios.post('http://localhost:5000/api/tasks', task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task, { getState }) => {
  const token = getState().auth.token;
  const res = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id, { getState }) => {
  const token = getState().auth.token;
  await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return id;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.items.findIndex(t => t._id === action.payload._id);
        if (idx > -1) state.items[idx] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;