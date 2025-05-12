"use client";

import Link from 'next/link';
import React, { useState } from 'react'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white md:rounded-3xl relative">
    <div className="mx-auto flex h-16 md:h-22 max-w-screen-xl items-center gap-2 md:gap-4 px-3 sm:px-4 md:px-6 lg:px-8">
      <Link className="block text-blue-600" href="/">
        <span className="sr-only">Home</span>
        <img className="w-44 sm:w-32 md:w-40 lg:w-[200px]" src="/logo.svg" alt="Logo" />
      </Link>

      <div className="flex flex-1 items-center justify-end md:justify-center sm:justify-end">
      <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-4 lg:gap-10 text-[14px] lg:text-[16px] font-medium">
            <li>
              <Link className="text-black transition hover:text-blue-600" href="/merge-pdf"> Merge PDF </Link>
            </li>
  
            <li>
              <Link  className="text-black transition hover:text-blue-600" href="/split-pdf"> Split PDF </Link>
            </li>
  
            <li>
              <Link  className="text-black transition hover:text-blue-600" href="/image-to-pdf"> Image to PDF </Link>
            </li>
  
            <li>
              <Link  className="text-black transition hover:text-blue-600" href="/pdf-to-jpg"> PDF to JPG </Link>
            </li>
  
            <li>
              <Link className="text-black transition hover:text-blue-600" href="/powerpoint-to-pdf"> PPT to PDF </Link>
            </li>
            <li>
              <Link className="text-black transition hover:text-blue-600" href="/word-to-pdf"> Word to PDF </Link>
            </li>
          </ul>
        </nav>
  
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={toggleMobileMenu}
            className="block rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md rounded-b-lg border-t border-gray-200 z-20">
          <nav aria-label="Mobile" className="px-3 py-3 sm:px-4 sm:py-4">
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base font-medium">
              <li><Link className="block rounded px-3 py-2 text-black transition hover:bg-gray-100 hover:text-[#5cacb3]" href="/merge-pdf"> Merge PDF </Link></li>
              <li><Link className="block rounded px-3 py-2 text-black transition hover:bg-gray-100 hover:text-[#5cacb3]" href="/split-pdf"> Split PDF </Link></li>
              <li><Link className="block rounded px-3 py-2 text-black transition hover:bg-gray-100 hover:text-[#5cacb3]" href="/image-to-pdf"> Image to PDF </Link></li>
              <li><Link className="block rounded px-3 py-2 text-black transition hover:bg-gray-100 hover:text-[#5cacb3]" href="/pdf-to-jpg"> PDF to JPG </Link></li>
              <li><Link className="block rounded px-3 py-2 text-black transition hover:bg-gray-100 hover:text-[#5cacb3]" href="/powerpoint-to-pdf"> PPT to PDF </Link></li>
              <li><Link className="block rounded px-3 py-2 text-black transition hover:bg-gray-100 hover:text-[#5cacb3]" href="/word-to-pdf"> Word to PDF </Link></li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  </header>
  )
}

export default Header
