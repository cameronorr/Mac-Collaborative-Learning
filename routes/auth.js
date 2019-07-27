const express = require('express');
const router = express.Router();

// @route       GET to api/auth
// @desc        Get current logged in user
// @access      Private
router.get('/', [auth], async (req, res) => {
  res.send('Get current logged in user');
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
    res.send('Authenticate user and get the token');
  }
);

module.exports = router;
