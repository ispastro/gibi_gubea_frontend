import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    document.title = 'Admin Dashboard | 6 Kilo Gibi Gubae';
  }, []);

  //  Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!admin) return null; // Prevent rendering until admin is loaded

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Welcome, {admin.adminUsername}</h1>
            <p className="text-gray-600">Student ID: {admin.studentId}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
