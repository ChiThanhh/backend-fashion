const supabase = require('../config/supabaseClient');

exports.getOrderItems = async () => {
  const { data, error } = await supabase.from('order_items').select('*');
  return { data, error };
};

exports.getOrderItemById = async (id) => {
  const { data, error } = await supabase.from('order_items').select('*').eq('id', id).single();
  return { data, error };
};

exports.createOrderItem = async (item) => {
  const { data, error } = await supabase.from('order_items').insert(item).select().single();
  return { data, error };
};

exports.updateOrderItem = async (id, item) => {
  const { data, error } = await supabase.from('order_items').update(item).eq('id', id).select().single();
  return { data, error };
};

exports.deleteOrderItem = async (id) => {
  const { data, error } = await supabase.from('order_items').delete().eq('id', id);
  return { data, error };
};
