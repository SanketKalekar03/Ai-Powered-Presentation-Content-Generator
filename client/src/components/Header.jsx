import React from 'react';
import { Presentation, Sparkles, CheckCircle2, HelpCircle, Layers } from 'lucide-react';

export default function Header({ health, onOpenGuide }) {
  const isOnline = health?.status === 'ok';
  const hasGemini = health?.hasGeminiKey;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                  AI Presentation Content Generator
                </h1>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  MCA Gen AI Lab • Q1
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Automated outline, slides, speaker notes & PowerPoint (.pptx) creation
              </p>
            </div>
          </div>

          {/* Status & Guide Actions */}
          <div className="flex items-center space-x-3 text-xs">
            {/* Engine Status Badge */}
            <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border ${
              hasGemini 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                : 'bg-indigo-50 text-indigo-700 border-indigo-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${hasGemini ? 'bg-emerald-500 animate-ping' : 'bg-indigo-500'}`} />
              <span className="font-medium">
                {hasGemini ? 'Google Gemini AI' : 'Academic AI Engine'}
              </span>
            </div>

            {/* Practical Exam Tasks Guide Button */}
            <button
              onClick={onOpenGuide}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700 font-medium transition-colors"
              title="View MCA Practical Exam Tasks Breakdown"
            >
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>Exam Tasks (a–e)</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
