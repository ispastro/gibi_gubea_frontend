import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { User, UniversityUser } from '../../types';

interface UserFormProps {
  mode: 'add' | 'edit';
  initialData: User | null;
  onSave: (data: User) => void;
  onCancel: () => void;
}

const UserForm = ({ mode, initialData, onSave, onCancel }: UserFormProps) => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState<User>({
    studentid: '',
    firstname: '',
    middlename: '',
    lastname: '',
    gender: 'Male',
    baptismalname: '',
    phone: '',
    birthdate: '',
    useremail: '',
    nationality: 'Ethiopian',
    regionnumber: '',
    mothertongue: '',
    zonename: '',
    disabled: false,
    universityusers: {
      departmentname: '',
      sponsorshiptype: 'Government',
      participation: 'Active',
      batch: '',
      confessionfather: null,
      advisors: '',
      role: 'Faithful',
      mealcard: null,
      cafeteriaaccess: false,
    },
  });
  
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData(initialData);
    }
  }, [mode, initialData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof User],
          [child]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">
          {mode === 'add' ? t('admin.users.add') : t('admin.users.edit')}
        </h3>
        <button 
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.studentid')}
            </label>
            <input
              type="text"
              name="studentid"
              value={formData.studentid}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.firstname')}
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.middlename')}
            </label>
            <input
              type="text"
              name="middlename"
              value={formData.middlename}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.lastname')}
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.gender')}
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.baptismalname')}
            </label>
            <input
              type="text"
              name="baptismalname"
              value={formData.baptismalname}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.phone')}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.birthdate')}
            </label>
            <input
              type="date"
              name="birthdate"
              value={typeof formData.birthdate === 'string' ? formData.birthdate.substring(0, 10) : ''}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.useremail')}
            </label>
            <input
              type="email"
              name="useremail"
              value={formData.useremail}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.nationality')}
            </label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.regionnumber')}
            </label>
            <input
              type="text"
              name="regionnumber"
              value={formData.regionnumber}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.mothertongue')}
            </label>
            <input
              type="text"
              name="mothertongue"
              value={formData.mothertongue}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.zonename')}
            </label>
            <input
              type="text"
              name="zonename"
              value={formData.zonename}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          
          <div className="flex items-center h-full pt-6">
            <input
              type="checkbox"
              name="disabled"
              checked={formData.disabled}
              onChange={handleChange}
              className="h-4 w-4 text-liturgical-blue focus:ring-liturgical-blue border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              {t('forms.user.disabled')}
            </label>
          </div>
        </div>
        
        <h4 className="text-lg font-semibold border-b pb-2">University Information</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.departmentname')}
            </label>
            <input
              type="text"
              name="universityusers.departmentname"
              value={formData.universityusers?.departmentname || ''}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.sponsorshiptype')}
            </label>
            <select
              name="universityusers.sponsorshiptype"
              value={formData.universityusers?.sponsorshiptype || ''}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="Government">Government</option>
              <option value="Private">Private</option>
              <option value="Scholarship">Scholarship</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.participation')}
            </label>
            <select
              name="universityusers.participation"
              value={formData.universityusers?.participation || ''}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="Active">Active</option>
              <option value="Occasional">Occasional</option>
              <option value="Rare">Rare</option>
              <option value="None">None</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.batch')}
            </label>
            <input
              type="text"
              name="universityusers.batch"
              value={formData.universityusers?.batch || ''}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.confessionfather')}
            </label>
            <input
              type="text"
              name="universityusers.confessionfather"
              value={formData.universityusers?.confessionfather || ''}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.advisors')}
            </label>
            <input
              type="text"
              name="universityusers.advisors"
              value={formData.universityusers?.advisors || ''}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.role')}
            </label>
            <select
              name="universityusers.role"
              value={formData.universityusers?.role || ''}
              onChange={handleChange}
              required
              className="input-field"
              disabled={formData.universityusers?.participation === 'None'}
            >
              <option value="Choir">Choir</option>
              <option value="Teacher">Teacher</option>
              <option value="Sacred Groups">Sacred Groups</option>
              <option value="Faithful">Faithful</option>
              <option value="None">None</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('forms.user.mealcard')}
            </label>
            <input
              type="text"
              name="universityusers.mealcard"
              value={formData.universityusers?.mealcard || ''}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div className="flex items-center h-full pt-6">
            <input
              type="checkbox"
              name="universityusers.cafeteriaaccess"
              checked={formData.universityusers?.cafeteriaaccess || false}
              onChange={handleChange}
              className="h-4 w-4 text-liturgical-blue focus:ring-liturgical-blue border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              {t('forms.user.cafeteriaaccess')}
            </label>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <button 
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            {t('forms.cancel')}
          </button>
          <button 
            type="submit"
            className="btn-primary"
          >
            {t('forms.save')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;