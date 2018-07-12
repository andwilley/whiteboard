import * as React from 'react';
import Flight from './Flight';
import { IErrors, IFlights } from '../types/State';
import IconButton from './IconButton';
import * as Moment from 'moment';

interface IFlightBoxProps {
    dayId: string;
    flights: IFlights[];
    sims: IFlights[];
    errors: {[id: string]: IErrors[]};
    onAddFlightClick: (dayId: string, sim: boolean) => void;
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
    sims,
    errors,
    onAddFlightClick,
    onDelFlightClick,
}) => {
    const flightComponents = flights.reduce((acc: IFlightListAcc, flight, i) => {
        if (i === 0) {
            acc.goStartTime =
                Moment(`${dayId} ${flight.times.takeoff.slice(0, 2)}:${flight.times.takeoff.slice(2, 4)}:00.000`,
            'YYYY-MM-DD HH:mm:ss.SSS');
            acc.goEndTime =
                Moment(`${dayId} ${flight.times.land.slice(0, 2)}:${flight.times.land.slice(2, 4)}:00.000`,
            'YYYY-MM-DD HH:mm:ss.SSS').add(59, 'minutes');
        }
        const flightTakeoffTime =
            Moment(`${dayId} ${flight.times.takeoff.slice(0, 2)}:${flight.times.takeoff.slice(2, 4)}:00.000`,
                'YYYY-MM-DD HH:mm:ss.SSS');
        const flightLandTime =
            Moment(`${dayId} ${flight.times.land.slice(0, 2)}:${flight.times.land.slice(2, 4)}:00.000`,
                    'YYYY-MM-DD HH:mm:ss.SSS');
        const flightComponent = (
            <Flight
                key={flight.id}
                flight={flight}
                dayId={dayId}
                onDelFlightClick={onDelFlightClick}
                errors={errors[flight.id] ? errors[flight.id] : []}
            />
        );
        if (flightTakeoffTime.isAfter(acc.goEndTime)) {
            acc.flightComponents.push(
                <div className="w-100" />
            );
            acc.flightComponents.push(flightComponent);
            acc.goStartTime = flightTakeoffTime;
            acc.goEndTime = flightLandTime;
        } else {
            acc.flightComponents.push(flightComponent);
        }
        return acc;
    }, {goStartTime: Moment(), goEndTime: Moment(), flightComponents: []}).flightComponents;
    const simComponents = sims.map(flight =>
        (
        <Flight
            key={flight.id}
            flight={flight}
            dayId={dayId}
            onDelFlightClick={onDelFlightClick}
            errors={errors[flight.id] ? errors[flight.id] : []}
        />
        ));
    return (
        <div className="col-12">
            <h5>Flights</h5>
            <div className="row mb-2">
                {flightComponents}
                <IconButton
                    onClick={() => onAddFlightClick(dayId, false)}
                    icon="plus"
                    size={14}
                />
            </div>
            <hr />
            <h5>Simuators</h5>
            <div className="row mb-2">
                {simComponents}
                <IconButton
                    onClick={() => onAddFlightClick(dayId, true)}
                    icon="plus"
                    size={14}
                />
            </div>
        </div>
    );
};

export default FlightBox;
