import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

const LandingView = ({ isAuthenticated }) => {
  if (isAuthenticated) return <Redirect to='/profile' />;
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

LandingView.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(LandingView);
