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
    <div className="col-xl-3 col-lg-4 col-md-6">
        <div className="card mb-3 box-shadow">
            <div className="card-header bg-dark">
                <IconButton
                    onClick={onDelFlightClick(flight, dayId)}
                    icon="trash"
                    size={14}
                    svgClass="float-right"
                />
            </div>
            <div className="card-body">
                <TimesBox
                    flightId={flight.id}
                />
                <SortieBoxContainer flightId={flight.id} />
            </div>
            <div className="card-footer bg-dark">
                <h6 className="sidebar-heading text-muted">
                    Notes
                </h6>
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
