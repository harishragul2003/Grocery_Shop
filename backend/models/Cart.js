const { supabase } = require('../config/supabaseClient');

const Cart = {
    // Query helper
    query: async (text, params) => {
        return { rows: [] };
    },

    // Get cart by user
    getByUser: async (userId) => {
        const { data, error } = await supabase
            .from('carts')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        return data || { items: [] };
    },

    // Create or update cart
    upsert: async (userId, items) => {
        const { data: existingCart, error: fetchError } = await supabase
            .from('carts')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

        if (existingCart) {
            // Update existing cart
            const { data: result, error } = await supabase
                .from('carts')
                .update({ items })
                .eq('user_id', userId)
                .select()
                .single();

            if (error) throw error;
            return result;
        } else {
            // Create new cart
            const { data: result, error } = await supabase
                .from('carts')
                .insert([{ user_id: userId, items }])
                .select()
                .single();

            if (error) throw error;
            return result;
        }
    },

    // Add item to cart
    addItem: async (userId, productId, qty = 1) => {
        const cart = await Cart.getByUser(userId);
        const existingItem = cart.items.find(item => item.product_id === productId);

        if (existingItem) {
            existingItem.qty += qty;
        } else {
            cart.items.push({ product_id: productId, qty });
        }

        return await Cart.upsert(userId, cart.items);
    },

    // Remove item from cart
    removeItem: async (userId, productId) => {
        const cart = await Cart.getByUser(userId);
        cart.items = cart.items.filter(item => item.product_id !== productId);
        return await Cart.upsert(userId, cart.items);
    },

    // Clear cart
    clear: async (userId) => {
        return await Cart.upsert(userId, []);
    }
};

module.exports = Cart;
