import React, { useContext, useEffect, useState } from 'react';
import QuestionContext from '../../context/question/questionContext';
import AuthContext from '../../context/auth/authContext';

import CommentItem from './CommentItem';

import { Link } from 'react-router-dom';
import Questions from './Questions';

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

  // const [cUsername, setCUsername] = useState({ newCommentUsername: '' });

  // const { newCommentUsername } = cUsername;

  useEffect(() => {
    setComment({ newComment: '' });
    getUsername(question.user).then(result =>
      setUsername({ componentUsername: result })
    );
    // eslint-disable-next-line
  }, [current]);

  // const findUsername = comment => {
  //   getUsername(comment.user).then(result => {
  //     setCUsername({ newCommentUsername: result.username });
  //   });
  // };

  const onLike = e => {
    if (user) {
      addLike(question, user._id);
    } else {
      console.log('Please login first.');
    }
  };

  const onChange = e =>
    setComment({ ...comment, [e.target.name]: e.target.value });

  const onSubmit = e => {
    if (user) {
      addComment({ comment: newComment, _id: question._id });
    } else {
      console.log('Please login first.');
    }
  };

  const onClick = () => getQuestions();

  const mapComments = () => {
    let map = [];
    for(let i = 0; i < question.comments.length; i++)
      map.push(<CommentItem comment={question.comments[i]} />)
    return map;
  }

  return (
    <div className='container'>
      <Link to='/' onClick={onClick}>
        <input type='submit' value='Back' className='btn' style={{ borderRadius: '15%' }}/>
      </Link>
      <div style={{ background: 'rgb(244, 242, 239)', borderRadius: '10px' }}>
        <div className='card card-nh'>
          <h1>{question.question}</h1>
          <h3 className='subtext2'>Class Code: {question.classCode}</h3>
          <h2 className='subtext'>
            Posted by {componentUsername ? componentUsername : ''}...
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
            <div>{mapComments()}</div>
          ) : (
            <h2>No comments...</h2>
          )}
        </div>
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <h3 className='question-label'>Add a comment...</h3>
        <input
          type='text'
          name='newComment'
          value={newComment}
          onChange={onChange}
          className='text-indent'
          required
        />
        <Link onClick={onSubmit}>
          <input
            type='submit'
            value='Submit'
            className='btn btn-primary btn-indent2 btn:hover'
          />
        </Link>
      </div>
    </div>
  );
};
export default Question;
