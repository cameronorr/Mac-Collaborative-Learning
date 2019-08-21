import React, { useRef, useContext, useState, useEffect } from 'react';
import QuestionContext from '../../context/question/questionContext';
import AuthContext from '../../context/auth/authContext';

import { Redirect, Link } from 'react-router-dom';

const QuestionForm = props => {
  const questionContext = useContext(QuestionContext);
  const authContext = useContext(AuthContext);

  const { addQuestion, getQuestions } = questionContext;

  const { user } = authContext;

  const [question, setQuestion] = useState({
    questionText: '',
    classCode: ''
  });

  const { questionText, classCode } = question;

  const [submit, setSubmit] = useState({
    submitted: false
  });

  const { submitted } = submit;

  //   Sets the user object to the current user spread, updating the target name (found in the input) to the input value (found in the value variable)
  const onChange = e =>
    setQuestion({ ...question, [e.target.name]: e.target.value });

  const onClick = () => getQuestions();

  const onSubmit = e => {
    e.preventDefault();
    setSubmit({ submitted: true });
    if (questionText === '' || classCode === '') {
      console.log('Please fill in all fields');
    } else {
      addQuestion({
        _id: user._id,
        questionText,
        classCode
      });
    }
  };

  if (!submitted) {
    return (
      <div className='card card-md set-color-blue'>
        <Link to='/' onClick={onClick}>
          Back
        </Link>
        <form onSubmit={onSubmit}>
          <div className='container set-color-blue'>
            <h3 className='question-label'>Question:</h3>
            <input
              type='text'
              name='questionText'
              value={questionText}
              placeholder='e.g., What is a Laplace Transform?'
              onChange={onChange}
              required
            />
          </div>
          <div className='container set-color-blue'>
            <h3 className='code-label'>Course Code:</h3>
            <input
              type='text'
              name='classCode'
              value={classCode}
              placeholder='e.g., Math 2Z03'
              onChange={onChange}
              required
            />
          </div>
          <input
            type='submit'
            value='Submit'
            className='btn btn-primary btn-indent'
          />
        </form>
      </div>
    );
  } else {
    return <Redirect to='/' />;
  }
};

export default QuestionForm;
