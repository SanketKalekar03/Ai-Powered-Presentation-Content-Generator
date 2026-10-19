import React, { useState } from 'react';
import { X, Plus, Trash2, Save, AlertCircle } from 'lucide-react';

export default function EditSlideModal({
  isOpen,
  slide,
  slideIndex,
  onSave,
  onClose
}) {
  if (!isOpen || !slide) return null;

  const [title, setTitle] = useState(slide.title || '');
  const [bullets, setBullets] = useState(slide.bullets ? [...slide.bullets] : ['']);
  const [speakerNotes, setSpeakerNotes] = useState(slide.speakerNotes || '');
  const [error, setError] = useState('');

  const handleAddBullet = () => {
    if (bullets.length >= 8) {
      setError('Recommended maximum is 8 bullet points to avoid overcrowding.');
      return;
    }
    setBullets([...bullets, '']);
    setError('');
  };

  const handleUpdateBullet = (index, value) => {
    const updated = [...bullets];
    updated[index] = value;
    setBullets(updated);
  };

  const handleRemoveBullet = (index) => {
    if (bullets.length <= 3) {
      setError('Slide should contain at least 3 bullet points.');
      return;
    }
    setBullets(bullets.filter((_, idx) => idx !== index));
    setError('');
  };

  const handleSave = () => {
    if (!title.trim()) {
      setError('Slide title cannot be empty.');
      return;
    }
    const cleanBullets = bullets.map(b => b.trim()).filter(Boolean);
    if (cleanBullets.length < 3) {
      setError('Please provide at least 3 valid bullet points.');
      return;
    }
    if (!speakerNotes.trim()) {
      setError('Speaker notes cannot be empty.');
      return;
    }

    onSave(slideIndex, {
      ...slide,
      title: title.trim(),
      bullets: cleanBullets,
      speakerNotes: speakerNotes.trim()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Edit Slide {slideIndex + 1}
            </h3>
            <p className="text-xs text-slate-500">
              Customize title, bullet points, and speaker notes
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-sm">
          
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Title Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Slide Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
            />
          </div>

          {/* Bullets Input List */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase">
                Bullet Points ({bullets.length})
              </label>
              <button
                type="button"
                onClick={handleAddBullet}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Bullet</span>
              </button>
            </div>

            <div className="space-y-2">
              {bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <span className="mt-2 text-xs font-bold text-slate-400 w-4 text-center">
                    {idx + 1}.
                  </span>
                  <textarea
                    rows={2}
                    value={bullet}
                    onChange={(e) => handleUpdateBullet(idx, e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                    placeholder="Enter bullet point text..."
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveBullet(idx)}
                    className="mt-1.5 text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                    title="Remove point"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Speaker Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Presenter Speaker Notes
            </label>
            <textarea
              rows={3}
              value={speakerNotes}
              onChange={(e) => setSpeakerNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs text-slate-800 italic"
              placeholder="Spoken narrative for the presenter..."
            />
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center space-x-1.5 shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>

      </div>
    </div>
  );
}
