var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
  url: String,
  description: String
});

module.exports = mongoose.model('Image', imageSchema);

