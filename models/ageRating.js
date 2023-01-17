const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AgeRatingSchema = new Schema({
  name: { type: String, required: true, maxLength: 30 },
  description: { type: String, required: true, maxLength: 10000 }
});

AgeRatingSchema.virtual('url').get(function () {
  return `/rating/${this.id}`;
});

module.exports = mongoose.model('AgeRating', AgeRatingSchema);
