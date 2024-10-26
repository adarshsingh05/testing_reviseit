import React from 'react'
import ReactTypingEffect from "react-typing-effect";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from 'react-router-dom';

const Motivation = () => {
  return (
    <div id='res' className='bg-gradient-to-t from-[#d9b8de] to-white  w-full border border-md rounded-md h-auto text-center text-4xl font-mono mt-5'>
      <h1 className='mt-4'> 
        <ReactTypingEffect
          text="Explore all Other Resources"
          speed={45} // typing speed
          eraseSpeed={60}        // Erase speed (faster)
          eraseDelay={400}      // Delay before erasing starts
          typingDelay={50}  // delay before erasing
        />
      </h1>

      <div className='flex flex-col md:flex-row justify-around items-center md:items-stretch'>
        <Card className="w-[90%] md:w-[400px] h-auto shadow-lg shadow-purple-400 m-6">
          <CardHeader>
            <CardTitle className="text-sm">CS Fundamentals Exam Notes</CardTitle>
            <CardDescription className='mt-4'>
              From Database Management, Operating System, OOPs to Computer Network complete handwritten Exam ready Notes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to='/csfundamentals'>
            <Button>Explore</Button>
            </Link>
          </CardContent>
            <p className='text-center text-gray-[300] text-sm mb-2'>No Login Required</p>
        </Card>

        <Card className="w-[90%] md:w-[400px] h-auto shadow-lg shadow-purple-400 m-6">
          <CardHeader>
            <CardTitle className="text-sm">Have some Good Stuff, means study materials? 👀</CardTitle>
            <CardDescription className='mt-4'>
Upload study materials, important questions, etc.. you have tag wise and help others learning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Explore</Button>
          </CardContent>

        </Card>

        <Card className="w-[90%] md:w-[400px] h-auto shadow-lg shadow-purple-400 m-6">
          <CardHeader>
            <CardTitle className="text-sm">A night Before Exam?</CardTitle>
            <CardDescription className='mt-4'>
              Study what you need just before your University Exams, get what you need materials subject-wise.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Explore</Button>
            
          </CardContent>
               <p className='text-center text-gray-[300] text-sm mb-2'>No Login Required</p>
         

        </Card>
      </div>
    </div>
  )
}

export default Motivation;
