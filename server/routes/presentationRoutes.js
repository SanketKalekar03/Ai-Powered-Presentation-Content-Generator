/**
 * Presentation API Routes
 */
const express = require('express');
const router = express.Router();
const { validatePresentationRequest, validatePresentationContent } = require('../utils/validator');
const { generatePresentationContent, generateAcademicFallback } = require('../services/aiService');
const { createPresentationBuffer } = require('../services/pptxService');
const { DEFAULT_TOPIC, POPULAR_TOPICS, CATEGORIES, SLIDE_LIMITS } = require('../utils/constants');

/**
 * Health check & configuration info
 * GET /api/presentation/health
 */
router.get('/health', (req, res) => {
  const hasGeminiKey = Boolean(
    process.env.GEMINI_API_KEY && 
    process.env.GEMINI_API_KEY.trim() !== '' && 
    process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
  );

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    aiEngine: hasGeminiKey ? 'Google Gemini AI (Active)' : 'MCA Academic Fallback Engine (Offline Mode)',
    hasGeminiKey
  });
});

/**
 * Get system defaults, popular topics, categories, and slide limits
 * GET /api/presentation/defaults
 */
router.get('/defaults', (req, res) => {
  res.json({
    defaultTopic: DEFAULT_TOPIC,
    popularTopics: POPULAR_TOPICS,
    categories: CATEGORIES,
    slideLimits: SLIDE_LIMITS
  });
});

/**
 * Generate Presentation Content using AI
 * POST /api/presentation/generate
 * Body: { topic, category, slideCount }
 */
router.post('/generate', async (req, res) => {
  try {
    const validation = validatePresentationRequest(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid presentation request parameters.',
        errors: validation.errors
      });
    }

    const { topic, category, slideCount } = validation.cleanData;

    const presentation = await generatePresentationContent({
      topic,
      category,
      slideCount
    });

    res.json({
      success: true,
      message: 'Presentation content generated successfully.',
      data: presentation
    });
  } catch (error) {
    console.error('[Route Error /generate]:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error while generating presentation content.'
    });
  }
});

/**
 * Export and Download PPTX Presentation File
 * POST /api/presentation/export
 * Body: Presentation Object (title, category, introduction, objectives, slides)
 */
router.post('/export', async (req, res) => {
  try {
    const presentationData = req.body;

    const validation = validatePresentationContent(presentationData, 6);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid presentation structure for PPTX generation.',
        errors: validation.errors
      });
    }

    // Clean topic title for safe filename
    const safeTopicSlug = (presentationData.title || 'Presentation')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .replace(/_+/g, '_')
      .substring(0, 45);

    const filename = `AI_Presentation_${safeTopicSlug}.pptx`;

    const buffer = await createPresentationBuffer(presentationData);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', buffer.length);

    return res.end(buffer);
  } catch (error) {
    console.error('[Route Error /export]:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate and export PowerPoint (.pptx) file.'
    });
  }
});

module.exports = router;
