// models/userModel.js
const supabase = require('../config/supabaseClient')

exports.insertUserProfile = async (userData) => {
  const { error } = await supabase.from('users').insert([userData])
  return error
}

exports.getUser = async () => {
  const { data, error } = await supabase.from('users').select('*')
  return { data, error }
}

exports.getUserById = async (id) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single() 
  return { data, error }
}

exports.updateUserById = async (id, updateData) => {
  const { data, error } = await supabase
    .from('users')
    .update(updateData)
    .eq('id', id)
  return { data, error }
}

exports.deleteUserById = async (id) => {
  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', id)
  return { data, error }
}