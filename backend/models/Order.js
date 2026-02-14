const { supabase } = require('../config/supabaseClient');

const Order = {
    // Query helper
    query: async (text, params) => {
        return { rows: [] };
    },

    // Create a new order
    create: async (data) => {
        const { userId, products, totalAmount, paymentStatus, orderStatus, shippingAddress, paymentId } = data;
        const { data: result, error } = await supabase
            .from('orders')
            .insert([{
                user_id: userId,
                products,
                total_amount: totalAmount,
                payment_status: paymentStatus,
                order_status: orderStatus,
                shipping_address: shippingAddress,
                payment_id: paymentId
            }])
            .select()
            .single();

        if (error) throw error;
        return result;
    },

    // Get all orders
    getAll: async () => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    // Get order by ID
    getById: async (id) => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    // Get orders by user
    getByUser: async (userId) => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    // Update order
    update: async (id, data) => {
        const { paymentStatus, orderStatus, shippingAddress } = data;
        const { data: result, error } = await supabase
            .from('orders')
            .update({
                payment_status: paymentStatus,
                order_status: orderStatus,
                shipping_address: shippingAddress
            })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return result;
    },

    // Delete order
    delete: async (id) => {
        const { data: result, error } = await supabase
            .from('orders')
            .delete()
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return result;
    }
};

module.exports = Order;
