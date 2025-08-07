'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Cloud, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { useAuthStore } from '@/store/authStore';
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  const { authState } = useAuthStore();
  const user = authState.user

  const handleLogOut = () => {
    setIsLoggedIn(false);
    router.push('/signIn');
  }
  const handleNavigate = () => {
    router.push('/signIn');
  };

  return (
    <div className="bg-white z-10 fixed top-0 left-0 w-full p-3 border border-b-2">
      <nav className="flex justify-between items-center">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Cloud className="h-8 w-8 text-indigo-600" />
            <h2 className="text-blue-800 text-2xl font-bold ">Secure Storage</h2>
          </Link>
        </div>

        {user ? (
          <div className="px-2 py-1 bg-gray-300 rounded-full flex gap-2 items-center justify-center mr-2">
            <User className="w-5 h-5 " />
            <p className='text-gray-600'>{user.username}</p>
          </div>
        ) : (
          <div>
            <Button
              onClick={handleNavigate}
              className="bg-gradient-to-r from-blue-400 to-black font-bold"
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
