const { supabase } = require('../config/supabaseClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = {
    // Query helper
    query: async (text, params) => {
        // For Supabase, we use the client directly
        // This is a placeholder for compatibility
        return { rows: [] };
    },

    // Create a new user
    create: async (data) => {
        const { name, email, password, role = 'user', address = '' } = data;
        
        // Check if user already exists
        const existingUser = await User.getByEmail(email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const { data: result, error } = await supabase
            .from('users')
            .insert([{
                name, email, password: hashedPassword, role, address
            }])
            .select('id, name, email, role, address')
            .single();

        if (error) throw error;
        return result;
    },

    // Get user by email
    getByEmail: async (email) => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        return data;
    },

    // Get user by ID
    getById: async (id) => {
        const { data, error } = await supabase
            .from('users')
            .select('id, name, email, role, address')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    // Generate JWT token
    generateToken: (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
    },

    // Verify password
    verifyPassword: async (enteredPassword, hashedPassword) => {
        return await bcrypt.compare(enteredPassword, hashedPassword);
    }
};

module.exports = User;
