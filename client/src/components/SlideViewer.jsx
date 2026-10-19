import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Edit3, 
  MessageSquare, 
  CheckCircle, 
  Layers, 
  FileText,
  Volume2,
  Copy,
  Check
} from 'lucide-react';

export default function SlideViewer({
  presentation,
  currentSlideIndex,
  onSlideChange,
  onEditSlide,
  onDownload,
  isDownloading
}) {
  const [copiedNotes, setCopiedNotes] = useState(false);
  const slides = presentation?.slides || [];
  const currentSlide = slides[currentSlideIndex];
  const totalSlides = slides.length;

  if (!currentSlide) return null;

  const handleCopyNotes = () => {
    if (currentSlide.speakerNotes) {
      navigator.clipboard.writeText(currentSlide.speakerNotes);
      setCopiedNotes(true);
      setTimeout(() => setCopiedNotes(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Top Slide Canvas Card (16:9 Look & Feel) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg overflow-hidden transition-all duration-200">
        
        {/* Slide Accent Top Bar */}
        <div className="h-2 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500" />

        {/* Slide Canvas Body */}
        <div className="p-6 sm:p-10 min-h-[380px] sm:min-h-[440px] flex flex-col justify-between bg-gradient-to-b from-white to-slate-50/50">
          
          {/* Slide Header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                Slide {currentSlide.slideNumber || currentSlideIndex + 1} of {totalSlides} • {presentation.category || 'Emerging Technologies'}
              </span>

              <button
                onClick={() => onEditSlide(currentSlideIndex)}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
                title="Edit slide title, bullets, or notes"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Slide</span>
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 font-display tracking-tight mt-2 pb-3 border-b border-slate-200">
              {currentSlide.title}
            </h2>
          </div>

          {/* Slide Bullets */}
          <div className="my-6">
            <ul className="space-y-3.5">
              {currentSlide.bullets?.map((bullet, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-slate-700">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base leading-relaxed">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Slide Footer */}
          <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-400">
            <span className="truncate max-w-[260px] sm:max-w-md font-medium text-slate-500">
              {presentation.title}
            </span>
            <span>
              Slide {currentSlideIndex + 1} / {totalSlides}
            </span>
          </div>

        </div>

      </div>

      {/* Speaker Notes Drawer */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-md bg-amber-200 text-amber-800 flex items-center justify-center">
              <Volume2 className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-amber-900 uppercase tracking-wider">
              Presenter Speaker Notes
            </h4>
          </div>
          
          <button
            onClick={handleCopyNotes}
            className="inline-flex items-center space-x-1 text-xs text-amber-800 hover:text-amber-950 font-medium px-2 py-1 rounded hover:bg-amber-100 transition-colors"
          >
            {copiedNotes ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Notes</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-sans italic bg-white/70 p-3 rounded-lg border border-amber-200/50">
          "{currentSlide.speakerNotes || 'No speaker notes specified for this slide.'}"
        </p>
      </div>

      {/* Slide Navigation & Actions Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Previous / Next Controls */}
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={() => onSlideChange(Math.max(0, currentSlideIndex - 1))}
            disabled={currentSlideIndex === 0}
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1 border transition-all ${
              currentSlideIndex === 0
                ? 'text-slate-300 border-slate-200 cursor-not-allowed bg-slate-50'
                : 'text-slate-700 border-slate-300 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs font-bold text-slate-600 px-3 py-1 bg-slate-100 rounded-lg">
            {currentSlideIndex + 1} of {totalSlides}
          </span>

          <button
            onClick={() => onSlideChange(Math.min(totalSlides - 1, currentSlideIndex + 1))}
            disabled={currentSlideIndex === totalSlides - 1}
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1 border transition-all ${
              currentSlideIndex === totalSlides - 1
                ? 'text-slate-300 border-slate-200 cursor-not-allowed bg-slate-50'
                : 'text-slate-700 border-slate-300 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Download PPTX Button */}
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] shadow-md shadow-indigo-100 flex items-center justify-center space-x-2 transition-all disabled:opacity-75"
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Generating PPTX...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download PPTX File</span>
            </>
          )}
        </button>

      </div>

    </div>
  );
}
