import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

/**
 * @todo
 * - implement alerts -> when the user submits their information, send an alert with the text currently in the console.log
 */
const Login = props => {
  const authContext = useContext(AuthContext);

  const { login, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  }, [isAuthenticated, props.history]);

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

  return (
    <div className='card card-md'>
      <h2>Welcome back to</h2>
      <h1 className='mac-header'>Mac Collaborative Learning</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='email' className='login-label'>
            Email:
          </label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password' className='login-label'>
            Password:{' '}
          </label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <a href='#'>
            <input
              type='submit'
              value='Login'
              className='btn btn-primary btn-block'
            />
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
