const { supabase } = require('./config/supabaseClient');
const bcrypt = require('bcryptjs');

async function insertUsers() {
    const password123 = await bcrypt.hash('password123', 10);
    const admin123 = await bcrypt.hash('admin123', 10);

    const users = [
        { name: 'John Doe', email: 'john@example.com', password: password123, role: 'user' },
        { name: 'Admin User', email: 'admin@example.com', password: admin123, role: 'admin' },
        { name: 'Jane Smith', email: 'jane@example.com', password: password123, role: 'user' }
    ];

    for (const user of users) {
        const { data, error } = await supabase
            .from('users')
            .upsert(user, { onConflict: 'email' })
            .select();

        if (error) {
            console.error(`Error inserting ${user.email}:`, error);
        } else {
            console.log(`Inserted/Updated user: ${user.email}`);
        }
    }

    console.log('Done!');
    process.exit(0);
}

insertUsers();
