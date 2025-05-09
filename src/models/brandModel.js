const supabase = require('../config/supabaseClient');

exports.getBrands = async () => {
  const { data, error } = await supabase.from('brands').select('*');
  return { data, error };
};

exports.getBrandById = async (id) => {
  const { data, error } = await supabase.from('brands').select('*').eq('id', id);
  return { data, error };
};

exports.createBrand = async (brand) => {
  const { data, error } = await supabase.from('brands').insert(brand);
  return { data, error };
};

exports.updateBrand = async (id, brand) => {
  const { data, error } = await supabase.from('brands').update(brand).eq('id', id);
  return { data, error };
};

exports.deleteBrand = async (id) => {
  const { data, error } = await supabase.from('brands').delete().eq('id', id);
  return { data, error };
};
