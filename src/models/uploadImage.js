const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const supabase = require('../config/supabaseClient');  // Nhớ thay đổi đường dẫn đúng

const app = express();
const port = 3000;

// Cấu hình Multer để xử lý upload file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API upload ảnh
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const { originalname, buffer } = req.file;
    const filename = `${Date.now()}_${originalname}`;

    // Upload file lên Supabase Storage
    const { data, error } = await supabase.storage
      .from('image') // Thay 'your-bucket' bằng tên bucket của bạn
      .upload(`public/${filename}`, buffer, {
        contentType: req.file.mimetype,
      });

    if (error) {
      throw error;
    }

    // Trả về URL của ảnh đã upload
    const imageUrl = `${supabase.storage.from('image').getPublicUrl(`public/${filename}`).publicURL}`;
    
    res.status(200).send({
      success: true,
      message: 'File uploaded successfully',
      imageUrl: imageUrl
    });

  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: 'Error uploading file',
      error: err.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
