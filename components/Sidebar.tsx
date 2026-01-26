'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onNewNote?: () => void;
}

export default function Sidebar({ selectedCategory, onCategoryChange, onNewNote }: SidebarProps) {
  const { user } = useAuth();
  const router = useRouter();

  const handleNewNote = () => {
    if (!user) {
      toast.error('Please sign in to create a new note');
      return;
    }
    if (onNewNote) {
      onNewNote();
    }
  };

  const categories: Array<{ name: string; color: string; icon: React.ReactNode }> = [
    { 
      name: 'Work', 
      color: 'bg-(--color-work-accent)',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: 'Personal', 
      color: 'bg-(--color-personal-accent)',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    { 
      name: 'Ideas', 
      color: 'bg-(--color-ideas-accent)',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    { 
      name: 'Projects', 
      color: 'bg-(--color-projects-accent)',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      )
    },
    { 
      name: 'Education', 
      color: 'bg-(--color-education-accent)',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    },
    { 
      name: 'Finance', 
      color: 'bg-(--color-finance-accent)',
      icon: (
       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      name: 'Travel', 
      color: 'bg-(--color-travel-accent)',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <aside className="w-64 bg-(--color-sidebar-bg) flex flex-col h-screen font-sans border-r border-gray-100">
      {/* Logo */}
      <div className="pt-8 pb-8 px-6">
        <div className="flex items-center gap-3 mb-1">
          <svg className="w-8 h-8 text-(--color-text-primary)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            <path d="M5 7h2" strokeLinecap="round" />
            <path d="M5 11h2" strokeLinecap="round" />
            <path d="M5 15h2" strokeLinecap="round" />
          </svg>
          <h1 className="heading-serif text-3xl text-(--color-text-primary)">
            Sirius
          </h1>
        </div>
        <p className="text-xs text-(--color-text-tertiary) pl-1">Where colorful ideas find their home</p>
      </div>

      {/* New Note Button */}
      <div className="px-6 mb-8">
        <button 
          onClick={handleNewNote}
          className="w-full bg-[#1C1C1C] text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:bg-black transition-all shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="font-medium text-[15px]">New Note</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto space-y-1">
        {/* All Notes */}
        <button
          onClick={() => onCategoryChange('All')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            selectedCategory === 'All'
              ? 'bg-gray-100 text-(--color-text-primary)'
              : 'text-(--color-text-secondary) hover:bg-gray-50'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="text-[15px] font-medium">All</span>
        </button>

        {/* Starred */}
        <button
          onClick={() => onCategoryChange('Starred')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            selectedCategory === 'Starred'
              ? 'bg-gray-100 text-(--color-text-primary)'
              : 'text-(--color-text-secondary) hover:bg-gray-50'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <span className="text-[15px] font-medium">Starred</span>
        </button>

        <div className="my-4 border-t border-gray-100 mx-4"></div>

        {/* Categories */}
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors group ${
              selectedCategory === category.name
                ? 'bg-gray-100 text-(--color-text-primary)'
                : 'text-(--color-text-secondary) hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={selectedCategory === category.name ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}>
                {category.icon}
              </span>
              <span className="text-[15px] font-medium">{category.name}</span>
            </div>
            <span className={`w-2.5 h-2.5 rounded-full ${category.color}`}></span>
          </button>
        ))}
      </nav>
    </aside>
  );
}