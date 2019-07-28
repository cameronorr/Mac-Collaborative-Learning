const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  questions: [
    {
      question: {
        type: String
      },
      class: {
        type: String
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
            type: String
          }
        }
      ]
    }
  ]
});

// exports the model as a mongoose model called user
module.exports = mongoose.model('user', UserSchema);
