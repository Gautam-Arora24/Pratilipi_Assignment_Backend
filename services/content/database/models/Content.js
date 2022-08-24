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
  userId: {
    type: mongoose.ObjectId,
    default: null,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
    required: true,
  },
});

module.exports =  mongoose.model('content', ContentSchema);
