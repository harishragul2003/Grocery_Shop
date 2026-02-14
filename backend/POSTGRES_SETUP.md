# PostgreSQL Setup Guide

## Step 1: Create Tables in Supabase

1. Go to your Supabase dashboard → SQL Editor
2. Copy and paste the contents of `backend/setup.sql`
3. Click "Run" to execute the SQL script

This will create:
- `users` table with columns: id, name, email, password, role, address, wishlist
- `products` table with columns: id, name, price, category, image_url, stock, description, brand, ratings, num_reviews, original_price

## Step 2: Generate bcrypt Hash for Demo Users

Run this in Node.js to generate proper password hashes:

```javascript
const bcrypt = require('bcryptjs');

async function generateHash() {
    const hash = await bcrypt.hash('password123', 10);
    console.log(hash);
}

generateHash();
```

Replace the placeholder hashes in `setup.sql` with the actual hashes.

## Step 3: Update Environment Variables

The `.env` file already has the PostgreSQL connection string:
```
POSTGRES_URL=postgresql://postgres:NatureCart@123@db.cwabbcmwodzxtkcduvoo.supabase.co:5432/postgres
```

## Step 4: Start the Backend Server

```bash
cd backend
npm start
```

## Step 5: Test the API

The backend is now connected to PostgreSQL. You can test the endpoints:

- `GET /api/products` - Get all products
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login

## Notes

- The backend now uses PostgreSQL instead of MongoDB
- All models have been updated to use the `pg` library
- The `query` helper function is available in `config/db.js`
- Row Level Security (RLS) is disabled by default for easier development
