# User Management in Admin Dashboard

## ✅ Already Implemented

Your admin dashboard already has a complete user management system! Here's what's working:

### Backend (Already Done)
- ✅ `/api/admin/users` endpoint exists in `backend/routes/adminRoutes.js`
- ✅ `getAllUsers()` controller in `backend/controllers/adminController.js`
- ✅ `User.getAll()` method returns all user data including phone numbers
- ✅ Protected with authentication middleware (admin only)
- ✅ Updated to use direct PostgreSQL queries for consistency

### Frontend (Already Done)
- ✅ Users table in Admin Dashboard (`frontend/src/pages/admin/Dashboard.tsx`)
- ✅ Displays: Name, Email, Phone, Role, Join Date
- ✅ Search functionality for users
- ✅ User details modal with full information
- ✅ Auto-refresh every 30 seconds
- ✅ Manual refresh button
- ✅ Beautiful UI with icons and styling

## Features

### User Table Columns
1. **Name** - With avatar initial
2. **Email** - User's email address
3. **Phone** - 10-digit phone number
4. **Role** - User or Admin badge
5. **Joined** - Account creation date
6. **Actions** - View details button

### User Details Modal
When clicking the "View Details" (eye icon) button, a modal shows:
- User avatar with initial
- Full name and role badge
- Contact information (email, phone, address)
- Account information (member since, user ID)

### Search & Filter
- Real-time search by name, email, or phone number
- Case-insensitive search
- Instant results

### Auto-Refresh
- Automatically refreshes data every 30 seconds
- Refreshes when window regains focus
- Manual refresh button available

## How to Use

1. **Login as Admin**
   - Email: `admin@example.com`
   - Password: `password123`

2. **Navigate to Admin Dashboard**
   - Go to `/admin/dashboard`

3. **View All Users**
   - Scroll down to the "All Users" section
   - See all registered users with their details

4. **Search Users**
   - Use the search bar to filter by name, email, or phone

5. **View User Details**
   - Click the eye icon to see full user information
   - View contact details and account info

## New User Registration

When a new user registers:
1. They must provide: Name, Email, Password, and Phone (10 digits)
2. Phone number is validated on frontend (only digits, max 10)
3. Phone number is validated on backend (regex check)
4. Phone number is validated in database (CHECK constraint)
5. User appears immediately in admin dashboard
6. Admin can view all their details

## Database Schema

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone TEXT NOT NULL CHECK (phone ~ '^\d{10}$'),
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    address TEXT DEFAULT '',
    wishlist JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## API Endpoints

### Get All Users (Admin Only)
```
GET /api/admin/users
Authorization: Bearer <admin_token>

Response:
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "role": "user",
      "address": "",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## Testing

1. **Create a new user:**
   - Go to `/register`
   - Fill in: Name, Email, Password, Phone (10 digits)
   - Submit

2. **View in admin dashboard:**
   - Login as admin
   - Go to `/admin/dashboard`
   - Scroll to "All Users" section
   - See the new user listed

3. **Search for user:**
   - Type name, email, or phone in search bar
   - See filtered results

4. **View user details:**
   - Click eye icon on any user
   - See full details in modal

## Notes

- All users are visible to admin immediately after registration
- Phone numbers must be exactly 10 digits
- User passwords are hashed with bcrypt
- Admin role is protected and can only be set in database
- The system uses direct PostgreSQL queries for reliability
