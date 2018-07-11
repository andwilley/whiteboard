import * as React from 'react';
import Aircrew from './Aircrew';
import { ISnivs } from '../types/State';
import { errorMessages } from '../errors';
import { IAddUpdateSnivArgs } from '../actions';
import { IAircrewWithPucks } from '../types/WhiteboardTypes';
import AddSnivFormContainer from '../containers/AddSnivFormContainer';
import AddUpdateAircrewFormContainer from '../containers/AddUpdateAircrewFormContainer';

interface ICrewListProps {
    aircrewList: IAircrewWithPucks[];
    unavailableAircrewIds: string[];
    daySnivs: ISnivs[];
    showSnivs: boolean;
    dayId: string;
    onAircrewClick: (crew: IAircrewWithPucks) => any;
    onAircrewXClick: (id: string) => any;
    onAircrewEditClick: (crew: IAircrewWithPucks) => any;
    onSnivXClick: (id: string) => any;
    onSnivEditClick: (sniv: IAddUpdateSnivArgs) => any;
}

const CrewList: React.SFC<ICrewListProps> = ({
    aircrewList,
    unavailableAircrewIds,
    daySnivs,
    showSnivs,
    dayId,
    onAircrewClick,
    onAircrewXClick,
    onAircrewEditClick,
    onSnivXClick,
    onSnivEditClick,
    }) => {
    const pilotList: JSX.Element[] = [];
    const wsoList: JSX.Element[] = [];
    aircrewList.forEach((aircrew: IAircrewWithPucks) => {
        const aircrewComponent = (
            <Aircrew
                key={aircrew.id}
                aircrew={aircrew}
                unavailable={unavailableAircrewIds.indexOf(aircrew.id) > -1 ? true : false}
                snivs={daySnivs.filter(sniv => sniv.aircrewIds.indexOf(aircrew.id) > -1)}
                showSnivs={showSnivs}
                dayId={dayId}
                onAircrewClick={() => onAircrewClick(aircrew)}
                onAircrewXClick={() => onAircrewXClick(aircrew.id)}
                onAircrewEditClick={() => onAircrewEditClick(aircrew)}
                onSnivXClick={onSnivXClick}
                onSnivEditClick={onSnivEditClick}
            />
        );
        aircrew.seat === 'pilot' ? pilotList.push(aircrewComponent) : wsoList.push(aircrewComponent);
    });
    return (
        <div>
            <hr />
            <h6
                className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
            >
                Pilots
            </h6>
            <ul className="nav flex-column">
                {pilotList.length > 0 ? pilotList : errorMessages.ERR_NO_RESULTS_FOUND}
            </ul>
            <hr />
            <h6
                className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
            >
                WSOs
            </h6>
            <ul className="nav flex-column">
                {wsoList.length > 0 ? wsoList : errorMessages.ERR_NO_RESULTS_FOUND}
            </ul>
            <hr />
            <AddUpdateAircrewFormContainer />
            <AddSnivFormContainer />
        </div>
    );
};

export default CrewList;
