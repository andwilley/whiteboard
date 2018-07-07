import * as React from 'react';
import TimesBox from './TimesBox';
import { IErrors, IFlights } from '../types/State';
import { noteEntity } from '../whiteboard-constants';
import SortieBoxContainer from '../containers/SortieBoxContainer';
import NoteBoxContainer from '../containers/NoteBoxContainer';
import ErrorList from './ErrorList';
import DelButton from './DelButton';

interface IFlightProps {
    flight: IFlights;
    errors: IErrors[];
    dayId: string;
    onDelFlightClick: (flight: IFlights, dayId: string) => (e: any) => void;
}

const Flight: React.SFC<IFlightProps> = ({ flight, errors, onDelFlightClick, dayId }) => (
    <div style={{border: '1px solid black', marginTop: '20px'}}>
        <span style={{position: 'relative', top: '-10px', left: '10px', background: 'white'}}>Flight</span>
        <DelButton onClick={onDelFlightClick(flight, dayId)}>
            Delete Flight
        </DelButton>
        <TimesBox
            flightId={flight.id}
        />
        <SortieBoxContainer flightId={flight.id} />
        <NoteBoxContainer
            entityId={flight.id}
            entityType={noteEntity.FLIGHT_NOTE}
        />
        <ErrorList errors={errors} />
    </div>
);

export default Flight;
