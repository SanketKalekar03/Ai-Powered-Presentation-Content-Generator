/**
 * API Service for communicating with backend presentation endpoints
 * Securely communicates with the backend without exposing any API keys.
 */

const API_BASE = '/api/presentation';

/**
 * Fetch system defaults (popular topics, categories, limits)
 */
export async function fetchDefaults() {
  try {
    const res = await fetch(`${API_BASE}/defaults`);
    if (!res.ok) {
      throw new Error(`Failed to fetch defaults: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.error('Error fetching defaults:', err);
    return {
      defaultTopic: "Artificial Intelligence in Modern Web Development",
      popularTopics: [
        "Artificial Intelligence in Modern Web Development",
        "Machine Learning Architectures and Deployment",
        "Cloud Computing & Serverless Paradigms",
        "Cyber Security & Threat Intelligence",
        "Blockchain Beyond Cryptocurrency",
        "Generative AI in Software Engineering"
      ],
      categories: [
        "Emerging Technologies",
        "Artificial Intelligence & ML",
        "Computer Applications",
        "Information Technology",
        "Software Engineering",
        "Cybersecurity"
      ],
      slideLimits: { MIN: 6, MAX: 15, DEFAULT: 7 }
    };
  }
}

/**
 * Fetch backend health and AI engine status
 */
export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) return { status: 'offline', aiEngine: 'Offline' };
    return await res.json();
  } catch (err) {
    return { status: 'offline', aiEngine: 'Local Backend' };
  }
}

/**
 * Request presentation content generation
 * @param {Object} params { topic, category, slideCount }
 */
export async function generatePresentationContent({ topic, category, slideCount }) {
  const res = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ topic, category, slideCount })
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    const errMsg = data.errors ? data.errors.join(', ') : (data.message || 'Failed to generate presentation');
    throw new Error(errMsg);
  }

  return data.data;
}

/**
 * Export presentation data as PowerPoint (.pptx) file
 * @param {Object} presentationData The presentation object
 */
export async function exportPresentationFile(presentationData) {
  const res = await fetch(`${API_BASE}/export`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(presentationData)
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({ message: 'Download failed' }));
    throw new Error(errorJson.message || 'Failed to generate PPTX file');
  }

  // Extract filename from Content-Disposition header if available
  let filename = `AI_Presentation_${(presentationData.title || 'Topic').replace(/[^a-zA-Z0-9_-]/g, '_')}.pptx`;
  const disposition = res.headers.get('Content-Disposition');
  if (disposition && disposition.includes('filename=')) {
    const match = disposition.match(/filename="?([^"]+)"?/);
    if (match && match[1]) {
      filename = match[1];
    }
  }

  // Convert response to blob and trigger download
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);

  return filename;
}
