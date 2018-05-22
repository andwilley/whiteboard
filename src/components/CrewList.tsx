import * as React from 'react';
import Aircrew from './Aircrew';
import AddButton from '../components/AddButton';
import DelButton from '../components/DelButton';
import { IAircrewWithPucks } from '../types/WhiteboardTypes';
import { errorMessages } from '../errors';
import AddUpdateAircrewFormContainer from '../containers/AddUpdateAircrewFormContainer';
import { ISnivs } from '../types/State';

interface ICrewListProps {
    aircrewList: IAircrewWithPucks[];
    addUpdateAircrewFormDisplay: boolean;
    daySnivs: ISnivs[];
    showSnivs: boolean;
    dayId: string;
    onAircrewClick: (crew: IAircrewWithPucks) => any;
    onXClick: (id: string) => any;
    onEditClick: (crew: IAircrewWithPucks) => any;
    onAddAircrewFormButtonClick: () => any;
    onDelAircrewFormButtonClick: () => any;
}

const CrewList: React.SFC<ICrewListProps> = ({
    aircrewList,
    daySnivs,
    showSnivs,
    dayId,
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
    const formDisplayButton = addUpdateAircrewFormDisplay ?
                (
                <div>
                    <DelButton onClick={() => onDelAircrewFormButtonClick()} />
                    <AddUpdateAircrewFormContainer />
                </div>
                ) :
                (
                <div>
                    <AddButton onClick={() => onAddAircrewFormButtonClick()}>
                        Add Aircrew
                    </AddButton>
                </div>
                );
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
            {formDisplayButton}
        </div>
    );
};

export default CrewList;
