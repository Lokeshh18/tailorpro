# TailorPro | Bespoke Tailoring Experience

TailorPro is a modern digital platform designed for premium bespoke tailoring, specifically tailored for traditional South Indian clothing. It merges traditional artisan craftsmanship with modern digital fitting records, providing a premium "Modern Atelier" experience.

---

## 🌟 Key Features

1. **Atelier Catalog (`gallery.html`)**
   - High-quality visual showcase of core design offerings including *Premium Black Shirts, Linen Shirts, Formal Trousers (Black, Grey, Sandal), Modern Hoodies, Casual T-Shirts, Baggy Pants, and Casual Shorts*.

2. **Interactive Measurement Flow (`orders.html`)**
   - A step-by-step guided order configuration interface.
   - Saves precise physical parameters (waist, height/length, and optional chest, shoulder, sleeve, neck) depending on the garment silhouette chosen (dynamic Top vs Bottom inputs).
   - Collects customer delivery address at booking time.

3. **Customer Dashboard (`dashboard.html`)**
   - Personalized tracking interface showing active orders, progress indicators (Measuring ➔ Stitching ➔ Fitting ➔ Shipped), saved body measurements (dynamically showing Top/Bottom label terms), client address details, and inline delivery address edits.

4. **Atelier Administration (`admin.html`)**
   - Dedicated management panel for staff to view all custom orders, update status tracking, and manage customer measurement books.

5. **Flexible Data Storage**
   - Dual-mode operations supporting **Local Offline Mode** (using browser `LocalStorage` for easy demonstration and local testing) and **Cloud Database Mode** (powered by Node.js Express server + PostgreSQL on Render).

---

## 📂 Project Structure

The project has been cleaned and organized into a structured layout:

```
Tailor Pro/
├── index.html            # Main landing page & introduction
├── login.html            # User authentication screen (Sign In)
├── signup.html           # User registration screen (Sign Up)
├── dashboard.html        # Customer profile, active orders, & measurements
├── orders.html           # Multi-step order booking & measurement form
├── gallery.html          # Traditional garment design catalog
├── feedback.html         # Customer reviews and testimonial submission
├── admin.html            # Admin management dashboard
├── DESIGN.md             # UI Design System guidelines (Modern Atelier)
│
├── assets/
│   └── images/           # Curated high-res garment photography
│       ├── baggy_pants
│       ├── formal_pant_black.jpg
│       ├── formal_pant_grey
│       ├── formal_pant_sandal.png
│       ├── formal_shirt_blue
│       ├── formal_shirt_lined
│       ├── formal_shirt_red
│       ├── hoodie.jpg
│       ├── lenin_shirt
│       ├── premium_black_shirt.jpg
│       ├── shorts
│       └── t_shirt.jfif
│
├── css/
│   └── style.css         # Custom stylesheet adhering to Atelier aesthetics
│
├── js/
│   ├── app.js            # General page layout and route protections
│   ├── db.js             # Data service controller (LocalStorage & Supabase client wrapper)
│   └── config.js         # API credential keys for Supabase integration
│
├── database/             # Database initialization schemas
│   ├── supabase_setup.sql# PostgreSQL schema for Supabase
│   └── tailorpro.sql     # MySQL fallback schema
│
├── docs/                 # Project documentation and resources
│   └── merged_presentation_choladeck.pptx
│
└── backend_java/         # Optional local database connectivity tests (JDBC Reference)
    ├── src/
    │   ├── DBConnection.java
    │   └── TestConnection.java
    └── lib/
        └── mysql-connector-j-9.6.0.jar
```

---

## 🛠️ Technology Stack & Styling

- **Core Structure:** HTML5 with semantic layout tags.
- **Styling:** Vanilla CSS paired with Bootstrap 5 (loaded via CDN) for responsive layouts.
- **Design Language:** The "Modern Atelier" design system (outlined in `DESIGN.md`) features:
  - Typography pairing: **Libre Caslon Text** (elegant old-world serif headlines) and **Hanken Grotesk** (crisp functional body copy).
  - Luxury Palette: Midnight Charcoal (`#000000`/`#151C24`) as primary, Muted Gold (`#775A19`/`#FED488`) for premium highlights, and Parchment White (`#FBF9F8`) for warm, low-contrast backgrounds.
