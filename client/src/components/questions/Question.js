import React, { useContext, useEffect, useState } from 'react';
import QuestionContext from '../../context/question/questionContext';
import AuthContext from '../../context/auth/authContext';

import { Link } from 'react-router-dom';

// Add a back button
const Question = current => {
  const { question } = current;
  const questionContext = useContext(QuestionContext);
  const authContext = useContext(AuthContext);

  const [username, setUsername] = useState({
    componentUsername: ''
  });

  const { componentUsername } = username;

  const { addLike, addComment, getQuestions } = questionContext;
  const { user, getUsername } = authContext;

  const [comment, setComment] = useState({ newComment: '' });

  const { newComment } = comment;

  useEffect(() => {
    // console.log the username
    // Probably getting the wrong res data within the function
    getUsername(question.user).then(result =>
      setUsername({ componentUsername: result })
    );
  }, []);

  const onLike = e => {
    addLike(question, user._id);
  };

  const onChange = e =>
    setComment({ ...comment, [e.target.name]: e.target.value });

  const onSubmit = e => {
    console.log(comment);
    addComment(newComment, question._id);
  };

  const onClick = () => getQuestions();

  return (
    <div className='container'>
      <Link to='/' onClick={onClick}>
        Back
      </Link>
      <div className='card card-md'>
        <h1>{question.question}</h1>
        <h2 className='subtext'>
          Posted by{' '}
          {componentUsername.username ? componentUsername.username : ''}...
        </h2>
        <div className='grid-2'>
          <div>
            <i className='fas fa-comment-alt' /> {question.comments.length}
          </div>
          <div>
            <i className='far fa-arrow-alt-circle-up' onClick={onLike} />{' '}
            {question.likes.length}
          </div>
        </div>
      </div>
      <div className='container'>
        {question.comments.length !== 0 ? (
          question.comments.map(comment => (
            <div className='card card-md set-color-white'>
              {/* <h3>Comment from {username}</h3> */}
              <h2>{comment.text}</h2>
            </div>
          ))
        ) : (
          <h2>No comments...</h2>
        )}
      </div>
      <div>
        <h3 className='question-label'>Add a comment...</h3>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            name='newComment'
            value={newComment}
            onChange={onChange}
            className='text-indent'
            required
          />
          <input
            type='submit'
            value='Submit'
            className='btn btn-primary btn-indent2'
          />
        </form>
      </div>
    </div>
  );
};
export default Question;
