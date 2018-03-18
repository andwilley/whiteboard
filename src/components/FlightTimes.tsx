import * as React from 'react';
import { IFlightTimes } from '../types/State';

interface IFlightTimesProps {
    times: IFlightTimes;
    onInputChange: (timeType: string, time: string) => any;
}

const FlightTimes: React.SFC<IFlightTimesProps> = ({ times, onInputChange}) => {
    const timeIsValid = {
        brief: true,
        takeoff: true,
        land: true,
    };
    Object.keys(times).forEach(time => {
        timeIsValid[time] = /^0[0-9][0-5][0-9]|1[0-9][0-5][0-9]|2[0-3][0-5][0-9]$/.test(times[time]);
    });
    if (times.brief >= times.takeoff) {
        timeIsValid.brief = false;
        timeIsValid.takeoff = false;
    }
    if (times.brief >= times.land) {
        timeIsValid.brief = false;
        timeIsValid.land = false;
    }
    if (times.takeoff >= times.land) {
        timeIsValid.takeoff = false;
        timeIsValid.land = false;
    }
    return (
        <form>
            <input
                type="text"
                placeholder="Brief Time"
                name="flightTimes"
                value={times.brief}
                style={{borderColor: timeIsValid.brief ? '' : 'red'}}
                onChange={(e) => onInputChange('brief', e.target.value)}
            />
            <input
                type="text"
                placeholder="Takeoff Time"
                name="flightTimes"
                value={times.takeoff}
                style={{borderColor: timeIsValid.takeoff ? '' : 'red'}}
                onChange={(e) => onInputChange('takeoff', e.target.value)}
            />
            <input
                type="text"
                placeholder="Land Time"
                name="flightTimes"
                value={times.land}
                style={{borderColor: timeIsValid.land ? '' : 'red'}}
                onChange={(e) => onInputChange('land', e.target.value)}
            />
        </form>
    );
};

export default FlightTimes;