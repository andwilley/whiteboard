import * as React from 'react';
import TimesBox from './TimesBox';
import { IErrors, IFlights } from '../types/State';
import { noteEntity } from '../whiteboard-constants';
import SortieBoxContainer from '../containers/SortieBoxContainer';
import NoteBoxContainer from '../containers/NoteBoxContainer';
import ErrorList from './ErrorList';
import IconButton from './IconButton';

interface IFlightProps {
    flight: IFlights;
    errors: IErrors[];
    dayId: string;
    onDelFlightClick: (flight: IFlights, dayId: string) => (e: any) => void;
}

const Flight: React.SFC<IFlightProps> = ({ flight, errors, onDelFlightClick, dayId }) => (
    <div className="col-md-3">
        <div className="card mb-3 box-shadow">
            <div className="card-header">
                <IconButton
                    onClick={onDelFlightClick(flight, dayId)}
                    icon="trash"
                />
            </div>
            <div className="card-body">
                <TimesBox
                    flightId={flight.id}
                />
                <SortieBoxContainer flightId={flight.id} />
            </div>
            <div className="card-footer">
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
