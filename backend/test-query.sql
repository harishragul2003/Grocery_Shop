-- Test query to check if tables exist and have data
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'products' as table_name, COUNT(*) as count FROM products;
