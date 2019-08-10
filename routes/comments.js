const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Question = require('../models/Question');

// @route       POST api/comments/:id
// @desc        Add comment
// @access      Private
router.post('/:id', auth, async (req, res) => {
  const { comment } = req.body;

  try {
    let question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(400).json({ msg: 'No question found by that id' });
    }

    question.comments.unshift(comment);
    await question.save();

    res.json({ question });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/comments
// @desc        Delete comment
// @access      Private

// Takes in the comment id
router.delete(
  '/:id',
  [auth, [check('question', 'Question must exist').exists()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let dbQuestion = await Question.findOne({ question: req.body.question });

      if (!dbQuestion) {
        return res.status(404).json({ msg: 'Question not found' });
      }

      var { comments } = dbQuestion;

      // Reduce method
      // let { deleteComment, newComments } = comments.reduce(
      //   (result, comment) => {
      //     if (comment.id === req.params.id) {
      //       result.deleteComment = comment;
      //     } else {
      //       result.newComments.push(comment);
      //     }
      //     return result;
      //   },
      //   { deleteComment: null, newComments: [] }
      // );

      //2nd method
      // let deleteComment = comments.filter(
      //   comment => comment.id === req.params.id
      // );

      // if (!deleteComment[0]) {
      //   return res.status(404).json({
      //     msg: 'There are no comments with the same id as passed in.'
      //   });
      // }

      // if (deleteComment[0].user.toString() !== req.user.id) {
      //   return res.status(401).json({ msg: 'Not Authorized' });
      // }

      // dbQuestion.comments.findByIdAndRemove(req.params.id);

      let deleteIndex = comments
        .map(comment => comment.id)
        .indexOf(req.params.id);

      if (deleteIndex < 0) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }

      if (dbQuestion.comments[deleteIndex].user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not Authorized ' });
      }

      dbQuestion.comments.splice(deleteIndex, 1);
      await dbQuestion.save();

      res.json(dbQuestion);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
