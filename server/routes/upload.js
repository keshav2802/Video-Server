const express = require('express');
const router = express.Router();
const port = require('../server');
const thumbnailGenerator = require('../helpers/videoThumbnail');

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
  thumbnailGenerator.generateThumbnail(
    // /api/videos is made publically available in App.js
    'http://127.0.0.1:5000' + '/api/videos/' + req.file.filename.replace(/ /g, '_'), 
    req.file.filename.replace(/ /g, '_'),
    req.userData.firstName);

    res.status(200).json({
      message: 'Video upload successful'
    });
})

module.exports = router;
