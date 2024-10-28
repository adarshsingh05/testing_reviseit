import Footer from '@/components/footer'
import React from 'react'

const SignUp = () => {
  return (
    <>
    
    <div className='w-full h-screen bg-black flex items-center justify-center'>
        <div className='h-[90%] w-[50%] bg-white/10 backdrop-blur-lg shadow-lg shadow-white rounded-lg '>
        <div className='text-center text-4xl mt-6 text-white font-mono'> Welcome to ReviseIt...</div>
      <div className=' flex flex-row justify-between items-center p-4'>
        <div>ho</div>
        <img className='h-[400px] w-[400px]' src='/signupbg.png' alt='Signup Background' />
      </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default SignUp
