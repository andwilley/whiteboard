import React from 'react';
import Aircrew from './Aircrew';
import AddButton from '../components/AddButton';
import DelButton from '../components/DelButton';
import AddUpdateAircrewFormContainer from '../containers/AddUpdateAircrewFormContainer';
import PropTypes from 'prop-types';

const CrewList = ({ 
    aircrewList,
    addUpdateAircrewFormDisplay,
    onAircrewClick,
    onXClick,
    onEditClick,
    onAddAircrewFormButtonClick,
    onDelAircrewFormButtonClick,
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
        {addUpdateAircrewFormDisplay ? 
            <div>
                <DelButton onClick={() => onDelAircrewFormButtonClick()} />
                <AddUpdateAircrewFormContainer />
            </div> :
            <div>
                <AddButton onClick={() => onAddAircrewFormButtonClick()} />
            </div>}
    </div>
);

export default CrewList;