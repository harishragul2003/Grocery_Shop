const { supabase } = require('../config/supabaseClient');

const Product = {
    // Query helper
    query: async (text, params) => {
        // For Supabase, we use the client directly
        // This is a placeholder for compatibility
        return { rows: [] };
    },

    // Create a new product
    create: async (data) => {
        const { name, price, category, image_url, stock, description, brand, ratings, num_reviews, original_price } = data;
        const { data: result, error } = await supabase
            .from('products')
            .insert([{
                name, price, category, image_url, stock,
                description, brand, ratings: ratings || 0,
                num_reviews: num_reviews || 0, original_price
            }])
            .select()
            .single();

        if (error) throw error;
        return result;
    },

    // Get all products
    getAll: async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('name', { ascending: true });

        if (error) throw error;
        return data || [];
    },

    // Get product by ID
    getById: async (id) => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    // Get products by category
    getByCategory: async (category) => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('category', category)
            .order('name', { ascending: true });

        if (error) throw error;
        return data || [];
    },

    // Search products
    search: async (searchTerm) => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .ilike('name', `%${searchTerm}%`)
            .or(`category.ilike.%${searchTerm}%`)
            .order('name', { ascending: true });

        if (error) throw error;
        return data || [];
    },

    // Update product
    update: async (id, data) => {
        const { name, price, category, image_url, stock, description, brand, ratings, num_reviews, original_price } = data;
        const { data: result, error } = await supabase
            .from('products')
            .update({
                name, price, category, image_url, stock,
                description, brand, ratings, num_reviews, original_price
            })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return result;
    },

    // Delete product
    delete: async (id) => {
        const { data: result, error } = await supabase
            .from('products')
            .delete()
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return result;
    }
};

module.exports = Product;
