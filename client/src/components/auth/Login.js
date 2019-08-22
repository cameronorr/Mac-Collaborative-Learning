import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Redirect } from 'react-router-dom';

/**
 * @todo
 * - implement alerts -> when the user submits their information, send an alert with the text currently in the console.log
 */
const Login = props => {
  const authContext = useContext(AuthContext);

  const { login, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  //   Sets the user object to the current user spread, updating the target name (found in the input) to the input value (found in the value variable)
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      console.log('Please fill in all fields');
    } else {
      login({
        email,
        password
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className='card card-lg'>
        <h2>Welcome back to</h2>
        <h1 className='mac-header'>Mac Collaborative Learning</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label
              htmlFor='email'
              className='login-label'
              style={{ marginLeft: '16.5rem' }}
            >
              Email:
            </label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              required
              style={{ marginLeft: '16.5rem' }}
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='login-label'
              style={{ marginLeft: '16.5rem' }}
            >
              Password:{' '}
            </label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              required
              style={{ marginLeft: '16.5rem' }}
            />
          </div>
          <div>
            <a href='#'>
              <input
                type='submit'
                value='Login'
                className='btn btn-primary btn-block'
                style={{ marginLeft: '16.5rem' }}
              />
            </a>
          </div>
        </form>
      </div>
    );
  } else {
    return <Redirect to='/' />;
  }
};

export default Login;
