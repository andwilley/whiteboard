import React from 'react';
import PropTypes from 'prop-types';

const Aircrew = ({ aircrew, onAircrewClick, onXClick, onEditClick }) => (
    <li>
        <span style={{cursor:"pointer", textDecoration: (aircrew.pucks.flight + aircrew.pucks.sim + aircrew.pucks.flightNote + aircrew.pucks.dayNote) === 0 ? "" : "line-through"}} onClick={onAircrewClick}>{ aircrew.callsign }</span>
        {aircrew.pucks.flight > 0 && <span> F({aircrew.pucks.flight}) </span>}
        {aircrew.pucks.sim > 0 && <span> S({aircrew.pucks.sim}) </span>}
        {(aircrew.pucks.flightNote + aircrew.pucks.dayNote) > 0 && <span> N({aircrew.pucks.flightNote + aircrew.pucks.dayNote}) </span>}
        <span style={{cursor:"pointer"}} onClick={onEditClick}> [EDIT] </span>
        <span style={{cursor:"pointer"}} onClick={onXClick}> {"[X]"} </span>
    </li>
);

export default Aircrew;