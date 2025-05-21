import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Cross, User, Lock, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/admin');
      } else {
        setError(t('admin.login.error'));
      }
    } catch (err) {
      setError(t('admin.login.error'));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 holy-cross-bg">
      <motion.div
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-liturgical-blue/10">
            <Cross className="h-8 w-8 text-liturgical-blue" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-liturgical-blue">
            {t('admin.login.title')}
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                {t('admin.login.username')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="input-field pl-10"
                  placeholder={t('admin.login.username')}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">
                {t('admin.login.password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input-field pl-10"
                  placeholder={t('admin.login.password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {error && (
            <div className="flex items-center text-red-600 text-sm mt-2">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>{error}</span>
            </div>
          )}
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`btn-primary w-full ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  {t('admin.login.submit')}...
                </span>
              ) : (
                t('admin.login.submit')
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;