import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="flex flex-col sm:flex-row items-center justify-center sm:justify-between px-5">
      <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
        <a href="/" className="flex items-center font-bold text-3xl">
          <img src="\logo-immunifai.png" alt="Logo" className="logo-small w-16 h-16" />
          <span className="text-xl font-semibold">
            <span className="text-black">Immunifai </span>
            <span className="text-green-500">Blog</span>
          </span>
        </a >
      </div>
      
      <div className='flex justify-center space-x-2 text-sm sm:text-sm font-inter font-normal'>
  <Link href="/" className="text-black hover:text-green-500 border-r border-black pr-2 pl-2 sm:border-0">AI Recipes</Link>
  <Link href="/" className="text-black hover:text-green-500 border-r border-black pr-2 pl-2 sm:border-0">Community Recipes</Link>
  <Link href="/" className="text-black hover:text-green-500 border-r border-black pr-2 pl-2 sm:border-0 sm:block hidden">AI Assistant</Link>
  <Link href="/" className="text-black hover:text-green-500 pr-2 pl-2 sm:border-0">More</Link>
</div>
    </nav>
  );
}

