import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Search } from 'react-feather';
import { Link } from 'react-router-dom';

import { logout } from '../../actions/auth';

const Navbar = ({ auth, logout }) => {
  const userLinks = (
    <ul>
      <li>
        {auth.isAuthenticated && (
          <div className='navbar-account-link'>
            <span className='navbar-account-avatar'></span>
            <Link to='/profile'>{auth.user && auth.user.name}</Link>
          </div>
        )}
      </li>
      <li>
        <a onClick={logout}>Logout</a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
    </ul>
  );

  return (
    <header id='navbar'>
      <div id='navbar-logo'>
        <Link to='/'>Chatter</Link>
      </div>
      <div id='navbar-search'>
        <span id='navbar-search-icon'>
          <Search size={20} />
        </span>
        <input type='search'></input>
      </div>

      <nav>{auth.isAuthenticated ? userLinks : guestLinks}</nav>
    </header>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
