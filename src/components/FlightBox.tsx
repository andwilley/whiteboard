import * as React from 'react';
import Flight from './Flight';
import { IErrors } from '../types/State';
import AddButton from './AddButton';

interface IFlightBoxProps {
    dayId: string;
    flightIds: string[];
    errors: {[id: string]: IErrors[]};
    onAddFlightClick: (dayId: string, sim: boolean) => any;
}

const FlightBox: React.SFC<IFlightBoxProps> = ({ dayId, flightIds, errors, onAddFlightClick }) => {
    const flightComponents = flightIds.map(id =>
        (<Flight key={id} flightId={id} errors={errors[id] ? errors[id] : []} />));
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
