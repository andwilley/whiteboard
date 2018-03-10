import * as React from 'react';
import Aircrew from './Aircrew';
import AddButton from '../components/AddButton';
import DelButton from '../components/DelButton';
import { IAircrewWithPucks } from '../types/WhiteboardTypes';
import AddUpdateAircrewFormContainer from '../containers/AddUpdateAircrewFormContainer';

interface ICrewListProps {
    aircrewList: IAircrewWithPucks[];
    addUpdateAircrewFormDisplay: boolean;
    onAircrewClick: (crew: IAircrewWithPucks) => any;
    onXClick: (id: string) => any;
    onEditClick: (crew: IAircrewWithPucks) => any;
    onAddAircrewFormButtonClick: () => any;
    onDelAircrewFormButtonClick: () => any;
}

const CrewList: React.SFC<ICrewListProps> = ({
    aircrewList,
    addUpdateAircrewFormDisplay,
    onAircrewClick,
    onXClick,
    onEditClick,
    onAddAircrewFormButtonClick,
    onDelAircrewFormButtonClick,
    }) => {
    const aircrewCompList = aircrewList.map((aircrew: IAircrewWithPucks) => (
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
