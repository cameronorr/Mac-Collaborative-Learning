const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

// @route       POST api/votes
// @desc        Add vote
// @access      Private
router.post(
  '/',
  check('question', 'Question is required').exists(),
  async (req, res) => {
    res.send('Add vote');
  }
);

module.exports = router;
