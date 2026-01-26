'use client';

import type { Note } from '@/lib/notes';
import NoteCard from './NoteCard';

interface NotesGridProps {
  notes: Note[];
  onNoteClick?: (note: Note) => void;
}

export default function NotesGrid({ notes, onNoteClick }: NotesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
      {notes.map((note) => (
        <NoteCard 
          key={note.id} 
          note={note} 
          onClick={() => onNoteClick?.(note)}
        />
      ))}
    </div>
  );
}