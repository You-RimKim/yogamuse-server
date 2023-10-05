const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const favoriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User"},
  id: String,
  category_name: String,
  category_description: String,
  poses: []
});

module.exports = model('Favorite', favoriteSchema);