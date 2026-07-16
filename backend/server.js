const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Initialize PostgreSQL Connection Pool
// In Render, the DATABASE_URL environment variable is automatically supplied.
const dbConnectionString = process.env.DATABASE_URL;

let pool;
if (dbConnectionString) {
  pool = new Pool({
    connectionString: dbConnectionString,
    ssl: {
      rejectUnauthorized: false // Required for Render SSL connections
    }
  });
  console.log("TailorPro Backend: Connected to PostgreSQL Database.");
} else {
  console.warn("WARNING: DATABASE_URL is not set. Running in memory/mock database mode for local safety.");
  // Mock DB fallback for testing when no database connection is present
  pool = {
    async query() {
      return { rows: [] };
    }
  };
}

// Database tables initialization SQL script
const initDb = async () => {
  if (!dbConnectionString) return;
  try {
    // 1. Create Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      );
    `);

    // 2. Create Orders Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.orders (
        order_id SERIAL PRIMARY KEY,
        customer_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(100) NOT NULL,
        dress_type VARCHAR(100) NOT NULL,
        chest DOUBLE PRECISION,
        waist DOUBLE PRECISION,
        shoulder DOUBLE PRECISION,
        sleeve DOUBLE PRECISION,
        height DOUBLE PRECISION,
        weight DOUBLE PRECISION,
        requirements TEXT,
        order_status VARCHAR(50) DEFAULT 'Measuring' NOT NULL,
        price DOUBLE PRECISION DEFAULT 0.0 NOT NULL,
        order_date TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        estimated_date DATE
      );
    `);

    // 3. Create Feedback Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.feedback (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        category VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      );
    `);

    console.log("TailorPro Backend: PostgreSQL tables checked/created successfully.");
  } catch (err) {
    console.error("TailorPro Backend: Database initialization failed: ", err);
  }
};

initDb();

// --- REST API ENDPOINTS ---

// 1. Home / Health Check Endpoint
app.get('/', (req, res) => {
  res.json({ message: "TailorPro API is running smoothly." });
});

// 2. User Registration (Sign Up)
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }

  try {
    // Check if user already exists
    const userExist = await pool.query('SELECT * FROM public.users WHERE email = $1', [email.toLowerCase().trim()]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ success: false, message: "Email is already registered." });
    }

    // Insert user into PostgreSQL database
    const newUser = await pool.query(
      'INSERT INTO public.users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
      [name.trim(), email.toLowerCase().trim(), password]
    );

    res.status(201).json({ success: true, user: newUser.rows[0] });
  } catch (err) {
    console.error("SignUp Error:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// 3. User Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  try {
    const userResult = await pool.query(
      'SELECT id, name, email, password FROM public.users WHERE email = $1',
      [email.toLowerCase().trim()]
    );

    if (userResult.rows.length === 0 || userResult.rows[0].password !== password) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const user = {
      id: userResult.rows[0].id,
      name: userResult.rows[0].name,
      email: userResult.rows[0].email
    };

    res.json({ success: true, user });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// 4. Create Order
app.post('/api/orders', async (req, res) => {
  const orderData = req.body;
  
  // Calculate delivery date (10 days from now)
  const estDate = new Date();
  estDate.setDate(estDate.getDate() + 10);
  const estimatedDateStr = estDate.toISOString().split('T')[0];

  // Pricing Logic matching frontend criteria
  let price = 1000;
  const type = (orderData.dress_type || "").toLowerCase();
  if (type.includes("premium black shirt")) price = 1600;
  else if (type.includes("linen shirt") || type.includes("lenin")) price = 1400;
  else if (type.includes("formal shirt")) price = 1100;
  else if (type.includes("t-shirt") || type.includes("t_shirt")) price = 700;
  else if (type.includes("hoodie")) price = 1800;
  else if (type.includes("formal pant")) price = 1500;
  else if (type.includes("baggy pants")) price = 1200;
  else if (type.includes("shorts")) price = 800;

  try {
    const newOrder = await pool.query(
      `INSERT INTO public.orders 
      (customer_name, phone, email, dress_type, chest, waist, shoulder, sleeve, height, weight, requirements, order_status, price, estimated_date) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
      RETURNING *`,
      [
        orderData.customer_name,
        orderData.phone,
        orderData.email.toLowerCase().trim(),
        orderData.dress_type,
        parseFloat(orderData.chest) || 0,
        parseFloat(orderData.waist) || 0,
        parseFloat(orderData.shoulder) || 0,
        parseFloat(orderData.sleeve) || 0,
        parseFloat(orderData.height) || 0,
        parseFloat(orderData.weight) || 0,
        orderData.requirements || "",
        "Measuring",
        price,
        estimatedDateStr
      ]
    );

    res.status(201).json({ success: true, order: newOrder.rows[0] });
  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ success: false, message: "Failed to create order." });
  }
});

// 5. Get Orders (With optional email filter)
app.get('/api/orders', async (req, res) => {
  const { email } = req.query;

  try {
    let result;
    if (email) {
      result = await pool.query(
        'SELECT * FROM public.orders WHERE email = $1 ORDER BY order_date DESC',
        [email.toLowerCase().trim()]
      );
    } else {
      result = await pool.query('SELECT * FROM public.orders ORDER BY order_date DESC');
    }
    res.json({ success: true, orders: result.rows });
  } catch (err) {
    console.error("Get Orders Error:", err);
    res.status(500).json({ success: false, message: "Failed to retrieve orders." });
  }
});

// 6. Update Order Status
app.put('/api/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { order_status } = req.body;

  if (!order_status) {
    return res.status(400).json({ success: false, message: "Missing order status." });
  }

  try {
    const updated = await pool.query(
      'UPDATE public.orders SET order_status = $1 WHERE order_id = $2 RETURNING *',
      [order_status, id]
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    res.json({ success: true, order: updated.rows[0] });
  } catch (err) {
    console.error("Update Status Error:", err);
    res.status(500).json({ success: false, message: "Failed to update status." });
  }
});

// 7. Submit Feedback
app.post('/api/feedback', async (req, res) => {
  const { name, email, category, message } = req.body;

  if (!name || !email || !category || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const newFeedback = await pool.query(
      'INSERT INTO public.feedback (name, email, category, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email.toLowerCase().trim(), category, message]
    );

    res.status(201).json({ success: true, feedback: newFeedback.rows[0] });
  } catch (err) {
    console.error("Submit Feedback Error:", err);
    res.status(500).json({ success: false, message: "Failed to submit feedback." });
  }
});

// 8. Get Feedback (Admin only review)
app.get('/api/feedback', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.feedback ORDER BY submitted_at DESC');
    res.json({ success: true, feedback: result.rows });
  } catch (err) {
    console.error("Get Feedback Error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch feedback list." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`TailorPro Server is running on port ${PORT}`);
});
