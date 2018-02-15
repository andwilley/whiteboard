import React from 'react';
import Aircrew from './Aircrew';
import PropTypes from 'prop-types';

const CrewList = ({ aircrewList, onAircrewClick }) => (
    <ul>
        { aircrewList.map(aircrew => (
            <Aircrew aircrew={aircrew} onClick={() => onAircrewClick(aircrew.id)}  />
        ))}
    </ul>
);

export default CrewList;