const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: { type: String, required: true, maxLength: 30 },
  description: { type: String, required: true, maxLength: 10000 }
});

GenreSchema.virtual('url').get(function () {
  return `/genre/${this.id}`;
});

module.exports = mongoose.model('Genre', GenreSchema);
