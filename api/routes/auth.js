const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const User = require('../models/User');

// @route GET api/auth
// @desc User data route
// @access protected
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.json(user);
  } catch (error) {
    console.error(err.message);
    return res.status(500).send({ msg: 'Server error' });
  }
});

module.exports = router;
