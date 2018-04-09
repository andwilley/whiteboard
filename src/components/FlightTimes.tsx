import * as React from 'react';
import { IFlightTimes } from '../types/State';
import { errorTypes } from '../errors';
import FlexInputContainer from '../containers/FlexInputContainer';

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
    // This val needs improvement. Consider edge cases:
    // night flight over midnight.
    // boxes shouldn't be red as you're entering data for the first time
    // if (times.brief >= times.takeoff) {
    //     timeIsValid.brief = false;
    //     timeIsValid.takeoff = false;
    // }
    // if (times.brief >= times.land) {
    //     timeIsValid.brief = false;
    //     timeIsValid.land = false;
    // }
    // if (times.takeoff >= times.land) {
    //     timeIsValid.takeoff = false;
    //     timeIsValid.land = false;
    // }
    return (
        <form>
            <FlexInputContainer
                placeHolder="Brief Time"
                name="flightTimes"
                value={times.brief}
                errorTypes={{show: [], update: [errorTypes.SCHEDULE_CONFLICT]}}
                onChange={(e) => onInputChange('brief', e.target.value)}
            />
            <input
                type="text"
                placeholder="Takeoff Time"
                name="flightTimes"
                value={times.takeoff}
                style={{borderColor: timeIsValid.takeoff ? '' : 'orange'}}
                onChange={(e) => onInputChange('takeoff', e.target.value)}
            />
            <input
                type="text"
                placeholder="Land Time"
                name="flightTimes"
                value={times.land}
                style={{borderColor: timeIsValid.land ? '' : 'orange'}}
                onChange={(e) => onInputChange('land', e.target.value)}
            />
        </form>
    );
};

export default FlightTimes;
