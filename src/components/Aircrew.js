import React from 'react';
import PropTypes from 'prop-types';

const Aircrew = ({ aircrew, onAircrewClick, onXClick, onEditClick }) => (
    <li>
        <span style={{cursor:"pointer"}} onClick={onAircrewClick}>{ aircrew.callsign }</span>  <span style={{cursor:"pointer"}} onClick={onEditClick}>[EDIT]</span> <span style={{cursor:"pointer"}} onClick={onXClick}>{"[X]"}</span>
    </li>
);

export default Aircrew;