// models/fileModel.js
const supabase = require('../config/supabaseClient');

const uploadFile = async (filename, buffer, mimetype) => {
  const { data, error } = await supabase.storage
    .from('image') 
    .upload(`public/${filename}`, buffer, {
      contentType: mimetype,
    });

  if (error) {
    throw error;
  }

  // Trả về URL công khai của file đã upload
  const imageUrl = supabase.storage.from('image').getPublicUrl(`public/${filename}`);
  return imageUrl;
};

module.exports = { uploadFile };
