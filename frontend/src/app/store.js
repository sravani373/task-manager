import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import taskReducer from './features/tasks/taskSlice';

 const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});

export default store;