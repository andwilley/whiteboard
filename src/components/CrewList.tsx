import * as React from 'react';
import Aircrew from './Aircrew';
import { ISnivs } from '../types/State';
import { errorMessages } from '../errors';
import { IAircrewWithPucks } from '../types/WhiteboardTypes';
import AddSnivFormContainer from '../containers/AddSnivFormContainer';
import AddUpdateAircrewFormContainer from '../containers/AddUpdateAircrewFormContainer';

interface ICrewListProps {
    aircrewList: IAircrewWithPucks[];
    daySnivs: ISnivs[];
    showSnivs: boolean;
    dayId: string;
    onAircrewClick: (crew: IAircrewWithPucks) => any;
    onXClick: (id: string) => any;
    onEditClick: (crew: IAircrewWithPucks) => any;
}

const CrewList: React.SFC<ICrewListProps> = ({
    aircrewList,
    daySnivs,
    showSnivs,
    dayId,
    onAircrewClick,
    onXClick,
    onEditClick,
    }) => {
    const pilotList: JSX.Element[] = [];
    const wsoList: JSX.Element[] = [];
    aircrewList.forEach((aircrew: IAircrewWithPucks) => {
        const aircrewComponent = (
            <Aircrew
                key={aircrew.id}
                aircrew={aircrew}
                snivs={daySnivs.filter(sniv => sniv.aircrewIds.indexOf(aircrew.id) > -1)}
                showSnivs={showSnivs}
                dayId={dayId}
                onAircrewClick={() => onAircrewClick(aircrew)}
                onXClick={() => onXClick(aircrew.id)}
                onEditClick={() => onEditClick(aircrew)}
            />
        );
        aircrew.seat === 'pilot' ? pilotList.push(aircrewComponent) : wsoList.push(aircrewComponent);
    });
    return (
        <div>
            <h3>Pilots</h3>
            <ul>
                {pilotList.length > 0 ? pilotList : errorMessages.ERR_NO_RESULTS_FOUND}
            </ul>
            <h3>WSOs</h3>
            <ul>
                {wsoList.length > 0 ? wsoList : errorMessages.ERR_NO_RESULTS_FOUND}
            </ul>
            <AddUpdateAircrewFormContainer />
            <AddSnivFormContainer />
        </div>
    );
};

export default CrewList;
