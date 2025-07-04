const supabase = require('../config/supabaseClient')

exports.getMenu = async () => {
  const { data, error } = await supabase.from('menus').select('*')
  return { data, error }
}

exports.getMenuById = async (id) => {
  const { data, error } = await supabase.from('menus').select('*').eq('menu_id', id)
  return { data, error }
}

exports.createMenu = async (menu) => {
  const { data, error } = await supabase.from('menus').insert(menu).select().single();
  return { data, error }
}

exports.updateMenu = async (id, menu) => {
  const { data, error } = await supabase.from('menus').update(menu).eq('menu_id', id).select().single();
  return { data, error }
}

exports.deleteMenu = async (id) => {
  const { data, error } = await supabase.from('menus').delete().eq('menu_id', id)
  return { data, error }
}

