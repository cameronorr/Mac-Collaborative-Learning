import React, { useContext, useEffect, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import QuestionContext from '../../context/question/questionContext';
import QuestionItem from './QuestionItem';
import Spinner from '../layout/Spinner';

// Add loading functionality
const Questions = () => {
  const questionContext = useContext(QuestionContext);

  const {
    questions,
    filtered,
    loading,
    getQuestions,
    filterQuestions
  } = questionContext;

  useEffect(() => {
    if (!filtered) {
      getQuestions();
    }
  }, []);

  if (questions !== null && questions.length === 0) {
    return <h4>Be the first to ask a question!</h4>;
  }
  return (
    <Fragment>
      {questions !== null && questions !== undefined && loading == false ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(question => (
                <CSSTransition
                  key={question._id}
                  timeout={500}
                  classNames='item'
                >
                  <QuestionItem question={question} />
                </CSSTransition>
              ))
            : questions.map(question => (
                // the key must be in the tag first in the map, so need to put it in the css transition tag.
                <div>
                  {console.log(question)}

                  <CSSTransition
                    key={question._id}
                    timeout={500}
                    classNames='item'
                  >
                    <QuestionItem question={question} />
                  </CSSTransition>
                </div>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Questions;
