import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ManageUsers from './pages/admin/ManageUsers';
import ManageAdmins from './pages/admin/ManageAdmins';
import Analytics from './pages/admin/Analytics';
import Dashboard from './pages/admin/Dashboard';
import LoadingScreen from './components/ui/LoadingScreen';

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="admins" element={<ManageAdmins />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
