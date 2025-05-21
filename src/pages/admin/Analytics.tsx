import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { participationData, groupDistributionData, mockUsers } from '../../data/mockData';
import { Users, UserCheck, Layers } from 'lucide-react';

const COLORS = ['#1A237E', '#5C6BC0', '#9FA8DA', '#C5CAE9'];

const Analytics = () => {
  const { t } = useTranslation();
  
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(user => 
    user.universityusers?.participation === 'Active'
  ).length;
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        {t('admin.analytics.title')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 border-l-4 border-liturgical-blue"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 font-medium">
                {t('admin.analytics.total')}
              </p>
              <h3 className="text-3xl font-bold mt-1">{totalUsers}</h3>
            </div>
            <div className="bg-liturgical-blue/10 p-3 rounded-full text-liturgical-blue">
              <Users size={24} />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 font-medium">
                {t('admin.analytics.active')}
              </p>
              <h3 className="text-3xl font-bold mt-1">{activeUsers}</h3>
            </div>
            <div className="bg-green-500/10 p-3 rounded-full text-green-500">
              <UserCheck size={24} />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 font-medium">
                {t('admin.analytics.distribution')}
              </p>
              <h3 className="text-3xl font-bold mt-1">{groupDistributionData.length}</h3>
            </div>
            <div className="bg-gold/10 p-3 rounded-full text-gold">
              <Layers size={24} />
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4">
            {t('admin.analytics.participation')}
          </h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={participationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {participationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-4">
            {t('admin.analytics.distribution')}
          </h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={groupDistributionData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Users" fill="#1A237E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;