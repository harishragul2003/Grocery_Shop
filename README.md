# 🛒 NatureCart — Full-Stack Grocery E-Commerce Platform

A modern, full-stack grocery e-commerce web application built with React, Node.js, and Supabase. Features a complete shopping experience for customers and a powerful admin dashboard for store management.

---

## 🚀 Live Demo

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000/api`

---

## ✨ Features

### 👤 Customer Features

- **Authentication** — Register & login with JWT-based auth, auto token expiry handling
- **Product Browsing** — Browse all products with category filters, price range, brand filters, and search
- **Best Sellers** — Animated product carousel showing top-rated products
- **Shopping Cart** — Add/remove items, update quantities, persistent cart state
- **Wishlist** — Save favourite products for later
- **Checkout** — Multi-step checkout with shipping address
- **Payment** — Stripe payment integration
- **Order History** — View all past orders with status tracking
- **User Profile** — View and manage account details
- **Responsive Design** — Fully mobile-friendly across all screen sizes

### 🛡️ Admin Features

- **Admin Dashboard** — Animated stats cards (Revenue, Orders, Users, Products) with live revenue chart
- **Revenue Overview** — Enterprise-level analytics page with:
  - Hero revenue insight with growth % indicator
  - Animated area chart with time range toggle (7 days / 30 days / this month)
  - KPI cards (Orders, Products Sold, New Customers, Payment Success Rate)
  - Best & lowest sales day highlights
  - Revenue by category pie chart
  - Top 5 selling products table
  - AI-style smart insights panel
- **Product Management** — Full CRUD (Create, Read, Update, Delete) for all products
- **Order Management** — View all customer orders, filter by status, update order status (Pending → Confirmed → Delivered)
- **User Management** — View all registered users with detailed profile modal
- **Role-based Access** — Admin-only routes protected by middleware

---

## 🏗️ Project Structure

```
Grocery_Shop/
├── frontend/                  # React + Vite frontend
│   └── src/
│       ├── components/        # Reusable UI components
│       │   ├── Navbar.tsx
│       │   ├── Footer.tsx
│       │   ├── ProductCard.tsx
│       │   ├── ProductList.tsx
│       │   ├── ProductGrid.tsx
│       │   ├── BannerSlider.tsx
│       │   ├── CategoryGrid.tsx
│       │   ├── FilterSidebar.tsx
│       │   ├── SearchBar.tsx
│       │   ├── Toast.tsx
│       │   └── ...
│       ├── pages/
│       │   ├── Home.tsx
│       │   ├── Products.tsx
│       │   ├── Cart.tsx
│       │   ├── Checkout.tsx
│       │   ├── Payment.tsx
│       │   ├── Orders.tsx
│       │   ├── Profile.tsx
│       │   ├── Login.tsx
│       │   ├── Register.tsx
│       │   └── admin/
│       │       ├── Dashboard.tsx
│       │       ├── RevenueOverview.tsx
│       │       ├── ManageProducts.tsx
│       │       ├── ManageOrders.tsx
│       │       └── ManageUsers.tsx
│       ├── context/           # React Context (Auth, Cart, Wishlist, Toast)
│       ├── services/          # Axios API service
│       └── lib/               # Supabase client
│
└── backend/                   # Node.js + Express backend
    ├── controllers/           # Route handlers
    ├── models/                # Data models (Supabase)
    ├── routes/                # Express routes
    ├── middleware/            # Auth & upload middleware
    ├── config/                # DB & Supabase config
    └── uploads/               # Product image uploads
