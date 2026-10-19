import React, { useState } from 'react';
import { Sparkles, Sliders, BookOpen, Layers, ArrowRight, RotateCcw } from 'lucide-react';

export default function TopicForm({
  defaults,
  onSubmit,
  isGenerating,
  initialTopic,
  initialCategory,
  initialSlideCount
}) {
  const [topic, setTopic] = useState(initialTopic || defaults?.defaultTopic || 'Artificial Intelligence in Modern Web Development');
  const [category, setCategory] = useState(initialCategory || 'Emerging Technologies');
  const [slideCount, setSlideCount] = useState(initialSlideCount || 7);
  const [error, setError] = useState('');

  const popularTopics = defaults?.popularTopics || [
    "Artificial Intelligence in Modern Web Development",
    "Machine Learning Architectures and Deployment",
    "Cloud Computing & Serverless Paradigms",
    "Cyber Security, Zero Trust & Threat Intelligence",
    "Blockchain Beyond Cryptocurrency",
    "Generative AI in Software Engineering"
  ];

  const categories = defaults?.categories || [
    "Emerging Technologies",
    "Artificial Intelligence & ML",
    "Computer Applications",
    "Information Technology",
    "Software Engineering",
    "Cybersecurity",
    "Cloud & Distributed Systems",
    "Data Science"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic || topic.trim().length === 0) {
      setError('Please enter a presentation topic to proceed.');
      return;
    }
    if (topic.trim().length < 2) {
      setError('Topic must be at least 2 characters.');
      return;
    }
    setError('');
    onSubmit({
      topic: topic.trim(),
      category,
      slideCount: Number(slideCount)
    });
  };

  const handleSelectPreset = (selectedTopic) => {
    setTopic(selectedTopic);
    setError('');
  };

  const handleResetToDefault = () => {
    setTopic(defaults?.defaultTopic || 'Artificial Intelligence in Modern Web Development');
    setCategory('Emerging Technologies');
    setSlideCount(7);
    setError('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
      
      {/* Intro Banner */}
      <div className="mb-6">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Intelligent Presentation Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
          Create Structured Presentation Content
        </h2>
        <p className="mt-1 text-sm sm:text-base text-slate-600">
          Enter any computer applications or emerging technology topic. The AI generates a structured outline, 
          detailed bullet points, professional speaker notes, and an exportable PowerPoint (.pptx) file.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Topic Input Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="topic-input" className="block text-sm font-semibold text-slate-800">
              Presentation Topic <span className="text-rose-500">*</span>
            </label>
            <button
              type="button"
              onClick={handleResetToDefault}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset to Exam Default</span>
            </button>
          </div>

          <div className="relative">
            <input
              id="topic-input"
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. Artificial Intelligence in Modern Web Development"
              className={`w-full px-4 py-3 text-base rounded-xl border ${
                error 
                  ? 'border-rose-400 focus:ring-rose-200 focus:border-rose-500 bg-rose-50/20' 
                  : 'border-slate-300 focus:ring-indigo-100 focus:border-indigo-600 bg-white'
              } shadow-sm focus:outline-none focus:ring-4 transition duration-150`}
              disabled={isGenerating}
            />
          </div>

          {error && (
            <p className="mt-1.5 text-xs text-rose-600 font-medium">
              {error}
            </p>
          )}

          {/* Quick Preset Badges */}
          <div className="mt-3">
            <span className="text-xs font-medium text-slate-500 block mb-1.5">
              Popular MCA Topics (Click to select):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {popularTopics.map((item, index) => {
                const isSelected = topic.toLowerCase() === item.toLowerCase();
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelectPreset(item)}
                    disabled={isGenerating}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Secondary Inputs: Category & Slide Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1 border-t border-slate-100">
          
          {/* Category Dropdown */}
          <div>
            <label htmlFor="category-select" className="block text-sm font-semibold text-slate-800 mb-2 flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Subject / Domain (Optional)</span>
            </label>
            <select
              id="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isGenerating}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 text-sm font-medium"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <span className="text-xs text-slate-500 mt-1 block">
              Helps the AI adapt technical depth to the syllabus.
            </span>
          </div>

          {/* Slide Count Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="slide-count" className="text-sm font-semibold text-slate-800 flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Number of Slides</span>
              </label>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-100 text-indigo-800">
                {slideCount} Content Slides
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                id="slide-count"
                type="range"
                min="6"
                max="12"
                step="1"
                value={slideCount}
                onChange={(e) => setSlideCount(Number(e.target.value))}
                disabled={isGenerating}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <span className="text-xs text-slate-500 w-12 text-right font-medium">
                6 - 12
              </span>
            </div>
            <span className="text-xs text-slate-500 mt-1 block">
              Task Requirement: At least 6 content slides (+ Title & Outline).
            </span>
          </div>

        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isGenerating}
            className={`w-full sm:w-auto min-w-[240px] px-8 py-3.5 rounded-xl font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-200 flex items-center justify-center space-x-2.5 ${
              isGenerating
                ? 'bg-indigo-400 cursor-not-allowed opacity-90'
                : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] hover:shadow-indigo-300'
            }`}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Generating Presentation...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Generate Presentation</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
