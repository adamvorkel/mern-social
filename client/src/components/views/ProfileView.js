import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCurrentProfile } from '../../actions/profile';

const ProfileView = ({ auth, profile, getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    <section id='profile' className='view'>
      <div className='container'>
        <h1>Your Profile</h1>
      </div>
    </section>
  );
};

ProfileView.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(ProfileView);
