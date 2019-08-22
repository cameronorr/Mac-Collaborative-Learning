import React, { useState, useContext, useEffect } from 'react';
import authContext from '../../context/auth/authContext';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = props => {
  const AuthContext = useContext(authContext);

  //   const [state, setState] = useState({
  //       redirect: false
  //   })

  //   const { redirect } = state;

  const { register, isAuthenticated } = AuthContext;
  const [question, setQuestion] = useState({
    email: '',
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const { email, name, username, password, confirmPassword } = question;

  //   useEffect(() => {

  //   }, [isAuthenticated]);

  const onChange = e =>
    setQuestion({ ...question, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      //   Will be an alert
      return console.log('Please enter the same password twice.');
    } else if (
      email === '' ||
      name === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      console.log('Please fill out all fields.');
    } else {
      register({
        email,
        name,
        username,
        password
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className='card card-md'>
        <h2>Welcome to</h2>
        <h1 className='mac-header'>Mac Collaborative Learning</h1>
        <form onSubmit={onSubmit}>
          <label
            htmlFor='email'
            className='login-label'
            style={{ marginLeft: '12.7rem' }}
          >
            Email:
          </label>
          <input
            type='email'
            name='email'
            value={email}
            placeholder='john@gmail.com'
            onChange={onChange}
            required
            style={{ marginLeft: '12.7rem' }}
          />
          <label
            htmlFor='name'
            className='login-label'
            style={{ marginLeft: '12.7rem' }}
          >
            Name:
          </label>
          <input
            type='text'
            name='name'
            value={name}
            placeholder='Johnny Appleseed'
            onChange={onChange}
            required
            style={{ marginLeft: '12.7rem' }}
          />
          <label
            htmlFor='username'
            className='login-label'
            style={{ marginLeft: '12.7rem' }}
          >
            Username:
          </label>
          <input
            type='text'
            name='username'
            value={username}
            placeholder='(Optional - Will just be set to your name if none entered.)'
            onChange={onChange}
            style={{ marginLeft: '12.7rem' }}
          />
          <label
            htmlFor='email'
            className='login-label'
            style={{ marginLeft: '12.7rem' }}
          >
            Password:
          </label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            style={{ marginLeft: '12.7rem' }}
          />
          <label
            htmlFor='email'
            className='login-label'
            style={{ marginLeft: '12.7rem' }}
          >
            Confirm Password:
          </label>
          <input
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={onChange}
            required
            style={{ marginLeft: '12.7rem' }}
          />
          <input
            type='submit'
            value='Register'
            className='btn btn-primary btn-block'
            style={{ marginLeft: '12.7rem' }}
          />
        </form>
      </div>
    );
  } else {
    return <Redirect to='/' />;
  }
};

export default Register;
