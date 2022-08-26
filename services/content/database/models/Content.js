const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  story: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  datePublished : {
    type: Date,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

module.exports =  mongoose.model('content', ContentSchema);
