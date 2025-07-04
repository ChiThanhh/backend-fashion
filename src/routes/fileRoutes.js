// routes/fileRoutes.js
const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { uploadFileController } = require('../controllers/fileController');

const router = express.Router();

// Định nghĩa route cho việc upload file
router.post('/upload', upload.single('file'), uploadFileController);

module.exports = router;
