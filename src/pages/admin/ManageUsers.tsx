import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Plus, Edit, Trash2, X } from 'lucide-react';
import { mockUsers } from '../../data/mockData';
import { User, UniversityUser } from '../../types';
import UserForm from '../../components/admin/UserForm';

const ManageUsers = () => {
  const { t } = useTranslation();
  
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'delete'>('add');
  
  const filteredUsers = users.filter(user => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      user.studentid.toLowerCase().includes(searchTermLower) ||
      user.firstname.toLowerCase().includes(searchTermLower) ||
      user.lastname.toLowerCase().includes(searchTermLower) ||
      user.baptismalname.toLowerCase().includes(searchTermLower)
    );
  });
  
  const openAddModal = () => {
    setSelectedUser(null);
    setModalMode('add');
    setIsModalOpen(true);
  };
  
  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setModalMode('edit');
    setIsModalOpen(true);
  };
  
  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setModalMode('delete');
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleSaveUser = (userData: User) => {
    if (modalMode === 'add') {
      // In a real app, this would be an API call
      const newUser = {
        ...userData,
        id: String(users.length + 1)
      };
      setUsers([...users, newUser]);
    } else if (modalMode === 'edit' && selectedUser) {
      // In a real app, this would be an API call
      const updatedUsers = users.map(user => 
        user.id === selectedUser.id ? { ...userData, id: user.id } : user
      );
      setUsers(updatedUsers);
    }
    closeModal();
  };
  
  const handleDeleteUser = () => {
    if (selectedUser) {
      // In a real app, this would be an API call
      const updatedUsers = users.filter(user => user.id !== selectedUser.id);
      setUsers(updatedUsers);
    }
    closeModal();
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('admin.users.title')}</h2>
        
        <button 
          onClick={openAddModal}
          className="btn-primary flex items-center"
        >
          <Plus size={18} className="mr-2" />
          {t('admin.users.add')}
        </button>
      </div>
      
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="input-field pl-10"
          placeholder={t('admin.users.search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setSearchTerm('')}
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      
      <div className="overflow-x-auto bg-white rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Baptismal Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Participation
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.studentid}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.firstname} {user.middlename} {user.lastname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.baptismalname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.universityusers?.departmentname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.universityusers?.participation === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : user.universityusers?.participation === 'Occasional'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.universityusers?.participation}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openEditModal(user)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => openDeleteModal(user)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  {t('admin.users.no_users')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* User Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {modalMode === 'delete' ? (
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {t('forms.confirm')}
                </h3>
                <p className="mb-6">
                  Are you sure you want to delete {selectedUser?.firstname} {selectedUser?.lastname}?
                </p>
                <div className="flex justify-end space-x-3">
                  <button 
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    {t('forms.no')}
                  </button>
                  <button 
                    onClick={handleDeleteUser}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    {t('forms.yes')}
                  </button>
                </div>
              </div>
            ) : (
              <UserForm 
                mode={modalMode} 
                initialData={selectedUser} 
                onSave={handleSaveUser} 
                onCancel={closeModal} 
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;