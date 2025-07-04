const supabase = require('../config/supabaseClient'); 

exports.getCarts = async () => {
  const { data, error } = await supabase.from('carts').select('*');
  return { data, error };
};

exports.getCartById = async (id) => {
  const { data, error } = await supabase.from('carts').select('*').eq('cart_id', id);
  return { data, error };
};

exports.createCart = async (cart) => {
  const { data, error } = await supabase.from('carts').insert(cart).select().single();
  return { data, error };
};

exports.updateCart = async (id, cart) => {
  const { data, error } = await supabase.from('carts').update(cart).eq('cart_id', id).select().single();
  return { data, error };
};

exports.deleteCart = async (id) => {
  const { data, error } = await supabase.from('carts').delete().eq('cart_id', id); 
  return { data, error };
};
