import * as React from 'react';
import { IFlightTimes } from '../types/State';

interface IFlightTimesProps {
    times: IFlightTimes;
    onInputChange: (timeType: string, time: string) => any;
}

const FlightTimes: React.SFC<IFlightTimesProps> = ({ times, onInputChange}) => (
    <form>
        <input
            type="text"
            placeholder="Brief Time"
            name="flightTimes"
            value={times.brief}
            onChange={(e) => onInputChange('brief', e.target.value)}
        />
        <input
            type="text"
            placeholder="Takeoff Time"
            name="flightTimes"
            value={times.takeoff}
            onChange={(e) => onInputChange('takeoff', e.target.value)}
        />
        <input
            type="text"
            placeholder="Land Time"
            name="flightTimes"
            value={times.land}
            onChange={(e) => onInputChange('land', e.target.value)}
        />
    </form>
);

export default FlightTimes;
