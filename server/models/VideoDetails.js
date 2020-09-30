// Here we will create a schema for the video details to store information about the videos such as video urls.
const mongoose = require('mongoose');

const videoDetailsSchema = mongoose.Schema({
  uploader_name: { type: String, required: true },
  upload_title: { type: String, required: true },
  video_path: { type: String, required: true },
  thumbnail_path: { type: String, required: true }
});

module.exports = mongoose.model('VideoDetails', videoDetailsSchema);