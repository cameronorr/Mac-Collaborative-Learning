import React, { useReducer } from 'react';
import axios from 'axios';
import {
  QUESTION_ERROR,
  CLEAR_FILTER,
  ADD_QUESTION,
  LOAD_QUESTION,
  LOAD_QUESTION_FAIL,
  FILTER_QUESTIONS,
  GET_QUESTIONS,
  COMMENT_ERROR,
  ADD_COMMENT
} from '../types';
import QuestionReducer from './questionReducer';
import QuestionContext from './questionContext';

const QuestionState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    questions: null,
    current: null,
    filtered: null,
    error: null,
    loading: true
  };
  const [state, dispatch] = useReducer(QuestionReducer, initialState);

  // Add question
  const addQuestion = async questionObj => {
    const { _id, questionText, classCode } = questionObj;

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = {
      _id: _id,
      question: questionText,
      classCode: classCode
    };

    try {
      const res = await axios.post('/api/questions', body, config);
      dispatch({ type: ADD_QUESTION, payload: res.data.newQuestion });
    } catch (error) {
      dispatch({ type: QUESTION_ERROR });
    }
  };

  // Get Questions
  /**
   * @todo
   * - send a get request to questions
   * - send a dispatch to the reducer with the returned questions array
   * - Dispatch updates the questions state with the new questions array
   * - Import this into the Questions component, as well as the questions array
   */
  const getQuestions = async () => {
    try {
      const res = await axios.get(`/api/questions`);
      dispatch({ type: GET_QUESTIONS, payload: res.data.questions });
    } catch (error) {
      dispatch({ type: QUESTION_ERROR });
    }
  };

  //  Load question
  const loadQuestion = async qid => {
    try {
      const res = await axios.get(`/api/questions/${qid}`);
      console.log(res);
      dispatch({ type: LOAD_QUESTION, payload: res });
    } catch (error) {
      dispatch({ type: LOAD_QUESTION_FAIL });
    }
  };

  // Add Comment
  const addComment = async ({ comment, _id }) => {
    const body = {
      comment: comment
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`/api/comments/${_id}`, body, config);
      if (res) {
        dispatch({ type: ADD_COMMENT, payload: body.comment });
        loadQuestion(_id);
      }
    } catch (error) {
      dispatch({ type: COMMENT_ERROR });
    }
  };

  //  Add Like
  const addLike = async (question, _id) => {
    const body = {
      _id: _id
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post(`/api/votes/${question._id}`, body, config);

      if (res) {
        loadQuestion(question._id);
      }
    } catch (error) {
      dispatch({ type: QUESTION_ERROR });
    }
  };

  const filterQuestions = text => {
    dispatch({ type: FILTER_QUESTIONS, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <QuestionContext.Provider
      value={{
        token: state.token,
        questions: state.questions,
        filtered: state.filtered,
        current: state.current,
        error: state.error,
        loading: state.loading,
        loadQuestion,
        addLike,
        filterQuestions,
        clearFilter,
        addQuestion,
        getQuestions,
        addComment
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  );
};

export default QuestionState;
