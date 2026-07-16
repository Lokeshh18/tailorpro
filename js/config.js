// Database and Backend Credentials

// 1. Render API URL: Connects to your hosted backend service on Render.
// If set, the app runs on the Render Postgres backend database service.
// If left empty, the app falls back to Supabase Mode (if credentials are set below) or local browser LocalStorage Mode.
const RENDER_BACKEND_URL = ""; // e.g., "https://tailorpro-backend.onrender.com"

// 2. Supabase Cloud Credentials (Optional Fallback)
const SUPABASE_URL = ""; 
const SUPABASE_ANON_KEY = "";
