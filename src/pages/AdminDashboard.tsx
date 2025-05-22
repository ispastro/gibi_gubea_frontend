import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    document.title = 'Admin Dashboard | 6 Kilo Gibi Gubae';
  }, []);

  // Debug: See if this effect is triggered
  useEffect(() => {
    console.log('DASHBOARD: isAuthenticated =', isAuthenticated);
  }, [isAuthenticated]);

  // REMOVE this redirect for now to prevent infinite blankness:
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/login');
  //   }
  // }, [isAuthenticated, navigate]);

  const displayAdmin = admin || { adminUsername: 'TestAdmin', studentId: '000000' };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Welcome, {displayAdmin.adminUsername}</h1>
            <p className="text-gray-600">Student ID: {displayAdmin.studentId}</p>
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
