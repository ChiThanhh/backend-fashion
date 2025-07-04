const supabase = require('../config/supabaseClient');

exports.getProducts = async () => {
  const { data, error } = await supabase.from('products').select('*');
  return { data, error };
};

exports.getProductById = async (id) => {
  const { data, error } = await supabase.from('products').select('*').eq('product_id', id);
  return { data, error };
};

exports.createProduct = async (product) => {
  const { data, error } = await supabase.from('products').insert(product).select().single();
  return { data, error };
};

exports.updateProduct = async (id, product) => {
  const { data, error } = await supabase.from('products').update(product).eq('product_id', id).select().single();
  return { data, error };
};

exports.deleteProduct = async (id) => {
  const { data, error } = await supabase.from('products').delete().eq('product_id', id);
  return { data, error };
};
