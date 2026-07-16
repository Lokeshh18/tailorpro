const express = require('express');
const cors    = require('cors');
const path    = require('path');
require('dotenv').config();

const { initDb } = require('./db');

// Import route modules
const authRoutes     = require('./routes/auth');
const orderRoutes    = require('./routes/orders');
const feedbackRoutes = require('./routes/feedback');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Serve the frontend folder as static files
// Visiting / will automatically load frontend/index.html
app.use(express.static(path.join(__dirname, '../frontend')));

// ── API Routes ────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ message: 'TailorPro API is running smoothly.' });
});

app.use('/api/auth',     authRoutes);
app.use('/api/orders',   orderRoutes);
app.use('/api/feedback', feedbackRoutes);

// ── Catch-all: serve index.html for any unmatched route (SPA fallback) ────────
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ── Bootstrap ────────────────────────────────────────────────────────────────
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`TailorPro Server running on http://localhost:${PORT}`);
  });
});
