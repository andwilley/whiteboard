import * as React from 'react';
import Flight from './Flight';
import { IErrors, IFlights } from '../types/State';
import AddButton from './AddButton';

interface IFlightBoxProps {
    dayId: string;
    flights: IFlights[];
    errors: {[id: string]: IErrors[]};
    onAddFlightClick: (dayId: string, sim: boolean) => void;
    onDelFlightClick: (flight: IFlights, dayId: string) => (e: any) => void;
}

const FlightBox: React.SFC<IFlightBoxProps> = ({ dayId, flights, errors, onAddFlightClick, onDelFlightClick }) => {
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
    return (
        <div>
            {flightComponents}
            <AddButton onClick={() => onAddFlightClick(dayId, false)}>
                Flight
            </AddButton>
        </div>
    );
};

export default FlightBox;
