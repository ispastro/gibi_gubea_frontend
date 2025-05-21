import { User, Admin, ChartData } from '../types';

// Mock admin data for testing
export const mockAdmins: Admin[] = [
  {
    id: '1',
    studentId: 'AAU/1234/12',
    adminUsername: 'admin',
    adminPassword: 'password123',
    isSuperAdmin: true,
  },
  {
    id: '2',
    studentId: 'AAU/5678/12',
    adminUsername: 'moderator',
    adminPassword: 'moderator123',
    isSuperAdmin: false,
  },
];

// Mock user data for testing
export const mockUsers: User[] = [
  {
    id: '1',
    studentid: 'AAU/1111/12',
    firstname: 'Abebe',
    middlename: 'Kebede',
    lastname: 'Tadesse',
    gender: 'Male',
    baptismalname: 'Gebriel',
    phone: '+251912345678',
    birthdate: '1998-05-15',
    useremail: 'abebe.kebede@example.com',
    nationality: 'Ethiopian',
    regionnumber: '2',
    mothertongue: 'Amharic',
    zonename: 'North Shewa',
    disabled: false,
    universityusers: {
      id: '1',
      departmentname: 'Computer Science',
      sponsorshiptype: 'Government',
      participation: 'Active',
      batch: '2020',
      confessionfather: 'Abba Yohannes',
      advisors: 'Dr. Solomon',
      role: 'Choir',
      mealcard: 'A12345',
      cafeteriaaccess: true,
    },
  },
  {
    id: '2',
    studentid: 'AAU/2222/12',
    firstname: 'Sara',
    middlename: 'Teshome',
    lastname: 'Haile',
    gender: 'Female',
    baptismalname: 'Mariam',
    phone: '+251987654321',
    birthdate: '1999-10-20',
    useremail: 'sara.teshome@example.com',
    nationality: 'Ethiopian',
    regionnumber: '1',
    mothertongue: 'Amharic',
    zonename: 'Addis Ababa',
    disabled: false,
    universityusers: {
      id: '2',
      departmentname: 'Electrical Engineering',
      sponsorshiptype: 'Government',
      participation: 'Active',
      batch: '2019',
      confessionfather: 'Abba Dawit',
      advisors: 'Dr. Abeba',
      role: 'Teacher',
      mealcard: 'B54321',
      cafeteriaaccess: true,
    },
  },
  {
    id: '3',
    studentid: 'AAU/3333/12',
    firstname: 'Dawit',
    middlename: 'Mekonnen',
    lastname: 'Alemu',
    gender: 'Male',
    baptismalname: 'Yohannes',
    phone: '+251923456789',
    birthdate: '2000-03-25',
    useremail: 'dawit.mekonnen@example.com',
    nationality: 'Ethiopian',
    regionnumber: '3',
    mothertongue: 'Tigrinya',
    zonename: 'Mekelle',
    disabled: false,
    universityusers: {
      id: '3',
      departmentname: 'Civil Engineering',
      sponsorshiptype: 'Private',
      participation: 'Occasional',
      batch: '2021',
      confessionfather: 'Abba Tekle',
      advisors: 'Dr. Girma',
      role: 'Faithful',
      mealcard: null,
      cafeteriaaccess: false,
    },
  },
];

// Mock chart data for analytics
export const participationData: ChartData[] = [
  { name: 'Active', value: 65 },
  { name: 'Occasional', value: 25 },
  { name: 'Rare', value: 10 },
  { name: 'None', value: 5 },
];

export const groupDistributionData: ChartData[] = [
  { name: 'Sacred Groups', value: 30 },
  { name: 'Choir', value: 25 },
  { name: 'Teachers', value: 15 },
  { name: 'Faithful', value: 30 },
];

// Mock event data
export const mockEvents = [
  {
    id: 1,
    title: 'Weekly Prayer Meeting',
    date: '2025-08-15',
    time: '18:00',
    location: 'Room 101, Building 12',
    description: 'Our regular weekly prayer and discussion session.',
  },
  {
    id: 2,
    title: 'Fasika Celebration',
    date: '2025-09-01',
    time: '08:00',
    location: 'Main Hall',
    description: 'Easter celebration with traditional Ethiopian Orthodox customs.',
  },
  {
    id: 3,
    title: 'Debre Tabor Commemoration',
    date: '2025-09-10',
    time: '17:00',
    location: 'Chapel',
    description: 'Special service to commemorate the Transfiguration.',
  },
];

// Mock gallery images
export const galleryImages = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/2833402/pexels-photo-2833402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Prayer Session',
    description: 'Students during our weekly prayer session',
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/5721097/pexels-photo-5721097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Choir Practice',
    description: 'Our choir practicing traditional hymns',
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/6577761/pexels-photo-6577761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Bible Study',
    description: 'Students engaged in Bible study',
  },
  {
    id: 4,
    url: 'https://images.pexels.com/photos/7214824/pexels-photo-7214824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Cross Procession',
    description: 'Annual cross procession ceremony',
  },
  {
    id: 5,
    url: 'https://images.pexels.com/photos/14219433/pexels-photo-14219433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Community Service',
    description: 'Students participating in community service',
  },
  {
    id: 6,
    url: 'https://images.pexels.com/photos/16007147/pexels-photo-16007147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Celebration',
    description: 'Celebration of Ethiopian Orthodox traditions',
  },
];