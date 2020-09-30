const express = require('express');
const router = express.Router();

// To store the uploaded video in our local storage, we use multer
const multer = require('multer');

// Define the storage
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(/ /g, '_'));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  }
});

router.post('/', upload.single('file'), (req, res, next) => {
  res.status(200).json({
    message: 'video upload successful'
  })
})

module.exports = router;
