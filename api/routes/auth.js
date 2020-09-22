const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');
const User = require('../models/User');

const jwtSecret = config.get('jwtSecret');
const jwtExpiresIn = config.get('jwtExpiresIn');

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

// @route POST api/auth
// @desc Authenticate user, send jwt
// @access public
router.post(
  '/',
  [
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // authenticate user
      let user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ errors: { msg: 'Invalid credentials' } });
      }

      // create token
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        jwtSecret,
        { expiresIn: jwtExpiresIn },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;
