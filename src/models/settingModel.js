const supabase = require('../config/supabaseClient');

exports.getSettings = async () => {
  const { data, error } = await supabase.from('settings').select('*');
  return { data, error };
};

exports.getSettingById = async (id) => {
  const { data, error } = await supabase.from('settings').select('*').eq('id', id).single();
  return { data, error };
};

exports.createSetting = async (setting) => {
  const { data, error } = await supabase.from('settings').insert(setting).select().single();
  return { data, error };
};

exports.updateSetting = async (id, setting) => {
  const { data, error } = await supabase.from('settings').update(setting).eq('id', id).select().single();
  return { data, error };
};

exports.deleteSetting = async (id) => {
  const { data, error } = await supabase.from('settings').delete().eq('id', id);
  return { data, error };
};