- **Data Persistence:** JavaScript-driven asynchronous operations. Supports automatic fallback to `localStorage` or cloud-connected Supabase queries.

---

## ⚙️ How to Set Up & Run

### 1. Running Locally (Offline / LocalStorage Mode)
By default, the application runs entirely in the browser using the **LocalStorage fallback**. No database connection is required.
1. Open [index.html](file:///e:/loki/Antigravity/Tailor%20Pro/index.html) in your browser.
2. Sign in with one of the pre-seeded demo user credentials:
   - **Customer:** `julian.stclair@heritage.com` (password: `password`)
   - **Customer:** `e.vance@studio.com` (password: `password`)
   - **Admin:** `admin@tailorpro.com` (password: `admin`)

### 2. Running the Node.js Backend Locally
To test the server locally:
1. Navigate to the `backend/` folder.
2. Run `npm install` to load Express and PostgreSQL dependencies.
3. Configure a local PostgreSQL database and set `DATABASE_URL=postgres://user:password@localhost:5432/tailorpro` in a `backend/.env` file.
4. Start the server using `npm start` (starts on port `5000` by default).
5. Open [js/config.js](file:///e:/loki/Antigravity/Tailor%20Pro/js/config.js) and set:
   ```javascript
   const RENDER_BACKEND_URL = "http://localhost:5000";
   ```

### 3. Deploying to Render Cloud Platform
You can host the entire system on Render's free tier:

#### Step A: Create a PostgreSQL Database on Render
1. Log in to the [Render Dashboard](https://dashboard.render.com/).
2. Click **New** ➔ **PostgreSQL**. Name your database `tailorpro-db`.
3. Select the Free tier and click **Create Database**.
4. Once active, copy the **Internal Database URL** or **External Database URL**.

#### Step B: Deploy the Node.js Backend
1. Push your repository to GitHub.
2. On Render, click **New** ➔ **Web Service**.
3. Connect your GitHub repository.
4. Configure the Web Service settings:
   - **Name:** `tailorpro-backend`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Go to **Environment** tab, click **Add Environment Variable**:
   - Key: `DATABASE_URL`
   - Value: *Paste the Database URL copied in Step A.*
6. Click **Deploy Web Service** and copy the resulting Service URL (e.g., `https://tailorpro-backend.onrender.com`).

#### Step C: Deploy the Frontend
1. Open [js/config.js](file:///e:/loki/Antigravity/Tailor%20Pro/js/config.js) and configure the URL:
   ```javascript
   const RENDER_BACKEND_URL = "https://tailorpro-backend.onrender.com"; // Your Render URL
   ```
2. Commit and push the frontend changes to GitHub.
3. On Render, click **New** ➔ **Static Site**.
4. Connect your GitHub repository and set the Root Directory as empty (root of the repo).
5. Click **Create Static Site**.

---

### 4. Supabase Cloud Mode (Alternative Cloud)
To connect directly via Supabase client side:
1. Create a project at [Supabase](https://supabase.com/).
2. Execute the schema from [database/supabase_setup.sql](file:///e:/loki/Antigravity/Tailor%20Pro/database/supabase_setup.sql) in SQL Editor.
3. Configure `SUPABASE_URL` and `SUPABASE_ANON_KEY` in [js/config.js](file:///e:/loki/Antigravity/Tailor%20Pro/js/config.js). Ensure `RENDER_BACKEND_URL` is empty.

### 5. Java Backend Test (Optional JDBC Reference)
A standalone test suite is provided inside the `backend_java` folder for local database testing:
1. Ensure a local MySQL server is running. Create a schema matching the definitions in [tailorpro.sql](file:///e:/loki/Antigravity/Tailor%20Pro/database/tailorpro.sql).
2. Configure credentials in [DBConnection.java](file:///e:/loki/Antigravity/Tailor%20Pro/backend_java/src/DBConnection.java).
3. Compile and execute `TestConnection.java` adding the JDBC connector JAR under `backend_java/lib/` to your classpath.
