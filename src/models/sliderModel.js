const supabase = require('../config/supabaseClient');

exports.getSliders = async () => {
  const { data, error } = await supabase.from('sliders').select('*');
  return { data, error };
};

exports.getSliderById = async (id) => {
  const { data, error } = await supabase.from('sliders').select('*').eq('slider_id', id);
  return { data, error };
};

exports.createSlider = async (slider) => {
  const { data, error } = await supabase.from('sliders').insert(slider);
  return { data, error };
};

exports.updateSlider = async (id, slider) => {
  const { data, error } = await supabase.from('sliders').update(slider).eq('slider_id', id);
  return { data, error };
};

exports.deleteSlider = async (id) => {
  const { data, error } = await supabase.from('sliders').delete().eq('slider_id', id);
  return { data, error };
};