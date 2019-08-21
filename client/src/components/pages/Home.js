import React, { useContext } from 'react';
import QuestionFilter from '../questions/QuestionFilter';
import Questions from '../questions/Questions';
import Question from '../questions/Question';
import QuestionContext from '../../context/question/questionContext';

const Home = () => {
  const questionContext = useContext(QuestionContext);

  const { current } = questionContext;

  return (
    <div className='container'>
      {!current ? (
        <div className='card card-md'>
          <h1 style={{ marginLeft: '8.585rem' }}>
            Search a question by name or course code
          </h1>
          <QuestionFilter />
          <Questions />
        </div>
      ) : (
        <Question question={current} />
      )}
    </div>
  );
};

export default Home;
