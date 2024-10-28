import Navbar from '@/components/Navbar';
import React from 'react';

const SubjectsPage = () => {
  const handleRedirect = (link, subject) => {
    if (subject === 'Operating System' && link === 'Complete Notes') {
      window.location.href = 'https://sriindu.ac.in/wp-content/uploads/2023/10/R20CSE2202-OPERATING-SYSTEMS.pdf';
    }
    if (subject === 'Computer Networks' && link === 'Complete Notes') {
      window.location.href = 'https://kanchiuniv.ac.in/coursematerials/VINODKUMAR_COMPUTER_NETWORKS.pdf';
    }
    if (subject === 'Object Oriented Programming' && link === 'Complete Notes') {
      window.location.href = 'http://www.gploharu.ac.in/wp-content/uploads/2020/04/oopj_notes.pdf';
    }
    if (subject === 'Database Management' && link === 'Complete Notes') {
      window.location.href = 'https://sircrrengg.ac.in/images/CSEMATERIALS/R19_DBMS_MATERIAL.pdf';
    }
    if (subject === 'Operating System' && link === 'Lectures') {
      window.location.href = 'https://www.youtube.com/watch?v=xw_OuOhjauw&list=PLmXKhU9FNesSFvj6gASuWmQd23Ul5omtD';
    }
    if (subject === 'Computer Networks' && link === 'Lectures') {
      window.location.href = 'https://www.youtube.com/watch?v=q3Z3Qa1UNBA';
    }
    if (subject === 'Object Oriented Programming' && link === 'Lectures') {
      window.location.href = 'https://www.youtube.com/watch?v=5NQjLBuNL0I&t=18s';
    }
    if (subject === 'Database Management' && link === 'Lectures') {
      window.location.href = 'https://www.youtube.com/watch?v=YRnjGeQbsHQ';
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="flex flex-col items-center bg-[linear-gradient(to_right,_#f8f9fa,_#d7cce5)] p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="bg-[#de7773] shadow-md shadow-gray-500 border border-black rounded-lg px-6 py-2 sm:px-8 sm:py-3 md:px-10 md:py-4 text-center font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
          Computer Science Fundamentals/Core Subjects
        </div>
        
        <div className="h-4 sm:h-11 border-l-4 border-black mt-2 w-6 sm:w-8"></div>
        <div className='w-[90%] border-2 border-black mt-2'></div>
        <div className='flex flex-row justify-between w-[90%]'>
          <div className="hidden sm:block h-4 sm:h-11 border-l-2 border-black mt-2 w-6 sm:w-8 ml-6"></div>
          <div className="h-4 sm:h-11 border-l-2 border-black mt-2 w-6 sm:w-8 ml-3"></div>
          <div className="hidden sm:block h-4 sm:h-11 border-l-2 border-black mt-2 w-6 sm:w-8 "></div>
          <div className="h-4 sm:h-11 border-l-2 border-black mt-2 w-6 sm:w-8 mr-14"></div>
        </div>

        <div className="flex flex-wrap justify-around w-full mt-4">
          {['Operating System', 'Object Oriented Programming', 'Computer Networks', 'Database Management'].map((subject, index) => (
            <div key={index} className="flex flex-col items-center space-y-1 sm:space-y-2 mx-2">
              <div className="border border-black rounded-lg px-6 bg-purple-300 py-2 sm:px-8 sm:py-3 text-center text-xs sm:text-sm md:text-base shadow-md shadow-gray-500 hover:shadow-none cursor-pointer">
                {subject}
              </div>
              <div className="h-4 sm:h-6 border-l-2 border-black py-2"></div>
              <div className="h-4 sm:h-1"></div>

              <div className="bg-[#D8BFD8] flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 border border-black transform rotate-45">
                <span className="transform -rotate-45 font-semibold text-xs sm:text-sm md:text-base">
                  {subject === 'Object Oriented Programming' ? 'SEM 02' : 'SEM 05'}
                </span>
              </div>
              <div className="h-2 sm:h-1"></div>
              <div className="h-4 sm:h-6 border-l-2 border-black py-4"></div>
              
              <div className="flex flex-col items-center space-y-1 mt-1 sm:mt-2">
                {['Complete Notes', 'Lectures', 'Interview Questions', 'Practice Problems'].map((link, linkIndex) => (
                  <React.Fragment key={linkIndex}>
                    <div
                      onClick={() => handleRedirect(link, subject)}
                      className="bg-white border border-black rounded-sm px-1 py-1 sm:px-2 sm:py-1 text-center text-s sm:text-lg font-semibold hover:bg-blue-300 cursor-pointer shadow-md shadow-[#de7773]"
                    >
                      {link}
                    </div>
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
