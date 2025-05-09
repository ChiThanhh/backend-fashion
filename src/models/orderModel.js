const supabase = require('../config/supabaseClient');

// Lấy tất cả đơn hàng
exports.getOrders = async () => {
  const { data, error } = await supabase.from('orders').select('*');
  return { data, error };
};

// Lấy đơn hàng theo ID
exports.getOrderById = async (id) => {
  const { data, error } = await supabase.from('orders').select('*').eq('order_id', id).single();
  return { data, error };
};

// Tạo đơn hàng mới
exports.createOrder = async (order) => {
  const { data, error } = await supabase.from('orders').insert(order).select().single();
  return { data, error };
};

// Cập nhật đơn hàng
exports.updateOrder = async (id, order) => {
  const { data, error } = await supabase.from('orders').update(order).eq('order_id', id).select().single();
  return { data, error };
};

// Xóa đơn hàng
exports.deleteOrder = async (id) => {
  const { data, error } = await supabase.from('orders').delete().eq('order_id', id);
  return { data, error };
};
