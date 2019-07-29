const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const auth = require('../middleware/auth');
const Question = require('../models/Question');

// @route       GET api/questions
// @desc        Get questions in a specified class code
// @access      Public
router.get(
  '/',
  [
    check('classCode', 'Class code is required').exists(),
    check(
      'classCode',
      'Class code entered does not have any questions assosiated with it'
    ).custom(async ({ req }) => {
      const { classCode } = req.body;
      try {
        question = await Question.findOne({ classCode });
        if (!question) {
          // throw new Error(
          //   'No class code with this code has questions currently in them. Be the first to ask!'
          // );
          return res.status(400).json({
            msg:
              'No class with this code has questions currently in them. Be the first to ask!'
          });
        }
      } catch (error) {
        console.error(error.message);
        req.status(500).send('Server Error');
      }
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    const { className } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const questions = Question.find({ className }).sort({
        date: -1
      });

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
router.post(
  '/',
  [
    auth,
    [
      check('classCode', 'Class code is required').exists(),
      check('question', 'Question is required').exists(),
      check('question', 'Question must be unique').custom(async ({ req }) => {
        try {
          const question = await Question.findOne({
            question: req.body.question
          });
          if (question) {
            // throw new Error(
            //   'Question must be unique: look at the existing one, or word your question slightly differently.'
            // );
            return req.status(400).json({
              msg:
                'Question must be unique: look at the existing one, or word your question slightly differently.'
            });
          }
        } catch (error) {
          console.error(error.message);
          res.status(500).send('Server Error');
        }
      })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user, question, classCode, likes, comments } = req.body;

    const newQuestion = {
      user,
      question,
      classCode,
      likes,
      comments
    };

    try {
      const question = await newQuestion.save();

      res.json({ question });
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
  [
    auth,
    check('question', 'Question is required').exists(),
    check('question', 'Question must exist in the database').custom(
      async ({ req }) => {
        try {
          let question = await Question.findById(req.params.id);
          if (!question) {
            // throw new Error('Question must exist in the database');
            return res
              .status(404)
              .json({ msg: 'Question must exist in the database' });
          }
        } catch (error) {
          console.error(error.message);
          res.status(500).send('Server Error');
        }
      }
    )
  ],
  async (req, res) => {
    // @todo    find out whether to use the question (put as id) in the url, check whether the question belongs to the user, implement deleting the question
    try {
      // Finding a question in the database following the same model as Question by it's _id passed in to the backend from the front end.
      let question = await Question.findById(req.params.id);

      // If the found question id is not equal to the user.id found in the request, when set to string, return a 401 status and a json
      if (question.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not Authorized' });
      }

      // Find the question by id again, and this time remove it from the database
      await Question.findByIdAndRemove(res.params.id);

      // Send back a json indicating it was removed
      res.json({ msg: 'Question Removed.' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
