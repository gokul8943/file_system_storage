'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { File } from 'lucide-react';
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  const handleNavigate = () => {
    router.push('/sign-in');
  };

  return (
    <div className="bg-white/5 z-10 fixed top-0 left-0 w-full p-3 border border-b-2">
      <nav className="flex justify-between items-center">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <File />
            <h2 className="text-slate-700 text-2xl font-bold ">File System</h2>
          </Link>
        </div>

        {isLoggedIn ? (
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
            <User className="w-5 h-5 text-gray-600" />
          </div>
        ) : (
          <div>
            <Button
              onClick={handleNavigate}
              className="bg-gradient-to-r from-slate-400 to-black font-bold"
            >
              Login
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
