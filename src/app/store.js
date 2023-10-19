import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import adminReducer from '../features/auth/admin/adminSlice'; // Import the adminReducer from adminSlice.js

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer, // Add the adminReducer to the store's reducer
  },
});

export default store;
