// controllers/fileController.js
const { uploadFile } = require('../models/fileModel');

const uploadFileController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const { originalname, buffer, mimetype } = req.file;
    const filename = `${Date.now()}_${originalname}`;

    // Gọi model để upload file lên Supabase
    const imageUrl = await uploadFile(filename, buffer, mimetype);

    res.status(200).send({
      success: true,
      message: 'File uploaded successfully',
      imageUrl: imageUrl,
    });

  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: 'Error uploading file',
      error: err.message,
    });
  }
};

module.exports = { uploadFileController };
