# 🛒 Grocery Shop - Deployment Guide

This guide covers the steps to take your MERN stack application from local development to production.

## 1. Database (MongoDB Atlas)
1.  Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Create a new Cluster and a Database User.
3.  Whitelist `0.0.0.0/0` (or the IP of your hosting provider) in Network Access.
4.  Copy your **Connection String**.

## 2. Backend (Render / Railway)
1.  Push your code to a GitHub repository.
2.  Connect your repo to **Render** (New > Web Service) or **Railway**.
3.  **Root Directory**: `backend`
4.  **Build Command**: `npm install`
5.  **Start Command**: `npm start`
6.  **Environment Variables**:
    *   `PORT`: `5000`
    *   `MONGO_URL`: (Your Atlas Connection String)
    *   `JWT_SECRET`: (A long random string)
    *   `PAYMENT_KEY`: (Your Stripe Secret Key)
    *   `NODE_ENV`: `production`
    *   `CLIENT_URL`: (Your deployed frontend URL)

## 3. Frontend (Vercel / Netlify)
1.  Connect your GitHub repo to **Vercel** or **Netlify**.
2.  **Root Directory**: `frontend`
3.  **Framework Preset**: `Vite`
4.  **Build Command**: `npm run build`
5.  **Output Directory**: `dist`
6.  **Environment Variables**:
    *   `VITE_API_BASE_URL`: (Your deployed backend URL + `/api`) 
        *   *Example: `https://my-backend.onrender.com/api`*

## 4. Post-Deployment Checklist
*   Update your Stripe dashboard with the production URLs.
*   Ensure CORS in `backend/server.js` allows your frontend domain.
*   Verify image uploads (Note: For persistent production uploads, consider using Cloudinary or AWS S3 as Render's disk is ephemeral).

---
**Happy Selling! 🍎🥦**
