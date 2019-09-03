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

  if (questions !== null && questions.length === 0 && !loading) {
    return <h4>Be the first to ask a question!</h4>;
  }
  if (questions !== null && !loading) {
    return (
      <TransitionGroup>
        {filtered !== null
          ? filtered.map(question => (
              <CSSTransition key={question._id} timeout={500} classNames='item'>
                <QuestionItem question={question} />
              </CSSTransition>
            ))
          : questions.map(question => (
              // the key must be in the tag first in the map, so need to put it in the css transition tag.
              <CSSTransition key={question._id} timeout={500} classNames='item'>
                <QuestionItem question={question} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    );
  } else {
    return <Spinner />;
  }
};

export default Questions;
