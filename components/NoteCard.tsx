'use client';

import type { Note } from '@/lib/notes';
import { categoryColors } from '@/lib/notes';
import { FileText, Star } from 'lucide-react';
import { useState } from 'react';

interface NoteCardProps {
  note: Note;
  onClick?: () => void;
}

export default function NoteCard({ note, onClick }: NoteCardProps) {
  const [isFavorite, setIsFavorite] = useState(note.isFavorite);
  const colors = categoryColors[note.category];

  // Strip HTML tags for preview
  const plainTextDescription = note.description.replace(/<[^>]+>/g, '').trim();
  const shortPreview = plainTextDescription.slice(0, 60) + (plainTextDescription.length > 60 ? '...' : '');

  return (
    <div 
      onClick={onClick}
      className="group flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors rounded-sm"
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        <FileText className="w-4 h-4 text-gray-400 dark:text-gray-500" />
      </div>

      {/* Title */}
      <div className="flex-1 min-w-0 flex items-center gap-2">
        <span className="text-sm text-gray-900 dark:text-gray-100 truncate font-normal">
          {note.title || 'Untitled'}
        </span>
        {shortPreview && (
          <span className="text-xs text-gray-400 dark:text-gray-500 truncate hidden md:block">
            {shortPreview}
          </span>
        )}
      </div>

      {/* Metadata */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Category Tag */}
        <span className={`text-xs px-2 py-0.5 rounded ${colors.accent} opacity-70`}>
          {note.category}
        </span>

        {/* Timestamp */}
        <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block min-w-[70px] text-right">
          {note.timestamp}
        </span>

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
        >
          <Star 
            className={`w-3.5 h-3.5 ${isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400 dark:text-gray-500'}`}
          />
        </button>
      </div>
    </div>
  );
}
