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
    <div className="col-md-6">
        <div className="card-body d-flex flex-column align-items-start">
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
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
        </div>
    </div>
);

export default Flight;
