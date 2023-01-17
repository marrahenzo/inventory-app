const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeveloperSchema = new Schema({
  name: { type: String, required: true, maxLength: 30 },
  description: { type: String, required: true, maxLength: 10000 }
});

DeveloperSchema.virtual('url').get(function () {
  return `/developer/${this.id}`;
});

module.exports = mongoose.model('Developer', DeveloperSchema);
