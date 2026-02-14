const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const connectDB = async () => {
    // Try to connect to PostgreSQL, but don't fail if it doesn't work
    // The app will use Supabase instead
    if (!process.env.POSTGRES_URL) {
        console.log('⚠️  PostgreSQL not configured, using Supabase instead');
        return;
    }

    try {
        const client = await pool.connect();
        console.log(`✅ PostgreSQL Connected`);

        client.release();

        // Handle connection errors
        pool.on('error', (err) => {
            console.error(`❌ PostgreSQL connection error: ${err.message}`);
        });

    } catch (error) {
        console.log('⚠️  PostgreSQL connection failed, using Supabase instead');
        console.log('Error:', error.message);
    }
};

// Query helper function
const query = async (text, params) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query', { text, duration, rows: res.rowCount });
        return res;
    } catch (error) {
        console.error('Error executing query', { text, params, error });
        throw error;
    }
};

module.exports = { connectDB, query };
