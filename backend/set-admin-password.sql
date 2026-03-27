-- Set admin password to "admin123"
-- Run this in Supabase SQL Editor if you're having login issues

UPDATE users 
SET password = '$2b$10$tVmbi.6ZoKf7NxqaDco.WeezP6u4ieu5Z72UQPHwFH1A53T7sOFmO' 
WHERE email = 'admin@example.com';

-- Verify the update
SELECT email, role, name FROM users WHERE email = 'admin@example.com';

-- Password is: admin123
