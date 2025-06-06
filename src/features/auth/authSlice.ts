import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api/api';
import { Admin } from '../../types';

interface AuthState {
  isAuthenticated: boolean;
  admin: Admin | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('admin_token'),
  admin: null,
  token: localStorage.getItem('admin_token') || null,
  loading: false,
  error: null,
};

// 🥷 Login Thunk
export const loginAdmin = createAsyncThunk<
  { admin: Admin; token: string },
  { studentId: string; password: string },
  { rejectValue: string }
>('auth/loginAdmin', async ({ studentId, password }, { rejectWithValue }) => {
  try {
    const response = await api.post('/admin/login', { studentId, password });
    const { admin, token } = response.data;
    localStorage.setItem('admin_token', token);
    return { admin, token };
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

// 🧼 Logout Thunk
export const logoutAdmin = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>('auth/logoutAdmin', async (_, { rejectWithValue }) => {
  try {
    localStorage.removeItem('admin_token');
  } catch (err: any) {
    return rejectWithValue('Logout failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.admin = action.payload.admin;
        state.token = action.payload.token;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Login failed';
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.admin = null;
        state.token = null;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
