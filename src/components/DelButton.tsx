import React from 'react';
import PropTypes from 'prop-types';

const DelButton = ({onClick}) => {
    return (
        <span onClick={onClick}>[-]</span>
    );
};

export default DelButton;