'use client'
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="py-6 md:py-8 border-b border-border/30">
      <div className="premium-container">
        <div className="flex flex-col items-center text-center ">
          {/* Artist Name / Logo */}
          <Link href="/" className="group">
            <h1 className="font-serif text-4xl md:text-5xl font-light tracking-tight premium-hover">
              Aleksander Lukianczuk
            </h1>
            <div className="elegant-divider opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2"></div>
          </Link>

          {/* Navigation Links */}
          <nav className=" flex items-center space-x-8 lg:space-x-12 text-sm font-light tracking-[0.15em] uppercase">
            <Link href="/" className={`relative group transition-colors duration-300 ${
              pathname === '/' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}>
              <span>Home</span>
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-premium-gold transition-all duration-300 ${
                pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link href="/originals" className={`relative group transition-colors duration-300 ${
              pathname === '/originals' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}>
              <span>Originals</span>
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-premium-gold transition-all duration-300 ${
                pathname === '/originals' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link href="/author" className={`relative group transition-colors duration-300 ${
              pathname === '/author' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}>
              <span>Artist</span>
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-premium-gold transition-all duration-300 ${
                pathname === '/author' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link href="/terms" className={`relative group transition-colors duration-300 ${
              pathname === '/terms' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}>
              <span>Terms</span>
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-premium-gold transition-all duration-300 ${
                pathname === '/terms' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
