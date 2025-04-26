// models/userModel.js
const supabase = require('../config/supabaseClient')

exports.insertUserProfile = async (userData) => {
  const { error } = await supabase.from('users').insert([userData])
  return error
}
