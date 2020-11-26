import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { register, clearAuthErrors } from '../../actions/auth';

import Errors from '../layout/Errors';

const RegisterView = ({ 
  register, 
  clearAuthErrors, 
  isAuthenticated, 
  errors 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const [validationErrors, setValidationErrors] = useState([]);

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
    if (formData.password !== formData.password2) {
      clearAuthErrors();
      setValidationErrors([{ msg: 'Passwords must match', param: 'password2' }]);
    } else {
      setValidationErrors([]);
      register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/profile' />;
  }

  return (
    <section id='register' className='view'>
      <div className='container'>
        <h1>Register on Chatter</h1>
        {errors && <Errors errors={errors.filter(e => !e.param)} /> }
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={(e) => onChange(e)}
              placeholder='Name'
              // required
            />
            {errors && <Errors errors={errors.filter(e => e.param === 'name')} /> }
          </div>
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
            {errors && <Errors errors={errors.filter(e => e.param === 'password')} /> }
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password2'
              value={formData.password2}
              onChange={(e) => onChange(e)}
              placeholder='Confirm Password'
              // required
            />
            {validationErrors && <Errors errors={validationErrors.filter(e => e.param === 'password2')} /> }
          </div>
          <div className='form-group'>
            <button type='submit' className='primary-button fat'>
              Register
            </button>
          </div>
        </form>
        <p>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </div>
    </section>
  );
};

RegisterView.propTypes = {
  register: PropTypes.func.isRequired,
  clearAuthErrors: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  errors: PropTypes.array,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { register, clearAuthErrors })(RegisterView);
