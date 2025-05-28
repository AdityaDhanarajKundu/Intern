import React,{useState} from 'react';
import Navlogo from '../assets/navIcon.png';

function Navbar({ onCreateJobClick }  ) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-white border border-[#FCFCFC] shadow-[0_0_20px_rgba(127,127,127,0.15)] rounded-[122px] max-w-[930px] mx-auto mt-6 px-4 py-2 flex items-center justify-between relative font-satoshi font-semibold text-[16px] leading-none text-center">
      {/* Logo */}
      <div className="flex flex-shrink-0 items-center">
        <img
          src={Navlogo}
          alt="Logo"
          className="w-[44px] h-[44.67px] object-contain"
        />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center space-x-4 ml-4">
        <li className="w-[102px] h-[48px] px-[11px] py-[5px] rounded-[12px] flex items-center justify-center hover:text-purple-600 cursor-pointer font-medium text-black text-sm">
          Home
        </li>
        <li className="w-[130px] h-[48px] px-[11px] py-[5px] rounded-[12px] flex items-center justify-center hover:text-purple-600 cursor-pointer font-medium text-black text-sm">
          Find Jobs
        </li>
        <li className="w-[146px] h-[48px] px-[11px] py-[5px] rounded-[12px] flex items-center justify-center hover:text-purple-600 cursor-pointer font-medium text-black text-sm">
          Find Talents
        </li>
        <li className="w-[123px] h-[48px] px-[11px] py-[5px] rounded-[12px] flex items-center justify-center hover:text-purple-600 cursor-pointer font-medium text-black text-sm">
          About us
        </li>
        <li className="w-[148px] h-[48px] px-[11px] py-[5px] rounded-[12px] flex items-center justify-center hover:text-purple-600 cursor-pointer font-medium text-black text-sm">
          Testimonials
        </li>
      </ul>

      {/* Desktop Create Button */}
      <button onClick={onCreateJobClick} className="hidden md:inline-block text-white text-sm font-medium rounded-[30px] px-6 py-2 bg-[linear-gradient(180deg,_#A128FF_0%,_#6100AD_113.79%)] cursor-pointer whitespace-nowrap">
        Create Jobs
      </button>

      {/* Mobile menu toggle */}
      <button
        className="md:hidden focus:outline-none ml-auto"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-[80px] left-4 right-4 bg-white border border-gray-200 rounded-xl shadow-md p-4 z-50 md:hidden">
          <ul className="flex flex-col space-y-4 text-gray-800 font-medium">
            <li className="hover:text-purple-600">Home</li>
            <li className="hover:text-purple-600">Find Jobs</li>
            <li className="hover:text-purple-600">Find Talents</li>
            <li className="hover:text-purple-600">About us</li>
            <li className="hover:text-purple-600">Testimonials</li>
            <li>
              <button onClick={onCreateJobClick} className="w-full bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700">
                Create Jobs
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;