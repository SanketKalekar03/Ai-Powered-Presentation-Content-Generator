import React from 'react';
import { Target, Layers, FileCheck2, Info } from 'lucide-react';

export default function SlideOutline({
  presentation,
  currentSlideIndex,
  onSelectSlide
}) {
  const slides = presentation?.slides || [];
  const objectives = presentation?.objectives || [];

  return (
    <div className="space-y-5">
      
      {/* Title & Learning Objectives Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
        <div className="flex items-center space-x-2 text-indigo-700 font-bold text-xs uppercase tracking-wider mb-2">
          <Target className="w-4 h-4" />
          <span>Presentation Outline & Objectives</span>
        </div>

        <h3 className="text-base font-extrabold text-slate-900 font-display leading-snug">
          {presentation.title}
        </h3>

        {presentation.introduction && (
          <p className="mt-2 text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            {presentation.introduction}
          </p>
        )}

        <div className="mt-4">
          <span className="text-xs font-semibold text-slate-700 block mb-2">
            Learning Objectives:
          </span>
          <ul className="space-y-1.5">
            {objectives.map((obj, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-xs text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 flex-shrink-0" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Slide Thumbnails List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>All Slides ({slides.length})</span>
          </span>
          <span className="text-xs text-slate-400">Click to preview</span>
        </div>

        <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
          {slides.map((slide, idx) => {
            const isSelected = idx === currentSlideIndex;
            return (
              <button
                key={idx}
                onClick={() => onSelectSlide(idx)}
                className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-start space-x-3 ${
                  isSelected
                    ? 'bg-indigo-50/80 border-indigo-400 text-indigo-950 font-semibold shadow-sm'
                    : 'bg-white border-slate-200/70 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5 ${
                  isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {idx + 1}
                </span>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">
                    {slide.title}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {slide.bullets?.length || 0} bullet points • Speaker notes attached
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
