# Admin Dashboard - User & Product Details

## Overview
The admin dashboard at `/admin/dashboard` displays comprehensive information about users and products.

## 📊 Dashboard Statistics (Top Cards)
1. **Total Revenue** - Sum of all completed orders
2. **Total Orders** - Number of orders placed
3. **Active Users** - Total registered users
4. **Products** - Total products in inventory

## 📈 Revenue Chart
- Shows revenue for the last 7 days
- Interactive area chart with daily breakdown
- Hover to see exact amounts per day

---

## 👥 USER DETAILS SECTION

### User Table Columns:
1. **Name** - Full name with avatar (first letter)
2. **Email** - User's email address
3. **Phone** - 10-digit phone number
4. **Role** - Badge showing "user" or "admin"
5. **Joined** - Account creation date (formatted)
6. **Actions** - View details button (eye icon)

### User Details Modal (Click Eye Icon):
When you click the eye icon on any user, a modal shows:

#### Contact Information:
- 📧 **Email Address** - Full email with icon
- 📱 **Phone Number** - 10-digit phone with icon
- 📍 **Address** - User's delivery address (if provided)

#### Account Information:
- 📅 **Member Since** - Full date when account was created
- 👤 **User ID** - Unique identifier (first 8 characters)
- 🛡️ **Role Badge** - Visual indicator of user/admin status

### User Search:
- Search by name, email, or phone number
- Real-time filtering
- Case-insensitive

---

## 📦 PRODUCT DETAILS SECTION

### Product Table Columns:
1. **Product** - Image thumbnail + name + product ID
2. **Category** - Badge showing category (Vegetables, Fruits, Dairy)
3. **Price** - Current selling price in dollars
4. **Stock** - Quantity available with status indicator:
   - 🟢 Green dot = Stock > 10 units
   - 🔴 Red dot (pulsing) = Stock ≤ 10 units (low stock alert)
5. **Actions** - Edit and Delete buttons

### Product Information Displayed:
- **Product Image** - 48x48px thumbnail
- **Product Name** - Full product name
- **Product ID** - Last 6 characters of MongoDB ID
- **Category** - Uppercase badge with border
- **Price** - Green text with $ symbol
- **Stock Level** - Number of units with visual indicator

### Product Search:
- Search by product name or category
- Real-time filtering
- Case-insensitive

### Product Actions:
- ✏️ **Edit** - Edit product details (button available)
- 🗑️ **Delete** - Remove product with confirmation dialog

---

## 🔄 Auto-Refresh Features

1. **Automatic Refresh** - Data refreshes every 30 seconds
2. **Focus Refresh** - Refreshes when you return to the browser tab
3. **Manual Refresh** - Click the "Refresh" button anytime
4. **Loading States** - Shows spinner during refresh

---

## 📱 Responsive Design

- Mobile-friendly layout
- Scrollable tables on small screens
- Touch-friendly buttons
- Adaptive grid for stat cards

---

## 🎨 Visual Features

### User Section:
- Gradient avatar circles with user initials
- Color-coded role badges (purple for admin, gray for user)
- Hover effects on table rows
- Smooth modal animations

### Product Section:
- Product image thumbnails with rounded corners
- Stock status indicators (green/red dots)
- Category badges with custom styling
- Hover effects on action buttons

---

## 🔐 Security

- Only accessible to admin users
- Protected by authentication middleware
- JWT token required for all API calls
- Role-based access control

---

## 📊 Data Displayed

### For Each User:
```
{
  id: "uuid",
  name: "John Doe",
  email: "john@example.com",
  phone: "9876543210",
  role: "user",
  address: "123 Main St",
  created_at: "2024-01-01T00:00:00.000Z"
}
```

### For Each Product:
```
{
  _id: "mongodb_id",
  name: "Fresh Organic Tomatoes",
  category: "Vegetables",
  price: 4.99,
  stock: 100,
  image: "https://...",
  description: "Premium quality...",
  brand: "Organic Farm",
  ratings: 4.5,
  num_reviews: 128
}
```

---

## 🚀 Quick Actions

1. **Add New Product** - Green button at top right
2. **View User Details** - Click eye icon on any user
3. **Search Users** - Type in search bar above user table
4. **Search Products** - Type in search bar above product table
5. **Delete Product** - Click trash icon (with confirmation)
6. **Refresh Data** - Click refresh button at top

---

## 📝 Notes

- All data is fetched from the backend API
- Users table shows all registered users (not just customers)
- Products table shows all products in the database
- Empty states shown when no data matches search
- Console logs available for debugging (F12)

---

## 🎯 Access

**URL:** `/admin/dashboard`

**Required Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

**Required Role:** Admin

---

## 🔧 API Endpoints Used

1. `GET /api/admin/stats` - Dashboard statistics
2. `GET /api/products?limit=100` - All products
3. `GET /api/admin/users` - All users
4. `DELETE /api/products/:id` - Delete product

All endpoints require admin authentication.
