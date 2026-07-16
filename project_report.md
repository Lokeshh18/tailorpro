# TAILORPRO: AN ATELIER AND BESPOKE TAILORING SYSTEM

**A Comprehensive Project Report submitted in partial fulfillment of the requirements for the development of Web Applications.**

---

## 📄 PREFATORY PAGES

### 1. Title Page
- **Project Title:** TailorPro: An Atelier and Bespoke Tailoring System
- **Academic Year:** 2026
- **Developed By:** Lokesh
- **Domain:** Web Application Development, Database Persistence Systems, and Client-Side Architecture

### 2. Declaration
I hereby declare that this project report entitled **"TailorPro: An Atelier and Bespoke Tailoring System"** is an original work carried out by me under guidance. All the code, styles, design tokens, and documentation represent my own implementation except where specifically referenced and cited.

### 3. Acknowledgment
I would like to express my gratitude to the instructors, peers, and mentors who provided guidance and resources throughout the software development lifecycle. I also acknowledge the creators of Bootstrap, Supabase, and Java JDBC libraries, which made the implementation of this client-cloud hybrid project possible.

### 4. Executive Summary / Abstract
Traditional tailoring for premium South Indian garments (such as designer bridal blouses, pre-stitched silk sarees, and sherwanis) is a highly fragmented industry. Customers face sizing errors, lack of digital progress tracking, and loss of measurement details. 

**TailorPro** solves these challenges by providing a digital atelier system. The system offers a clean "Minimalist-Luxury" user interface paired with a multi-mode database integration layer. In local/development modes, the client-side layer supports Local Browser Storage (`localStorage`) and direct Supabase API connections. For production, the project utilizes a Node.js Express API Server connected to a managed PostgreSQL Database on the Render cloud hosting platform. This report discusses the requirements, system design, architectural modules, database schema, implementation guidelines, and testing methodologies of TailorPro.

---

## 📂 TABLE OF CONTENTS
1. **Chapter 1: Introduction**
   - 1.1 Project Overview
   - 1.2 Motivation
   - 1.3 Problem Statement
   - 1.4 Project Objectives
   - 1.5 Scope of the System
2. **Chapter 2: Literature Survey & Existing Systems**
   - 2.1 Study of Existing Systems
   - 2.2 Drawbacks of Traditional Systems
   - 2.3 Proposed System Advancements
   - 2.4 Feasibility Study
3. **Chapter 3: System Requirements & Specifications**
   - 3.1 Software Requirements
   - 3.2 Hardware Requirements
   - 3.3 Functional Requirements
   - 3.4 Non-Functional Requirements
4. **Chapter 4: Design Methodology & System Architecture**
   - 4.1 System Architecture Diagram & Description
   - 4.2 UI Design System (Atelier Aesthetic)
   - 4.3 Database Schema Design (Entity Relationship Layout)
5. **Chapter 5: Detailed Module Implementation**
   - 5.1 Landing Page & Navigation Module
   - 5.2 Interactive Measurement Module
   - 5.3 User Profile & Order Tracking Dashboard
   - 5.4 Database Integration & Fallback Controller
   - 5.5 Admin Status Board
   - 5.6 Node.js Backend Web Service (Render API)
   - 5.7 Java MySQL Database Connectivity Layer (Reference)
6. **Chapter 6: Testing & Quality Assurance**
   - 6.1 Automated Verification & Browser Testing
   - 6.2 Test Cases & Execution Summary
7. **Chapter 7: Conclusion & Future Scope**
   - 7.1 Conclusion
   - 7.2 Future Enhancements
8. **References & Appendix**

---

## 📋 CHAPTER 1: INTRODUCTION

### 1.1 Project Overview
**TailorPro** is a bespoke web application that digitalizes the traditional tailor fitting process. Specifically catering to premium South Indian ethnic garments, it provides custom sizing configuration inputs, automated price calculation, real-time progress indicators, and historical records.

### 1.2 Motivation
Bespoke tailoring is an art form. Unlike fast fashion, custom apparel requires millimeter-perfect dimensions. The lack of standard tools leads to repeated measurements, loss of ledger books, and miscommunicated fabric requirements. TailorPro bridges the gap between handcraft and cloud technology.

### 1.3 Problem Statement
Traditional custom boutiques rely on paper ledgers. This process suffers from:
1. Physical loss of paper records.
2. Inability of customers to track stitching progress.
3. Lack of visual design catalogs linked directly to measurement inputs.
4. Absence of offline-first storage fallback in low-connectivity areas.

