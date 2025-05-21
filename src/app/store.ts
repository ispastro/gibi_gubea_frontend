// store.ts
import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './features/admin/adminSlice';
import userReducer from './features/user/userSlice';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
    auth:authReducer;

  },
});
