const supabase = require('../config/supabaseClient');

exports.getPayments = async () => {
  const { data, error } = await supabase.from('payments').select('*');
  return { data, error };
};

exports.getPaymentById = async (id) => {
  const { data, error } = await supabase.from('payments').select('*').eq('id', id).single();
  return { data, error };
};

exports.createPayment = async (payment) => {
  const { data, error } = await supabase.from('payments').insert(payment).select().single();
  return { data, error };
};

exports.updatePayment = async (id, payment) => {
  const { data, error } = await supabase.from('payments').update(payment).eq('id', id).select().single();
  return { data, error };
};

exports.deletePayment = async (id) => {
  const { data, error } = await supabase.from('payments').delete().eq('id', id);
  return { data, error };
};
