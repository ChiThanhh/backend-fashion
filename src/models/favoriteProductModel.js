const supabase = require('../config/supabaseClient');

exports.getFavoriteProducts = async () => {
  const { data, error } = await supabase.from('favorite_products').select('*');  
  return { data, error };
};

exports.getFavoriteProductById = async (id) => {
  const { data, error } = await supabase.from('favorite_products').select('*').eq('favorite_id', id);
  return { data, error };
};

exports.createFavoriteProduct = async (favoriteProduct) => {
  const { data, error } = await supabase.from('favorite_products').insert(favoriteProduct).select().single(); 
  return { data, error };
};

exports.updateFavoriteProduct = async (id, favoriteProduct) => {
  const { data, error } = await supabase.from('favorite_products').update(favoriteProduct).eq('favorite_id', id).select().single();  
  return { data, error };
};

exports.deleteFavoriteProduct = async (id) => {
  const { data, error } = await supabase.from('favorite_products').delete().eq('favorite_id', id);  
  return { data, error };
};
