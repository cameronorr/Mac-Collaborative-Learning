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
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className='card card-nh set-color-white'>
        <h3 className='set-text-primary' style={{ fontSize: '1em' }}>
          {newCommentUsername ? newCommentUsername : ''}
        </h3>
        <h2 style={{ textAlign: 'left', fontSize: '1em' }}>{comment.text}</h2>
      </div>
    </div>
  );
};

export default CommentItem;
