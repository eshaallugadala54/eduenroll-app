import { create } from 'zustand';
import { Screen, LoginData, PersonalDetails, CourseSelection } from '../types';

interface AppState {
  currentScreen: Screen;
  loginData: LoginData;
  personalData: PersonalDetails;
  courseData: CourseSelection;
  loginError: string;
  setScreen: (screen: Screen) => void;
  setLoginData: (data: Partial<LoginData>) => void;
  setPersonalData: (data: Partial<PersonalDetails>) => void;
  setCourseData: (data: Partial<CourseSelection>) => void;
  setLoginError: (error: string) => void;
  resetAll: () => void;
}

const initialLoginData: LoginData = { email: '', password: '' };
const initialPersonalData: PersonalDetails = {
  fullName: '',
  dateOfBirth: '',
  gender: '',
  phoneNumber: '',
  homeAddress: '',
};
const initialCourseData: CourseSelection = {
  studentId: `EDU-2024-${Math.floor(1000 + Math.random() * 9000)}`,
  faculty: '',
  semester: '',
  major: '',
  course: '',
  enrollmentType: 'Full-time',
  startDate: '',
  specialRequirements: '',
};

export const useStore = create<AppState>((set) => ({
  currentScreen: 'login',
  loginData: { ...initialLoginData },
  personalData: { ...initialPersonalData },
  courseData: { ...initialCourseData },
  loginError: '',
  setScreen: (screen) => set({ currentScreen: screen }),
  setLoginData: (data) =>
    set((state) => ({ loginData: { ...state.loginData, ...data } })),
  setPersonalData: (data) =>
    set((state) => ({ personalData: { ...state.personalData, ...data } })),
  setCourseData: (data) =>
    set((state) => ({ courseData: { ...state.courseData, ...data } })),
  setLoginError: (error) => set({ loginError: error }),
  resetAll: () =>
    set({
      currentScreen: 'login',
      loginData: { ...initialLoginData },
      personalData: { ...initialPersonalData },
      courseData: {
        ...initialCourseData,
        studentId: `EDU-2024-${Math.floor(1000 + Math.random() * 9000)}`,
      },
      loginError: '',
    }),
}));
