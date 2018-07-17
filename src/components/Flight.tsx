import * as React from 'react';
import TimesBox from './TimesBox';
import { IErrors, IFlights } from '../types/State';
import { noteEntity } from '../whiteboard-constants';
import SortieBoxContainer from '../containers/SortieBoxContainer';
import NoteBoxContainer from '../containers/NoteBoxContainer';
import ErrorList from './ErrorList';
import IconButton from './IconButton';
import { conv24HrTimeToMoment } from '../types/utilFunctions';
import * as Moment from 'moment';

interface IFlightProps {
    flight: IFlights;
    errors: IErrors[];
    dayId: string;
    onExactTimesToggle: (e: any) => void;
    onDelFlightClick: (flight: IFlights, dayId: string) => (e: any) => void;
}

const getFlightTime = (flight: IFlights, dayId: string): string => {
    const takeoff = conv24HrTimeToMoment(flight.times.takeoff, dayId);
    const land = conv24HrTimeToMoment(flight.times.land, dayId);
    if (!takeoff.isValid() || !land.isValid()) {
        return '0.0';
    }
    return Moment.duration(land.diff(takeoff)).asHours().toFixed(1);
};

const Flight: React.SFC<IFlightProps> = ({ flight, errors, onExactTimesToggle, onDelFlightClick, dayId }) => (
    <div className="col-xl-3 col-lg-4 col-md-6">
        <div className="card mb-3 box-shadow">
            <div className="card-header d-flex bg-dark wb-only-hover">
                <span className="mr-auto">
                    <IconButton
                        icon={flight.sim ? 'controller' : 'plane'}
                        viewBox={flight.sim ? '0 0 512 512' : '0 0 21 22'}
                        svgClass="crew-icon"
                        pointer={false}
                        size={flight.sim ? 14 : 12}
                        style={{
                            margin: `0 .2rem 0 0`,
                        }}
                    >
                    <span className="text-light">{flight.sorties.length}</span>
                    </IconButton>
                    <IconButton
                        icon="clock"
                        svgClass="crew-icon"
                        pointer={false}
                        size={12}
                        style={{
                            margin: '0 .2rem 0 .5rem',
                        }}
                    >
                    <span className="text-light">{getFlightTime(flight, dayId)}</span>
                    </IconButton>
                </span>
                <span
                    className={`mr-3 text-light wb-pointer badge badge-pill${flight.useExactTimes ?
                        ` badge-warning text-dark` : 'bad'}`}
                    onClick={onExactTimesToggle}
                >
                    Exact Times
                </span>
                <IconButton
                    onClick={onDelFlightClick(flight, dayId)}
                    icon="trash"
                    size={14}
                    className="wb-only-hover-element-hold-space"
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
                    className="text-light"
                    entityId={flight.id}
                    entityType={noteEntity.FLIGHT_NOTE}
                />
                <ErrorList errors={errors} className="text-light" />
            </div>
        </div>
    </div>
);

export default Flight;