```

---

## 🧰 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | — | Type safety |
| Vite | 7 | Build tool & dev server |
| Tailwind CSS | 4 | Utility-first styling |
| Framer Motion | 12 | Animations & transitions |
| React Router DOM | 7 | Client-side routing |
| Axios | 1.x | HTTP requests |
| Recharts | 3 | Charts & data visualization |
| Lucide React | 0.5x | Icon library |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | ≥18 | Runtime |
| Express | 5 | Web framework |
| Supabase JS | 2 | Database client (PostgreSQL) |
| JSON Web Token | 9 | Authentication |
| bcryptjs | 3 | Password hashing |
| Multer | 2 | File/image uploads |
| Helmet | 8 | Security headers |
| CORS | 2 | Cross-origin requests |
| express-rate-limit | 8 | API rate limiting |
| Stripe | 20 | Payment processing |
| HPP | 0.2 | HTTP parameter pollution protection |

### Database
| Technology | Purpose |
|---|---|
| Supabase (PostgreSQL) | Primary database |
| Supabase Auth API | User data via REST API |

---

## 📦 API Endpoints

### Auth
```
POST   /api/auth/register     Register new user
POST   /api/auth/login        Login user
GET    /api/auth/me           Get current user (protected)
```

### Products
```
GET    /api/products          Get all products (public)
GET    /api/products/:id      Get single product (public)
POST   /api/products          Create product (admin)
PUT    /api/products/:id      Update product (admin)
DELETE /api/products/:id      Delete product (admin)
```

### Orders
```
POST   /api/orders            Create order (user)
GET    /api/orders/my         Get my orders (user)
GET    /api/orders            Get all orders (admin)
PUT    /api/orders/:id        Update order status (admin)
DELETE /api/orders/:id        Delete order (admin)
```

### Cart
```
GET    /api/cart              Get cart items
POST   /api/cart              Add to cart
PUT    /api/cart/:id          Update cart item
DELETE /api/cart/:id          Remove from cart
```

### Wishlist
```
GET    /api/wishlist          Get wishlist
POST   /api/wishlist          Add to wishlist
DELETE /api/wishlist/:id      Remove from wishlist
```

### Admin
```
GET    /api/admin/stats              Dashboard statistics
GET    /api/admin/users              All users
GET    /api/admin/orders             All orders
GET    /api/admin/orders/:id         Single order
PUT    /api/admin/orders/:id/status  Update order status
PUT    /api/admin/products/:id/rating Update product rating
```

### Payment
```
POST   /api/payment/create-intent    Create Stripe payment intent
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js ≥ 18
- A [Supabase](https://supabase.com) account with a project

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Grocery_Shop
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-jwt-secret
PAYMENT_KEY=sk_test_your-stripe-key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Database Setup

Run `backend/fresh-setup.sql` in your Supabase SQL Editor to create all tables and seed data.

### 5. Run the project

Backend:
```bash
cd backend
npm start
```

Frontend (in a new terminal):
```bash
cd frontend
npm run dev
```

Open `http://localhost:5173`

---

## 🔐 Default Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@example.com | admin123 |
| User | user@example.com | user123 |

---

## 🗄️ Database Schema

### users
| Column | Type | Description |
|---|---|---|
| id | UUID | Primary key |
| name | TEXT | Full name |
| email | TEXT | Unique email |
| password | TEXT | Hashed password |
| phone | VARCHAR(10) | 10-digit phone |
| role | TEXT | `user` or `admin` |
| address | TEXT | Shipping address |
| created_at | TIMESTAMP | Registration date |

### products
| Column | Type | Description |
|---|---|---|
| id | UUID | Primary key |
| name | TEXT | Product name |
| price | DECIMAL | Current price |
| original_price | DECIMAL | Original/MRP price |
| category | TEXT | Product category |
| brand | TEXT | Brand name |
| stock | INTEGER | Available stock |
| description | TEXT | Product description |
| image_url | TEXT | Product image URL |
| ratings | DECIMAL | Average rating (0-5) |
| num_reviews | INTEGER | Review count |

### orders
| Column | Type | Description |
|---|---|---|
| id | UUID | Primary key |
| order_number | VARCHAR | Unique order ID |
| user_id | UUID | FK → users |
| products | JSONB | Array of ordered items |
| total_amount | DECIMAL | Order total |
| order_status | TEXT | pending/confirmed/delivered |
| payment_status | TEXT | Payment state |
| shipping_address | TEXT | Delivery address |
| payment_id | VARCHAR | Stripe payment ID |
| created_at | TIMESTAMP | Order date |

---

## 🎨 Design System

- **Theme**: Dark slate with emerald green accents
- **Background**: `slate-950` / `slate-900`
- **Primary**: Emerald `#10b981`
- **Cards**: Glassmorphism with `backdrop-blur`
- **Radius**: `rounded-2xl` / `rounded-3xl`
- **Animations**: Framer Motion — fade-in, slide-up, count-up, stagger

---

## 📱 Pages Overview

| Route | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/products` | All Products | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/cart` | Shopping Cart | User |
| `/checkout` | Checkout | User |
| `/payment` | Payment | User |
| `/orders` | My Orders | User |
| `/profile` | Profile | User |
| `/admin/dashboard` | Admin Dashboard | Admin |
| `/admin/revenue` | Revenue Overview | Admin |
| `/admin/products` | Manage Products | Admin |
| `/admin/orders` | Manage Orders | Admin |
| `/admin/users` | Manage Users | Admin |

---

## 🔒 Security Features

- JWT authentication with 30-day expiry
- Auto token expiry detection and logout
- Password hashing with bcryptjs
- Helmet security headers
- CORS protection
- HTTP Parameter Pollution (HPP) prevention
- Rate limiting on API routes (production)
- Role-based route protection (user/admin)

---

## 🚀 Deployment

### Frontend (Vercel / Netlify)
```bash
cd frontend
npm run build
# Deploy the dist/ folder
```

### Backend (Render / Railway)
Set environment variables in your hosting dashboard and deploy the `backend/` folder.

See `DEPLOYMENT.md` for detailed deployment instructions.

---

## 📄 License

MIT License — free to use for personal and commercial projects.
