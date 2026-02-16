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
        
        // Transform field names for frontend compatibility
        return {
            ...result,
            numReviews: result.num_reviews || 0,
            originalPrice: result.original_price || null,
            image: result.image_url || result.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'
        };
    },

    // Get all products
    getAll: async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('name', { ascending: true });

        if (error) throw error;
        
        // Transform field names for frontend compatibility
        return (data || []).map(p => ({
            ...p,
            numReviews: p.num_reviews || 0,
            originalPrice: p.original_price || null,
            image: p.image_url || p.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'
        }));
    },

    // Get product by ID
    getById: async (id) => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        
        // Transform field names for frontend compatibility
        return {
            ...data,
            numReviews: data.num_reviews || 0,
            originalPrice: data.original_price || null,
            image: data.image_url || data.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'
        };
    },

    // Get products by category
    getByCategory: async (category) => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('category', category)
            .order('name', { ascending: true });

        if (error) throw error;
        
        // Transform field names for frontend compatibility
        return (data || []).map(p => ({
            ...p,
            numReviews: p.num_reviews || 0,
            originalPrice: p.original_price || null,
            image: p.image_url || p.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'
        }));
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
        
        // Transform field names for frontend compatibility
        return (data || []).map(p => ({
            ...p,
            numReviews: p.num_reviews || 0,
            originalPrice: p.original_price || null,
            image: p.image_url || p.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'
        }));
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
        
        // Transform field names for frontend compatibility
        return {
            ...result,
            numReviews: result.num_reviews || 0,
            originalPrice: result.original_price || null,
            image: result.image_url || result.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'
        };
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
        
        // Transform field names for frontend compatibility
        return {
            ...result,
            numReviews: result.num_reviews || 0,
            originalPrice: result.original_price || null,
            image: result.image_url || result.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'
        };
    }
};

module.exports = Product;
