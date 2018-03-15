import * as React from 'react';
import Flight from './Flight';
import AddButton from './AddButton';

const FlightBox: React.SFC = () => (
    <div>
        <Flight />
        <AddButton
            onClick={() => alert('Add a Flight')}
        />
    </div>
);

export default FlightBox;
