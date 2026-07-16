const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// POST /api/auth/signup — Register a new user
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }

  try {
    const userExist = await pool.query(
      'SELECT * FROM public.users WHERE email = $1',
      [email.toLowerCase().trim()]
    );
    if (userExist.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Email is already registered.' });
    }

    const newUser = await pool.query(
      'INSERT INTO public.users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
      [name.trim(), email.toLowerCase().trim(), password]
    );

    res.status(201).json({ success: true, user: newUser.rows[0] });
  } catch (err) {
    console.error('SignUp Error:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// POST /api/auth/login — Authenticate existing user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  try {
    const userResult = await pool.query(
      'SELECT id, name, email, password FROM public.users WHERE email = $1',
      [email.toLowerCase().trim()]
    );

    if (userResult.rows.length === 0 || userResult.rows[0].password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const user = {
      id: userResult.rows[0].id,
      name: userResult.rows[0].name,
      email: userResult.rows[0].email
    };

    res.json({ success: true, user });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

module.exports = router;
