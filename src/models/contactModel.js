const supabase = require('../config/supabaseClient')

exports.insertContact = async (contactData) => {
    const { data, error } = await supabase.from('contacts').insert([contactData]).select()
    return { data, error }
}


exports.getContacts = async () => {
    const { data, error } = await supabase.from('contacts').select('*')
    return { data, error }
}

exports.getContactById = async (id) => {
    const { data, error } = await supabase.from('contacts').select('*').eq('id', id)
    return { data, error }
}

exports.updateContact = async (id, contactData) => {
    const { error } = await supabase.from('contacts').update(contactData).eq('id', id)
    return error
}

exports.deleteContact = async (id) => {
    const { error } = await supabase.from('contacts').delete().eq('id', id)
    return error
}






