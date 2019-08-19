import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext';

import { Link } from 'react-router-dom';

// Make the add question button, redirect it to the login page if they aren't logged in - if there is no current
const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);

  const { user, isAuthenticated, logout } = authContext;

  const onLogout = () => logout();

  const authLinks = (
    <Fragment>
      <h3>Hello {user && user.username}</h3>
      <li>
        <Link to='/questionForm'>Add Question</Link>
      </li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Mac Collaborative Learning',
  icon: 'fas fa-hands-helping'
};

export default Navbar;
