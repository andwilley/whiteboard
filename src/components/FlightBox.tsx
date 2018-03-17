import * as React from 'react';
import Flight from './Flight';
import AddButton from './AddButton';

interface IFlightBoxProps {
    dayId: string;
    flightIds: string[];
    onAddFlightClick: (dayId: string, sim: boolean) => any;
}

const FlightBox: React.SFC<IFlightBoxProps> = ({ dayId, flightIds, onAddFlightClick }) => {
    const flightComponents = flightIds.map(id => (<Flight key={id} flightId={id} />));
    return (
        <div>
            {flightComponents}
            <AddButton
                onClick={() => onAddFlightClick(dayId, false)}
            />
        </div>
    );
};

export default FlightBox;
