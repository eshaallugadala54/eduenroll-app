import React, { useState } from 'react';
import { useStore } from '../store/useStore';

interface FormErrors {
  fullName?: string;
  dateOfBirth?: string;
  gender?: string;
  phoneNumber?: string;
  homeAddress?: string;
}

const PersonalDetailsScreen: React.FC = () => {
  const { personalData, setPersonalData, setScreen } = useStore();
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!personalData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!personalData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!personalData.gender) {
      newErrors.gender = 'Please select your gender';
    }

    if (!personalData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(personalData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
    }

    if (!personalData.homeAddress.trim()) {
      newErrors.homeAddress = 'Home address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setScreen('courses');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-8 px-4">
      <div className="w-full max-w-[600px] mx-auto bg-white rounded-2xl shadow-2xl p-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 bg-[#fffbeb] -mx-10 -mt-10 px-10 py-4 rounded-t-2xl">
            <span className="bg-gold text-dark text-xs font-bold px-3 py-1 rounded-full">
              STEP 1 OF 2
            </span>
            <h2
              className="font-bold text-[22px] text-dark"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Personal Information
            </h2>
          </div>
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-gold rounded-full" />
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5" onKeyDown={handleKeyDown}>
          <div className="border-b border-[#e5e7eb] pb-5">
            <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-[6px]">
              <svg className="inline-block w-3.5 h-3.5 mr-1.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Full Name *
            </label>
            <input
              type="text"
              className={`input-field ${errors.fullName ? 'error' : ''}`}
              placeholder="Enter your full name"
              value={personalData.fullName}
              onChange={(e) => {
                setPersonalData({ fullName: e.target.value });
                if (errors.fullName) setErrors({ ...errors, fullName: undefined });
              }}
            />
            {errors.fullName && <p className="text-[#dc2626] text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div className="border-b border-[#e5e7eb] pb-5">
            <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-[6px]">
              Date of Birth *
            </label>
            <input
              type="date"
              className={`input-field ${errors.dateOfBirth ? 'error' : ''}`}
              value={personalData.dateOfBirth}
              onChange={(e) => {
                setPersonalData({ dateOfBirth: e.target.value });
                if (errors.dateOfBirth) setErrors({ ...errors, dateOfBirth: undefined });
              }}
            />
            {errors.dateOfBirth && <p className="text-[#dc2626] text-xs mt-1">{errors.dateOfBirth}</p>}
          </div>

          <div className="border-b border-[#e5e7eb] pb-5">
            <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-[6px]">
              Gender *
            </label>
            <select
              className={`input-field ${errors.gender ? 'error' : ''}`}
              value={personalData.gender}
              onChange={(e) => {
                setPersonalData({ gender: e.target.value });
                if (errors.gender) setErrors({ ...errors, gender: undefined });
              }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-[#dc2626] text-xs mt-1">{errors.gender}</p>}
          </div>

          <div className="border-b border-[#e5e7eb] pb-5">
            <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-[6px]">
              <svg className="inline-block w-3.5 h-3.5 mr-1.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Phone Number *
            </label>
            <input
              type="tel"
              className={`input-field ${errors.phoneNumber ? 'error' : ''}`}
              placeholder="Enter 10-digit phone number"
              value={personalData.phoneNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                setPersonalData({ phoneNumber: value });
                if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: undefined });
              }}
            />
            {errors.phoneNumber && <p className="text-[#dc2626] text-xs mt-1">{errors.phoneNumber}</p>}
          </div>

          <div className="border-b border-[#e5e7eb] pb-5">
            <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-[6px]">
              <svg className="inline-block w-3.5 h-3.5 mr-1.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home Address *
            </label>
            <textarea
              className={`textarea-field ${errors.homeAddress ? 'error' : ''}`}
              placeholder="Enter your home address"
              value={personalData.homeAddress}
              onChange={(e) => {
                setPersonalData({ homeAddress: e.target.value });
                if (errors.homeAddress) setErrors({ ...errors, homeAddress: undefined });
              }}
            />
            {errors.homeAddress && <p className="text-[#dc2626] text-xs mt-1">{errors.homeAddress}</p>}
          </div>

          <button
            onClick={handleNext}
            className="w-full h-[52px] bg-dark text-white uppercase font-bold tracking-wider rounded-lg hover:bg-gold hover:text-black transition-all duration-300 mt-4"
          >
            Next
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

export default PersonalDetailsScreen;
