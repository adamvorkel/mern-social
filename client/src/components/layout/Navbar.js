import React from 'react';
import { Search } from 'react-feather';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header id='navbar'>
      <div id='navbar-logo'>
        <a href='/'>Chatter</a>
      </div>
      <div id='navbar-search'>
        <span id='navbar-search-icon'>
          <Search size={20} />
        </span>
        <input type='search'></input>
      </div>
      <nav>
        <ul>
          <li>
            <div className='navbar-account-link'>
              <span className='navbar-account-avatar'></span>
              <a href='/'>Adam</a>
            </div>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
