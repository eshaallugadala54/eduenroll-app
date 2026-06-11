import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { facultyMajorMap, majorCourseMap } from '../data/courseData';

interface FormErrors {
  faculty?: string;
  semester?: string;
  major?: string;
  course?: string;
  startDate?: string;
}

const CourseSelectionScreen: React.FC = () => {
  const { courseData, setCourseData, setScreen } = useStore();
  const [errors, setErrors] = useState<FormErrors>({});

  const majors = courseData.faculty ? facultyMajorMap[courseData.faculty] || [] : [];
  const courses = courseData.major ? majorCourseMap[courseData.major] || [] : [];

  const handleFacultyChange = (faculty: string) => {
    setCourseData({ faculty, major: '', course: '' });
    if (errors.faculty) setErrors({ ...errors, faculty: undefined });
  };

  const handleMajorChange = (major: string) => {
    setCourseData({ major, course: '' });
    if (errors.major) setErrors({ ...errors, major: undefined });
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!courseData.faculty) newErrors.faculty = 'Please select a faculty';
    if (!courseData.semester) newErrors.semester = 'Please select a semester';
    if (!courseData.major) newErrors.major = 'Please select a major';
    if (!courseData.course) newErrors.course = 'Please select a course';
    if (!courseData.startDate) newErrors.startDate = 'Please select a start date';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setScreen('confirmation');
    }
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-8 px-4">
      <div className="w-full max-w-[600px] mx-auto bg-white rounded-2xl shadow-2xl p-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 bg-[#fffbeb] -mx-10 -mt-10 px-10 py-4 rounded-t-2xl">
            <span className="bg-gold text-dark text-xs font-bold px-3 py-1 rounded-full">
              STEP 2 OF 2
            </span>
            <h2
              className="font-bold text-[22px] text-dark"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Course Enrollment
            </h2>
          </div>
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="w-full h-full bg-gold rounded-full" />
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Student ID (Read Only) */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-[6px]">
              Student ID
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <input
                type="text"
                className="w-full h-[52px] rounded-lg pl-10 pr-4 text-[15px] font-semibold bg-[#fef3c7] border border-gold text-gold outline-none"
                value={courseData.studentId}
                readOnly
              />
            </div>
          </div>

          {/* Faculty */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-[6px]">
              Faculty *
            </label>
            <select
              className={`input-field ${errors.faculty ? 'error' : ''}`}
              value={courseData.faculty}
              onChange={(e) => handleFacultyChange(e.target.value)}
            >
              <option value="">Select Faculty</option>
              <option value="Business">Business</option>
              <option value="Engineering">Engineering</option>
              <option value="Medicine">Medicine</option>
              <option value="Arts">Arts</option>
              <option value="Law">Law</option>
            </select>
            {errors.faculty && <p className="text-[#dc2626] text-xs mt-1">{errors.faculty}</p>}
          </div>

          {/* Semester */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-[6px]">
              Semester *
            </label>
            <select
              className={`input-field ${errors.semester ? 'error' : ''}`}
              value={courseData.semester}
              onChange={(e) => {
                setCourseData({ semester: e.target.value });
                if (errors.semester) setErrors({ ...errors, semester: undefined });
              }}
            >
              <option value="">Select Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={`Semester ${s}`}>
                  Semester {s}
                </option>
              ))}
            </select>
            {errors.semester && <p className="text-[#dc2626] text-xs mt-1">{errors.semester}</p>}
          </div>

          {/* Gold info box */}
          <div className="border-l-4 border-gold bg-[#fefce8] text-sm text-yellow-800 p-3 rounded-r-lg">
            Your major and course options update automatically based on your faculty selection
          </div>

          {/* Major */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-[6px]">
              Major *
            </label>
            <select
              className={`input-field ${errors.major ? 'error' : ''}`}
              value={courseData.major}
              onChange={(e) => handleMajorChange(e.target.value)}
              disabled={!courseData.faculty}
            >
              <option value="">Select Major</option>
              {majors.map((major) => (
                <option key={major} value={major}>
                  {major}
                </option>
              ))}
            </select>
            {errors.major && <p className="text-[#dc2626] text-xs mt-1">{errors.major}</p>}
          </div>

          {/* Course */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-[6px]">
              Course *
            </label>
            <select
              className={`input-field ${errors.course ? 'error' : ''}`}
              value={courseData.course}
              onChange={(e) => {
                setCourseData({ course: e.target.value });
                if (errors.course) setErrors({ ...errors, course: undefined });
              }}
              disabled={!courseData.major}
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            {errors.course && <p className="text-[#dc2626] text-xs mt-1">{errors.course}</p>}
          </div>

          {/* Enrollment Type */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-[6px]">
              Enrollment Type *
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                className={`flex-1 py-3 px-8 rounded-lg border-2 font-semibold text-sm transition-all duration-200 ${
                  courseData.enrollmentType === 'Full-time'
                    ? 'bg-gold border-gold text-black'
                    : 'bg-white border-gray-300 text-gray-500 hover:border-gray-400'
                }`}
                onClick={() => setCourseData({ enrollmentType: 'Full-time' })}
              >
                Full-time
              </button>
              <button
                type="button"
                className={`flex-1 py-3 px-8 rounded-lg border-2 font-semibold text-sm transition-all duration-200 ${
                  courseData.enrollmentType === 'Part-time'
                    ? 'bg-gold border-gold text-black'
                    : 'bg-white border-gray-300 text-gray-500 hover:border-gray-400'
                }`}
                onClick={() => setCourseData({ enrollmentType: 'Part-time' })}
              >
                Part-time
              </button>
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-[6px]">
              Start Date *
            </label>
            <input
              type="date"
              className={`input-field ${errors.startDate ? 'error' : ''}`}
              value={courseData.startDate}
              onChange={(e) => {
                setCourseData({ startDate: e.target.value });
                if (errors.startDate) setErrors({ ...errors, startDate: undefined });
              }}
            />
            {errors.startDate && <p className="text-[#dc2626] text-xs mt-1">{errors.startDate}</p>}
          </div>

          {/* Special Requirements */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-[6px]">
              Special Requirements
            </label>
            <textarea
              className="textarea-field"
              placeholder="Any special needs or requirements"
              value={courseData.specialRequirements}
              onChange={(e) => setCourseData({ specialRequirements: e.target.value })}
            />
          </div>

          {/* Fee Calculator */}
          <div className="border-2 border-yellow-400 rounded-xl p-6 bg-yellow-50 mt-6">
            <h3 className="uppercase font-bold text-sm text-yellow-800 tracking-widest mb-4">
              Estimated Enrollment Fee
            </h3>
            
            {/* Calculate fees */}
            {(() => {
              const baseFee = courseData.enrollmentType === 'Full-time' ? 1200 : courseData.enrollmentType === 'Part-time' ? 500 : 0;
              const facultySurcharge = courseData.faculty === 'Medicine' ? 800 : courseData.faculty === 'Law' ? 600 : courseData.faculty === 'Engineering' ? 400 : courseData.faculty === 'Business' ? 200 : courseData.faculty === 'Arts' ? 100 : 0;
              const semesterSurcharge = (courseData.semester === 'Semester 7' || courseData.semester === 'Semester 8') ? 150 : 0;
              const totalFee = baseFee + facultySurcharge + semesterSurcharge;

              return (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Base Fee ({courseData.enrollmentType || 'Not selected'})</span>
                    <span className="font-semibold text-dark">${baseFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Faculty Surcharge</span>
                    <span className="font-semibold text-dark">${facultySurcharge.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Semester Surcharge</span>
                    <span className="font-semibold text-dark">${semesterSurcharge.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-yellow-300 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-gold">TOTAL FEE</span>
                    <span className="font-bold text-2xl text-gold">${totalFee.toLocaleString()}</span>
                  </div>
                </div>
              );
            })()}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full h-[52px] bg-[#16a34a] text-white uppercase font-bold tracking-wider rounded-lg hover:bg-[#15803d] transition-all duration-300 mt-4"
          >
            Submit Enrollment
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          EduEnroll &copy; 2026 | Student Enrollment Portal
        </p>
      </div>
    </div>
  );
};

export default CourseSelectionScreen;
