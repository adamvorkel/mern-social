import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CreateProfileView = props => {
    const [formData, setFormData] = useState({ bio: '' });

    return (
        <div>
            <h1>Update Your Profile</h1>
        </div>
    )
}

CreateProfileView.propTypes = {

}

export default CreateProfileView;