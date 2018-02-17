import React from 'react';
import Aircrew from './Aircrew';
import AddAircrewForm from './AddAircrewForm';
import PropTypes from 'prop-types';

const CrewList = ({ aircrewList, onAircrewClick, onXClick, onEditClick, onAddAircrewSubmit }) => (
    <ul>
        { aircrewList.map(aircrew => (
            <Aircrew key={aircrew.id} aircrew={aircrew} onAircrewClick={() => onAircrewClick(aircrew)} onXClick={() => onXClick(aircrew.id)} onEditClick={() => onEditClick(aircrew.id)} />
        ))}
        <AddAircrewForm entity={"Aircrew"} onSubmit={input => onAddAircrewSubmit(input)} />
    </ul>
);

export default CrewList;