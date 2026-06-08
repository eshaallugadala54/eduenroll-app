export interface LoginData {
  email: string;
  password: string;
}

export interface PersonalDetails {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  homeAddress: string;
}

export interface CourseSelection {
  studentId: string;
  faculty: string;
  semester: string;
  major: string;
  course: string;
  enrollmentType: 'Full-time' | 'Part-time';
  startDate: string;
  specialRequirements: string;
}

export interface EnrollmentData {
  login: LoginData;
  personal: PersonalDetails;
  course: CourseSelection;
}

export type Screen = 'login' | 'personal' | 'courses' | 'confirmation';

export interface FacultyMajorMap {
  [faculty: string]: string[];
}

export interface MajorCourseMap {
  [major: string]: string[];
}
