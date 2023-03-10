const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlatformSchema = new Schema({
  name: { type: String, required: true, maxLength: 30 },
  description: { type: String, required: true, maxLength: 10000 },
  image: { type: String, required: true }
});

PlatformSchema.virtual('url').get(function () {
  return `/platform/${this.id}`;
});

module.exports = mongoose.model('Platform', PlatformSchema);
