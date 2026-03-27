const { supabase } = require('../config/supabaseClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = {
    // Create a new user using Supabase API
    create: async (data) => {
        const { name, email, password, phone, role = 'user', address = '' } = data;
        
        // Check if user already exists
        const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();
        
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user using Supabase API
        const { data: result, error } = await supabase
            .from('users')
            .insert([{
                name, 
                email, 
                password: hashedPassword, 
                phone, 
                role, 
                address
            }])
            .select('id, name, email, phone, role, address')
            .single();

        if (error) throw new Error(error.message);
        return result;
    },

    // Get user by email using Supabase API
    getByEmail: async (email) => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return null;
            }
            throw new Error(error.message);
        }
        return data;
    },

    // Get user by ID using Supabase API
    getById: async (id) => {
        const { data, error } = await supabase
            .from('users')
            .select('id, name, email, phone, role, address')
            .eq('id', id)
            .single();

        if (error) throw new Error(error.message);
        return data;
    },

    // Generate JWT token
    generateToken: (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
    },

    // Verify password
    verifyPassword: async (enteredPassword, hashedPassword) => {
        return await bcrypt.compare(enteredPassword, hashedPassword);
    },

    // Get all users using Supabase API
    getAll: async () => {
        const { data, error } = await supabase
            .from('users')
            .select('id, name, email, phone, role, address, created_at')
            .order('created_at', { ascending: false });

        if (error) throw new Error(error.message);
        return data;
    }
};

module.exports = User;
