import React from 'react'
import { Button } from './ui/button';
import { MenubarDemo } from './menubar';

const Navbar = () => {
  return (
    <>
<nav className='flex justify-between items-center bg-[#FAEBEA] border border-black rounded-full w-full h-[100px] sticky top-0 z-10'>            <img className='h-[100px] w-[200px] m-6' src='/image.png' ></img>
      <MenubarDemo/>
    <Button className='m-6'  variant='outline'>Login</Button>
    </nav>

    </>
    
  )
}

export default Navbar;
