const supabase = require('../config/supabaseClient');

exports.getPosts = async () => {
  const { data, error } = await supabase.from('posts').select('*');
  return { data, error };
};

exports.getPostById = async (id) => {
  const { data, error } = await supabase.from('posts').select('*').eq('post_id', id);
  return { data, error };
};

exports.createPost = async (post) => {
  const { data, error } = await supabase.from('posts').insert(post).select().single();
  return { data, error };
};

exports.updatePost = async (id, post) => {
  const { data, error } = await supabase.from('posts').update(post).eq('post_id', id).select().single();
  return { data, error };
};

exports.deletePost = async (id) => {
  const { data, error } = await supabase.from('posts').delete().eq('post_id', id);
  return { data, error };
};
