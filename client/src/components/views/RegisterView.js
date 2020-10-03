import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { register } from '../../actions/auth';

const RegisterView = ({ register, errors }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const [validationErrors, setValidationErrors] = useState([]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      setValidationErrors([{ msg: 'Passwords must match' }]);
    } else {
      setValidationErrors([]);
      register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    }
  };

  return (
    <section id='register' className='view'>
      <div className='container'>
        <h1>Register</h1>
        <p>Create your account</p>
        {errors
          ? errors.map((e) => (
              <div className='error' key={e.param}>
                {e.msg}
              </div>
            ))
          : null}
        {validationErrors &&
          validationErrors.map((e) => <div className='error'>{e.msg}</div>)}
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
};

const mapStateToProps = (state) => ({
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { register })(RegisterView);
