const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const Question = require('../models/Question');

// @route       POST api/votes
// @desc        Add vote
// @access      Private
router.post(
  '/:id',
  [check('user', 'User object is required').exists()],
  async (req, res) => {
    try {
      let question = await Question.findById(req.params.id);

      const { likes, questionText, classCode, comments } = question;

      const { user } = req.body;

      var i,
        liked = false,
        newLikes;

      for (i = 0; i < likes.length(); i++) {
        if (user === likes[i]) {
          return res
            .status(400)
            .json({ msg: 'This user has already liked this question.' });
        }
        newLikes[i] = likes[i];
      }
      newLikes[likes.length() + 1] = user;

      const newQuestion = {
        user,
        questionText,
        classCode,
        newLikes,
        comments
      };

      const savedQuestion = newQuestion.save();

      res.json(savedQuestion);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       DELETE api/votes
// @desc        Delete vote
// @access      Private
router.delete(
  '/:id',
  check('likes', 'User object is required').exists(),
  async (req, res) => {}
);

module.exports = router;
