import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <header className="py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Artist Name / Logo */}
          <Link href="/" className="font-serif text-4xl font-bold tracking-wider mb-6">
            No Taboo Paintings
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-6 md:space-x-8 text-sm uppercase tracking-widest">
            <Link href="/originals" className="text-muted-foreground hover:text-foreground transition-colors">
              Originals
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
