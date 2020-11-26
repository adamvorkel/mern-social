import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCurrentProfile } from '../../actions/profile';

import Spinner from '../ui/Spinner';

const ProfileView = ({ auth, profile, getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if (profile.loading) {
    return <Spinner />;
  } else {
    return (
      <section id='profile' className='view'>
        <div className='profile-header'>
          <div className='profile-header-content container'>
            <div className='profile-header-avatar'></div>
            <div className='profile-header-details'>
              <h1>{auth.user && auth.user.name}</h1>
              <h2>Bio</h2>
            </div>
          </div>
        </div>
        <div className='container'></div>
      </section>
    );
  }
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
