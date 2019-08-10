const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Question = require('../models/Question');
const User = require('../models/User');

// @route       GET api/questions
// @desc        Get Current Question
// @access      Public
router.get('/:id', async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let question = await Question.findById(req.params.id);

    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/questions
// @desc        Get questions in a specified class code
// @access      Public
router.get(
  '/',
  [check('classCode', 'Class code is required').exists()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { classCode } = req.body;
    try {
      let questions = await Question.find({ classCode }).sort({
        date: -1
      });
      if (!questions) {
        return res.status(400).json({
          msg:
            'No class with this code has questions currently in them. Be the first to ask!'
        });
      }

      res.json({ questions });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       POST api/questions
// @desc        Post question
// @access      Private

// @todo Fix the method to post the question: check whether the question id is unique rather than using question.
router.post(
  '/',
  [
    auth,
    [
      check('classCode', 'Class code is required').exists(),
      check('question', 'Question is required').exists()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, question, classCode, likes, comments } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ msg: "User doesn't exist" });
    }

    try {
      const foundQuestion = await Question.findOne({ question });
      if (foundQuestion) {
        return res.status(400).json({
          msg:
            'Question must be unique: look at the existing one, or word your question slightly differently.'
        });
      }

      const questionFields = {
        user: user._id,
        question,
        classCode,
        likes,
        comments
      };

      const newQuestion = new Question(questionFields);

      await newQuestion.save();

      res.json({ newQuestion });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       DELETE api/questions
// @desc        Delete question
// @access      Private
router.delete(
  '/:id',
  [auth, [check('question', 'Question is required').exists()]],
  async (req, res) => {
    try {
      // Finding a question in the database following the same model as Question by it's _id passed in to the backend from the front end.
      let question = await Question.findById(req.params.id);
      if (!question) {
        return res
          .status(404)
          .json({ msg: 'Question must exist in the database' });
      }
      // If the found question id is not equal to the user.id found in the request, when set to string, return a 401 status and a json
      if (question.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not Authorized' });
      }
      // Find the question by id again, and this time remove it from the database
      await Question.findByIdAndRemove(req.params.id);
      // Send back a json indicating it was removed
      res.json({ msg: 'Question Removed.' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
