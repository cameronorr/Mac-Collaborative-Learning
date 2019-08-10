const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const Question = require('../models/Question');
const auth = require('../middleware/auth');

// @route       POST api/votes
// @desc        Add vote
// @access      Private
router.post('/:id', auth, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ msg: 'No question of this id exists.' });
    }

    let liked = question.likes.filter(
      like => question.user.toString() === like.user.id
    );

    if (liked[0]) {
      return res
        .status(400)
        .json({ msg: 'You have already liked this question' });
    }

    question.likes.unshift(question.user);
    await question.save();

    res.json(question);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/votes
// @desc        Delete vote
// @access      Private

// Id in the parameter is the like user obj id
router.delete('/:id', auth, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let question = await Question.findOne({ question: req.body.question });
    if (!question) {
      return res.status(400).json({ msg: 'No question found by the text' });
    }

    let element = question.likes.indexOf(req.params.id);

    if (question.likes[element].toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    question.likes.splice(element, 1);

    await question.save();

    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
