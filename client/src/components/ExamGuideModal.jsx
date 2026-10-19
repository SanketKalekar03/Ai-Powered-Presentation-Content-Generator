import React from 'react';
import { X, CheckCircle2, Award, BookOpen, FileCheck } from 'lucide-react';

export default function ExamGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const tasks = [
    {
      task: "Task (a)",
      title: "Accept a topic related to IT/Emerging Technologies",
      desc: "Interactive dashboard with quick presets for AI, ML, Cloud Computing, Cyber Security, Blockchain, Web Dev, and Generative AI, with customizable slide count."
    },
    {
      task: "Task (b)",
      title: "Generate presentation outline with title, objectives & ≥ 6 slides",
      desc: "AI engine generates structured JSON containing engaging title, learning objectives, and at least 6 logically sequenced slides."
    },
    {
      task: "Task (c)",
      title: "Generate suitable slide headings, bullet points & speaker notes",
      desc: "Each slide features technical headings, 4–6 concise bullet points, and extensive speaker notes explaining the context."
    },
    {
      task: "Task (d)",
      title: "Create a real presentation file in PPTX format",
      desc: "Server-side PowerPoint engine (pptxgenjs) outputs native 16:9 widescreen .pptx with styled master slides, custom bullet styling, and speaker notes embedded into every slide."
    },
    {
      task: "Task (e)",
      title: "Review presentation for factual accuracy, logical sequence & readability",
      desc: "Built-in Review Inspector evaluates technical terminology, pedagogical progression (Foundations → Mechanisms → Applications → Tools → Benefits → Challenges → Future), readability scores, and live slide editing."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-white">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                MCA Generative AI Practical - Question 1
              </h3>
              <p className="text-xs text-slate-500">
                Five Core Requirements Verification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-3.5 overflow-y-auto flex-1">
          {tasks.map((t, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/60 hover:bg-white hover:border-indigo-200 transition-colors">
              <div className="flex items-center space-x-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-indigo-100 text-indigo-800">
                  {t.task}
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {t.title}
                </span>
              </div>
              <p className="text-xs text-slate-600 pl-1">
                {t.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            DKTE Society's Textile and Engineering Institute • MCA Lab
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
}
