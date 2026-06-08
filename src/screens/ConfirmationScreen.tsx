import React, { useEffect, useState, useRef } from 'react';
import { useStore } from '../store/useStore';

const ConfirmationScreen: React.FC = () => {
  const { loginData, personalData, courseData, resetAll } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const hasSubmitted = useRef(false);

  const calculateFee = () => {
    const baseFee = courseData.enrollmentType === 'Full-time' ? 1200 : courseData.enrollmentType === 'Part-time' ? 500 : 0;
    const facultySurcharge = courseData.faculty === 'Medicine' ? 800 : courseData.faculty === 'Law' ? 600 : courseData.faculty === 'Engineering' ? 400 : courseData.faculty === 'Business' ? 200 : courseData.faculty === 'Arts' ? 100 : 0;
    const semesterSurcharge = (courseData.semester === 'Semester 7' || courseData.semester === 'Semester 8') ? 150 : 0;
    return baseFee + facultySurcharge + semesterSurcharge;
  };

  useEffect(() => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    const submitData = async () => {
      try {
        const payload = {
          email: loginData.email,
          full_name: personalData.fullName,
          date_of_birth: personalData.dateOfBirth,
          gender: personalData.gender,
          phone: personalData.phoneNumber,
          address: personalData.homeAddress,
          student_id: courseData.studentId,
          faculty: courseData.faculty,
          semester: courseData.semester,
          major: courseData.major,
          course: courseData.course,
          enrollment_type: courseData.enrollmentType,
          start_date: courseData.startDate,
          enrollment_fee: calculateFee()
        };

        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/enroll`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Submission failed');
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error submitting enrollment:', error);
        setApiError(true);
        setIsLoading(false);
      }
    };

    submitData();
  }, [loginData, personalData, courseData]);

  const details = [
    { label: 'Student ID', value: courseData.studentId, isGold: true },
    { label: 'Full Name', value: personalData.fullName },
    { label: 'Date of Birth', value: personalData.dateOfBirth },
    { label: 'Gender', value: personalData.gender },
    { label: 'Phone Number', value: personalData.phoneNumber },
    { label: 'Home Address', value: personalData.homeAddress },
    { label: 'Faculty', value: courseData.faculty },
    { label: 'Semester', value: courseData.semester },
    { label: 'Major', value: courseData.major },
    { label: 'Course', value: courseData.course },
    { label: 'Enrollment Type', value: courseData.enrollmentType },
    { label: 'Start Date', value: courseData.startDate },
    { label: 'Enrollment Fee', value: `$${calculateFee().toLocaleString()}`, isGold: true },
    { label: 'Special Requirements', value: courseData.specialRequirements || 'None' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream pt-24 pb-8 px-4 flex justify-center items-center">
        <div className="w-full max-w-[600px] mx-auto bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-gold rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-semibold text-lg">Submitting your enrollment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-8 px-4">
      <div className="w-full max-w-[600px] mx-auto bg-white rounded-2xl shadow-2xl p-10">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#16a34a] flex items-center justify-center bg-[#f0fdf4]">
            <div className="w-16 h-16 rounded-full bg-[#16a34a] flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1
          className="text-center text-[#16a34a] font-bold text-[28px] mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Enrollment Successful
        </h1>

        {/* Congratulations subtext */}
        <p className="text-center text-gray-500 text-sm italic mb-4">
          Your enrollment has been successfully submitted. Please keep this confirmation for your records.
        </p>

        {/* Gold Divider */}
        <div className="w-24 h-0.5 bg-gold mx-auto my-6" />

        {/* Summary Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {details.map((detail, index) => (
            <div
              key={detail.label}
              className={`py-3 px-4 -mx-4 transition-colors hover:bg-[#faf8f5] ${
                index % 2 === 0 ? 'bg-[#faf8f5]' : 'bg-white'
              } ${index === 0 ? 'rounded-t-xl' : ''} ${
                index === details.length - 1 ? 'rounded-b-xl' : ''
              }`}
            >
              <p className="text-gray-500 text-[11px] uppercase tracking-[0.1em] font-semibold mb-1">
                {detail.label}
              </p>
              <p
                className={`text-[15px] font-bold ${
                  detail.isGold ? 'text-gold text-lg' : 'text-dark'
                }`}
              >
                {detail.value}
              </p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={resetAll}
            className="flex-1 h-[52px] bg-dark text-white uppercase font-bold tracking-wider rounded-lg hover:bg-gold hover:text-black transition-all duration-300"
          >
            Start New Enrollment
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 h-[52px] bg-white border-2 border-gold text-gold uppercase font-bold tracking-wider rounded-lg hover:bg-gold hover:text-black transition-all duration-300"
          >
            Print
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          EduEnroll &copy; 2024 | Student Enrollment Portal
        </p>
      </div>
      
      {apiError && (
        <div className="w-full max-w-[600px] mx-auto mt-6 bg-[#fef2f2] border border-[#f87171] text-[#b91c1c] px-4 py-3 rounded-lg text-center font-medium">
          Submission failed. Please try again.
        </div>
      )}
    </div>
  );
};

export default ConfirmationScreen;
