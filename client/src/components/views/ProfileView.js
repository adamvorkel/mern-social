import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    <div className="tag">{auth.user && `@${auth.user.name.split(' ')[0].toLowerCase()}`}</div>
            </div>
          </div>
        </div>
        <div className='profile-content'>
          <div className='container'>
            {profile.profile ? 
              (
              <h2>Bio</h2>
              ) : 
              (
              <>
              <h2>Create Profile</h2>
              <p>You have not yet created a profile. Let's get you set up</p>
              <Link to='/create-profile' className='button primary-button'>Create profile</Link>
              </>
              )
            }
          </div>
        </div>
        
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
