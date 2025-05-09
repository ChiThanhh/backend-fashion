const supabase = require('../config/supabaseClient');

exports.getCategories = async () => {
  const { data, error } = await supabase.from('categories').select('*');
  return { data, error };
};

exports.getCategoryById = async (id) => {
  const { data, error } = await supabase.from('categories').select('*').eq('category_id', id);
  return { data, error };
};

exports.createCategory = async (category) => {
  const { data, error } = await supabase.from('categories').insert(category);
  return { data, error };
};

exports.updateCategory = async (id, category) => {
  const { data, error } = await supabase.from('categories').update(category).eq('category_id', id);
  return { data, error };
};

exports.deleteCategory = async (id) => {
  const { data, error } = await supabase.from('categories').delete().eq('category_id', id);
  return { data, error };
};
