import React from 'react';
import { Link } from 'react-router-dom';

const LandingView = () => {
  return (
    <section id='landing'>
      <div className='landing-welcome'>
        <h1>Welcome to Chatter, a modern social platform</h1>
        <p className='strong'>
          Join chatter today and connect with your family and friends
        </p>
        <Link to='/register' className='button primary-button'>
          Register
        </Link>
        <Link to='/login' className='button outline-button'>
          Login
        </Link>
      </div>
    </section>
  );
};

export default LandingView;
