import React from 'react'
import { Button } from './ui/button';
import { MenubarDemo } from './menubar';
import { CgLogIn } from "react-icons/cg";
const Navbar = () => {
  return (
    <>
<nav className='flex justify-between items-center backdrop-blur-lg bg-white/30  rounded-full w-full h-[100px] sticky top-0 z-10'>            
<img className='h-[80px] md:h-[100px] w-[100px] md:w-[200px] m-6' src='/image.png' ></img>
      <MenubarDemo/>
    <Button className='m-6 bg-[#d9d9d9] text-black font-bold border border-black' >
      <CgLogIn />
      Login</Button>
    </nav>

    </>
    
  )
}

export default Navbar;
