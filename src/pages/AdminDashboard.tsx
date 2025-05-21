import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminDashboard = () => {
  const { admin } = useAuth();
  
  useEffect(() => {
    document.title = 'Admin Dashboard | 6 Kilo Gibi Gubae';
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Welcome, {admin?.adminUsername}</h1>
            <p className="text-gray-600">Student ID: {admin?.studentId}</p>
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