import * as React from 'react';
import Flight from './Flight';
import { IErrors, IFlights } from '../types/State';
import AddButton from './IconButton';

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
            <div className="row mb-2">
                {flightComponents}
                <AddButton onClick={() => onAddFlightClick(dayId, false)}>
                    Add Flight
                </AddButton>
            </div>
            <div className="row mb-2">
                {simComponents}
                <AddButton onClick={() => onAddFlightClick(dayId, true)}>
                    Add Sim
                </AddButton>
            </div>
        </div>
    );
};

export default FlightBox;
