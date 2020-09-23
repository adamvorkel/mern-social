const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// @route GET api/posts
// @desc Get all posts
// @access protected
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    return res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

// @route POST api/posts
// @desc Create a post
// @access protected
router.post(
  '/',
  [auth, [check('body', 'Body if required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const newPost = new Post({
        body: req.body.body,
        user: req.user.id,
        username: user.name,
      });
      const post = await newPost.save();
      return res.json(post);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;