### 1.4 Project Objectives
- **Digital Ledger:** Provide secure, cloud-saved measurement records.
- **Aesthetic UI:** Create a high-end interface representing a luxury studio.
- **Dynamic Workflows:** Implement step-by-step sizing modules.
- **Unified Backend:** Design database schemas compatible with cloud services (Supabase) and local servers (MySQL).

### 1.5 Scope of the System
The system covers customer sign-up/login, catalog browsing, placing custom orders with measurements, viewing dashboards, administrative tracking, and backend database verification. It serves as a comprehensive system for boutique tailors and designer houses.

---

## 📋 CHAPTER 2: LITERATURE SURVEY & EXISTING SYSTEMS

### 2.1 Study of Existing Systems
Most existing tailoring platforms are either integrated ERPs for large garment factories (which are overly complex and expensive) or e-commerce storefronts selling standard sizes (S, M, L). There is a shortage of localized solutions that capture specific metrics like saree pleats pre-stitching, padded shoulder selections, and customized sleeve details.

### 2.2 Drawbacks of Traditional Systems
- **Lack of Customization:** Standard e-commerce templates do not allow direct input of variable sizes.
- **No Direct Customer Feedback:** Statuses are updated via manual phone calls rather than self-service tracking.
- **Rigid Architectures:** Hard dependency on internet servers prevents the tool from operating offline.

### 2.3 Proposed System Advancements
TailorPro provides a lightweight, pure-frontend web application that:
- Runs immediately out of the box using `localStorage` if no internet is available.
- Syncs seamlessly to a remote PostgreSQL server (Supabase) via API once credentials are set.
- Integrates a visual layout featuring traditional South Indian aesthetic designs.

### 2.4 Feasibility Study
- **Technical Feasibility:** The project uses HTML5, CSS3, Bootstrap 5, and JavaScript. No compilation is needed for the frontend, making it highly compatible.
- **Operational Feasibility:** Tailors can manage order books via the Admin Panel, requiring minimal digital training.
- **Economic Feasibility:** The system relies on open-source libraries and can be hosted on free cloud tiers.

---

## 📋 CHAPTER 3: SYSTEM REQUIREMENTS & SPECIFICATIONS

### 3.1 Software Requirements
- **Operating System:** Windows, macOS, or Linux.
- **Web Browser:** Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari.
- **Text Editor/IDE:** VS Code, Cursor, or Gemini Antigravity IDE.
- **Local Server (Optional):** Python 3.x (for local static file hosting) or Node.js.
- **Backend Runtime:** Node.js v18.x or higher (Express web server).
- **Database:** Render PostgreSQL (Cloud Database Service) or local MySQL instance.
- **Java Runtime Environment (Optional):** JRE/JDK 17 or higher (for compilation of Java JDBC reference components).

### 3.2 Hardware Requirements
- **CPU:** Dual-core 2.0 GHz or higher.
- **RAM:** Minimum 4 GB RAM.
- **Storage:** 50 MB free disk space (excluding java dependencies and local media).

### 3.3 Functional Requirements
1. **User Authentication:** Sign up and log in securely.
2. **Catalog Browsing:** Browse different bridal blouse embroideries, sarees, and sherwanis.
3. **Interactive Sizing Form:** Allow users to submit measurements (Chest, Waist, Shoulder, Sleeve, Height, Weight) in inches.
4. **Order Tracking:** Display statuses like "Measuring", "Tailoring", "Fitting", and "Shipped".
5. **Admin Controls:** Permit status updates.
6. **Data Synchronizer:** Switch between database providers dynamically.

### 3.4 Non-Functional Requirements
- **Performance:** Pages must load in under 2 seconds.
- **Usability:** Clean typography and high whitespace ratio representing a premium aesthetic.
- **Reliability:** Data must fall back to local storage if API calls time out.
- **Security:** Secure storage of passwords in local sessions.

---

## 📋 CHAPTER 4: DESIGN METHODOLOGY & SYSTEM ARCHITECTURE

