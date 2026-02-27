import React from 'react'
import { IoLogoInstagram } from "react-icons/io";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='text-center text-md font-semibold text-gray-600'>
        Desgined with love by Rohit Singh
        <p>follow me on:</p>
        <div className='flex flex-col justify-center gap-1'>
            <div className='border flex items-center justify-center gap-3.5'>
            <a href="https://instagram.com/rohitsinghwho"><IoLogoInstagram size={30}/></a>
            <a href='https://github.com/rohitsinghwho'><FaGithub  size={30}/></a>
            </div>
        </div>
    </footer>
  )
}

export default Footer;