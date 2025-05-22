import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api/api';
import { Admin } from '../../types';

interface AuthState {
  isAuthenticated: boolean;
  admin: Admin | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  admin: null,
  loading: false,
  error: null,
};

// 🥷 Login Thunk (expecting { admin } only)
export const loginAdmin = createAsyncThunk<
  Admin,
  { studentId: string; password: string },
  { rejectValue: string }
>('auth/loginAdmin', async ({ studentId, password }, { rejectWithValue }) => {
  try {
    const response = await api.post('/admins/login', { studentId, password });
    return response.data.admin; //  Make sure backend sends `{ admin }`
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

// 🥷 Logout Thunk (calls /admins/logout)
export const logoutAdmin = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>('auth/logoutAdmin', async (_, { rejectWithValue }) => {
  try {
    await api.post('/admins/logout');
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Logout failed');
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
      .addCase(loginAdmin.fulfilled, (state, action: PayloadAction<Admin>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.admin = action.payload;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Login failed';
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.admin = null;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
