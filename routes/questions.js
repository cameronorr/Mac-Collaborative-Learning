const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const auth = require('../middleware/auth');

// @route       GET api/questions
// @desc        Get questions in a specified class
// @access      Public
router.get(
  '/',
  [check('class', 'Class code is required').exists()],
  async (req, res) => {
    res.send('Get questions in a specified class');
  }
);

// @route       POST api/questions
// @desc        Post question
// @access      Private
router.post(
  '/',
  [
    auth,
    [
      check('class', 'Class is required').exists(),
      check('question', 'Question is required').exists()
    ]
  ],
  (req, res) => {
    res.send('Post question');
  }
);

// @route       DELETE api/questions
// @desc        Delete question
// @access      Private
router.delete(
  '/',
  [auth, check('question', 'Question is required').exists()],
  (req, res) => {
    res.send('Delete question');
  }
);

module.exports = router;
