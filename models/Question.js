const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  text: {
    type: String,
    required: true
  }
});

const QuestionSchema = mongoose.Schema({
  // must be a user with the same specifications as set in the user model
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
  comments: [CommentSchema]
});

module.exports = mongoose.model('question', QuestionSchema);
