import * as React from 'react';
import Flight from './Flight';
import { IErrors, IFlights } from '../types/State';
import IconButton from './IconButton';

interface IFlightBoxProps {
    dayId: string;
    flights: IFlights[];
    sims: IFlights[];
    errors: {[id: string]: IErrors[]};
    onAddFlightClick: (dayId: string, sim: boolean) => void;
    onDelFlightClick: (flight: IFlights, dayId: string) => (e: any) => void;
}

const FlightBox: React.SFC<IFlightBoxProps> = ({
    dayId,
    flights,
    sims,
    errors,
    onAddFlightClick,
    onDelFlightClick,
}) => {
    const flightComponents = flights.map(flight =>
        (
        <Flight
            key={flight.id}
            flight={flight}
            dayId={dayId}
            onDelFlightClick={onDelFlightClick}
            errors={errors[flight.id] ? errors[flight.id] : []}
        />
        ));
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
        <div className="col-md-12">
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
