const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');

// @route       GET to api/auth
// @desc        Get current logged in user
// @access      Private
router.get('/', [auth], async (req, res) => {
  try {
    const user = await user.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @route       POST to api/auth
// @desc        Authenticate user and get the token
// @access      Private
router.post(
  '/',
  [
    check('email', 'Please include an email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return a response status 400 and send a json with the errors array
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
    } catch (error) {}
  }
);

module.exports = router;
