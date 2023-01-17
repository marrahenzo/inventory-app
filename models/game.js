const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  platform: [{ type: Schema.Types.ObjectId, ref: 'Platform', required: true }],
  developer: [
    { type: Schema.Types.ObjectId, ref: 'Developer', required: true }
  ],
  publisher: { type: Schema.Types.ObjectId, ref: 'Publisher', required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre', required: true }],
  summary: { type: String, required: true, maxLength: 10000 },
  rating: { type: Schema.Types.ObjectId, ref: 'AgeRating', required: true }
});

GameSchema.virtual('url').get(function () {
  return `/game/${this.id}`;
});

module.exports = mongoose.model('Game', GameSchema);
