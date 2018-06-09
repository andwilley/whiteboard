import * as React from 'react';
import Aircrew from './Aircrew';
import { ISnivs } from '../types/State';
import { errorMessages } from '../errors';
import AddButton from './AddButton';
import DelButton from './DelButton';
import AddSnivFormContainer from '../containers/AddSnivFormContainer';
import { IAircrewWithPucks } from '../types/WhiteboardTypes';
import AddUpdateAircrewFormContainer from '../containers/AddUpdateAircrewFormContainer';

interface ICrewListProps {
    aircrewList: IAircrewWithPucks[];
    addUpdateAircrewFormDisplay: boolean;
    addUpdateSnivFormDisplay: boolean;
    daySnivs: ISnivs[];
    showSnivs: boolean;
    dayId: string;
    onAircrewClick: (crew: IAircrewWithPucks) => any;
    onXClick: (id: string) => any;
    onEditClick: (crew: IAircrewWithPucks) => any;
    onAddAircrewFormButtonClick: () => any;
    onDelAircrewFormButtonClick: () => any;
    onSnivFormAddButtonClick: () => void;
    onSnivFormDelButtonClick: () => void;
}

const CrewList: React.SFC<ICrewListProps> = ({
    aircrewList,
    daySnivs,
    showSnivs,
    dayId,
    addUpdateAircrewFormDisplay,
    addUpdateSnivFormDisplay,
    onAircrewClick,
    onXClick,
    onEditClick,
    onAddAircrewFormButtonClick,
    onDelAircrewFormButtonClick,
    onSnivFormAddButtonClick,
    onSnivFormDelButtonClick,
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
    const addUpdateAircrewFormDisplayButton = addUpdateAircrewFormDisplay ?
        (
        <div>
            <DelButton onClick={() => onDelAircrewFormButtonClick()}>
                Close This Form
            </DelButton>
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
    const snivFormDisplayButton = addUpdateSnivFormDisplay ?
        (
            <div>
                <DelButton onClick={onSnivFormDelButtonClick}>
                    Close This Form
                </DelButton>
                <AddSnivFormContainer />
            </div>
        ) :
        (
            <div>
                <AddButton onClick={onSnivFormAddButtonClick}>
                    Add Sniv
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
            {addUpdateAircrewFormDisplayButton}
            {snivFormDisplayButton}
        </div>
    );
};

export default CrewList;
