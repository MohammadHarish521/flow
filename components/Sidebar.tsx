'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import toast from 'react-hot-toast';
import type { Category } from '@/lib/mockData';

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function Sidebar({ selectedCategory, onCategoryChange }: SidebarProps) {
  const { user } = useAuth();
  const router = useRouter();

  const handleNewNote = () => {
    if (!user) {
      toast.error('Please sign in to create a new note');
      router.push('/login');
      return;
    }
    // TODO: Implement new note creation
    toast.success('New note feature coming soon!');
  };

  const categories: Array<{ name: string; color: string }> = [
    { name: 'All', color: '' },
    { name: 'Starred', color: '' },
    { name: 'Work', color: 'bg-(--color-work-accent)' },
    { name: 'Personal', color: 'bg-(--color-personal-accent)' },
    { name: 'Ideas', color: 'bg-(--color-ideas-accent)' },
    { name: 'Projects', color: 'bg-(--color-projects-accent)' },
    { name: 'Education', color: 'bg-(--color-education-accent)' },
    { name: 'Finance', color: 'bg-(--color-finance-accent)' },
    { name: 'Travel', color: 'bg-(--color-travel-accent)' }
  ];

  return (
    <aside className="w-64 bg-(--color-sidebar-bg) border-r border-gray-200 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="mb-1">
          <h1 className="text-2xl font-bold tracking-tight text-(--color-text-primary)" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
            Slate
          </h1>
        </div>
        <p className="text-xs text-(--color-text-tertiary)">Where colorful ideas find their home</p>
      </div>

      {/* New Note Button */}
      <div className="p-4">
        <button 
          onClick={handleNewNote}
          className="w-full bg-(--color-text-primary) text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <span className="text-lg">+</span>
          <span className="font-medium">New Note</span>
        </button>
      </div>

      {/* Categories */}
      <nav className="flex-1 px-4 overflow-y-auto">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
              selectedCategory === category.name
                ? 'bg-gray-100 text-(--color-text-primary)'
                : 'text-(--color-text-secondary) hover:bg-gray-50'
            }`}
          >
            {category.color && (
              <span className={`w-2 h-2 rounded-full ${category.color}`}></span>
            )}
            {!category.color && category.name === 'Starred' && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            )}
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}