import React from 'react';
import PropTypes from 'prop-types';

const AddButton = ({onClick}) => {
    return (
        <span onClick={onClick}>[+]</span>
    );
};

export default AddButton;