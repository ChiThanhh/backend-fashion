const supabase = require('../config/supabaseClient');

// Lấy tất cả các đơn thanh toán
exports.getCheckouts = async () => {
  const { data, error } = await supabase.from('checkouts').select('*');
  return { data, error };
};

// Lấy chi tiết đơn thanh toán theo ID
exports.getCheckoutById = async (id) => {
  const { data, error } = await supabase.from('checkouts').select('*').eq('checkout_id', id);
  return { data, error };
};

// Tạo mới đơn thanh toán
exports.createCheckout = async (checkout) => {
  const { data, error } = await supabase.from('checkouts').insert(checkout).select().single();
  return { data, error };
};

// Cập nhật đơn thanh toán
exports.updateCheckout = async (id, checkout) => {
  const { data, error } = await supabase.from('checkouts').update(checkout).eq('checkout_id', id).select().single();
  return { data, error };
};

// Xóa đơn thanh toán
exports.deleteCheckout = async (id) => {
  const { data, error } = await supabase.from('checkouts').delete().eq('checkout_id', id);
  return { data, error };
};
