'use client';

import TipTapEditor from '@/components/TipTapEditor';
import { categories, type Category } from '@/lib/notes';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Star, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface NotePageProps {
  params: {
    id: string;
  };
}

export default function NotePage({ params }: NotePageProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Category>('Ideas');
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  useEffect(() => {
    loadNote();
  }, [params.id]);

  const loadNote = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;

      if (data) {
        setTitle(data.title || '');
        setContent(data.description || '');
        setCategory(data.category || 'Ideas');
        setIsFavorite(data.is_favorite || false);
      }
    } catch (error) {
      console.error('Error loading note:', error);
      toast.error('Failed to load note');
    } finally {
      setLoading(false);
    }
  };

  const saveNote = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('notes')
        .update({
          title: title.trim() || 'Untitled',
          description: content,
          category,
          is_favorite: isFavorite,
        })
        .eq('id', params.id);

      if (error) throw error;
      toast.success('Note saved');
    } catch (error) {
      console.error('Error saving note:', error);
      toast.error('Failed to save note');
    }
  };

  const deleteNote = async () => {
    if (!confirm('Are you sure you want to delete this note?')) return;

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', params.id);

      if (error) throw error;
      toast.success('Note deleted');
      router.push('/');
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Failed to delete note');
    }
  };

  // Auto-save on changes
  useEffect(() => {
    if (!loading && (title || content)) {
      const timer = setTimeout(() => {
        saveNote();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [title, content, category, isFavorite]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--color-background)">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-(--color-background) border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            {/* Category Selector */}
            <div className="relative">
              <button
                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                className="px-3 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {category}
              </button>

              {showCategoryMenu && (
                <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 min-w-[150px] z-20">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setShowCategoryMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Star
                className={`w-5 h-5 ${
                  isFavorite
                    ? 'fill-yellow-500 text-yellow-500'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              />
            </button>

            <button
              onClick={deleteNote}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5 text-gray-400 dark:text-gray-500 hover:text-red-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
          className="w-full text-4xl font-bold bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-700 mb-4"
        />

        {/* Editor */}
        <TipTapEditor
          content={content}
          onChange={setContent}
          placeholder="Start writing..."
        />
      </div>

      {/* Click outside to close category menu */}
      {showCategoryMenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowCategoryMenu(false)}
        />
      )}
    </div>
  );
}
