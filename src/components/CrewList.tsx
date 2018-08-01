import * as React from 'react';
import AddSnivFormContainer from '../containers/AddSnivFormContainer';
import AddUpdateAircrewFormContainer from '../containers/AddUpdateAircrewFormContainer';
import AircrewContainer from '../containers/AircrewContainer';
import { IAircrew } from '../types/State';

interface ICrewListProps {
    aircrewList: IAircrew[];
}

const CrewList: React.SFC<ICrewListProps> = ({
    aircrewList,
}) => {
    const pilotList: JSX.Element[] = [];
    const wsoList: JSX.Element[] = [];
    aircrewList.forEach(aircrew => {
        const aircrewComponent = (
            <AircrewContainer
                key={aircrew.id}
                aircrewId={aircrew.id}
            />
        );
        aircrew.seat === 'pilot' ? pilotList.push(aircrewComponent) : wsoList.push(aircrewComponent);
    });
    return (
        <div>
            <hr />
            <h6
                className={'sidebar-heading d-flex justify-content-between \
align-items-center px-3 mt-4 mb-1 text-muted'}
            >
                Pilots
            </h6>
            <ul className="nav flex-column">
                {pilotList}
            </ul>
            <hr />
            <h6
                className={'sidebar-heading d-flex justify-content-between \
align-items-center px-3 mt-4 mb-1 text-muted'}
            >
                WSOs
            </h6>
            <ul className="nav flex-column">
                {wsoList}
            </ul>
            <hr />
            <AddUpdateAircrewFormContainer />
            <AddSnivFormContainer />
        </div>
    );
};

export default CrewList;
