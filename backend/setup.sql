-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    address TEXT DEFAULT '',
    wishlist JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_users_updated_at();

-- Insert sample users (password is 'password123' hashed with bcrypt)
-- For demo purposes, you can use these credentials:
-- User: john@example.com / password123
-- Admin: admin@example.com / admin123

-- Insert demo users
INSERT INTO users (name, email, password, role) VALUES
('John Doe', 'john@example.com', '$2b$10$0/4bBp9vSZ1Q1OfdTuAd0..AWeivrLRgxIMzJ2Z9OLQDpQyY0ujQS', 'user'),
('Admin User', 'admin@example.com', '$2b$10$tVmbi.6ZoKf7NxqaDco.WeezP6u4ieu5Z72UQPHwFH1A53T7sOFmO', 'admin'),
('Jane Smith', 'jane@example.com', '$2b$10$0/4bBp9vSZ1Q1OfdTuAd0..AWeivrLRgxIMzJ2Z9OLQDpQyY0ujQS', 'user');

-- Note: To generate a proper bcrypt hash, run this in Node.js:
-- const bcrypt = require('bcryptjs');
-- const hash = await bcrypt.hash('password123', 10);
-- Replace the placeholder hashes above with actual hashes
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    stock INTEGER DEFAULT 0,
    description TEXT,
    brand TEXT,
    ratings NUMERIC(3, 2) DEFAULT 0,
    num_reviews INTEGER DEFAULT 0,
    original_price NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);

-- Enable Row Level Security (RLS) - optional, for production
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Insert sample products
INSERT INTO products (name, price, category, image_url, stock, description, brand, ratings, num_reviews, original_price) VALUES
-- Vegetables
('Fresh Organic Tomatoes', 4.99, 'Vegetables', 'https://images.unsplash.com/photo-1546470427-e5ac89c8ba3b?auto=format&fit=crop&q=80&w=800', 100, 'Premium quality organic tomatoes, perfect for salads and cooking', 'Organic Farm', 4.5, 128, 6.99),
('Organic Spinach', 3.49, 'Vegetables', 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=800', 80, 'Fresh organic baby spinach leaves, perfect for salads', 'Green Fields', 4.3, 112, 4.49),
('Organic Carrots', 3.99, 'Vegetables', 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=800', 120, 'Fresh organic carrots, perfect for snacking and cooking', 'Organic Farm', 4.6, 87, 5.49),
('Fresh Bell Peppers', 5.99, 'Vegetables', 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&q=80&w=800', 60, 'Colorful bell peppers, rich in vitamins and perfect for stir-fries', 'Fresh Valley', 4.4, 76, 7.49),
('Organic Broccoli', 4.49, 'Vegetables', 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&q=80&w=800', 50, 'Fresh organic broccoli crowns, packed with nutrients', 'Green Fields', 4.2, 94, 5.99),
('Red Onions', 2.99, 'Vegetables', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800', 90, 'Fresh red onions, essential for cooking and salads', 'Farm Fresh', 4.1, 65, 3.99),
('Fresh Cucumbers', 3.49, 'Vegetables', 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&q=80&w=800', 70, 'Crisp and refreshing cucumbers, perfect for salads', 'Fresh Valley', 4.3, 82, 4.49),
('Baby Potatoes', 4.99, 'Vegetables', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800', 85, 'Small tender potatoes, perfect for roasting', 'Farm Fresh', 4.5, 103, 6.49),

-- Fruits
('Fresh Bananas', 2.99, 'Fruits', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=800', 150, 'Sweet and ripe bananas, rich in potassium and perfect for smoothies', 'Fresh Valley', 4.8, 95, 3.99),
('Fresh Strawberries', 6.99, 'Fruits', 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=800', 40, 'Sweet and juicy strawberries, perfect for desserts', 'Fresh Valley', 4.9, 156, 8.99),
('Avocados', 5.99, 'Fruits', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=800', 60, 'Ripe and creamy avocados, perfect for toast and salads', 'Fresh Valley', 4.6, 167, 7.99),
('Organic Blueberries', 8.99, 'Fruits', 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&q=80&w=800', 30, 'Antioxidant-rich organic blueberries, perfect for smoothies', 'Organic Farm', 4.9, 189, 10.99),
('Red Apples', 4.99, 'Fruits', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=800', 100, 'Crisp and sweet red apples, perfect for snacking', 'Orchard Fresh', 4.7, 142, 6.49),
('Fresh Oranges', 5.49, 'Fruits', 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&q=80&w=800', 80, 'Juicy oranges packed with vitamin C', 'Citrus Grove', 4.5, 118, 6.99),
('Fresh Grapes', 7.99, 'Fruits', 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&q=80&w=800', 50, 'Sweet seedless grapes, perfect for snacking', 'Vineyard Select', 4.6, 134, 9.49),
('Fresh Mangoes', 3.99, 'Fruits', 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=800', 70, 'Tropical mangoes, sweet and juicy when ripe', 'Tropical Fruits', 4.8, 176, 5.49),

-- Dairy
('Organic Whole Milk', 5.49, 'Dairy', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=800', 120, 'Fresh organic whole milk from grass-fed cows, rich and creamy', 'Pure Dairy', 4.7, 203, 6.99),
('Greek Yogurt', 4.99, 'Dairy', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800', 80, 'Creamy Greek yogurt, high in protein and probiotics', 'Mediterranean', 4.7, 184, 6.49),
('Organic Eggs', 7.99, 'Dairy', 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80&w=800', 60, 'Free-range organic eggs from happy hens', 'Pure Dairy', 4.8, 234, 9.99),
('Cheddar Cheese', 8.99, 'Dairy', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=80&w=800', 40, 'Sharp cheddar cheese, perfect for sandwiches and cooking', 'Artisan Cheese', 4.6, 156, 10.99),
('Fresh Butter', 6.49, 'Dairy', 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=800', 90, 'Creamy unsalted butter, perfect for baking and cooking', 'Pure Dairy', 4.5, 98, 7.99),
('Mozzarella Cheese', 7.99, 'Dairy', 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=800', 50, 'Fresh mozzarella cheese, perfect for pizza and caprese', 'Italian Cheese Co', 4.7, 143, 9.49),
('Low-Fat Milk', 4.99, 'Dairy', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=800', 100, '2% low-fat milk, perfect for cereal and coffee', 'Pure Dairy', 4.5, 167, 6.49),
('Sour Cream', 3.49, 'Dairy', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800', 70, 'Tangy sour cream, perfect for dips and toppings', 'Pure Dairy', 4.4, 112, 4.99);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
