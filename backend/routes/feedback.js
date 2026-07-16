const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// POST /api/feedback — Submit a customer review
router.post('/', async (req, res) => {
  const { name, email, category, message } = req.body;

  if (!name || !email || !category || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    const newFeedback = await pool.query(
      'INSERT INTO public.feedback (name, email, category, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email.toLowerCase().trim(), category, message]
    );

    res.status(201).json({ success: true, feedback: newFeedback.rows[0] });
  } catch (err) {
    console.error('Submit Feedback Error:', err);
    res.status(500).json({ success: false, message: 'Failed to submit feedback.' });
  }
});

// GET /api/feedback — Retrieve all customer reviews
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM public.feedback ORDER BY submitted_at DESC'
    );
    res.json({ success: true, feedback: result.rows });
  } catch (err) {
    console.error('Get Feedback Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch feedback list.' });
  }
});

module.exports = router;
