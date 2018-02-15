import React from 'react';
import PropTypes from 'prop-types';

const Aircrew = ({ aircrew, onClick }) => (
    <li onClick={onClick}>
        { aircrew.callsign }
    </li>
);

export default Aircrew;