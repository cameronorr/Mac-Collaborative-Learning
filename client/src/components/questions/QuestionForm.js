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
      <div className='container'>
        <Link to='/' onClick={onClick}>
          <input type='submit' value='Back' className='btn' />
        </Link>
        <div className='card card-nh'>
          <form onSubmit={onSubmit}>
            <h2 style={{ fontSize: '2em' }}>
              Enter a question and course code:
            </h2>
            <div className='container'>
              <h3 className='question-label' style={{ marginRight: '25.3rem' }}>
                Question:
              </h3>
              <input
                type='text'
                name='questionText'
                value={questionText}
                placeholder='e.g., What is a Laplace Transform?'
                onChange={onChange}
                required
                style={{ marginLeft: '12.3rem' }}
              />
            </div>
            <div className='container'>
              <h3 className='code-label' style={{ marginRight: '23.3rem' }}>
                Course Code:
              </h3>
              <input
                type='text'
                name='classCode'
                value={classCode}
                placeholder='e.g., Math 2Z03'
                onChange={onChange}
                required
                style={{ marginLeft: '12.3rem' }}
              />
            </div>
            <input
              type='submit'
              value='Submit'
              className='btn btn-primary btn-indent'
              style={{ marginLeft: '14.3rem' }}
            />
          </form>
        </div>
      </div>
    );
  } else {
    return <Redirect to='/' />;
  }
};

export default QuestionForm;
