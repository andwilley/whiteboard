import * as React from 'react';
import Aircrew from './Aircrew';
import AddButton from '../components/AddButton';
import DelButton from '../components/DelButton';
import AddUpdateAircrewFormContainer from '../containers/AddUpdateAircrewFormContainer';

const CrewList = ({
    aircrewList,
    addUpdateAircrewFormDisplay,
    onAircrewClick,
    onXClick,
    onEditClick,
    onAddAircrewFormButtonClick,
    onDelAircrewFormButtonClick,
    }: any) => {
    const aircrewCompList = aircrewList.map((aircrew: any) => (
        <Aircrew
            key={aircrew.id}
            aircrew={aircrew}
            onAircrewClick={() => onAircrewClick(aircrew)}
            onXClick={() => onXClick(aircrew.id)}
            onEditClick={() => onEditClick(aircrew)}
        />
    ));
    const formDisplayButton = addUpdateAircrewFormDisplay ?
                (
                <div>
                    <DelButton onClick={() => onDelAircrewFormButtonClick()} />
                    <AddUpdateAircrewFormContainer />
                </div>
                ) :
                (
                <div>
                    <AddButton onClick={() => onAddAircrewFormButtonClick()} />
                </div>
                );
    return (
        <div>
            <ul>
                {aircrewCompList}
            </ul>
            {formDisplayButton}
        </div>
    );
};

export default CrewList;
