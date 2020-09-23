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

// @route GET api/posts/:post_id
// @desc Get post by post id
// @access protected
router.get('/:post_id', auth, async (req, res) => {
  const post_id = req.params.post_id;
  try {
    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(404).json({ msg: 'No post found for post id' });
    } else {
      return res.json(post);
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

// @route DELETE api/posts/:post_id
// @desc Delete post by post id
// @access protected
router.delete('/:post_id', auth, async (req, res) => {
  const post_id = req.params.post_id;
  try {
    const post = await Post.findById(post_id);

    if (!post) {
      return res.status(404).json({ msg: 'No post found for post id' });
    }

    // check to ensure user attempting to delete post is post author
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to delete post' });
    }

    // delete post
    await post.remove();
    res.json({ msg: 'Post removed' });
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

// @route PUT api/posts/like/:post_id
// @desc Like post with post_id
// @access protected
router.put('/like/:post_id', auth, async (req, res) => {
  const post_id = req.params.post_id;
  try {
    const post = await Post.findById(post_id);

    // check to ensure post has not already been liked by user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post has already been liked' });
    }

    // add like
    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

// @route PUT api/posts/unlike/:post_id
// @desc Unlike (remove users like) post with post_id
// @access protected
router.put('/unlike/:post_id', auth, async (req, res) => {
  const post_id = req.params.post_id;
  try {
    const post = await Post.findById(post_id);

    // check to ensure that post has already been likes by user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // remove like
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    return res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
