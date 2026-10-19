import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

const STEPS = [
  "Analyzing presentation topic & domain requirements...",
  "Synthesizing presentation title and learning objectives...",
  "Structuring slides with technical headings & key bullet points...",
  "Composing detailed presenter speaker notes for each slide...",
  "Performing factual verification & formatting schema validation..."
];

export default function LoadingState({ topic }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 sm:p-10 my-8 text-center max-w-2xl mx-auto">
      
      {/* Animated Glowing Ring */}
      <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping opacity-75" />
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg text-white">
          <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '4s' }} />
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-1 font-display">
        AI Generating Presentation
      </h3>
      <p className="text-sm text-slate-500 mb-6">
        Topic: <span className="font-semibold text-indigo-700">"{topic}"</span>
      </p>

      {/* Progress Steps List */}
      <div className="space-y-3 text-left bg-slate-50 p-5 rounded-xl border border-slate-100 max-w-lg mx-auto">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={idx}
              className={`flex items-center space-x-3 text-sm transition-all duration-300 ${
                isDone
                  ? 'text-slate-700 font-medium'
                  : isCurrent
                  ? 'text-indigo-600 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-indigo-600 animate-spin flex-shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-300 flex-shrink-0" />
              )}
              <span className="text-xs sm:text-sm">{step}</span>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-xs text-slate-400">
        MCA Generative AI Laboratory • Creating Structured Output
      </p>

    </div>
  );
}
