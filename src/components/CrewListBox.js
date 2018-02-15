import React from 'react';
import CrewList from './CrewList';
import PropTypes from 'prop-types';

const list = [
	{
		id: 1,
		callsign: "steam"
	},
	{
		id: 2,
		callsign: "dump",
	}
];

const onAircrewClick = id => alert(id);

const CrewListBox = () => (
    <CrewList aircrewList={list} onAircrewClick={id => onAircrewClick(id)}/>
);

export default CrewListBox;