### 4.1 System Architecture Diagram
```
                     +----------------------------+
                     |    User's Web Browser      |
                     +--------------+-------------+
                                    |
            +-----------------------+-----------------------+
            |                       |                       |
     (Render Active)        (Supabase Active)       (All Databases Inactive)
            |                       |                       |
            v                       v                       v
+-----------------------+ +-----------------------+ +-----------------------+
| Render Web Service    | | Supabase Cloud API    | | Browser LocalStorage  |
| (Node.js Express API) | | (PostgreSQL Database) | | (Offline Demo Mode)   |
+-----------------------+ +-----------------------+ +-----------------------+
            |                       |                       |
  (Render PostgreSQL DB)            |                       |
            |                       |                       |
+-----------v-----------------------v-----------------------+
| - users Table                                             |
| - orders Table                                            |
| - feedback Table                                          |
+-----------------------------------------------------------+

+---------------------------------------------------------------+
|                      STANDALONE REFERENCE                     |
|   Java App (JDBC)  ======>  Local MySQL Server (tailorpro)    |
|   (DBConnection)            (users & orders tables)           |
+---------------------------------------------------------------+
```

### 4.2 UI Design System
The visual style is **Minimalist-Luxury** (Modern Atelier):
- **Colors:** Midnight Charcoal (`#000000`/`#151C24`) for buttons, Muted Gold (`#775A19`) for highlights, and Parchment White (`#FBF9F8`) for backgrounds.
- **Typography:** Display serif headings set in **Libre Caslon Text** and paragraphs set in **Hanken Grotesk**.
- **Outlines:** Subtle 1px borders (`#E5E5E5`) replace heavy shadows, creating a ledger feel.

### 4.3 Database Schema Design

#### Table 1: `users`
| Column Name  | Data Type | Constraints            | Description |
|:-------------|:----------|:-----------------------|:------------|
| `id`         | bigint    | Primary Key, Auto-Inc  | Unique identifier |
| `name`       | text      | Not Null               | Customer full name |
| `email`      | text      | Unique, Not Null       | Access email |
| `password`   | text      | Not Null               | Plaintext/hashed credentials |
| `created_at` | timestamp | Default UTC Now        | Account creation time |

#### Table 2: `orders`
| Column Name     | Data Type        | Constraints            | Description |
|:----------------|:-----------------|:-----------------------|:------------|
| `order_id`      | bigint           | Primary Key, Auto-Inc  | Unique booking reference |
| `customer_name` | text             | Not Null               | Booking customer |
| `phone`         | text             | Not Null               | Contact details |
| `email`         | text             | Not Null               | Linked account |
| `dress_type`    | text             | Not Null               | Design selection |
| `chest`         | double precision | Optional               | Chest size (inches) |
| `waist`         | double precision | Optional               | Waist size (inches) |
| `shoulder`      | double precision | Optional               | Shoulder width (inches) |
| `sleeve`        | double precision | Optional               | Sleeve length (inches) |
| `height`        | double precision | Optional               | Blouse/Kurta length |
| `weight`        | double precision | Optional               | Target weight (kgs) |
| `requirements`  | text             | Optional               | Custom motifs/zari work |
| `order_status`  | text             | Default 'Measuring'    | Status of assembly |
| `price`         | double precision | Default 0.0            | Billable amount in INR |
| `order_date`    | timestamp        | Default UTC Now        | Order timestamps |
| `estimated_date`| date             | Optional               | Expected completion |

---

## 📋 CHAPTER 5: DETAILED MODULE IMPLEMENTATION

### 5.1 Landing Page & Navigation Module
- **File:** `index.html`, `js/app.js`
- **Description:** Features the hero banner introducing the brand's heritage, an interactive navbar that dynamically shows "Dashboard" or "Admin Panel" depending on active browser sessions, and cards highlighting designer categories.

### 5.2 Interactive Measurement Module
- **File:** `orders.html`
- **Description:** Divided into progressive tabs:
  1. *Choose Design Category:* Previews 12 clothing categories with selection border outlines.
  2. *Select Fabric Source:* Allows custom fabric input.
  3. *Submit Measurements:* Dynamically adjusts form fields and placeholders depending on category. If a **Top** (Shirt, T-Shirt, Linen, Hoodie) is selected, fields for *Shoulder Width*, *Chest*, *Waist*, *Sleeve Length*, *Neck*, and *Garment Length* are shown. If a **Bottom** (Pant, Baggy Pants, Shorts) is selected, sleeve and neck inputs are hidden, and labels dynamically alter to collect *Thigh Circumference*, *Hip Size*, and *Outseam Length*. A required *Delivery Address* field is also provided.
  4. *Final Summary:* Dynamic estimation of price and delivery dates.

