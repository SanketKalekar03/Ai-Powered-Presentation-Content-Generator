/**
 * PowerPoint (.pptx) Presentation Generation Service
 * Uses pptxgenjs to build professional, beautifully styled presentations
 * with title slide, objectives slide, content slides, and full speaker notes.
 */
const pptxgen = require('pptxgenjs');

// Design Color Palette (Hex without # prefix for pptxgenjs)
const THEME = {
  PRIMARY_DARK: '0F172A',   // Slate 900
  NAVY_HEADER: '1E293B',    // Slate 800
  INDIGO_ACCENT: '4F46E5',  // Indigo 600
  INDIGO_LIGHT: 'EEF2FF',   // Indigo 50
  CYAN_ACCENT: '06B6D4',    // Cyan 500
  TEXT_DARK: '1E293B',      // Slate 800
  TEXT_MUTED: '64748B',     // Slate 500
  TEXT_LIGHT: 'F8FAFC',     // Slate 50
  BORDER_COLOR: 'CBD5E1',   // Slate 300
  CARD_BG: 'FFFFFF',        // White
  BG_LIGHT: 'F8FAFC',       // Slate 50
};

/**
 * Generate a PPTX presentation buffer from structured presentation data
 * @param {Object} presentationData Structured presentation object
 * @returns {Promise<Buffer>} Node.js Buffer containing the .pptx file
 */
