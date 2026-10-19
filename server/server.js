/**
 * Express Server Entry Point
 * AI Presentation Content Generator Backend
 */
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const presentationRoutes = require('./routes/presentationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend development
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parser Middleware with increased limit for rich slide data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request Logging Middleware (Helpful during practical exam demonstration)
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use('/api/presentation', presentationRoutes);

// Root informational endpoint
app.get('/api', (req, res) => {
  res.json({
    project: 'AI-Based Presentation Content Generator',
    version: '1.0.0',
    examination: 'MCA Generative AI Practical Internal - Question 1',
    status: 'Server is running',
    endpoints: {
      health: '/api/presentation/health',
      defaults: '/api/presentation/defaults',
      generate: 'POST /api/presentation/generate',
      export: 'POST /api/presentation/export'
    }
  });
});

// Serve frontend production build if available
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  // If the request doesn't match an API route and dist/index.html exists, serve it
  if (!req.path.startsWith('/api')) {
    const indexPath = path.join(clientDistPath, 'index.html');
    return res.sendFile(indexPath, (err) => {
      if (err) {
        next();
      }
    });
  }
  next();
});

// 404 Handler for undefined API routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]:', err.stack || err);
  res.status(500).json({
    success: false,
    message: 'An unexpected internal server error occurred.',
    error: err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log('================================================================');
  console.log(`🚀 AI Presentation Generator Server running on port ${PORT}`);
  console.log(`📡 API Endpoints available at: http://localhost:${PORT}/api/presentation`);
  console.log(`🔑 Gemini API Key configured: ${process.env.GEMINI_API_KEY ? 'YES (Active)' : 'NO (Using Offline Academic Fallback)'}`);
  console.log('================================================================');
});
