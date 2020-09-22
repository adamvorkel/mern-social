const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  bio: {
    type: String,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

const Profile = new mongoose.model('profile', ProfileSchema);

module.exports = Profile;
