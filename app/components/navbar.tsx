import Link from 'next/link';
import { ModeToggle } from './ModeToggle';

export default function Navbar() {
  return (
    // navbar.tsx
    <nav className="w-full relative flex items-center justify-between px-20 py-5">
      <div className="flex items-center">
        <a href="/" className="flex items-center font-bold text-3xl">
          <img src="\logo-immunifai.png" alt="Logo" className="logo-small" style={{ width: '75px', height: '75px' }} />
          <span className="ml-2 text-xl font-semibold">Immunifai</span>
        </a>
        <Link href="/" className="ml-4 responsive-nav">AI Recipes</Link>
<Link href="/" className="ml-4 responsive-nav">Community Recipes</Link>
<Link href="/" className="ml-4 responsive-nav">AI Assistant</Link>
<Link href="/" className="ml-4 responsive-nav">Food Scanner</Link>
      </div>
      <ModeToggle />
    </nav>
  );
}
