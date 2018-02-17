import React from 'react';
import Aircrew from './Aircrew';
import AddAircrewForm from './AddAircrewForm';
import PropTypes from 'prop-types';

const CrewList = ({ aircrewList, onAircrewClick, onXClick, onAddButtonSubmit }) => (
    <ul>
        { aircrewList.map(aircrew => (
            <Aircrew key={aircrew.id} aircrew={aircrew} onAircrewClick={() => onAircrewClick(aircrew)} onXClick={() => onXClick(aircrew.id)}  />
        ))}
        <AddAircrewForm entity={"Aircrew"} onSubmit={input => onAddButtonSubmit(input)} />
    </ul>
);

export default CrewList;