const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// @route       GET api/comments
// @desc        Get Current Question
// @access      Public
router.get(
  '/',
  [check('question', 'Question is required').exists()],
  (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let question = await Question.findById(req.user.id);

      res.json(question);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
    
  }
);

// @route       POST api/comments
// @desc        Add comment
// @access      Private
router.post('/:id', auth, (req, res) => {
  const { comments } = req.body;
  let oldQuestion = await Question.findById(req.params.id);

  const { user, question, classCode, likes } = oldQuestion;
  
  const newQuestion = {
    user,
    classCode,
    question,
    comments,
    likes
  }

  try {
    const question = await newQuestion.save();

    res.json({ question });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error')
  }
});

// @route       DELETE api/comments
// @desc        Delete comment
// @access      Private
router.delete('/:id', [auth, [
check('question', 'Question must exist').exists(), 
check('question', 'Question must exist in the database').custom( async (req) => {
  try {
    let question = await Question.findById(req.user.id);

    if(!question){
      return res.status(404).json({ msg: 'Question not found' })
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
  

}), 
check('comment', 'Must enter a comment')
].exists()], (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let question = await Question.findById(req.params.id);

    if(question.user.toString() !== req.user.id){
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Question.findByIdAndRemove(res.params.id);

    res.json({ msg: 'Comment Deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
