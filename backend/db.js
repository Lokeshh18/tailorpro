const { Pool } = require('pg');

const dbConnectionString = process.env.DATABASE_URL;

let pool;
if (dbConnectionString) {
  const useSsl = process.env.DATABASE_SSL === 'true';
  pool = new Pool({
    connectionString: dbConnectionString,
    ssl: useSsl ? { rejectUnauthorized: false } : false
  });
  console.log(`TailorPro DB: Connected to PostgreSQL (SSL: ${useSsl}).`);
} else {
  console.warn('WARNING: DATABASE_URL is not set. Using in-memory mock DB for local safety.');
  pool = {
    async query() {
      return { rows: [] };
    }
  };
}

// Initialize database tables if they don't exist
const initDb = async () => {
  if (!dbConnectionString) return;
  try {
    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      );
    `);

    // Orders table
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

    // Feedback table
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

    console.log('TailorPro DB: Tables checked/created successfully.');
  } catch (err) {
    console.error('TailorPro DB: Initialization failed:', err);
  }
};

module.exports = { pool, initDb };
