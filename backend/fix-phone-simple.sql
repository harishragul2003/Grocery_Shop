-- Simple fix: Delete all users and start fresh
-- This is the easiest solution if you don't have important user data

-- Delete all existing users
DELETE FROM users;

-- Now insert demo users with valid 10-digit phone numbers
INSERT INTO users (name, email, password, phone, role) VALUES
('John Doe', 'john@example.com', '$2b$10$0/4bBp9vSZ1Q1OfdTuAd0..AWeivrLRgxIMzJ2Z9OLQDpQyY0ujQS', '9876543210', 'user'),
('Admin User', 'admin@example.com', '$2b$10$tVmbi.6ZoKf7NxqaDco.WeezP6u4ieu5Z72UQPHwFH1A53T7sOFmO', '9876543211', 'admin'),
('Jane Smith', 'jane@example.com', '$2b$10$0/4bBp9vSZ1Q1OfdTuAd0..AWeivrLRgxIMzJ2Z9OLQDpQyY0ujQS', '9876543212', 'user');

-- Make phone NOT NULL
ALTER TABLE users ALTER COLUMN phone SET NOT NULL;

-- Add constraint to ensure phone is exactly 10 digits
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_phone_check;
ALTER TABLE users ADD CONSTRAINT users_phone_check CHECK (phone ~ '^\d{10}$');

-- Reload Supabase schema cache
NOTIFY pgrst, 'reload schema';
