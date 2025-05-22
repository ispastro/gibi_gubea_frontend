import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Plus, Edit, Trash2, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
} from '../../features/users/userSlice';
import { User } from '../../types';
import UserForm from '../../components/admin/UserForm';
// Make sure the path below points to your actual store file and that it exports AppDispatch
import type { AppDispatch } from '../../app/store';
const ManageUsers = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { users = [] } = useSelector((state: any) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'delete'>('add');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = Array.isArray(users) 
    ? users.filter((user: User) =>
        [user.studentid, user.firstname, user.lastname, user.baptismalname]
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];

  const openModal = (mode: 'add' | 'edit' | 'delete', user: User | null = null) => {
    setModalMode(mode);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSaveUser = (userData: User) => {
    if (modalMode === 'add') {
      dispatch(addUser(userData));
    } else if (modalMode === 'edit' && selectedUser) {
      if (selectedUser.id) {
        dispatch(updateUser({ id: selectedUser.id, userData }));
      }
    }
    closeModal();
  };

  const handleDeleteUser = () => {
    if (selectedUser?.id) {
      dispatch(deleteUser(selectedUser.id));
    }
    closeModal();
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('admin.users.title')}</h2>
        <button onClick={() => openModal('add')} className="btn-primary flex items-center">
          <Plus size={18} className="mr-2" />
          {t('admin.users.add')}
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
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

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Baptismal</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Participation</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user: User) => (
              <tr key={user.id}>
                <td className="px-6 py-4">{user.studentid}</td>
                <td className="px-6 py-4">{user.firstname} {user.lastname}</td>
                <td className="px-6 py-4">{user.baptismalname}</td>
                <td className="px-6 py-4">{user.universityusers?.departmentname}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.universityusers?.participation === 'Active' ? 'bg-green-100 text-green-800' :
                    user.universityusers?.participation === 'Occasional' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.universityusers?.participation}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button onClick={() => openModal('edit', user)} className="text-indigo-600 hover:text-indigo-900">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => openModal('delete', user)} className="text-red-600 hover:text-red-900">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            {modalMode === 'delete' ? (
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">{t('forms.confirm')}</h3>
                <p>{t('forms.delete_confirm')} {selectedUser?.firstname}?</p>
                <div className="mt-6 flex justify-end space-x-3">
                  <button onClick={closeModal} className="btn-secondary">{t('forms.no')}</button>
                  <button onClick={handleDeleteUser} className="btn-danger">{t('forms.yes')}</button>
                </div>
              </div>
            ) : (
              <UserForm
                mode={modalMode}
                initialData={selectedUser}
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
