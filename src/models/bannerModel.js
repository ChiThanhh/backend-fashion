const supabase = require('../config/supabaseClient');

exports.getSliders = async () => {
  const { data, error } = await supabase.from('banners').select('*');
  return { data, error };
};

exports.getSliderById = async (id) => {
  const { data, error } = await supabase.from('banners').select('*').eq('banner_id', id);
  return { data, error };
};

exports.createSlider = async (slider) => {
  const { data, error } = await supabase.from('banners').insert(slider).select().single();
  return { data, error };
};

exports.updateSlider = async (id, slider) => {
  const { data, error } = await supabase.from('banners').update(slider).eq('banner_id', id).select().single();
  return { data, error };
};

exports.deleteSlider = async (id) => {
  const { data, error } = await supabase.from('banners').delete().eq('banner_id', id);
  return { data, error };
};