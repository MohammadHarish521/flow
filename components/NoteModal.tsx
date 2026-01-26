import { categories, categoryColors, type Category, type Note } from '@/lib/notes';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNoteSaved: () => void;
  note?: Note;
  onDelete?: (noteId: string) => void;
}

export default function NoteModal({ isOpen, onClose, onNoteSaved, note, onDelete }: NoteModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('Ideas');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (note) {
        setTitle(note.title);
        setDescription(note.description);
        setCategory(note.category);
      } else {
        setTitle('');
        setDescription('');
        setCategory('Ideas');
      }
    }
  }, [isOpen, note]);

  // Helper to get raw color variable name for inline styles if needed, 
  // or just use the mapped classes.
  // We can construct the bg class from the map since we renamed them consistently?
  // Actually, let's just make a quick map here or use the one from lib.
  // The lib has `accent: 'text-(--color-work-accent)'`.
  // We want `bg-(--color-work-accent)`.
  
  const getCategoryColor = (cat: Category) => {
     // Extract the variable name from the accent string in categoryColors
     // e.g. "text-(--color-work-accent)" -> "(--color-work-accent)"
     const accentClass = categoryColors[cat].accent;
     const variable = accentClass.replace('text-', ''); // "(--color-work-accent)"
     return `bg-${variable}`;
  };

  const getBorderColor = (cat: Category) => {
     const accentClass = categoryColors[cat].accent;
     return accentClass.replace('text', 'border');
  };
  
  const getRingColor = (cat: Category) => {
     const accentClass = categoryColors[cat].accent;
     return accentClass.replace('text', 'focus:ring');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const noteData = {
        title: title.trim(),
        description: description.trim(),
        category,
        is_favorite: note ? note.isFavorite : false,
      };

      if (user) {
        if (note) {
          const { error } = await supabase.from('notes').update(noteData).eq('id', note.id);
          if (error) throw error;
          toast.success('Note updated!');
        } else {
          const { error } = await supabase.from('notes').insert({ user_id: user.id, ...noteData });
          if (error) throw error;
          toast.success('Note created!');
        }
      } else {
        toast.success(note ? 'Note updated (local)!' : 'Note created (local)!');
      }
      onNoteSaved();
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save note');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!note || !onDelete) return;
    if (confirm('Are you sure you want to delete this note?')) {
      setLoading(true);
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { error } = await supabase.from('notes').delete().eq('id', note.id);
          if (error) throw error;
        }
        onDelete(note.id);
        toast.success('Note deleted!');
        onClose();
      } catch (error: any) {
        toast.error(error.message || 'Failed to delete note');
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="heading-serif text-3xl text-gray-900">
            {note ? 'Edit Note' : 'Create New Note'}
          </h2>
          <button onClick={onClose} type="button" className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label htmlFor="note-title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              id="note-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 ${getRingColor(category)}`}
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="grid grid-cols-4 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                    category === cat
                      ? `${getCategoryColor(cat)} text-white border-transparent shadow-md`
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="note-description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              id="note-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your note content here..."
              rows={5}
              className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 resize-none font-sans ${getRingColor(category)}`}
            />
          </div>

          <div className="flex gap-3 pt-2">
            {note && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-3 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors disabled:opacity-50"
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-4 py-3 text-sm font-medium text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:opacity-90 ${getCategoryColor(category)}`}
            >
              {loading ? 'Saving...' : (note ? 'Save Changes' : 'Create Note')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
