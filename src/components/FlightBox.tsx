import * as React from 'react';
import Flight from './Flight';
import { IFlights, ISettings } from '../types/State';
import IconButton from './IconButton';
import * as Moment from 'moment';
import * as cuid from 'cuid';
import { conv24HrTimeToMoment } from '../types/utilFunctions';

interface IFlightBoxProps {
    dayId: string;
    flights: IFlights[];
    settings: ISettings;
    onExactTimesToggle: (id: string) => (e: any) => void;
    onAddFlightClick: (dayId: string) => void;
    onDelFlightClick: (flight: IFlights, dayId: string) => (e: any) => void;
}

interface IFlightListAcc {
    goStartTime: Moment.Moment;
    goEndTime: Moment.Moment;
    flightComponents: JSX.Element[];
}

const FlightBox: React.SFC<IFlightBoxProps> = ({
    dayId,
    flights,
    settings,
    onExactTimesToggle,
    onAddFlightClick,
    onDelFlightClick,
}) => {
    const flightComponents = flights.reduce((acc: IFlightListAcc, flight, i) => {
        /** adds a column break element if flight falls in another "go" */
        if (i === 0) {
            acc.goStartTime = conv24HrTimeToMoment(flight.times.takeoff, dayId);
            acc.goEndTime = conv24HrTimeToMoment(flight.times.land, dayId)
                .add(settings.hotPitNoShorterThan - 1, 'minutes');
        }
        const flightTakeoffTime = conv24HrTimeToMoment(flight.times.takeoff, dayId);
        const flightLandTime = conv24HrTimeToMoment(flight.times.land, dayId);
        const flightComponent = (
            <Flight
                key={flight.id}
                flight={flight}
                dayId={dayId}
                onExactTimesToggle={onExactTimesToggle(flight.id)}
                onDelFlightClick={onDelFlightClick}
            />
        );
        if (flightTakeoffTime.isAfter(acc.goEndTime)) {
            acc.flightComponents.push(
                <div className="w-100" key={cuid()} />
            );
            acc.flightComponents.push(flightComponent);
            acc.goStartTime = flightTakeoffTime;
            acc.goEndTime = flightLandTime;
        } else {
            acc.flightComponents.push(flightComponent);
        }
        return acc;
    }, {goStartTime: Moment(), goEndTime: Moment(), flightComponents: []}).flightComponents;
    return (
        <div className="row mb-2">
            {flightComponents}
            <div className="col-2">
                <IconButton
                    onClick={() => onAddFlightClick(dayId)}
                    icon="plus"
                    size={14}
                />
            </div>
        </div>
    );
};

export default FlightBox;
