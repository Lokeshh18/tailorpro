# TailorPro 🧵

A full-stack custom tailoring web application where customers can browse garments, place orders with body measurements, and track their tailoring progress.

---

## 🏗️ Project Structure

```
Tailor Pro/
│
├── frontend/                    ← All client-side files (served statically by Express)
│   ├── index.html               ← Homepage
│   ├── login.html               ← User login
│   ├── signup.html              ← User registration
│   ├── orders.html              ← Place a new order
│   ├── dashboard.html           ← Customer order dashboard
│   ├── gallery.html             ← Garment catalog
│   ├── feedback.html            ← Customer reviews
│   ├── admin.html               ← Admin order management
│   ├── css/
│   │   └── style.css            ← Global styles
│   ├── js/
│   │   ├── app.js               ← Shared app logic (auth, nav)
│   │   ├── config.js            ← Backend URL config (auto-switches local/production)
│   │   └── db.js                ← Frontend API service layer (fetch wrappers)
│   └── assets/
│       └── images/              ← 12 garment product images
│
├── backend/                     ← Node.js Express API server
│   ├── server.js                ← Entry point (middleware + route mounting)
│   ├── db.js                    ← PostgreSQL pool + DB table initialization
│   ├── routes/
│   │   ├── auth.js              ← POST /api/auth/signup, POST /api/auth/login
│   │   ├── orders.js            ← GET/POST /api/orders, PUT /api/orders/:id/status
│   │   └── feedback.js          ← GET/POST /api/feedback
│   ├── package.json
│   ├── .env                     ← Local secrets (git-ignored)
│   └── .env.example             ← Environment variable template
│
├── database/
│   ├── supabase_setup.sql       ← Supabase schema reference
│   └── tailorpro.sql            ← PostgreSQL table definitions
│
├── docs/
│   ├── DESIGN.md                ← UI/UX design notes
│   └── merged_presentation_choladeck.pptx
│
├── .gitignore
├── README.md                    ← This file
├── tailorpro.md                 ← Detailed technical documentation
└── project_report.md            ← Academic project report
```

---

## 🚀 Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/) installed locally

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/tailorpro.git
cd tailorpro

# 2. Install backend dependencies
cd backend
npm install

# 3. Create your local environment file
copy .env.example .env
# Edit .env with your local PostgreSQL credentials

# 4. Start the backend server
npm start
```

**5.** Open your browser at `http://localhost:5000` — the full app will load automatically!

---

## ⚙️ Environment Variables (`backend/.env`)

| Variable | Description | Default |
|---|---|---|
| `PORT` | Port for the Express server | `5000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgres://postgres:password@localhost:5432/tailorpro` |
| `DATABASE_SSL` | Enable SSL for DB connection | `false` (local) / `true` (Render) |

---

## ☁️ Deploying to Render

### Step 1 — Create a PostgreSQL Database
1. Go to [Render Dashboard](https://dashboard.render.com/) → **New → PostgreSQL**
2. Name it `tailorpro-db`, select **Free** tier → **Create Database**
3. Copy the **Internal Database URL**

### Step 2 — Deploy the Backend Web Service
1. Click **New → Web Service**, connect your GitHub repo
2. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
3. Add **Environment Variables**:
   - `DATABASE_URL` → paste the Internal Database URL from Step 1
   - `DATABASE_SSL` → `true`
4. Click **Deploy** — your full app (frontend + API) will be live at the Web Service URL!

> **No separate frontend deployment needed!** The Express server serves the `frontend/` folder as static files automatically.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server health check |
| `POST` | `/api/auth/signup` | Register new user |
| `POST` | `/api/auth/login` | Login existing user |
| `POST` | `/api/orders` | Place a new order |
| `GET` | `/api/orders?email=` | Get orders (optionally by email) |
| `PUT` | `/api/orders/:id/status` | Update order status (admin) |
| `POST` | `/api/feedback` | Submit customer review |
| `GET` | `/api/feedback` | Get all customer reviews |

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Render managed)
- **Deployment:** Render (unified Web Service)
