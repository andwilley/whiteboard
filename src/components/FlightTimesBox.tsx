import * as React from 'react';

interface IFlightTimesBoxProps {
    briefTime: string;
    takeoffTime: string;
    landTime: string;
}

const FlightTimesBox: React.SFC<IFlightTimesBoxProps> = ({ briefTime, takeoffTime, landTime }) => (
    <div>
        <input
            type="text"
            placeholder="Brief"
            name="flightTimes"
            value={briefTime}
        />
        <input
            type="text"
            placeholder="Takeoff"
            name="flightTimes"
            value={takeoffTime}
        />
        <input
            type="text"
            placeholder="Land"
            name="flightTimes"
            value={landTime}
        />
    </div>
);

export default FlightTimesBox;
