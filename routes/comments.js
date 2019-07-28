const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const auth = require('../middleware/auth');

// @route       GET api/comments
// @desc        Get Current Question
// @access      Public
router.get(
  '/',
  [check('question', 'Question is required').exists()],
  (req, res) => {
    res.send('Get current question');
  }
);

// @route       POST api/comments
// @desc        Add comment
// @access      Private
router.post('/', auth, (req, res) => {
  res.send('Add comment');
});

// @route       DELETE api/comments
// @desc        Delete comment
// @access      Private
router.post('/', auth, (req, res) => {
  res.send('Delete comment');
});

module.exports = router;
