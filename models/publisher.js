const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublisherSchema = new Schema({
  name: { type: String, required: true, maxLength: 30 },
  description: { type: String, required: true, maxLength: 10000 },
  image: { type: String, required: true }
});

PublisherSchema.virtual('url').get(function () {
  return `/publisher/${this.id}`;
});

module.exports = mongoose.model('Publisher', PublisherSchema);
