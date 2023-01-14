const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameCopySchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
  price: { type: Number, required: true },
  format: { type: String, enum: ['Physical', 'Digital'], required: true },
  condition: { type: String, enum: ['New', 'Used'], required: true }
});

GameCopySchema.virtual('url').get(function () {
  return `/gamecopy/${this.id}`;
});

module.exports = mongoose.model('GameCopy', GameCopySchema);
