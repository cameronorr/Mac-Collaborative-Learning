import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import QuestionContext from '../../context/question/questionContext';
import QuestionItem from './QuestionItem';
import Spinner from '../layout/Spinner';

// Add loading functionality
const Questions = () => {
  const questionContext = useContext(QuestionContext);

  const { questions, filtered, loading, getQuestions } = questionContext;

  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line
  }, []);

  const mapQuestions = questionList => {
    let maP = [];
    questionList.map(question => {
      maP.push(<QuestionItem question={question} />);
    })
    return maP;
  }

  if (questions !== null && questions.length === 0 && !loading) {
    return <h4>Be the first to ask a question!</h4>;
  }
  if (questions !== null && !loading) {
    return (
      <TransitionGroup>
        {filtered !== null ? mapQuestions(filtered) : mapQuestions(questions)}
      </TransitionGroup>
    );
  } else {
    return <Spinner />;
  }
};

export default Questions;