async function createPresentationBuffer(presentationData) {
  const pres = new pptxgen();

  // Configure Presentation
  pres.layout = 'LAYOUT_16x9'; // 10 x 5.625 inches
  pres.author = 'AI Presentation Content Generator';
  pres.company = 'MCA Generative AI Laboratory';
  pres.title = presentationData.title || 'AI Technical Presentation';
  pres.subject = presentationData.category || 'Emerging Technologies';

  const totalSlides = (presentationData.slides ? presentationData.slides.length : 0) + 2; // +1 title, +1 objectives

  // ==========================================
  // SLIDE 1: TITLE SLIDE (Executive Dark Theme)
  // ==========================================
  const titleSlide = pres.addSlide();
  titleSlide.background = { color: THEME.PRIMARY_DARK };

  // Decorative top accent stripe
  titleSlide.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10.0,
    h: 0.15,
    fill: { color: THEME.INDIGO_ACCENT },
    line: { color: THEME.INDIGO_ACCENT }
  });

  // Badge / Pill
  titleSlide.addShape(pres.ShapeType.roundRect, {
    x: 1.0,
    y: 1.1,
    w: 3.8,
    h: 0.4,
    rectRadius: 0.2,
    fill: { color: '1E293B' },
    line: { color: THEME.CYAN_ACCENT, width: 1.5 }
  });
  titleSlide.addText('MCA GENERATIVE AI PRESENTATION', {
    x: 1.0,
    y: 1.1,
    w: 3.8,
    h: 0.4,
    fontSize: 10,
    bold: true,
    color: THEME.CYAN_ACCENT,
    align: 'center',
    valign: 'middle'
  });

  // Main Presentation Title
  titleSlide.addText(presentationData.title || 'Technical Presentation', {
    x: 1.0,
    y: 1.7,
    w: 8.0,
    h: 1.8,
    fontSize: 32,
    bold: true,
    color: 'FFFFFF',
    fontFace: 'Arial',
    valign: 'middle',
    isTextBox: true
  });

  // Category & Subtitle
  const categoryText = presentationData.category 
    ? `Category: ${presentationData.category}` 
    : 'Domain: Emerging Technologies & Computer Applications';

  titleSlide.addText(categoryText, {
    x: 1.0,
    y: 3.6,
    w: 8.0,
    h: 0.4,
    fontSize: 14,
    color: THEME.TEXT_MUTED,
    fontFace: 'Arial'
  });

  // Footer Metadata Bar
  titleSlide.addShape(pres.ShapeType.rect, {
    x: 1.0,
    y: 4.4,
    w: 8.0,
    h: 0.02,
    fill: { color: '334155' }
  });

  titleSlide.addText(`Generated via AI Presentation Content Generator  •  ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`, {
    x: 1.0,
    y: 4.6,
    w: 8.0,
    h: 0.35,
    fontSize: 11,
    color: '94A3B8',
    fontFace: 'Arial'
  });

  // Speaker notes for title slide
  titleSlide.addNotes(
    `Welcome everyone to this presentation on "${presentationData.title}". In this session, we will examine the architectural foundations, core applications, industry toolsets, real-world benefits, and future outlook of this technology.`
  );

  // ==========================================
  // SLIDE 2: OBJECTIVES & EXECUTIVE SUMMARY
  // ==========================================
  const objSlide = pres.addSlide();
  objSlide.background = { color: THEME.BG_LIGHT };

  // Top header bar
  objSlide.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10.0,
    h: 0.1,
    fill: { color: THEME.INDIGO_ACCENT }
  });

  objSlide.addText('PRESENTATION OUTLINE', {
    x: 0.8,
    y: 0.4,
    w: 8.4,
    h: 0.3,
    fontSize: 10,
    bold: true,
    color: THEME.INDIGO_ACCENT,
    fontFace: 'Arial'
  });

  objSlide.addText('Objectives & Scope', {
    x: 0.8,
    y: 0.7,
    w: 8.4,
    h: 0.5,
    fontSize: 22,
    bold: true,
    color: THEME.NAVY_HEADER,
    fontFace: 'Arial'
  });

  // Overview box
  if (presentationData.introduction) {
    objSlide.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 1.35,
      w: 8.4,
      h: 0.9,
      rectRadius: 0.1,
      fill: { color: THEME.INDIGO_LIGHT },
      line: { color: THEME.INDIGO_ACCENT, width: 1 }
    });

    objSlide.addText(presentationData.introduction, {
      x: 1.0,
      y: 1.45,
      w: 8.0,
      h: 0.7,
      fontSize: 11.5,
      color: THEME.TEXT_DARK,
      fontFace: 'Arial',
      italic: true,
      valign: 'middle'
    });
  }

  // Objectives List
  const objectives = presentationData.objectives || [
    'Understand fundamental concepts and core terminology.',
    'Analyze architectural implementations and best practices.',
    'Evaluate real-world industry case studies and toolkits.',
    'Assess future trends and strategic industry roadmaps.'
  ];

  const objBullets = objectives.map((obj, i) => ({
    text: ` ${obj}`,
    options: {
      bullet: { type: 'number', numberType: 'arabicPeriod' },
      breakLine: true,
      fontSize: 13,
      color: THEME.TEXT_DARK,
      fontFace: 'Arial',
      paraSpaceAfter: 12
    }
  }));

  objSlide.addText(objBullets, {
    x: 0.8,
    y: 2.45,
    w: 8.4,
    h: 2.6,
    valign: 'top',
    isTextBox: true
  });

  // Footer
  objSlide.addText(`Slide 2 of ${totalSlides}  |  ${presentationData.title}`, {
    x: 0.8,
    y: 5.2,
    w: 8.4,
    h: 0.3,
    fontSize: 9,
    color: THEME.TEXT_MUTED,
    fontFace: 'Arial'
  });

  objSlide.addNotes(
    `On this slide, we outline our main learning goals. By the end of this presentation, the audience will have a structured understanding of ${presentationData.title}, its practical relevance, and key technical takeaways.`
  );

  // ==========================================
  // SLIDES 3+: CONTENT SLIDES
  // ==========================================
  const slides = presentationData.slides || [];
  slides.forEach((slideItem, index) => {
    const currentSlideNum = index + 3; // +2 for title & objectives
    const slide = pres.addSlide();
    slide.background = { color: THEME.BG_LIGHT };

    // Decorative top colored accent bar
    slide.addShape(pres.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 10.0,
      h: 0.1,
      fill: { color: THEME.INDIGO_ACCENT }
    });

    // Category / Context Breadcrumb
    const breadcrumb = `SLIDE ${slideItem.slideNumber || index + 1}  •  ${presentationData.category || 'TECHNICAL PRESENTATION'}`;
    slide.addText(breadcrumb.toUpperCase(), {
      x: 0.8,
      y: 0.4,
      w: 8.4,
      h: 0.3,
      fontSize: 10,
      bold: true,
      color: THEME.INDIGO_ACCENT,
      fontFace: 'Arial'
    });

    // Slide Title
    slide.addText(slideItem.title || `Slide ${slideItem.slideNumber || index + 1}`, {
      x: 0.8,
      y: 0.7,
      w: 8.4,
      h: 0.55,
      fontSize: 22,
      bold: true,
      color: THEME.NAVY_HEADER,
      fontFace: 'Arial'
    });

    // Divider Line
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 1.35,
      w: 8.4,
      h: 0.02,
      fill: { color: THEME.BORDER_COLOR }
    });

    // White Card Background for Bullets
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 1.5,
      w: 8.4,
      h: 3.5,
      rectRadius: 0.08,
      fill: { color: THEME.CARD_BG },
      line: { color: THEME.BORDER_COLOR, width: 1 }
    });

    // Bullet points
    const bulletList = Array.isArray(slideItem.bullets) ? slideItem.bullets : [];
    const formattedBullets = bulletList.map(bullet => ({
      text: bullet,
      options: {
        bullet: { code: '2022' }, // Standard round bullet symbol
        fontSize: 12.5,
        color: THEME.TEXT_DARK,
        fontFace: 'Arial',
        paraSpaceAfter: 10,
        lineSpacing: 20
      }
    }));

    slide.addText(formattedBullets, {
      x: 1.0,
      y: 1.65,
      w: 8.0,
      h: 3.2,
      valign: 'top',
      isTextBox: true
    });

    // Slide Footer
    slide.addText(`Slide ${currentSlideNum} of ${totalSlides}  |  ${presentationData.title}`, {
      x: 0.8,
      y: 5.2,
      w: 8.4,
      h: 0.3,
      fontSize: 9,
      color: THEME.TEXT_MUTED,
      fontFace: 'Arial'
    });

    // Add Speaker Notes!
    if (slideItem.speakerNotes && typeof slideItem.speakerNotes === 'string') {
      slide.addNotes(slideItem.speakerNotes.trim());
    }
  });

  // Generate binary node buffer
  const buffer = await pres.write({ outputType: 'nodebuffer' });
  return buffer;
}

module.exports = {
  createPresentationBuffer
};
