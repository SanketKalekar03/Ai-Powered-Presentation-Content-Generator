import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import TopicForm from '../components/TopicForm';
import LoadingState from '../components/LoadingState';
import SlideViewer from '../components/SlideViewer';
import SlideOutline from '../components/SlideOutline';
import ReviewPanel from '../components/ReviewPanel';
import EditSlideModal from '../components/EditSlideModal';
import ExamGuideModal from '../components/ExamGuideModal';
import { 
  fetchDefaults, 
  fetchHealth, 
  generatePresentationContent, 
  exportPresentationFile 
} from '../services/apiService';
import { 
  Presentation, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  ShieldCheck, 
  Layers,
  Info
} from 'lucide-react';

export default function PresentationDashboard() {
  const [defaults, setDefaults] = useState(null);
  const [health, setHealth] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [generatingTopic, setGeneratingTopic] = useState('');
  const [presentation, setPresentation] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' or 'review'
  const [editingSlideIndex, setEditingSlideIndex] = useState(null);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [notification, setNotification] = useState(null);

  // Load defaults and health on component mount
  useEffect(() => {
    async function init() {
      const [defaultsData, healthData] = await Promise.all([
        fetchDefaults(),
        fetchHealth()
      ]);
      setDefaults(defaultsData);
      setHealth(healthData);
    }
    init();
  }, []);

  const showToast = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handleGenerate = async ({ topic, category, slideCount }) => {
    try {
      setIsGenerating(true);
      setGeneratingTopic(topic);
      setNotification(null);

      const generatedData = await generatePresentationContent({ topic, category, slideCount });
      setPresentation(generatedData);
      setCurrentSlideIndex(0);
      setActiveTab('preview');

      showToast('success', `Presentation "${generatedData.title}" generated successfully with ${generatedData.slides?.length || 0} slides!`);
    } catch (err) {
      console.error('Generation Error:', err);
      showToast('error', err.message || 'Failed to generate presentation. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!presentation) return;
    try {
      setIsDownloading(true);
      const filename = await exportPresentationFile(presentation);
      showToast('success', `PowerPoint file "${filename}" downloaded successfully!`);
    } catch (err) {
      console.error('Download Error:', err);
      showToast('error', err.message || 'Failed to download PPTX file.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSaveSlide = (index, updatedSlide) => {
    if (!presentation) return;
    const newSlides = [...presentation.slides];
    newSlides[index] = updatedSlide;
    setPresentation({
      ...presentation,
      slides: newSlides
    });
    showToast('success', `Slide ${index + 1} updated successfully!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* App Header */}
      <Header health={health} onOpenGuide={() => setShowGuideModal(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Toast Notification Banner */}
        {notification && (
          <div className={`p-4 rounded-xl border flex items-center justify-between shadow-sm animate-fade-in ${
            notification.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            <div className="flex items-center space-x-2.5 text-sm font-medium">
              {notification.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              )}
              <span>{notification.message}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-xs font-bold uppercase opacity-70 hover:opacity-100 px-2 py-1"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Notice for Academic Engine if applicable */}
        {presentation?.metadata?.notice && (
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/90 text-amber-900 text-xs flex items-center space-x-2.5">
            <Info className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>
              <strong>System Note:</strong> {presentation.metadata.notice}
            </span>
          </div>
        )}

        {/* Step 1: Topic Input Form */}
        <section>
          <TopicForm
            defaults={defaults}
            onSubmit={handleGenerate}
            isGenerating={isGenerating}
            initialTopic={presentation ? presentation.title : (defaults?.defaultTopic || '')}
            initialCategory={presentation ? presentation.category : 'Emerging Technologies'}
            initialSlideCount={presentation ? presentation.slides?.length : 7}
          />
        </section>

        {/* Step 2: Animated Generation Loading State */}
        {isGenerating && (
          <section>
            <LoadingState topic={generatingTopic} />
          </section>
        )}

        {/* Step 3: Interactive Presentation Preview & Review Workspace */}
        {presentation && !isGenerating && (
          <section className="space-y-6 pt-4 border-t border-slate-200">
            
            {/* Presentation Workspace Control Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Generated Presentation
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">
                  {presentation.title}
                </h3>
              </div>

              {/* View Mode Toggle: Interactive Slide View vs Quality Review */}
              <div className="flex items-center space-x-2">
                <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                      activeTab === 'preview'
                        ? 'bg-white text-indigo-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Slide Viewer</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('review')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                      activeTab === 'review'
                        ? 'bg-white text-emerald-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Review & Quality (Task e)</span>
                  </button>
                </div>

                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center space-x-1.5 shadow-sm shadow-indigo-100 transition-all disabled:opacity-75"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PPTX</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Interactive Slide Viewer Layout */}
            {activeTab === 'preview' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Outline Sidebar: 4 cols on desktop */}
                <div className="lg:col-span-4 order-2 lg:order-1">
                  <SlideOutline
                    presentation={presentation}
                    currentSlideIndex={currentSlideIndex}
                    onSelectSlide={(idx) => setCurrentSlideIndex(idx)}
                  />
                </div>

                {/* Right Interactive Slide Canvas: 8 cols on desktop */}
                <div className="lg:col-span-8 order-1 lg:order-2">
                  <SlideViewer
                    presentation={presentation}
                    currentSlideIndex={currentSlideIndex}
                    onSlideChange={(newIdx) => setCurrentSlideIndex(newIdx)}
                    onEditSlide={(idx) => setEditingSlideIndex(idx)}
                    onDownload={handleDownload}
                    isDownloading={isDownloading}
                  />
                </div>

              </div>
            )}

            {/* Tab 2: Quality Review Panel (Task e) */}
            {activeTab === 'review' && (
              <ReviewPanel presentation={presentation} />
            )}

          </section>
        )}

      </main>

      {/* Edit Slide Modal */}
      <EditSlideModal
        isOpen={editingSlideIndex !== null}
        slide={editingSlideIndex !== null && presentation ? presentation.slides[editingSlideIndex] : null}
        slideIndex={editingSlideIndex || 0}
        onSave={handleSaveSlide}
        onClose={() => setEditingSlideIndex(null)}
      />

      {/* MCA Practical Exam Guide Modal */}
      <ExamGuideModal
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            AI-Based Presentation Content Generator • MCA Generative AI Practical Exam (Q1)
          </p>
          <p>
            DKTE Society's Textile and Engineering Institute, Ichalkaranji
          </p>
        </div>
      </footer>

    </div>
  );
}
