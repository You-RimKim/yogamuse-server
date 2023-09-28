const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const poseSchema = new Schema({
  id: String,
  english_name: String,
  sanskrit_name: String,
  pose_description: String,
  pose_benefits: String,
  url_png: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = model('Pose', poseSchema);