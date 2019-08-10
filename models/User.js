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
    unique: true,
    default: this.name
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// exports the model as a mongoose model called user
module.exports = mongoose.model('user', UserSchema);
