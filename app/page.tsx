'use client';

import Header from '@/components/Header';
import NoteModal from '@/components/NoteModal';
import NotesGrid from '@/components/NotesGrid';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/lib/auth-context';
import { mockNotes } from '@/lib/mock-data';
import { mapNoteRowToNote, type Note, type NoteRow } from '@/lib/notes';
import { createClient } from '@/lib/supabase/client';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [notes, setNotes] = useState<Note[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [notesError, setNotesError] = useState<string | null>(null);
  const [isNewNoteModalOpen, setIsNewNoteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined);
  const { user, loading: authLoading } = useAuth();

  const filteredNotes = useMemo(() => {
    if (selectedCategory === 'All') return notes;
    if (selectedCategory === 'Starred') return notes.filter(note => note.isFavorite);
    return notes.filter(note => note.category === selectedCategory);
  }, [notes, selectedCategory]);

  const loadNotes = useCallback(async () => {
    if (!user) return;
    
    const supabase = createClient();
    setLoadingNotes(true);
    setNotesError(null);

    const { data, error } = await supabase
      .from('notes')
      .select('id, category, title, description, created_at, is_favorite')
      .order('created_at', { ascending: false });

    if (error) {
      setNotesError(error.message);
      setNotes([]);
      setLoadingNotes(false);
      return;
    }

    const mappedNotes = (data as NoteRow[]).map(mapNoteRowToNote);
    setNotes(mappedNotes);
    setLoadingNotes(false);
  }, [user]);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setNotes(mockNotes);
      setLoadingNotes(false);
      setNotesError(null);
      return;
    }

    loadNotes();
  }, [authLoading, user, loadNotes]);

  const handleNoteCreated = () => {
    loadNotes();
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(n => n.id !== noteId));
  };

  return (
    <div className="flex h-screen bg-(--color-background)">
      <Sidebar 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory}
        onNewNote={() => {
          setSelectedNote(undefined);
          setIsNewNoteModalOpen(true);
        }}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {notesError && (
            <div className="p-6 text-red-600">
              {notesError}
            </div>
          )}
          {loadingNotes && (
            <div className="p-6 text-(--color-text-secondary)">
              Loading notes...
            </div>
          )}
          {!loadingNotes && !notesError && (
            <NotesGrid 
              notes={filteredNotes} 
              onNoteClick={(note) => {
                setSelectedNote(note);
                setIsNewNoteModalOpen(true);
              }}
            />
          )}
        </main>
      </div>

      {/* Note Modal (Create & Edit) */}
      <NoteModal
        isOpen={isNewNoteModalOpen}
        onClose={() => setIsNewNoteModalOpen(false)}
        onNoteSaved={handleNoteCreated}
        note={selectedNote}
        onDelete={handleDeleteNote}
      />
    </div>
  );
}