import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-dark h-16 px-8 flex items-center justify-between fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-[38px] h-[38px] rounded-full bg-gold flex items-center justify-center">
          <span className="text-dark font-bold text-lg">E</span>
        </div>
        <span className="text-gold font-bold text-xl">EduEnroll</span>
      </div>
      <div className="text-[#9ca3af] uppercase text-[11px] tracking-[0.2em] font-medium">
        Student Enrollment Portal
      </div>
    </nav>
  );
};

export default Navbar;
