const bcrypt = require('bcryptjs');

async function generatePasswords() {
    const password123 = await bcrypt.hash('password123', 10);
    const admin123 = await bcrypt.hash('admin123', 10);
    
    console.log('Password for "password123":', password123);
    console.log('Password for "admin123":', admin123);
}

generatePasswords();
                                                                                                                                                                                                                                                                                                                