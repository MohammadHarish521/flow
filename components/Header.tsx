'use client';

import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface HeaderProps {
  onOpenSidebar?: () => void;
}

export default function Header({ onOpenSidebar }: HeaderProps) {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    router.refresh();
  };

  return (
    <header className="bg-white px-8 pt-8 pb-6">
      {/* Top Row: Title & Auth */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button 
            onClick={onOpenSidebar}
            className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <svg className="w-8 h-8 text-(--color-text-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h1 className="heading-serif text-4xl text-(--color-text-primary)">All</h1>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={handleSignOut}
              className="group flex items-center justify-center w-10 h-10 rounded-full bg-black text-white hover:w-24 hover:bg-red-500 transition-all duration-300 ease-in-out relative overflow-hidden shadow-sm"
              title="Sign Out"
            >
              <svg 
                className="w-5 h-5 absolute transition-all duration-300 group-hover:opacity-0 group-hover:scale-50" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm font-medium opacity-0 group-hover:opacity-100 absolute transition-all duration-300 scale-50 group-hover:scale-100 whitespace-nowrap">
                Logout
              </span>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm text-white bg-black hover:bg-gray-800 rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row: Search & Actions */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full pl-12 pr-24 py-3 bg-gray-50 border border-gray-100 rounded-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition-all shadow-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium px-2 py-1 bg-white rounded border border-gray-200 shadow-sm">
            / to Focus
          </div>
        </div>

        {/* Action Buttons */}
        <button className="w-11 h-11 rounded-full bg-black hover:bg-gray-800 flex items-center justify-center transition-colors shadow-sm group">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
        <button className="w-11 h-11 rounded-full bg-black hover:bg-gray-800 flex items-center justify-center transition-colors shadow-sm">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
        </button>
      </div>
    </header>
  );
}