import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/auth/authContext';

const CommentItem = ({ comment }) => {
  const authContext = useContext(AuthContext);
  const { getUsername } = authContext;

  const [cUsername, setCUsername] = useState({ newCommentUsername: '' });

  const { newCommentUsername } = cUsername;

  useEffect(() => {
    getUsername(comment.user).then(result =>
      setCUsername({ newCommentUsername: result })
    );
  }, []);

  return (
    <div>
      <div className='card card-md set-color-white'>
        <h3 className='set-text-yellow'>
          {newCommentUsername ? newCommentUsername : ''}
        </h3>
        <h2 style={{ textAlign: 'left' }}>{comment.text}</h2>
      </div>
    </div>
  );
};

export default CommentItem;
