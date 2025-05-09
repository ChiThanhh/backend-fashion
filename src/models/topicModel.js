const supabase = require('../config/supabaseClient');

exports.getTopics = async () => {
  const { data, error } = await supabase.from('topics').select('*');
  return { data, error };
};

exports.getTopicById = async (id) => {
  const { data, error } = await supabase.from('topics').select('*').eq('topic_id', id);
  return { data, error };
};

exports.createTopic = async (topic) => {
  const { data, error } = await supabase.from('topics').insert(topic);
  return { data, error };
};

exports.updateTopic = async (id, topic) => {
  const { data, error } = await supabase.from('topics').update(topic).eq('topic_id', id);
  return { data, error };
};

exports.deleteTopic = async (id) => {
  const { data, error } = await supabase.from('topics').delete().eq('topic_id', id);
  return { data, error };
};
