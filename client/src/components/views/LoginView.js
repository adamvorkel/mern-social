import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { login, clearAuthErrors } from '../../actions/auth';

import Errors from '../layout/Errors';

const LoginView = ({ login, clearAuthErrors, isAuthenticated, errors }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // clear errors when unmounting
  useEffect(() => {
    return () => {
      clearAuthErrors();
    }
  }, [clearAuthErrors]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    isAuthenticated ? 
    <Redirect to='/profile' /> :
    <section id='login' className='view'>
      <div className='container'>
        <h1>Log in to Chatter</h1>
        {errors && <Errors errors={errors.filter(e => !e.param)} /> }
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={(e) => onChange(e)}
              placeholder='Email'
              // required
            />
            {errors && <Errors errors={errors.filter(e => e.param === 'email')} /> }
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={(e) => onChange(e)}
              placeholder='Password'
              // required
            />
            {errors && <Errors errors={errors.filter(e => e.param === 'email')} /> }
          </div>

          <div className='form-group'>
            <button type='submit' className='primary-button fat'>
              Log in
            </button>
          </div>
        </form>
        <p>
          <Link to='/register'>Forgot password?</Link>
          <span> · </span>
          <Link to='/register'>Create new account</Link>
        </p>
      </div>
    </section>
  );
};

LoginView.propTypes = {
  login: PropTypes.func.isRequired,
  clearAuthErrors: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  errors: PropTypes.array,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { login, clearAuthErrors })(LoginView);
