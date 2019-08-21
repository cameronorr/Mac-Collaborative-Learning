import React, { useContext, useEffect, useState } from 'react';
import QuestionContext from '../../context/question/questionContext';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../../components/layout/Spinner';

const QuestionItem = ({ question }) => {
  const questionContext = useContext(QuestionContext);
  const authContext = useContext(AuthContext);

  const [username, setUsername] = useState({
    componentUsername: ''
  });

  const { componentUsername } = username;

  const { loadQuestion, addLike, loading } = questionContext;
  const { user, getUsername } = authContext;

  // Everytime the QuestionItem is rendered
  useEffect(() => {
    // console.log the username
    // Probably getting the wrong res data within the function
    getUsername(question.user).then(result =>
      setUsername({ componentUsername: result })
    );
  }, []);

  const onClick = e => {
    loadQuestion(question._id);
  };

  const onLike = e => {
    if (user) {
      addLike(question, user._id);
    } else {
      console.log('Please login first.');
    }
  };

  // if (componentUsername) {
  return (
    <div className='card card-md set-color-white'>
      <h1>{question.question}</h1>
      <h3 className='subtext2'>Class Code: {question.classCode}</h3>
      <h2 className='subtext'>Posted by {componentUsername}...</h2>
      <div className='grid-2'>
        <div>
          <i className='fas fa-comment-alt' onClick={onClick} />{' '}
          {question.comments.length}
        </div>
        <div>
          <i className='far fa-arrow-alt-circle-up' onClick={onLike} />{' '}
          {question.likes.length}
        </div>
      </div>
    </div>
  );
  // } else {
  //   return <Spinner />;
  // }
};

export default QuestionItem;
