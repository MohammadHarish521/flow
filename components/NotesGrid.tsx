'use client';

import type { Note } from '@/lib/notes';
import NoteCard from './NoteCard';

interface NotesGridProps {
  notes: Note[];
  onNoteClick?: (note: Note) => void;
}

export default function NotesGrid({ notes, onNoteClick }: NotesGridProps) {
  return (
    <div className="max-w-5xl mx-auto px-8 py-6">
      <div className="bg-white dark:bg-(--sidebar-bg) rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
        {notes.length === 0 ? (
          <div className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
            <p>No notes yet. Create your first note to get started.</p>
          </div>
        ) : (
          notes.map((note) => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onClick={() => onNoteClick?.(note)}
            />
          ))
        )}
      </div>
    </div>
  );
}