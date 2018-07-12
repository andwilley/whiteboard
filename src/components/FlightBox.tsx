import * as React from 'react';
import Flight from './Flight';
import { IErrors, IFlights } from '../types/State';
import IconButton from './IconButton';
import * as Moment from 'moment';
import { conv24HrTimeToMoment } from '../types/utilFunctions';

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
        /** adds a column break element if flight falls in another "go" */
        if (i === 0) {
            acc.goStartTime = conv24HrTimeToMoment(dayId, flight.times.takeoff);
            acc.goEndTime = conv24HrTimeToMoment(dayId, flight.times.land).add(44, 'minutes');
        }
        const flightTakeoffTime = conv24HrTimeToMoment(dayId, flight.times.takeoff);
        const flightLandTime = conv24HrTimeToMoment(dayId, flight.times.land);
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
