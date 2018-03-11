import * as React from 'react';
import Aircrew from './Aircrew';
import AddButton from '../components/AddButton';
import DelButton from '../components/DelButton';
import { IAircrewWithPucks } from '../types/WhiteboardTypes';
import { ERR_NO_RESULTS_FOUND } from '../errors';
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
    const pilotList: JSX.Element[] = [];
    const wsoList: JSX.Element[] = [];
    aircrewList.forEach((aircrew: IAircrewWithPucks) => {
        const aircrewComponent = (
            <Aircrew
                key={aircrew.id}
                aircrew={aircrew}
                onAircrewClick={() => onAircrewClick(aircrew)}
                onXClick={() => onXClick(aircrew.id)}
                onEditClick={() => onEditClick(aircrew)}
            />
        );
        aircrew.seat === 'pilot' ? pilotList.push(aircrewComponent) : wsoList.push(aircrewComponent);
    });
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
            <h3>Pilots</h3>
            <ul>
                {pilotList.length > 0 ? pilotList : ERR_NO_RESULTS_FOUND}
            </ul>
            <h3>WSOs</h3>
            <ul>
                {wsoList.length > 0 ? wsoList : ERR_NO_RESULTS_FOUND}
            </ul>
            {formDisplayButton}
        </div>
    );
};

export default CrewList;
