const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'user'
  },
  question: {
    type: String,
    required: true,
    unique: true
  },
  class: {
    type: String,
    required: true
  },
  likes: [
    {
      type: mongoose.ObjectId,
      ref: 'user'
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.ObjectId,
        ref: 'user'
      },
      text: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('question', QuestionSchema);
