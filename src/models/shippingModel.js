const supabase = require('../config/supabaseClient');

exports.getShippings = async () => {
  const { data, error } = await supabase.from('shippings').select('*');
  return { data, error };
};

exports.getShippingById = async (id) => {
  const { data, error } = await supabase.from('shippings').select('*').eq('id', id).single();
  return { data, error };
};

exports.createShipping = async (shipping) => {
  const { data, error } = await supabase.from('shippings').insert(shipping).select().single();
  return { data, error };
};

exports.updateShipping = async (id, shipping) => {
  const { data, error } = await supabase.from('shippings').update(shipping).eq('id', id).select().single();
  return { data, error };
};

exports.deleteShipping = async (id) => {
  const { data, error } = await supabase.from('shippings').delete().eq('id', id);
  return { data, error };
};
