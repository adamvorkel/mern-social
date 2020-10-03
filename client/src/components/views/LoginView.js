import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { login } from '../../actions/auth';

const LoginView = ({ login, errors }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: post to auth api endpoint to login user
    // TODO: redirect to user profile
    login(formData);
    console.log(formData);
  };

  return (
    <section id='login' className='view'>
      <div className='container'>
        <h1>Login</h1>
        <p>Login to your account</p>
        {errors
          ? errors.map((e) => (
              <div className='error' key={e.param}>
                {e.msg}
              </div>
            ))
          : null}
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={(e) => onChange(e)}
              placeholder='Email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={(e) => onChange(e)}
              placeholder='Password'
              required
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='primary-button fat'>
              Login
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
};

const mapStateToProps = (state) => ({
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { login })(LoginView);
