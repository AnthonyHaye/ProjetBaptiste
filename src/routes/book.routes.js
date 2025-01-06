const express = require('express');
const router = express.Router();
const multer = require('multer');
const { generateCover, uploadPhoto, generateChapters, translateText, exportBook } = require('../controllers/book.controller');

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.post('/generate-cover', generateCover);
router.post('/upload-photo', upload.single('photo'), uploadPhoto);
router.post('/generate-chapters', generateChapters);
router.post('/translate', translateText);
router.post('/export', exportBook);

module.exports = router;