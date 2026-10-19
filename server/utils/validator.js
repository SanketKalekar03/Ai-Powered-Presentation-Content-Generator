/**
 * Request & Response Validation Helpers
 */
const { SLIDE_LIMITS } = require('./constants');

/**
 * Validate incoming request for generating a presentation
 */
function validatePresentationRequest(body) {
  const errors = [];

  if (!body || typeof body !== 'object') {
    return { isValid: false, errors: ['Request body must be a valid JSON object.'] };
  }

  const { topic, slideCount } = body;

  if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
    errors.push('Presentation topic is required and cannot be empty.');
  } else if (topic.trim().length < 2) {
    errors.push('Topic must be at least 2 characters long.');
  } else if (topic.trim().length > 200) {
    errors.push('Topic must be less than 200 characters.');
  }

  const count = parseInt(slideCount, 10);
  if (slideCount !== undefined) {
    if (isNaN(count) || count < SLIDE_LIMITS.MIN || count > SLIDE_LIMITS.MAX) {
      errors.push(`Slide count must be between ${SLIDE_LIMITS.MIN} and ${SLIDE_LIMITS.MAX}.`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    cleanData: {
      topic: topic ? topic.trim() : '',
      category: body.category ? String(body.category).trim() : 'Emerging Technologies',
      slideCount: isNaN(count) ? SLIDE_LIMITS.DEFAULT : count
    }
  };
}

/**
 * Validate the generated presentation structure
 */
function validatePresentationContent(data, minSlides = SLIDE_LIMITS.MIN) {
  const errors = [];

  if (!data || typeof data !== 'object') {
    return { isValid: false, errors: ['Generated presentation data must be an object.'] };
  }

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.push('Presentation must have a valid non-empty title.');
  }

  if (!Array.isArray(data.objectives) || data.objectives.length < 2) {
    errors.push('Presentation must contain at least 2 learning objectives.');
  }

  if (!Array.isArray(data.slides) || data.slides.length < minSlides) {
    errors.push(`Presentation must have at least ${minSlides} slides (received: ${Array.isArray(data.slides) ? data.slides.length : 0}).`);
  } else {
    data.slides.forEach((slide, idx) => {
      const slideNum = slide.slideNumber || idx + 1;
      if (!slide.title || typeof slide.title !== 'string' || slide.title.trim().length === 0) {
        errors.push(`Slide ${slideNum} is missing a title.`);
      }
      if (!Array.isArray(slide.bullets) || slide.bullets.length < 3) {
        errors.push(`Slide ${slideNum} ("${slide.title || 'Untitled'}") must have at least 3 bullet points.`);
      }
      if (!slide.speakerNotes || typeof slide.speakerNotes !== 'string' || slide.speakerNotes.trim().length === 0) {
        errors.push(`Slide ${slideNum} is missing speaker notes.`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = {
  validatePresentationRequest,
  validatePresentationContent
};
