// Database and Backend Credentials

// Configure SEPARATE_PRODUCTION_BACKEND_URL ONLY if deploying frontend and backend separately on Render.
// If deploying them together as a single unified Render Web Service (recommended), leave this empty.
const SEPARATE_PRODUCTION_BACKEND_URL = ""; 

const RENDER_BACKEND_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? (window.location.port === "5000" ? window.location.origin : "http://localhost:5000")
    : (SEPARATE_PRODUCTION_BACKEND_URL || window.location.origin);

// 2. Supabase Cloud Credentials (Optional Fallback)
const SUPABASE_URL = ""; 
const SUPABASE_ANON_KEY = "";
