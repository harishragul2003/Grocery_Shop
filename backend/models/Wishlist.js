const { supabase } = require('../config/supabaseClient');

const Wishlist = {
    // Query helper
    query: async (text, params) => {
        return { rows: [] };
    },

    // Get wishlist by user
    getByUser: async (userId) => {
        const { data, error } = await supabase
            .from('wishlists')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        return data || { items: [] };
    },

    // Add item to wishlist
    addItem: async (userId, productId) => {
        const wishlist = await Wishlist.getByUser(userId);
        
        if (wishlist.items.includes(productId)) {
            return wishlist; // Already exists
        }

        wishlist.items.push(productId);
        return await Wishlist.upsert(userId, wishlist.items);
    },

    // Remove item from wishlist
    removeItem: async (userId, productId) => {
        const wishlist = await Wishlist.getByUser(userId);
        wishlist.items = wishlist.items.filter(id => id !== productId);
        return await Wishlist.upsert(userId, wishlist.items);
    },

    // Check if item is in wishlist
    isInWishlist: async (userId, productId) => {
        const wishlist = await Wishlist.getByUser(userId);
        return wishlist.items.includes(productId);
    },

    // Upsert wishlist
    upsert: async (userId, items) => {
        const { data: existingWishlist, error: fetchError } = await supabase
            .from('wishlists')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

        if (existingWishlist) {
            const { data: result, error } = await supabase
                .from('wishlists')
                .update({ items })
                .eq('user_id', userId)
                .select()
                .single();

            if (error) throw error;
            return result;
        } else {
            const { data: result, error } = await supabase
                .from('wishlists')
                .insert([{ user_id: userId, items }])
                .select()
                .single();

            if (error) throw error;
            return result;
        }
    }
};

module.exports = Wishlist;
