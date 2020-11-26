import React from 'react';
import PropTypes from 'prop-types';

const Errors = ({ errors }) => {
  if (errors !== null && errors.length > 0) {
    return (
        errors.map((error) => (
        <div key={error.msg} className={`error`}>
            {error.msg}
        </div>
        ))
    );
  }
  return null;
};

Errors.propTypes = {
  errors: PropTypes.array.isRequired,
};

export default Errors;
