import {
  FILTER_QUESTIONS,
  CLEAR_FILTER,
  GET_QUESTIONS,
  ADD_QUESTION,
  LOAD_QUESTION,
  LOAD_QUESTION_FAIL,
  ADD_LIKE,
  ADD_COMMENT
} from '../types';

export default (state, action) => {
  console.log(action.type);
  switch (action.type) {
    // Add the question
    case ADD_QUESTION:
      return {
        ...state,
        questions: [action.payload, ...state.questions],
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.current.comments, action.payload]
      }
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        filtered: null,
        current: null,
        loading: false
      };
    case LOAD_QUESTION:
      return {
        ...state,
        current: action.payload.data,
        filtered: null,
        loading: false
      };

    case LOAD_QUESTION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case ADD_LIKE:
      return {
        ...state,
        questions: state.questions.map(question => {
          // @todo The problem is most likely here
          if (question._id === action.payload._id) {
            const { likes } = action.payload;
            const q = { ...question, likes: question.likes.unshift(likes[0]) };
            question = q;
            return question;
          } else {
            return question;
          }
        }),
        loading: false
      };
    case FILTER_QUESTIONS:
      return {
        ...state,
        filtered: state.questions.filter(question => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            question.question.match(regex) || question.classCode.match(regex)
          );
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    default:
      return state;
  }
};
