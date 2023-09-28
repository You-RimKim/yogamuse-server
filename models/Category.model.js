const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  id: String,
  category_name: String,
  category_description: String,
  poses: [{ type: Schema.Types.ObjectId, ref: "Pose"}]

  // owner will be added later on
});

module.exports = model('Category', categorySchema);
