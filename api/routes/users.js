const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../models/User');

// @route POST api/users
// @desc Registration route
// @access public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'An account with this email already exists' }],
        });
      }

      // create user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({ name, email, hashedPassword });
      await newUser.save();
      return res.send('User registered');
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;
