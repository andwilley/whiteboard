import React from 'react';
import Aircrew from './Aircrew';
import AddUpdateAircrewForm from './AddUpdateAircrewForm';
import PropTypes from 'prop-types';

const CrewList = ({ aircrewList, aircrewFormValues, onAircrewClick, onXClick, onEditClick, onInputChange, onAddUpdateAircrewSubmit }) => (
    <ul>
        { aircrewList.map(aircrew => (
            <Aircrew key={aircrew.id} aircrew={aircrew} onAircrewClick={() => onAircrewClick(aircrew)} onXClick={() => onXClick(aircrew.id)} onEditClick={() => onEditClick(aircrew)} />
        ))}
        <AddUpdateAircrewForm aircrewFormValues={aircrewFormValues} onInputChange={event => onInputChange(event)} onSubmit={input => onAddUpdateAircrewSubmit(input)} />
    </ul>
);

export default CrewList;