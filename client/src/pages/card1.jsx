import Navbar from '@/components/Navbar';
import React from 'react';

const SubjectsPage = () => {
  return (
    <div>
        <Navbar/>
    <div className="flex flex-col items-center bg-white p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Main Title */}
      <div className="bg-[#de7773] shadow-md shadow-gray-500 border border-black rounded-lg px-6 py-2 sm:px-8 sm:py-3 md:px-10 md:py-4 text-center font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
        Computer Science Fundamentals/Core Subjects
      </div>

      {/* Connecting Line */}
      <div className="h-4 sm:h-11 border-l-4 border-black mt-2 w-6 sm:w-8"></div>
      <div className='w-[90%] border-2 border-black mt-2'></div>
      <div className='flex flex-row justify-between w-[90%]'>
      <div className="hidden sm:block h-4 sm:h-11 border-l-2 border-black mt-2 w-6 sm:w-8 ml-6"></div>      
      <div className="h-4 sm:h-11 border-l-2 border-black mt-2 w-6 sm:w-8 ml-3"></div>
      <div className="hidden sm:block h-4 sm:h-11 border-l-2 border-black mt-2 w-6 sm:w-8 "></div>      
      <div className="h-4 sm:h-11 border-l-2 border-black mt-2 w-6 sm:w-8 mr-14"></div>
     
      </div>

      {/* Subject Boxes */}
      <div className="flex flex-wrap justify-around w-full mt-4 ">
        {['Operating System', 'Object Oriented Programming', 'Computer Networks', 'Database Management'].map((subject, index) => (
          <div key={index} className="flex flex-col items-center space-y-1 sm:space-y-2 mx-2 ">
            {/* Subject Box */}
            <div className="border border-black rounded-lg px-6 bg-purple-300  py-2 sm:px-8 sm:py-3 text-center text-xs sm:text-sm md:text-base shadow-md shadow-gray-500 hover:shadow-none cursor-pointer">
              {subject}
            </div>
            {/* Vertical Line */}
            <div className="h-4 sm:h-6 border-l-2 border-black"></div>
            {/* Semester Diamond */}
            <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 border border-black transform rotate-45">
              <span className="transform -rotate-45 font-semibold text-xs sm:text-sm md:text-base">
                {subject === 'Object Oriented Programming' ? 'SEM 02' : 'SEM 05'}
              </span>
            </div>
            {/* Connecting Line */}
            <div className="h-4 sm:h-6 border-l-2 border-black"></div>
            {/* Links with connecting vertical lines */}
            <div className="flex flex-col items-center space-y-1 mt-1 sm:mt-2">
              {['Notes', 'PYQ', 'Interview Questions', 'Practice Problems'].map((link, linkIndex) => (
                <React.Fragment key={linkIndex}>
                  <div
                    className="bg-white border border-black px-1 py-1 sm:px-2 sm:py-1 text-center text-xs sm:text-sm font-semibold"
                  >
                    {link}
                  </div>
                  {/* Vertical connecting line between each link except the last one */}
                  {linkIndex < 3 && (
                    <div className="h-4 sm:h-6 border-l-2 border-black"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SubjectsPage;
