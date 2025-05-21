import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// Update the path below if your hooks file is located elsewhere, e.g. '../../../store/hooks' or '../store/hooks'
// If useAppSelector is not exported from hooks, use useSelector from react-redux
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { Cross, Users, UserCog, BarChart2, LogOut, Home } from 'lucide-react';
import { t } from 'i18next';

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state: any) => state.auth.admin);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  return (
    <div className="w-64 bg-liturgical-blue text-white h-screen flex flex-col">
      <motion.div 
        className="p-4 border-b border-white/10 flex items-center space-x-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Cross className="text-gold" size={24} />
        <h1 className="font-bold text-xl">
          {t('siteName')}
        </h1>
      </motion.div>

      <div className="px-4 py-6 flex-1 overflow-y-auto">
        <ul className="space-y-4">
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <NavLink 
              to="/admin" 
              end
              className={({ isActive }) => 
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-white/10 text-gold' : 'hover:bg-white/5'
                }`
              }
            >
              <Home size={20} />
              <span>{t('admin.dashboard.title')}</span>
            </NavLink>
          </motion.li>

          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <NavLink 
              to="/admin/users" 
              className={({ isActive }) => 
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-white/10 text-gold' : 'hover:bg-white/5'
                }`
              }
            >
              <Users size={20} />
              <span>{t('admin.dashboard.users')}</span>
            </NavLink>
          </motion.li>

          {admin?.isSuperAdmin && (
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <NavLink 
                to="/admin/admins" 
                className={({ isActive }) => 
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-white/10 text-gold' : 'hover:bg-white/5'
                  }`
                }
              >
                <UserCog size={20} />
                <span>{t('admin.dashboard.admins')}</span>
              </NavLink>
            </motion.li>
          )}

          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <NavLink 
              to="/admin/analytics" 
              className={({ isActive }) => 
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-white/10 text-gold' : 'hover:bg-white/5'
                }`
              }
            >
              <BarChart2 size={20} />
              <span>{t('admin.dashboard.analytics')}</span>
            </NavLink>
          </motion.li>
        </ul>
      </div>

      <motion.div 
        className="p-4 border-t border-white/10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full hover:bg-white/5 transition-colors"
        >
          <LogOut size={20} />
          <span>{t('admin.dashboard.logout')}</span>
        </button>
      </motion.div>
    </div>
  );
};

export default AdminSidebar;
