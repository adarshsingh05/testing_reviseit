import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-[#FAEBEA]">
      <Navbar />
      <div className="bg-[#FAEBEA] h-[100%] flex flex-col items-center justify-center">
        <div className=" p-6  max-w-[100%] md:max-w-[80%] flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          {/* Left Section (Text) */}
          <div className="text-left space-y-4 md:max-w-sm m-6">
            <span className="bg-black h-5 text-white px-4 py-1 rounded-full text-s font-bold uppercase tracking-wide">
              All for Free
            </span>
            <h1 className="text-5xl font-extrabold leading-tight text-gray-900 ">
              Exam Papers, Subject wise Notes, Mock Papers and a Lot more
            </h1>
            <p className="text-sm text-gray-600">Crafted By</p>
            <p className="text-lg font-bold text-gray-900">
              Open Source Contributors
            </p>
            <Button className='m-3'>Upload Papers</Button>
            <Button className='m-3'>Download Papers</Button>
          </div>

          {/* Right Section (Image) */}
          <div className="flex-shrink-0 m-7 bg-white rounded-full">
            {/* Add your image here */}
            <img
              src="/image 21.png"
              alt="Illustrations"
              className="w-full h-auto object-cover m-8 "
            />
          </div>
        </div>
        {/* section 02 */}
        <div>hi there</div>
      </div>
      {/* </main> */}
    </div>
  );
};

export default LandingPage;
