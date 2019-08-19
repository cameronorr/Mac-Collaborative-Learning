import React, { useContext, useRef, useEffect } from 'react';
import QuestionContext from '../../context/question/questionContext';

const QuestionFilter = () => {
  const questionContext = useContext(QuestionContext);
  const text = useRef('');

  const { filterQuestions, clearFilter, filtered } = questionContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterQuestions(text.current.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Questions...'
        onChange={onChange}
      />
    </form>
  );
};

export default QuestionFilter;
