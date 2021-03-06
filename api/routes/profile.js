const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');
const { update } = require('../models/User');

// @route GET api/profile/me
// @desc Get current users profile
// @access protected
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name']);

    if (!profile) {
      return res.status(400).json({ errors: [{ msg: 'Profile not found' }] });
    }

    return res.json(profile);
  } catch (error) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

// @route POST api/profile
// @desc Create or update user profile
// @access protected
router.post(
  '/',
  [auth, [check('bio', 'Bio is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { bio } = req.body;

    // build profile
    const profileData = { user: req.user.id, bio };

    // create/update profile
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // profile exists -> update
        let updatedProfile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileData },
          { new: true }
        );
        return res.json(updatedProfile);
      } else {
        // profile doesn't exist -> create
        let newProfile = new Profile(profileData);
        await newProfile.save();
        return res.json(newProfile);
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
  }
);

// @route GET api/profile
// @desc Get all profiles
// @access public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name']);
    return res.json(profiles);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

// @route GET api/profile/user/:user_id
// @desc Get profile for a user id
// @access public
router.get('/user/:user_id', async (req, res) => {
  const id = req.params.user_id;
  try {
    const profile = await Profile.findOne({ user: id }).populate('user', [
      'name',
    ]);

    if (!profile) {
      return res.status(400).json({ msg: `No profile found for user id` });
    } else {
      return res.json(profile);
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

// @route DELETE api/profile
// @desc Delete profile, user & posts
// @access protected
router.delete('/', auth, async (req, res) => {
  try {
    // remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // remove user
    await User.findOneAndRemove({ _id: req.user.id });

    // todo - remove posts for user

    return res.json({ msg: 'User deleted' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
