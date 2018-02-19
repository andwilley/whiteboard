import React from 'react';
import Aircrew from './Aircrew';
import AddButton from '../components/AddButton';
import DelButton from '../components/DelButton';
import AddUpdateAircrewForm from './AddUpdateAircrewForm';
import PropTypes from 'prop-types';

const CrewList = ({ 
    aircrewList,
    onAircrewClick,
    onXClick,
    onEditClick,
    onAddAircrewFormButtonClick,
    onDelAircrewFormButtonClick,
    addUpdateAircrewFormValues,
    onInputChange,
    onAddUpdateAircrewSubmit,
    }) => (
    <div>
        <ul>
            { aircrewList.map(aircrew => (
                <Aircrew 
                    key={aircrew.id} 
                    aircrew={aircrew} 
                    onAircrewClick={() => onAircrewClick(aircrew)} 
                    onXClick={() => onXClick(aircrew.id)} 
                    onEditClick={() => onEditClick(aircrew)} 
                />
            ))}
        </ul>
        {addUpdateAircrewFormValues.display ? 
            <DelButton onClick={() => onDelAircrewFormButtonClick()} /> :
            <AddButton onClick={() => onAddAircrewFormButtonClick()} />}
        <AddUpdateAircrewForm 
            addUpdateAircrewFormValues={addUpdateAircrewFormValues} 
            onInputChange={event => onInputChange(event)} 
            onSubmit={input => onAddUpdateAircrewSubmit(input)} 
        />
    </div>
);

export default CrewList;