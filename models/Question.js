const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  question: {
    type: String,
    required: true,
    unique: true
  },
  classCode: {
    type: String,
    required: true
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
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