### 5.3 User Profile & Order Tracking Dashboard
- **File:** `dashboard.html`
- **Description:** Pulls orders matching the logged-in user's email. Renders order detail cards mapping each selection to its respective image path (e.g. `assets/images/premium_black_shirt.jpg`). Displays the client's current delivery address with an inline **Edit** button to dynamically update details. Adapts the body measurements book labels (Shoulders ➔ Thigh, Chest ➔ Hip, Length ➔ Outseam) if the latest custom order placed was a Bottom trousers silhouette.

### 5.4 Database Integration & Fallback Controller
- **File:** `js/db.js`, `js/config.js`
- **Description:** Detects which database modes are active. Prioritizes Render REST API calls if `RENDER_BACKEND_URL` is set. Falls back to Supabase client-side integration if Supabase configuration is set, or runs fully client-side using the browser's local `localStorage` API as a final offline fallback. The delivery address is stored directly inside the user's session profile and appended within the order's requirements details string to support cross-compatibility without schema migrations.

### 5.5 Admin Status Board
- **File:** `admin.html`
- **Description:** Allows tailoring administrators to review global metrics. The page fetches orders, displays customer details, and provides dropdown selectors to transition orders through "Measuring", "Tailoring", "Fitting", and "Shipped" phases.

### 5.6 Node.js Backend Web Service (Render API)
- **File:** `backend/server.js`, `backend/package.json`
- **Description:** The core REST server built with Node.js Express. Handles API endpoints for user registration, user logins, creating orders, updating status variables, and saving feedback. Integrates with the Render managed PostgreSQL Database using connection pool mechanics and rejection-free SSL certificates.

### 5.7 Java MySQL Database Connectivity Layer (Reference)
- **Files:** `backend_java/src/DBConnection.java`, `backend_java/src/TestConnection.java`
- **Description:** A native Java JDBC wrapper class using the `mysql-connector-j` driver jar. Initiates database socket connection to local port `3306` to verify availability.

---

## 📋 CHAPTER 6: TESTING & QUALITY ASSURANCE

### 6.1 Automated Verification & Browser Testing
We initiated a local HTTP web server and executed a headless browser verification script to validate directory adjustments.

The testing protocol verified:
1. HTTP server response 200 on all pages.
2. Asset resolution paths (`/assets/images/*.jpeg`).
3. Execution of fallback logic in the JS engine.

### 6.2 Test Cases & Execution Summary

| Test ID | Module Tested | Input Scenario | Expected Outcome | Status |
|:---|:---|:---|:---|:---|
| TC-01 | Sign In | Correct credentials | Session storage created; redirect to dashboard | PASS |
| TC-02 | Sizing Input | Float numbers in inches | Values parsed correctly into DB records | PASS |
| TC-03 | Local Fallback | Supabase URL empty | Dummy data written successfully to LocalStorage | PASS |
| TC-04 | Admin panel | Change status dropdown | LocalStorage or remote database updated in real-time | PASS |
| TC-05 | Image asset path | Relocated files | Images load correctly with no 404 console errors | PASS |

---

## 📋 CHAPTER 7: CONCLUSION & FUTURE SCOPE

### 7.1 Conclusion
TailorPro demonstrates how legacy crafts can be modernized using a client-side architecture. By clean-partitioning code structures (moving static views to root and scripts/assets/schemas into folders), the project exhibits modularity, readability, and reliability.

### 7.2 Future Enhancements
- **3D Fitting Simulation:** Implement canvas models showing how measurements warp apparel models.
- **OAuth Integration:** Add standard Google/Facebook auth options.
- **SMS/WhatsApp Notifications:** Connect to notification gateways to send tracking updates automatically when administrators transition order statuses.

---

## 📋 REFERENCES & APPENDIX

1. **Bootstrap Documentation:** Getting started with layouts and grids.
2. **Supabase Guides:** PostgreSQL REST APIs and JS Web Client SDK.
3. **W3C Standards:** HTML5 forms and canvas guidelines.

### Appendix: SQL Database Table Queries
```sql
-- Create table script for users (MySQL Fallback)
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Create table script for orders
CREATE TABLE IF NOT EXISTS orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    dress_type VARCHAR(50) NOT NULL,
    chest DOUBLE,
    waist DOUBLE,
    shoulder DOUBLE,
    sleeve DOUBLE,
    height DOUBLE,
    weight DOUBLE,
    requirements TEXT
);

-- Create table script for feedback
CREATE TABLE IF NOT EXISTS feedback (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
