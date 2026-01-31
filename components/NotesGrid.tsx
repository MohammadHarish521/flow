'use client';

import type { Note } from '@/lib/notes';
import NoteCard from './NoteCard';

interface NotesGridProps {
  notes: Note[];
  onNoteClick?: (note: Note) => void;
}

export default function NotesGrid({ notes, onNoteClick }: NotesGridProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-4">
      {notes.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">No notes yet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Create your first note to get started</p>
          </div>
        </div>
      ) : (
        <div className="space-y-0.5">
          {notes.map((note) => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onClick={() => onNoteClick?.(note)}
            />
          ))}
        </div>
      )}
    </div>
  );
}